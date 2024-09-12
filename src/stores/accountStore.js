import { exchangeUsdRates } from "@/constants/exchangeRate";
import { getAccountService } from "@/services/getAccountService";
import { message } from "ant-design-vue";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    loading: false,
    accounts: [],
  }),
  actions: {
    async fetchData() {
      try {
        this.loading = true;

        const data = {
          page_id: 1,
          page_size: 10,
        };

        const res = await getAccountService(data);

        this.accounts = res;
      } catch (error) {
        message.error(error);
      } finally {
        this.loading = false;
      }
    },
    clearData() {
      this.loading = false;
      this.accounts = [];
    },
  },
  getters: {
    totalBalanceUsd(state) {
      return state.accounts.reduce((total, account) => {
        const rate = exchangeUsdRates[account.currency] || 1;
        const balanceInUSD = account.balance * rate;
        return total + balanceInUSD;
      }, 0);
    },
  },
});
