<script setup>
import LogoDp from "@/components/icons/LogoDp.vue";
import { useAccountStore } from "@/stores/accountStore";
import { useTransferStore } from "@/stores/transferStore";
import { useUserStore } from "@/stores/userStore";
import { deleteAllCookies } from "@/utils/cookie";
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { theme } from "ant-design-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const { useToken } = theme;
const { token } = useToken();
const userStore = useUserStore();
const accountStore = useAccountStore();
const transferStore = useTransferStore();
const router = useRouter();
const route = useRoute();

const selectedKeys2 = ref(["0"]);
const openKeys = ref(["sub1"]);
const avatarOpen = ref(false);

const layoutHeaderHeight = "64px";
const layoutFooterHeight = "64px";
const contentMinHeight = `calc(100vh - (${layoutHeaderHeight} +  ${layoutFooterHeight} + 78px))`;

const handleSingOut = () => {
  deleteAllCookies();
  userStore.clearData();
  router.replace("/login");
};

const initData = () => {
  userStore.fetchData();
  accountStore.fetchData();
  transferStore.fetchData();
  selectedKeys2.value = [route.name];
};

const onCollapse = (collapsed, type) => {
  console.log(collapsed, type);
};
const onBreakpoint = (broken) => {
  console.log(broken);
};

onMounted(initData);

watch(userStore, (state) => {}, { deep: true });
watch(accountStore, (state) => {}, { deep: true });
watch(transferStore, (state) => {}, { deep: true });
</script>

<template>
  <a-layout>
    <a-layout-header style="background-color: white">
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        "
      >
        <LogoDp />

        <a-popover
          placement="bottomRight"
          trigger="click"
          v-model:open="avatarOpen"
          :arrow="false"
        >
          <template #content>
            <div style="width: 350px">
              <div
                style="
                  display: flex;
                  align-items: center;
                  border: 1px solid lightgrey;
                  border-radius: 12px;
                  padding: 10px;
                "
              >
                <a-avatar
                  :size="46"
                  :style="{
                    backgroundColor: token.colorPrimary,
                    cursor: 'pointer',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    marginRight: '12px',
                  }"
                >
                  <template #icon><UserOutlined /></template>
                </a-avatar>

                <div>
                  <div>
                    <span style="font-weight: 600; margin-right: 5px">
                      {{ userStore.getData.full_name }}
                    </span>
                    <span style="opacity: 0.75"
                      >@{{ userStore.getData.username }}
                    </span>
                  </div>
                  <div style="opacity: 0.75; font-size: 13px">
                    {{ userStore.getData.email }}
                  </div>
                </div>
              </div>
              <a-divider style="margin: 12px 0 12px 0" />
              <div style="display: flex; justify-content: space-between">
                <a-button @click="handleSingOut">
                  <template #icon><LogoutOutlined /></template>
                  Sign out
                </a-button>
                <a-button type="primary" @click="avatarOpen = false"
                  >Cancel</a-button
                >
              </div>
            </div>
          </template>
          <a-avatar
            :size="32"
            :style="{
              backgroundColor: token.colorPrimary,
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }"
          >
            <template #icon style=""><UserOutlined /></template>
          </a-avatar>
        </a-popover>
      </div>
    </a-layout-header>

    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
        breakpoint="lg"
        collapsed-width="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
      >
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-menu-item key="home" @click="router.replace('/')">
            <HomeOutlined />
            Dashboard
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #title>
              <span>
                <user-outlined />
                subnav 1
              </span>
            </template>
            <a-menu-item key="about" @click="router.replace('/about')">
              About
            </a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
              <span>
                <laptop-outlined />
                subnav 2
              </span>
            </template>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <notification-outlined />
                subnav 3
              </span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>

      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            margin: '0',
            minHeight: contentMinHeight,
          }"
        >
          <slot>Try again later</slot>
        </a-layout-content>
        <a-layout-footer
          :style="{
            textAlign: 'center',
            height: layoutFooterHeight,
            opacity: 0.3,
          }"
        >
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped></style>
