import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import NewAddress from "@/components/checkout/new-address";
import ExistingAddress from "@/components/checkout/existing-address";
import { useUser } from "@/hooks/useUser";
import { useCheckout } from "@/hooks/useCheckout";
import { useProducts } from "@/hooks/useProducts";
import Loader from "@/components/states/Loader";

const CheckoutInfo = () => {
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isPickUp, setIsPickUp] = useState(false);
  const { addresses, updateOrderAddress, addCoupon, addressLoading } =
    useCheckout();
  const { orderData } = useProducts();
  const [errorMessage, setErrorMessage] = useState(false);

  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsNewAddress(false);
    } else {
      setIsNewAddress(true);
    }
  }, [user]);

  let filteredAddresses = [];
  let pickUpAddresses = [];

  if (addresses) {
    filteredAddresses = addresses.data
      .filter((address) => !address.is_pickup)
      .filter((address) => address.line_one !== "Random Street");
    pickUpAddresses = addresses.data.filter((address) => address.is_pickup);
  }

  useEffect(() => {
    filteredAddresses.length === 0 && setIsNewAddress(true);
  }, [addresses]);

  const changeAddress = async (id, currentAddress) => {
    try {
      await updateOrderAddress(orderData?.id, { address_id: id });
    } catch (error) {
      console.log(error);
    }
  };

  const onPickupChange = (id) => {
    setIsPickUp(true);
    changeAddress(id);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const additionalCheckoutData = {
      bank: "",
      checkout_step: "shipping",
      is_pickup: false,
      member_id: orderData?.member_id,
      payment_option: "paystack",
      referral_code: "",
      reseller_id: "",
      use_new_address: true,
    };

    if (isNewAddress) {
      if (!isPickUp) {
        const formData = new FormData(e.target);
        const addressData = Object.fromEntries(formData);

        const address = {
          id: "",
          last_name: addressData.firstName,
          first_name: addressData.lastName,
          phone_number: addressData.phoneNumber,
          line_one: addressData.address1,
          line_two: addressData.address2,
          city: addressData.city,
          state_id: addressData.state,
          state: null,
          country: "Nigeria",
          name: `${addressData.lastName} ${addressData.firstName}`,
        };

        const submitData = {
          email_address: addressData.email,
          address,
          ...additionalCheckoutData,
        };

        try {
          await updateOrderAddress(orderData?.id, submitData);
          router.push("/checkout/payment");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const otherInfo = {
        ...additionalCheckoutData,
      };
      try {
        await updateOrderAddress(orderData?.id, otherInfo);
        router.push("/checkout/payment");
      } catch (error) {
        console.log(error);
      }
    }

    if (isPickUp) {
      const formData = new FormData(e.target);
      const addressData = Object.fromEntries(formData);
      const pickupData = {
        ...additionalCheckoutData,
        is_pickup: true,
        email_address: addressData.email,
        address: {
          last_name: addressData.firstName,
          first_name: addressData.lastName,
          phone_number: addressData.phoneNumber,
          line_one: orderData.address.line_one,
          line_two: orderData.address.line_two,
          city: orderData.address.city,
          state_id: orderData.address.state.id,
          state: null,
          country: orderData.address.country,
          name: `${addressData.lastName} ${addressData.firstName}`,
        },
      };

      try {
        await updateOrderAddress(orderData?.id, pickupData);
        router.push("/checkout/payment");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmitCoupon = async (e) => {
    e.preventDefault();
    try {
      // Check if orderData is available before attempting to addCoupon
      if (orderData) {
        await addCoupon(coupon, orderData.id);
      } else {
        console.error('Invalid order data:', orderData);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(true);
    }
  };
  
  
  

  const resetCoupon = async () => {
    try {
      await addCoupon(null, orderData?.id, true);
    } catch (error) {
      console.log(error);
    }
  };

  // Get PressOne Coupon from Local Storage
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const getCouponFromLocalStorage = () => {
      const storedCoupon = localStorage.getItem('pressone-coupon');
      if (orderData && storedCoupon) {
        setCoupon(storedCoupon);
        handleSubmitCoupon({ preventDefault: () => {} });
      }
    };
  
    getCouponFromLocalStorage();
  }, [orderData, handleSubmitCoupon]);
  



  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <Link to="/cart" className="text-gray-md">
                Cart
              </Link>{" "}
              <span className="text-red-light font-sf">/ checkout</span>
            </header>

            <Search placeholder="Search for any product" />

            <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-3">
              Checkout
            </h1>

            <section className="pt-2 md:flex justify-between c-checkout">
              <div className="c-checkout__info">
                <h3 className="font-sf--bold mb-1 text-blue-dark text-lg">
                  Customer Information
                </h3>

                <hr className="border-cream-md border-t-1 maw-600" />
                <form onSubmit={onSubmit} className="py-4" id="addressform">
                  {isNewAddress && (
                    <NewAddress
                      orderData={orderData}
                      pickup={pickUpAddresses}
                      onPickupChange={onPickupChange}
                      setIsPickUp={setIsPickUp}
                      changeAddress={changeAddress} //This to help users select Lagos Office as default when self pickup is selected
                    />
                  )}
                  {!isNewAddress && (
                    <ExistingAddress
                      setIsNewAddress={setIsNewAddress}
                      orderData={orderData}
                      filteredAddresses={filteredAddresses}
                      changeAddress={changeAddress}
                      pickup={pickUpAddresses}
                      onPickupChange={onPickupChange}
                      setIsPickUp={setIsPickUp}
                    />
                  )}
                </form>
              </div>
              <div className="c-checkout__summary md:mt-0 mt-6 md:ml-5">
                <div className="sticky top-20">
                  <div className="input-border-brown table w-full py-6 px-5">
                    <h5 className="font-sf--bolder mb-3 text-blue-dark text-sm">
                      Order Summary
                    </h5>
                    <div className="order-details">
                      <div className="flex items-center text-blue-dark text-sm mb-3 justify-between">
                        <p className="font-sf--bold">Items</p>
                        <p className="font-sf font-13">
                          {orderData?.item_count}
                        </p>
                      </div>
                      <div className="flex items-center text-blue-dark text-sm mb-3 justify-between">
                        <p className="font-sf--bold">Sub Total</p>
                        <p className="font-sf font-13">
                          ₦{orderData?.amount_before_tax.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center text-blue-dark text-sm mb-3 justify-between">
                        <p className="font-sf--bold">Shipping</p>
                        <p className="font-sf font-13">
                          ₦{orderData?.local_delivery_charge.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center text-blue-dark text-sm mb-3 justify-between">
                        <p className="font-sf--bold">Tax</p>
                        <p className="font-sf font-13">
                          ₦{orderData?.local_tax.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <hr className="border-blue-dark border-t-2" />
                    <div className="flex items-center text-blue-dark my-3 justify-between">
                      <p className="font-sf--bold">Total</p>
                      <p className="font-sf--bold">
                        ₦{orderData?.amount.toLocaleString()}
                      </p>
                    </div>

                    <div className="mx-auto text-center">
                      <button
                        className="btn-link flex justify-center mx-auto px-6 py-3 w-full mt-3 font-15 rounded-sm bg-green-dark font-sf text-white"
                        form="addressform"
                        type="submit"
                        disabled={addressLoading}
                      >
                        <span>Proceed</span>
                        {addressLoading && <Loader />}
                      </button>
                    </div>
                  </div>
                  {orderData?.coupon_id && (
                    <div className="text-blue-dark font-sans mt-5 text-base">
                      <p>
                        <b>{orderData.coupon_id}</b> has been applied to your
                        order!.
                      </p>
                      <p>
                        Your order now costs <b>₦{orderData.coupon_value.toLocaleString()}</b>{" "}
                        less.
                      </p>
                      <button
                        className="text-blue-sky bg-transparent no-outline mt-3"
                        onClick={resetCoupon}
                      >
                        Use a different promo code.
                      </button>
                    </div>
                  )}
                  {!user?.user?.reseller_request_id &&
                    !orderData?.coupon_id && orderData && (
                      <div className="w-full mt-4">
                        <form
                          className="w-full"
                          onSubmit={handleSubmitCoupon}
                        >
                          <label
                            htmlFor="coupon"
                            className="block font-sf--reg mb-2 text-blue-dark"
                          >
                            Got a promo code?
                          </label>

                          {errorMessage && (
                            <p className="text-xs font-sans text-red-600 my-1">
                              That promo code is invalid.
                            </p>
                          )}

                          <input
                            type="text"
                            name="coupon"
                            id="coupon"
                            required
                            value={coupon}
                            className="input-border-brown font-15 w-full indent outline font-sf--reg text-blue-dark h-11"
                            onChange={(e) => {
                              setCoupon(e.target.value);
                              setErrorMessage(false);
                            }}
                          />

                          <button
                            className="bg-red-light mt-3 ml-auto block text-white font-sf py-2 text-sm px-6"
                            type="submit"
                          >
                            Apply
                          </button>
                        </form>
                      </div>
                    )}
                </div>
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default CheckoutInfo;
