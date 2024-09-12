import { BASE_URL_BE } from "@/constants/url";
import router from "@/router";
import axios from "axios";
import { deleteAllCookies, getCookie, setCookie } from "./cookie";

const baseAxios = axios.create({
  baseURL: BASE_URL_BE,
  withCredentials: true,
});

baseAxios.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error.response);
  }
);

baseAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401 && getCookie("refresh_token") != null) {
      try {
        const res = await axios.post(
          "token/renew_access",
          {
            refresh_token: getCookie("refresh_token"),
          },
          {
            baseURL: BASE_URL_BE,
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setCookie(
            "access_token",
            res.data.access_token,
            res.data.access_token_expires_at
          );

          baseAxios.defaults.headers.common["Authorization"] =
            res.data.access_token;

          return baseAxios(error.config);
        }
      } catch (error) {
        deleteAllCookies();
        router.replace("/login");
        return Promise.reject(erorr);
      }
    }

    return Promise.reject(error.response);
  }
);

export default baseAxios;
