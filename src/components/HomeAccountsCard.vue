<script setup lang="ts">
import { useAccountStore } from "@/stores/accountStore";
import { currencyToString } from "@/utils/currency";
import { thousandsSeparators } from "@/utils/number";
import {
  CreditCardOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { format } from "date-fns";
import { ref } from "vue";
import HomeAccountsModal from "./HomeAccountsModal.vue";
import HomeTransferModal from "./HomeTransferModal.vue";

const openAccountsModal = ref(false);
const openTransferModal = ref(false);
const accountStore = useAccountStore();

const showAccountsModal = () => {
  openAccountsModal.value = true;
};

const handleCloseAccountsModal = () => {
  openAccountsModal.value = false;
};

const handleCloseTransferModal = () => {
  openTransferModal.value = false;
};

const handleMenuAction = ({ key }) => {
  if (key == "open-transfer") {
    openTransferModal.value = true;
  }
};
</script>

<template>
  <a-spin :spinning="accountStore.loading">
    <a-card hoverable title="Accounts" style="height: 461.51px">
      <template #extra>
        <a-dropdown-button @click="showAccountsModal">
          <template #icon>
            <EllipsisOutlined />
          </template>
          Add new
          <template #overlay>
            <a-menu @click="handleMenuAction">
              <a-menu-item key="open-transfer">
                <CreditCardOutlined />
                Transfer
              </a-menu-item>
              <a-menu-item key="2">
                <UserOutlined />
                2nd menu item
              </a-menu-item>
              <a-menu-item key="3">
                <UserOutlined />
                3rd item
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown-button>
      </template>

      <a-card
        size="small"
        style="margin-bottom: 15px"
        v-for="(account, index) in accountStore.accounts"
        :key="account.id"
      >
        <div style="display: flex; justify-content: space-between">
          <span style="font-size: 16px; font-weight: 600">
            {{ thousandsSeparators(account.balance) }}
          </span>

          <span
            style="
              opacity: 0.7;
              font-size: 12px;
              font-weight: 600;
              letter-spacing: 0.5px;
            "
          >
            ID: {{ account.id }}
          </span>
        </div>
        <div style="font-size: 13px; opacity: 0.75">
          {{ currencyToString(account.currency) }}
        </div>

        <div
          style="
            font-size: 11px;
            font-weight: 500;
            opacity: 0.5;
            margin-top: 15px;
          "
        >
          Created at: {{ format(account.created_at, "d MMMM yyyy") }}
        </div>
      </a-card>

      <a-card
        size="small"
        style="
          margin-bottom: 15px;
          height: 102px;
          justify-content: center;
          align-items: center;
          display: flex;
        "
        @click="showAccountsModal"
        v-show="accountStore.accounts.length < 3"
      >
        <span style="opacity: 0.6"> Create a new account </span>
      </a-card>
    </a-card>
  </a-spin>

  <HomeAccountsModal
    :open="openAccountsModal"
    :handle-close="handleCloseAccountsModal"
  />

  <HomeTransferModal
    :open="openTransferModal"
    :handle-close="handleCloseTransferModal"
  />
</template>
