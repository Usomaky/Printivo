import api from "@/services/api";
import React, { useContext, createContext, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher, mutateOrders } from "../utils";

const checkoutContext = createContext();

const useCheckoutData = () => {
  // TODO
  /**
   * *call session data
   * *call addresses -
   * *call states -
   * *update with user info
   */

  const [addressLoading, setAddressLoading] = useState(false);

  const { data: states, error: statesError } = useSWR(
    "/states.json?limit=100&sort=name",
    fetcher
  );
  const { data: addresses, error: addressesError } = useSWR(
    "/addresses.json?include=state&sort=created+desc&limit=100",
    fetcher
  );

  const updateOrderAddress = async (orderId, addressData) => {
    setAddressLoading(true);
    try {
      await api.put(`orders/${orderId}.json`, addressData);
      mutateOrders();
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    } finally {
      setAddressLoading(false);
    }
  };

  const addCoupon = async (couponValue, id, reset = false) => {
    try {
      const data = reset ? { coupon_id: null } : { coupon_id: couponValue };
      await api.put(`orders/${id}.json`, data);
      mutateOrders();

      localStorage.removeItem('pressone-coupon'); // Remove coupon from localStorage after applying it

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  // const addCoupon = async (e, id, reset = false) => {
  //   let data = {};
  //   if (!reset) {
  //     e.preventDefault();
  //     const formData = new FormData(e.target);
  //     const { coupon } = Object.fromEntries(formData);
  //     data.coupon_id = coupon;
  //   } else {
  //     data.coupon_id = "null";
  //   }

  //   try {
  //     await api.put(`orders/${id}.json`, data);
  //     mutateOrders();
  //     return Promise.resolve();
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // };

  return {
    states,
    addresses,
    updateOrderAddress,
    addCoupon,
    addressLoading,
  };
};

export const CheckoutProvider = ({ children }) => {
  const data = useCheckoutData();
  return (
    <checkoutContext.Provider value={data}>{children}</checkoutContext.Provider>
  );
};

export const useCheckout = () => {
  return useContext(checkoutContext);
};
