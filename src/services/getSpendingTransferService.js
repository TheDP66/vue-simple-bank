import baseAxios from "@/utils/axios";

export const getSpendingTransferService = async () => {
  try {
    const res = await baseAxios.get(`/transfers/spending`);

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
