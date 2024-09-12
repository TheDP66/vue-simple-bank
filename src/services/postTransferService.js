import baseAxios from "@/utils/axios";

export const postTransferService = async (data) => {
  try {
    const res = await baseAxios.post("/transfer", {
      from_account_id: data.from_account_id,
      to_account_id: data.to_account_id,
      amount: data.amount,
      currency: data.currency,
    });

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
