<template>
  <div class="login">
    <h3>your nodes {{ $t("login") }}</h3>
    <el-form
      class="login-form"
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      label-position="top"
    >
      <el-form-item :label="$t('email')" prop="email">
        <el-input
          v-model.trim="ruleForm.email"
          placeholder="email"
          @keydown.enter="submitForm(ruleFormRef)"
        />
      </el-form-item>
      <el-form-item :label="$t('newpassword')" prop="pass">
        <el-input
          v-model.trim="ruleForm.pass"
          placeholder="password"
          type="password"
          autocomplete="off"
          show-password="true"
          @keydown.enter="submitForm(ruleFormRef)"
        />
      </el-form-item>
      <el-form-item>
        <div class="submit" :class="{ shake: userStore.getDisabled }">
          <el-button type="primary" @click="submitForm(ruleFormRef)">{{
            $t("login")
          }}</el-button>
          <el-link type="success" href="/reguser">{{
            $t("loginmessage")
          }}</el-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { pwdRegex, pwdcheck, emailcheck } from "../utils/user";
import { useUserStore } from "../store/modules/user";

const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  pass: "",
  email: "",
});

const checkemail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the email"));
  } else {
    if (!emailcheck.test(ruleForm.email)) {
      callback(new Error("wrong email format"));
    } else {
      callback();
    }
  }
};

const validatePass = async (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (pwdRegex.test(ruleForm.pass)) {
      callback(new Error("no 中文 in password"));
    } else if (!pwdcheck.test(ruleForm.pass)) {
      callback(new Error("password must contain letters, numbers, length > 8"));
    } else if (ruleForm.pass.length > 7) {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("pass", () => null);
    } else {
      callback(new Error("Please input the password's length >= 8"));
    }
    callback();
  }
};

const rules = reactive({
  email: [{ required: true, validator: checkemail, trigger: "blur" }],
  pass: [{ required: true, validator: validatePass, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      userStore.loginByUsername(ruleForm);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
<style scoped>
.login {
  position: absolute;
  min-width: 400px;
  min-height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.2);
}
.login-form {
  margin: 0 auto;
  padding: 40px;
}
.submit {
  display: flex;
  width: 100%;
  justify-content: space-between;
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
