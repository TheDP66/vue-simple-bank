import { getUserMeService } from "@/services/getUserMeService";
import { message } from "ant-design-vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    email: "",
    full_name: "",
    username: "",
  }),
  actions: {
    async fetchData() {
      try {
        const res = await getUserMeService();

        this.email = res.email;
        this.username = res.username;
        this.full_name = res.full_name;
      } catch (error) {
        message.error(error);
      }
    },
    setData({ email, full_name, username }) {
      this.email = email;
      this.username = username;
      this.full_name = full_name;
    },
    clearData() {
      this.email = "";
      this.full_name = "";
      this.username = "";
    },
  },
  getters: {
    getData(state) {
      return state;
    },
  },
});
