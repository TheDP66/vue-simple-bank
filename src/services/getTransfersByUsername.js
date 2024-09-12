import baseAxios from "@/utils/axios";

export const getTransfersByUsername = async (data) => {
  try {
    const res = await baseAxios.get("/transfers");

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
