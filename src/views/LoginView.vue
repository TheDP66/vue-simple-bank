<script setup>
import LogoDp from "@/components/icons/LogoDp.vue";
import LoginForm from "@/components/LoginForm.vue";
import { useMessageStore } from "@/stores/messageStore";
import { theme } from "ant-design-vue";
import { useRouter } from "vue-router";

const { useToken } = theme;
const { token } = useToken();
const router = useRouter();
const messageStore = useMessageStore();
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
        Welcome Back
      </div>
      <div style="font-size: 12px; opacity: 0.7">Are you ready for S-Bank?</div>
    </div>

    <a-alert
      v-if="messageStore.message"
      :message="messageStore.message"
      :type="messageStore.type"
      show-icon
      closable
      style="margin-bottom: 15px"
      @close="messageStore.clearData"
    />

    <LoginForm />

    <div style="opacity: 0.7; text-align: center">
      Don't have an account?
      <a-button type="link" @click="router.push('/register')"
        >Register</a-button
      >
    </div>
  </a-card>
</template>
