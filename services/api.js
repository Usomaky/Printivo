import axios from "axios";
import { getToken } from "./cookies";

const environment = process.env.NODE_ENV;

const api = axios.create({
  baseURL:
    environment === "development"
      ? "https://printivo.com/api"
      : // ? "https://beta.printivo.com/api"
        "https://printivo.com/api",
});

api.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    if (error?.response?.status == 400) {
      console.log(error.response);
      throw error.response;
    }

    return Promise.reject(error);
  }
);

export default api;

export const useAxiosInterceptors = () => {
  api.interceptors.request.use(function (config) {
    config.headers = {
      ...config.headers,
      "Accept": "application/json"
    };

    let visitorID = localStorage.getItem("visitor_id");
    const token = getToken();
    if (visitorID) {
      config.headers["Visitor-ID"] = visitorID;
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });
};

