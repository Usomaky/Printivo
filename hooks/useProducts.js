import { fetcher } from "@/utils/index";
import { useState, useContext, createContext } from "react";
import { specsToObject } from "@/utils/product";
import useSWR, { mutate } from "swr";
import api from "@/services/api";

const productContext = createContext();

export const mutateOrders = () => {
  mutate("/cart.json?include=address.state,customer,items,reseller_plan");
};

const useProductData = () => {
  const { data: categoriesData = [], error } = useSWR(
    "/categories.json?vendor_id=1&include=products&active=1&products$active=1&limit=100&sort[name]=asc",
    fetcher
  );

  const { data: orderData, error: orderError } = useSWR(
    "/cart.json?include=address.state,customer,items,reseller_plan",
    fetcher
  );

  /**
   * Current product will contain;
   * * name,
   * * id,
   * * cost
   * * quantity
   * * specs
   * * shippingType,
   * * upload url,
   * * item_type: design-request, custom-upload, direct, cc,
   * * product object
   */

  const [currentProduct, setCurrentProduct] = useState({});
  const [cartLoading, setCartLoading] = useState(false);

  let cartData = [];
  if (orderData) {
    cartData = orderData?.items;
  }

  const changeProductQuantity = (quantity) => {
    const { price } = currentProduct.product.quotes.find(
      (quote) => quote.quantity === +quantity
    );

    updateCurrentProduct({
      ...currentProduct,
      quantity,
      cost: price,
    });
  };

  const updateCurrentProduct = (productDetails) => {
    setCurrentProduct(productDetails);
  };

  const addToCart = async (product, direct = null) => {
    let cartApiData;
    if (direct) {
      cartApiData = {
        full_name: "",
        backend: 0,
        phone_number: "",
        items: [
          {
            vendor_id: product.product?.vendor_id || null,
            product_id: product.id,
            quantity: product.quantity,
            price: product.cost,
            add_ons: product.add_ons,
            state_file_name: product.state_file_name,
            amount: product.cost,
            is_design_request: false,
            design_id: product.design_id,
            name: product.name,
            category_name: null,
            add_ons_amount: 0,
            order_status: "in-cart",
            item_type: "direct",
            files: {},
            page_1_preview: direct ? product.page_1_preview : null,
            note: "",
          },
        ],
      };
    } else {
      const addOns = product.specs
        ? specsToObject(product.specs, product.product.is_tshirt ? true : false)
        : null;
      cartApiData = {
        full_name: "",
        backend: 0,
        phone_number: "",
        items: [
          {
            vendor_id: product.product?.vendor_id || null,
            product_id: product.id,
            quantity: product.quantity,
            price: product.cost,
            add_ons: { ...addOns },
            state_file_name: null,
            amount: product.cost,
            is_design_request: product.item_type === "design-request",
            name: product.name,
            category_name: null,
            add_ons_amount: 0,
            order_status: "in-cart",
            item_type: product.item_type,
            files: product.uploadUrl || null,
            note: product.requestNote || "",
            is_custom_upload: product.item_type === "custom_upload",
          },
        ],
      };
    }

    if (cartData.length === 0) {
      setCartLoading(true);
      try {
        await api.post("/orders.json", cartApiData);
        mutateOrders();
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      } finally {
        setCartLoading(false);
      }
    } else {
      setCartLoading(true);

      try {
        await api.patch(`orders/${orderData.id}.json`, cartApiData);
        mutateOrders();
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      } finally {
        setCartLoading(false);
      }
    }
  };

  const deleteFromCart = async (id) => {
    try {
      setCartLoading(true);
      await api.delete(`/order-items/${id}.json`);
      mutateOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  const updateCartItemQuantity = async (quantity, id) => {
    const payload = {
      quantity,
    };
    try {
      setCartLoading(true);
      await api.patch(`/order-items/${id}.json`, payload);
      mutateOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  return {
    categoriesData,
    error,
    loading: !categoriesData,
    currentProduct,
    updateCurrentProduct,
    changeProductQuantity,
    cartData,
    addToCart,
    deleteFromCart,
    updateCartItemQuantity,
    orderData,
    cartLoading,
    setCartLoading,
  };
};

export const ProductProvider = ({ children }) => {
  const data = useProductData();
  return (
    <productContext.Provider value={data}>{children}</productContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(productContext);
};
