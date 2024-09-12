import baseAxios from "@/utils/axios";

export const loginService = async (data) => {
  try {
    const res = await baseAxios.post("/user/login", {
      username: data.username,
      password: data.password,
    });

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
