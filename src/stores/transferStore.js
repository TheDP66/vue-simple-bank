import { exchangeUsdRates } from "@/constants/exchangeRate";
import { getReceiveTransferService } from "@/services/getReceiveTransferService";
import { getSpendingTransferService } from "@/services/getSpendingTransferService";
import { getTransfersByUsername } from "@/services/getTransfersByUsername";
import { message } from "ant-design-vue";
import { defineStore } from "pinia";

export const useTransferStore = defineStore("transferStore", {
  state: () => ({
    loading: false,
    list: [],
    receive: [],
    spending: [],
  }),
  actions: {
    async fetchData() {
      try {
        this.loading = true;

        const promises = Promise.all([
          getReceiveTransferService(),
          getSpendingTransferService(),
          getTransfersByUsername(),
        ]);
        const res = await promises;

        this.receive = res[0];
        this.spending = res[1];
        this.list = res[2];
      } catch (error) {
        message.error(error);
      } finally {
        this.loading = false;
      }
    },
    clearData() {
      this.loading = false;
      this.receive = [];
      this.spending = [];
      this.list = [];
    },
  },
  getters: {
    chartDataSource(state) {
      const chart = [
        ...state.spending.map((e) => {
          const rate = exchangeUsdRates[e.currency] || 1;
          const spendingInUSD = e.amount * rate;

          return { ...e, amount: spendingInUSD, type: "Spending" };
        }),
        ...state.receive.map((e) => {
          const rate = exchangeUsdRates[e.currency] || 1;
          const spendingInUSD = e.amount * rate;

          return { ...e, amount: spendingInUSD, type: "Receive" };
        }),
      ].sort((a, b) => a.id - b.id);

      return chart;
    },
    totalAllReceive(state) {
      return state.receive.reduce((total, transfer) => {
        const rate = exchangeUsdRates[transfer.currency] || 1;
        const spendingInUSD = transfer.amount * rate;
        return total + spendingInUSD;
      }, 0);
    },
    totalAllSpending(state) {
      return state.spending.reduce((total, transfer) => {
        const rate = exchangeUsdRates[transfer.currency] || 1;
        const spendingInUSD = transfer.amount * rate;
        return total + spendingInUSD;
      }, 0);
    },
  },
});
