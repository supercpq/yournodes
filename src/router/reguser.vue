<template>
  <div class="login">
    <h3>your nodes {{ $t("reguser") }}</h3>
    <div class="login-form">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :rules="emailRules"
        :model="formLabelAlign"
        style="max-width: 460px"
        ref="emailRuleFormRef"
      >
        <el-form-item :label="$t('email')" prop="email">
          <el-input
            v-model.trim="formLabelAlign.email"
            placeholder="email"
            :maxlength="60"
            @keydown.enter="getEmailChangeCheck(emailRuleFormRef)"
          />
        </el-form-item>
      </el-form>
      <div class="submit" :class="{ shake: userStore.getDisabled }">
        <button
          @click="getEmailChangeCheck(emailRuleFormRef)"
          style="float: left"
          :disabled="butttonDisable"
        >
          {{ checkable }}{{ $t("getcode") }}
        </button>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :rules="rules"
        :model="formLabelAlign"
        style="max-width: 460px"
        ref="ruleFormRef"
      >
        <el-form-item :label="$t('newpassword')" prop="newpassword">
          <el-input
            v-model.trim="formLabelAlign.newpassword"
            :maxlength="20"
            autocomplete="off"
            placeholder="new password"
            @keydown.enter="changeEmail(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item :label="$t('verification')" prop="check">
          <el-input
            v-model.trim="formLabelAlign.check"
            placeholder="verification code"
            :maxlength="10"
            @keydown.enter="changeEmail(ruleFormRef)"
          />
        </el-form-item>
      </el-form>
      <div class="submit" :class="{ shake: userStore.getDisabled }">
        <button @click="changeEmail(ruleFormRef)" style="float: left">
          {{ $t("reguser") }}
        </button>
        <el-link type="success" href="/login">
          {{ $t("regusermessage") }}
        </el-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserStore } from "../store/modules/user";
import { emailCode } from "../api/user";
import type { FormInstance } from "element-plus";
import { pwdRegex, pwdcheck, emailcheck } from "../utils/user";

const lastEmail = ref("");
const ruleFormRef = ref<FormInstance>();
const emailRuleFormRef = ref<FormInstance>();
const labelPosition = ref("left");
const userStore = useUserStore();
const checkable = ref("");
const butttonDisable = ref(false);
const formLabelAlign = reactive({
  email: "",
  newpassword: "",
  check: "",
});

const code = ref<number>();
const checkemail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    return callback(new Error("Please input the email"));
  } else {
    if (!emailcheck.test(formLabelAlign.email)) {
      callback(new Error("wrong email format"));
    } else {
      if (!emailRuleFormRef.value) return;
      emailRuleFormRef.value.validateField("email", () => null);
      callback();
    }
  }
};
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
  // email: [{ required: true, validator: checkemail, trigger: "blur" }],
  newpassword: [{ required: true, validator: validatePass, trigger: "blur" }],
  check: [{ required: true, message: "please input code", rigger: "blur" }],
});
const emailRules = reactive({
  email: [{ required: true, validator: checkemail, trigger: "blur" }],
});
function getEmailChangeCheck(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (!butttonDisable.value) {
        lastEmail.value = formLabelAlign.email;
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
            console.log("err", err.message);
          }
        );
      }
    } else {
      return false;
    }
  });
}

function changeEmail(formEl: FormInstance | undefined) {
  // 注册、忘记密码
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (code.value != undefined) {
        const registEmail = { ...formLabelAlign, code: code.value };
        registEmail.email = lastEmail.value;
        userStore.reguser(registEmail);
      }
    } else {
      return false;
    }
  });
}
</script>
<style lang="scss" scoped>
.submit {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.login {
  position: absolute;
  min-width: 500px;
  min-height: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.2);
}
.login-form {
  margin: 0 auto;
  padding: 40px;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
