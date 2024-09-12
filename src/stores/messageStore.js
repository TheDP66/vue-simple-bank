import { defineStore } from "pinia";

export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    message: "",
    type: "", // success | error | warning | info
  }),
  actions: {
    setData({ message, type }) {
      this.message = message;
      this.type = type;
    },
    clearData() {
      this.message = "";
      this.type = "";
    },
  },
});
