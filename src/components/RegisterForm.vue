<script setup>
import { postUserService } from "@/services/postUserService";
import {
  IdcardOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { message, notification } from "ant-design-vue";
import { reactive, ref } from "vue";

const [api, contextHolder] = notification.useNotification();
const formState = reactive({
  email: "",
  full_name: "",
  password: "",
  username: "",
});
var submitting = ref(false);

const handleFinish = async (values) => {
  try {
    submitting.value = true;
    const email = formState.email;

    const data = {
      email: values.email,
      full_name: values.full_name,
      username: values.username,
      password: values.password,
    };

    await postUserService(data);

    formState.email = "";
    formState.full_name = "";
    formState.password = "";
    formState.username = "";

    api.info({
      message: `Verify your email`,
      placement: "topRight",
      description: `We've sent an email to ${email} to verify your email address and activate yoiur account.`,
      duration: 10,
    });
  } catch (error) {
    message.error(error);
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <contextHolder />

  <a-form :model="formState" @finish="handleFinish">
    <a-form-item
      name="full_name"
      :rules="[{ required: true, message: 'Field is required!' }]"
      :value="formState.full_name"
    >
      <a-input placeholder="Full name" v-model:value="formState.full_name">
        <template #prefix>
          <IdcardOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      name="email"
      :rules="[
        { required: true, message: 'Field is required!' },
        { type: 'email', message: 'Wrong email format!' },
      ]"
      :value="formState.email"
    >
      <a-input placeholder="Email" v-model:value="formState.email">
        <template #prefix>
          <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>

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
        Register
      </a-button>
    </a-form-item>
  </a-form>
</template>
