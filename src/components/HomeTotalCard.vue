<script setup>
import { useTransferStore } from "@/stores/transferStore";
import { thousandsSeparators } from "@/utils/number";
import { theme } from "ant-design-vue";

const props = defineProps(["title", "amount"]);

const { useToken } = theme;
const { token } = useToken();
const transferStore = useTransferStore();
</script>

<template>
  <a-spin :spinning="transferStore.loading">
    <a-card hoverable size="small">
      <div
        :style="{
          width: '30px',
          height: '30px',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '3px',
          backgroundColor: token.colorPrimary,
          marginBottom: '15px',
        }"
      >
        <slot name="icon"></slot>
      </div>
      <div style="font-size: 12px; opacity: 0.75; margin-bottom: 1px">
        Total {{ props.title }}
      </div>
      <div style="font-size: 24px; font-weight: 500">
        ${{ thousandsSeparators(props.amount ?? 0) }}
      </div>
    </a-card>
  </a-spin>
</template>
