<template>
  <div>
    <div class="tabinfo">
      <h4>账户设置</h4>
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
          <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.email" maxlength="20" disabled />
            <button
              @click="getEmailChangeCheck()"
              style="float: left"
              :disabled="butttonDisable"
            >
              {{ checkable }}
            </button>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input
              v-model="formLabelAlign.newpassword"
              maxlength="20"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="验证码" prop="check">
            <el-input v-model="formLabelAlign.check" maxlength="10" />
          </el-form-item>
        </el-form>
        <button @click="changeEmail(ruleFormRef)" style="float: left">
          确认修改
        </button>
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
import { reactive, ref, onMounted } from "vue";
import { useUserStore } from "../store/modules/user";
import { emailCode, updatepwd } from "../api/user";
import type { FormInstance } from "element-plus";
import { baseInfo } from "../api/userinfo";

const ruleFormRef = ref<FormInstance>();
const isSuccess = ref(0);
const labelPosition = ref("left");
const userStore = useUserStore();
const checkable = ref("获取验证码");
const butttonDisable = ref(false);
const formLabelAlign = reactive({
  email: userStore.userMail,
  newpassword: "",
  check: "",
});
const code = ref<number>();

const validatePass = async (rule: any, value: any, callback: any) => {
  let pwdRegex = new RegExp(/[\u4e00-\u9fff]/g); // 中文
  let pwdcheck = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}"); // 字母数字
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
    checkable.value = `${times}s后可重发`;
  }, 1000);
  setTimeout(() => {
    butttonDisable.value = false;
    checkable.value = "获取验证码";
    clearInterval(timer);
  }, times * 1000);
  // 通知后端发送邮箱验证码
  // 并获取后端返回的修改ID
  emailCode({ email: userStore.userMail }).then(
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
  console.log(formEl);
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (code.value != undefined) {
        updatepwd({ ...formLabelAlign, code: code.value }).then(
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
</style>
