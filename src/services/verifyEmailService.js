import baseAxios from "@/utils/axios";

export const verifyEmailService = async (data) => {
  try {
    const res = await baseAxios.post("/verify_email", {
      email_id: data.email_id,
      secret_code: data.secret_code,
    });

    return res.data;
  } catch (error) {
    throw error.data.error;
  }
};
