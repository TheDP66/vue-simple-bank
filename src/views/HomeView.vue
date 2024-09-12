<script setup>
import HomeAccountsCard from "@/components/HomeAccountsCard.vue";
import HomeChartCard from "@/components/HomeChartCard.vue";
import HomeTotalCard from "@/components/HomeTotalCard.vue";
import HomeTransactionsCard from "@/components/HomeTransactionsCard.vue";
import { useAccountStore } from "@/stores/accountStore";
import { useTransferStore } from "@/stores/transferStore";
import { CreditCardFilled, WalletFilled } from "@ant-design/icons-vue";

const accountStore = useAccountStore();
const transferStore = useTransferStore();
</script>

<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="8">
      <HomeAccountsCard :showModal="showModal" />
    </a-col>

    <a-col :span="16">
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <HomeTotalCard :amount="accountStore.totalBalanceUsd" title="balance">
            <template #icon>
              <WalletFilled style="color: white" />
            </template>
          </HomeTotalCard>
        </a-col>

        <a-col :span="12">
          <HomeTotalCard
            title="spending"
            :amount="transferStore.totalAllSpending"
          >
            <template #icon>
              <CreditCardFilled style="color: white" />
            </template>
          </HomeTotalCard>
        </a-col>

        <a-col :span="24">
          <HomeChartCard
            :key="transferStore.chartDataSource.length"
            :dataSource="transferStore.chartDataSource"
          />
        </a-col>
      </a-row>
    </a-col>

    <a-col :span="24">
      <HomeTransactionsCard />
    </a-col>
  </a-row>
</template>
