import baseAxios from "@/utils/axios";

export const getReceiveTransferService = async () => {
  try {
    const res = await baseAxios.get(`/transfers/receive`);

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
