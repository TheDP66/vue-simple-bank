import baseAxios from "@/utils/axios";

export const getAccountService = async (data) => {
  try {
    const res = await baseAxios.get(
      `/accounts?page_id=${data.page_id}&page_size=${data.page_size}`
    );

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
