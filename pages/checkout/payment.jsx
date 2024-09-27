import PaymentPaystack from "@/components/checkout/paymentPaystack";
import { useCheckout } from "@/hooks/useCheckout";
import { useProducts } from "@/hooks/useProducts";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";

const CheckoutPayment = () => {
  const { orderData } = useProducts();
  const { addCoupon } = useCheckout();
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState(false);


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
              <div className="c-checkout__info maw-600">
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-sf--bold mb-1 text-blue-dark text-lg">
                      Customer Information
                    </h3>
                  </div>

                  <hr className="border-cream-md border-t-1" />
                  <div className="py-6 max-w-sm px-4 mt-3 border-cream bg-pastel-brown">
                    <div>
                      <h3 className="text-blue-dark font-sf mb-1 text-base">
                        {orderData?.customer?.full_name ||
                          orderData?.address?.name}
                      </h3>
                      <p className="text-blue-md font-sf--reg mb-1 text-sm">
                        {orderData?.customer?.email || orderData?.email_address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <h3 className="font-sf--bold mb-1 text-blue-dark text-lg">
                      Shipping Information
                    </h3>
                  </div>

                  <hr className="border-cream-md border-t-1" />
                  <div className="py-6 max-w-sm px-4 mt-3 border-cream bg-pastel-brown">
                    <div>
                      <h3 className="text-blue-dark font-sf mb-1 text-base">
                        {orderData?.customer?.full_name}
                      </h3>
                      <p className="text-blue-md font-sf--reg mb-1 text-sm">
                        {orderData?.address?.line_one}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-sf--bold mb-1 text-blue-dark text-lg">
                    Payment
                  </h3>

                  <hr className="border-cream-md border-t-1" />
                  {/* */}
                  <PaymentPaystack
                    order={orderData}
                    amount={orderData?.amount}
                    customer={orderData?.customer}
                  />
                  {/* */}
                </div>
                {/* */}
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
                    <div className="flex items-center text-blue-dark mt-3 justify-between">
                      <p className="font-sf--bold">Total</p>
                      <p className="font-sf--bold">
                        ₦{orderData?.amount.toLocaleString()}
                      </p>
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

                  {!user?.user?.reseller_request_id && !orderData?.coupon_id && orderData && (
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

export default CheckoutPayment;
