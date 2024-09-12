<script setup>
import LogoDp from "@/components/icons/LogoDp.vue";
import router from "@/router";
import { verifyEmailService } from "@/services/verifyEmailService";
import { useMessageStore } from "@/stores/messageStore";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { message, theme } from "ant-design-vue";
import { h, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const { useToken } = theme;
const { token } = useToken();
const route = useRoute();
const messageStore = useMessageStore();

const verifyState = ref("loading"); // loading | success | error
const query = route.query;

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "64px",
  },
  spin: true,
});

const handleVerifyEmail = async () => {
  if (
    query.email_id == "" ||
    query.email_id == undefined ||
    query.secret_code == "" ||
    query.secret_code == undefined
  ) {
    messageStore.setData({
      message: "Verifying failed!",
      type: "error",
    });
    router.replace("/login");
  }

  try {
    verifyState.value = "loading";

    const data = {
      email_id: parseInt(query.email_id),
      secret_code: query.secret_code,
    };

    await verifyEmailService(data);

    verifyState.value = "success";
    messageStore.setData({
      message: "Email verified, please login.",
      type: "success",
    });

    setTimeout(() => router.push({ path: "/" }), 2000);
  } catch (error) {
    verifyState.value = "error";
    message.error(error);

    setTimeout(() => router.push({ path: "/login" }), 2000);
  }
};

onMounted(handleVerifyEmail);
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
        Verifying...
      </div>
      <div style="font-size: 12px; opacity: 0.7; margin-bottom: 50px">
        This may take a few seconds
      </div>

      <a-spin v-if="verifyState == 'loading'" :indicator="indicator" />
      <CheckCircleFilled
        v-else-if="verifyState == 'success'"
        style="color: #52c41a; font-size: 64px"
      />
      <CloseCircleFilled
        v-else-if="verifyState == 'error'"
        style="color: red; font-size: 64px"
      />
    </div>
  </a-card>
</template>
