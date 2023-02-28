<template>
  <div>
    <div class="tabinfo">
      <h4>{{ $t("accountinfo") }}</h4>
    </div>
    <div class="info-detail">
      <div class="info-form">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :rules="rules"
          :model="formLabelAlign"
          style="max-width: 460px"
          ref="ruleFormRef"
        >
          <el-form-item :label="$t('email')">
            <el-input
              v-model.trim="formLabelAlign.email"
              maxlength="60"
              disabled
            />
            <button
              @click="getEmailChangeCheck()"
              style="float: left"
              :disabled="butttonDisable"
            >
              {{ checkable }}{{ $t("getcode") }}
            </button>
          </el-form-item>
          <el-form-item :label="$t('newpassword')" prop="newpassword">
            <el-input
              v-model.trim="formLabelAlign.newpassword"
              maxlength="20"
              placeholder="new password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item :label="$t('verification')" prop="check">
            <el-input
              v-model.trim="formLabelAlign.check"
              placeholder="verification code"
              maxlength="10"
            />
          </el-form-item>
        </el-form>
        <button @click="changeEmail(ruleFormRef)" style="float: left">
          {{ $t("sureToChange") }}
        </button>
        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Really? Are you sure to logout?"
          @confirm="confirmEvent"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button type="danger">{{ $t("logout") }}</el-button>
          </template>
        </el-popconfirm>
        <el-alert
          v-if="isSuccess == 1"
          title="success"
          type="success"
          center
          show-icon
          :closable="false"
        />
        <el-alert
          v-else-if="isSuccess == 2"
          title="error"
          type="error"
          center
          show-icon
          :closable="false"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import { useUserStore } from "../store/modules/user";
import { emailCode, updatepwd } from "../api/user";
import type { FormInstance } from "element-plus";
import { baseInfo } from "../api/userinfo";
import { pwdRegex, pwdcheck } from "../utils/user";
import { InfoFilled } from "@element-plus/icons-vue";
import { getPublicKey } from "../api/user";
import { JSEncrypt } from "jsencrypt";
import _ from "lodash";
const screenWidth = ref(document.body.clientWidth);
const ruleFormRef = ref<FormInstance>();
const isSuccess = ref(0);
const labelPosition = ref("left");
const userStore = useUserStore();
const checkable = ref("");
const butttonDisable = ref(false);
const formLabelAlign = reactive({
  email: userStore.userMail,
  newpassword: "",
  check: "",
});
const confirmEvent = () => {
  console.log("confirm!");
  userStore.logOut();
};
const cancelEvent = () => {
  console.log("cancel!");
};
const code = ref<number>();

const validatePass = async (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (pwdRegex.test(formLabelAlign.newpassword)) {
      callback(new Error("no 中文 in password"));
    } else if (!pwdcheck.test(formLabelAlign.newpassword)) {
      callback(new Error("password must contain letters, numbers, length > 8"));
    } else if (formLabelAlign.newpassword.length > 7) {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("newpassword", () => null);
    } else {
      callback(new Error("Please input the password's length >= 8"));
    }
    callback();
  }
};
const rules = reactive({
  newpassword: [{ required: true, validator: validatePass, trigger: "blur" }],
  check: [{ required: true, message: "please input code", rigger: "blur" }],
});

function getEmailChangeCheck() {
  butttonDisable.value = true;
  let times = 60;
  let timer = setInterval(() => {
    times--;
    checkable.value = `${times}s `;
  }, 1000);
  setTimeout(() => {
    butttonDisable.value = false;
    checkable.value = "";
    clearInterval(timer);
  }, times * 1000);
  // 通知后端发送邮箱验证码
  // 并获取后端返回的修改ID
  emailCode({ email: formLabelAlign.email }).then(
    (res: any) => {
      code.value = res.code;
    },
    (err) => {
      console.log(err.message);
    }
  );
}

function changeEmail(formEl: FormInstance | undefined) {
  // 更改email
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (code.value != undefined) {
        getPublicKey()
          .then(
            (res: any) => res.pubkey,
            (err) => {
              console.log(err.message);
            }
          )
          .then(
            (PUBLIC_KEY) => {
              let encryptor = new JSEncrypt();
              encryptor.setPublicKey(PUBLIC_KEY);
              let result = encryptor.encrypt(formLabelAlign.newpassword);
              if (result) {
                let { email, check } = formLabelAlign;
                updatepwd({
                  email,
                  check,
                  pass: result,
                  code: code.value,
                }).then(
                  (res: any) => {
                    if (res.status == 0) {
                      isSuccess.value = 1;
                    } else {
                      isSuccess.value = 2;
                    }
                  },
                  (err) => {
                    isSuccess.value = 2;
                  }
                );
              }
            },
            (err) => {
              console.log(err.message);
            }
          );
      }
    } else {
      return false;
    }
  });
}
onMounted(() => {
  baseInfo().then(
    (res: any) => {
      if (res.status == 0) {
        formLabelAlign.email = res.info.userMail;
      }
    },
    (err) => {
      console.log(err.message);
    }
  );
  window.onresize = () => {
    return (() => {
      screenWidth.value = document.body.clientWidth;
    })();
  };
});
const changeLable = _.debounce(
  (screenWidth: number) => {
    if (screenWidth < 767) {
      labelPosition.value = "top";
    } else {
      labelPosition.value = "left";
    }
  },
  200,
  {
    leading: true,
  }
);
watch(screenWidth, (newVal, oldVal) => {
  //
  changeLable(newVal);
});
</script>
<style lang="scss" scoped>
.tabinfo {
  text-align: left;
  margin-left: 20px;
}
.info-detail {
  display: grid;
  width: 100%;
  height: 90%;
  grid-template-columns: 60% 30%;
  gap: 20px;
}
.info-form {
  grid-column-start: 1;
  margin-left: 20px;
}

@media only screen and (max-width: 767px) {
  .info-detail {
    grid-template-columns: 100%;
  }
  .info-detail {
    width: 80%;
  }
}
</style>
