import api, { useAxiosInterceptors } from "@/services/api";
import { getToken } from "@/services/cookies";
import { mutate } from "swr";

export const fetcher = async (url) => {
  useAxiosInterceptors();
  const res = await api.get(url);
  return res.data;
};

export const mutateOrders = () => {
  mutate("/cart.json?include=address.state,customer,items,reseller_plan");
};

export const formatProductText = (text) => {
  const formattedtext = `${text.substring(0, 12)}...`;
  return text.length > 12 ? formattedtext : text;
};

export const fetcherInterceptors = async (url) => {
  const res = await api.get(url);

  api.interceptors.request.use(
    function (config) {
      config.headers = {
        ...config.headers,
      };

      let token = getToken();
      if (token) {
        token.replace(/['"]+/g, "");
        config.headers.Authorization = `Bearer ${token.replace(/['"]+/g, "")}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return res.data;
};

export const toS3Url = (pathname) =>
  `${
    process.env.NEXT_PUBLIC_AMAZON_S3_BASE_URL ||
    "https://printivo.s3.amazonaws.com"
  }${pathname}`;

export const toParseS3Url = (pathname) => `${JSON.parse(pathname)[0]}`;

export const toCCUrl = (pathname) =>
  "https://sp.printivo.com/api/rendering/" + pathname;

export const toProductSlug = (path) => `/product/${path}`;
export const toCategorySlug = (path) => `/category/${path}`;

export const toProductsArray = (categoriesData) => {
  return categoriesData
    ?.map((data) => {
      return [...data.products];
    })
    .flat();
};

export const CORE_API_BASE_URL = "https://printivo.com/api/";

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const getDate = (date) => {
  let dateStr = new Date(date);
  let month = dateStr.toLocaleString("default", { month: "long" });
  let day = dateStr.getDate();
  let numMonth = dateStr.getMonth() + 1;
  let year = dateStr.getFullYear();
  let time = dateStr.toLocaleTimeString();
  if (numMonth < 10) {
    numMonth = `0${numMonth}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return {
    date: `${month} ${day}, ${year}`,
    time,
    birth_date: `${year}-${numMonth}-${day}`,
  };
};

export const getInitials = (name) => {
  const initials = name
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");
  return initials;
};

export const exceptionToErrors = (error) => {
  let response = {};

  if (Array.isArray(error.errors)) {
    // paystack
    const { errors } = error;

    response = errors.reduce((result, next) => {
      if (next.field in result) {
        result[next.field].push(next.message);
      } else {
        result[next.field] = [next.message]; // eslint-disable-line no-param-reassign
      }

      return result;
    }, {});
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.errors
  ) {
    // Internal API
    const { errors } = error.response.data;

    response = Object.keys(errors).reduce((result, field) => {
      result[field] = Object.values(errors[field]); // eslint-disable-line no-param-reassign

      return result;
    }, {});
  }

  return response;
};

export const debounce = (func, wait = 5, immediate = true) => {
  let timeOut;
  return () => {
    const context = this;
    const args = arguments;
    const later = () => {
      timeOut = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeOut;
    clearTimeout(timeOut);
    timeOut = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export const _slug = (param) => {
  param = param.replace(/ /g, "-");
  param = param.toLowerCase();

  return param;
};

export const sortArrayofObjects = (array, key, order) => {
  if (order === "descending") {
    return array.sort((a, b) =>
      a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
    );
  } else {
    return array.sort((a, b) =>
      a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    );
  }
};

export const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const checkIFDateIsOlderThan30Days = (date) => {
  const date1 = new Date(date);
  const now = new Date();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const timeDiffInMs = now.getTime() - date1.getTime();
  return timeDiffInMs > thirtyDaysInMs;
};

export const checkIFDateIsNotOlderThan30DaysCategory = (category) => {
  const newProducts = [];
  const products = category.products;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const older = checkIFDateIsOlderThan30Days(product.created);
    if (!older) {
      newProducts.push(product);
    }
  }
  return newProducts.length > 0 ? true : false;
};
