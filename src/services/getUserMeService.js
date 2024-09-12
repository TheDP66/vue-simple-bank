import baseAxios from "@/utils/axios";

export const getUserMeService = async (data) => {
  try {
    const res = await baseAxios.get("/user/me");

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
