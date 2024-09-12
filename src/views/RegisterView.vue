a-button
<script setup>
import LogoDp from "@/components/icons/LogoDp.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import { theme } from "ant-design-vue";
import { useRouter } from "vue-router";

const { useToken } = theme;
const { token } = useToken();
const router = useRouter();
</script>

<template>
  <a-card hoverable style="width: 350px; cursor: default">
    <LogoDp :is-center="true" />

    <div style="margin-top: 20px; margin-bottom: 30px; text-align: center">
      <div
        :style="{
          fontSize: '21px',
          fontWeight: 500,
          color: token.colorPrimary,
        }"
      >
        Create your account
      </div>
      <div style="font-size: 12px; opacity: 0.7">
        Please enter your details to register.
      </div>
    </div>

    <RegisterForm />

    <div style="opacity: 0.7; text-align: center">
      Already have an account?
      <a-button type="link" @click="router.push('/login')">Login</a-button>
    </div>
  </a-card>
</template>
