<script setup>
import router from "@/router";
import { loginService } from "@/services/loginService";
import { useUserStore } from "@/stores/userStore";
import { setCookie } from "@/utils/cookie";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";

const userStore = useUserStore();
const formState = reactive({
  password: "",
  username: "",
});
var submitting = ref(false);

const handleFinish = async (values) => {
  try {
    submitting.value = true;

    const data = {
      username: values.username,
      password: values.password,
    };

    const res = await loginService(data);

    setCookie("access_token", res.access_token, res.access_token_expires_at);
    setCookie("refresh_token", res.refresh_token, res.refresh_token_expires_at);

    userStore.setData(res.user);

    router.replace("/");
  } catch (error) {
    message.error(error);
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <a-form :model="formState" @finish="handleFinish">
    <a-form-item
      name="username"
      :rules="[{ required: true, message: 'Field is required!' }]"
      :value="formState.username"
    >
      <a-input placeholder="Username" v-model:value="formState.username">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      name="password"
      :rules="[{ required: true, message: 'Field is required!' }]"
      :value="formState.password"
    >
      <a-input-password
        placeholder="Password"
        v-model:value="formState.password"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item style="margin-top: 40px">
      <a-button
        type="primary"
        html-type="submit"
        :block="true"
        :loading="submitting"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
