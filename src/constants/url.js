const env = import.meta.env.VITE_APP_NODE_ENV;

const url = {
  development: {
    BASE_URL_BE: "http://localhost:8080",
    BASE_URL_FE: "http://localhost:5173",
  },
  trial: {
    BASE_URL_BE: "http://localhost:8080",
    BASE_URL_FE: "http://localhost:5173",
  },
  production: {
    BASE_URL_BE: "http://localhost:8080",
    BASE_URL_FE: "http://localhost:5173",
  },
};

export const BASE_URL_BE = url[env].BASE_URL_BE;
export const BASE_URL_FE = url[env].BASE_URL_FE;
