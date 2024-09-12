import baseAxios from "@/utils/axios";

export const postAccountService = async (data) => {
  try {
    const res = await baseAxios.post("/account", {
      currency: data.currency,
    });

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
