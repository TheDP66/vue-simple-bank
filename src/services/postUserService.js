import baseAxios from "@/utils/axios";

export const postUserService = async (data) => {
  try {
    const res = await baseAxios.post("/user", {
      email: data.email,
      full_name: data.full_name,
      username: data.username,
      password: data.password,
    });

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
