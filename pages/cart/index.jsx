import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import CartEmpty from "@/components/svg/cart-empty";
import { useProducts, mutateOrders } from "@/hooks/useProducts";
import useWheel from "@/hooks/useWheel";
import { fetcher, toS3Url } from "@/utils/index";
import { formatSpecs, getProductById } from "@/utils/product";
import api from "@/services/api";
import useSWR from "swr";
import ImageHelper from "@/utils/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "twin.macro";

const Cart = ({ products }) => {
  const { isCollapse } = useWheel();
  const [addLoading, setAddLoading] = useState(false);
  const router = useRouter();

  const { updateCartItemQuantity, deleteFromCart, orderData, cartLoading } =
    useProducts();

  const { data: suggestions, error: suggestionsError } = useSWR(
    "/products/cart-suggestions.json",
    fetcher
  );

  let cartItems = [];
  if (orderData) {
    cartItems = orderData?.items;
  }

  const lastAdded = !!cartItems ? cartItems[cartItems.length - 1] : null;
  useEffect(() => {
    mutateOrders();
  }, []);

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto md:pt-0 pt-10">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <Link to="/all-products" className="text-gray-md">
                Products
              </Link>{" "}
              <span className="text-red-light font-sf">/ Cart</span>
            </header>

            <Search placeholder="Search for any product" />

            <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-2">
              Cart
            </h1>
            <section className="pt-5 pb-8">
              <div className="w-full">
                {!orderData || cartItems?.length === 0 ? (
                  <div className="content-container mx-auto">
                    <div className="max-w-3xl w-full mx-auto">
                      <CartEmpty />
                    </div>

                    <div className="text-center">
                      <h1 className="font-dm text-blue-dark mt-16 px-5 md:text-3xl max-w-3xl mx-auto text-2xl mb-6">
                        You have not added any of our awesome products to your
                        cart yet.
                      </h1>

                      <Link to="/all-products">
                        <button className="bg-red-light font-sf text-white px-6 py-3 rounded-sm">
                          Explore Product Page
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="md:flex justify-between">
                    <div className="c-cart__details md:mb-0 mb-14 md:mr-6">
                      <div>
                        <div className="bg-cream-md rounded-sm md:rounded-md py-2 px-4 mb-6 flex items-center justify-between">
                          <img
                            src="orderData:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 11C0 4.925 4.925 0 11 0s11 4.925 11 11-4.925 11-11 11S0 17.075 0 11z' fill='%234A945A'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.31 7.043a1 1 0 010 1.414l-6.206 6.5a1 1 0 01-1.415 0l-3-3a1 1 0 111.415-1.414l2.292 2.293 5.5-5.793a1 1 0 011.415 0z' fill='%23fff'/%3E%3C/svg%3E"
                            alt=""
                            className="md:hidden"
                          />
                          <p className="text-blue-dark font-sf font-15 md-smaller">
                            The product has been added to your cart.
                          </p>
                          <a
                            href="/checkout/information"
                            className="hidden md:block"
                          >
                            <button className="c-order__button c-order__button--green">
                              <span className="font-sf--bold">Checkout</span>
                            </button>
                          </a>
                        </div>

                        {cartItems?.map((cartProduct) => (
                          <div
                            key={cartProduct.id}
                            className={`c-cart__item mb-4 ${
                              cartLoading &&
                              "transition-opacity opacity-40 pointer-events-none"
                            }`}
                          >
                            <div className="md:flex justify-between">
                              <div className="md:max-w-md w-full mr-3 md:flex justify-between">
                                <div className="flex relative md:mb-0 mb-7">
                                  <div className="w-24 mr-4">
                                    <img
                                      src={toS3Url(
                                        getProductById(
                                          products,
                                          cartProduct.product_id
                                        )?.thumbnail_path
                                      )}
                                      alt=""
                                      className="w-full object-cover h-24 rounded-sm"
                                    />
                                  </div>

                                  <p className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
                                    {cartProduct.category_name}
                                  </p>
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartProduct.id)
                                    }
                                    className="text-red-light absolute right-0 bottom-0 md:hidden font-sf"
                                  >
                                    Delete
                                  </button>
                                </div>

                                <div className="-mt-1 flex justify-between md:block">
                                  <div>
                                    <label
                                      htmlFor="quantity"
                                      className="font-sf--reg font-15 mb-1 text-blue-md inline-block"
                                    >
                                      Quantity
                                    </label>
                                    <select
                                      name="quantity"
                                      id="quantity"
                                      className="w-11/12 h-12 indent border-brown-light input-border-brown"
                                      value={cartProduct.quantity}
                                      onChange={(e) =>
                                        updateCartItemQuantity(
                                          e.target.value,
                                          cartProduct.id
                                        )
                                      }
                                    >
                                      {getProductById(
                                        products,
                                        cartProduct.product_id
                                      ).length < 1 && (
                                        <option
                                          value={
                                            getProductById(
                                              products,
                                              cartProduct.product_id
                                            )?.minimum_quantity
                                          }
                                        >
                                          {
                                            getProductById(
                                              products,
                                              cartProduct.product_id
                                            )?.minimum_quantity
                                          }
                                        </option>
                                      )}
                                      {(getProductById(
                                          products,
                                          cartProduct.product_id
                                      )?.quotes || []).map((quote) => (
                                        <option
                                          key={quote.id}
                                          value={quote.quantity}
                                        >
                                          {quote.quantity}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <p className="font-15 mb-1 mt-1 md:hidden text-blue-dark font-sf--rreg">
                                      Price
                                    </p>
                                    <h1 className="font-sf--bold text-2xl md:hidden text-blue-dark">
                                      ₦{cartProduct.amount.toLocaleString()}
                                    </h1>
                                  </div>
                                </div>
                              </div>

                              <div className="md:max-w-xs md:w-7/12 md:ml-5 hidden md:block">
                                <div className="price">
                                  <p className="font-15 mb-1 text-blue-dark font-sf--rreg">
                                    Price
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <h1 className="font-sf--bold text-2xl text-blue-dark">
                                    ₦{cartProduct.amount.toLocaleString()}
                                  </h1>
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartProduct.id)
                                    }
                                    className="text-red-light font-sf"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div
                              className="mt-5 md-max-w-none mb-10"
                              tw="max-width[400px]"
                            >
                              <div className="mb-5 mb:mb-0">
                                <h3 className="font-sf--bold mb-2 text-blue-dark text-sm">
                                  Product Specifications
                                </h3>
                              </div>

                              <div className="spec flex justify-between items-center mb-2">
                                <p className="font-sf--bold text-sm text-blue-md">
                                  Design
                                </p>
                                <p
                                  className="font-sf text-sm text-blue-sky capitalize w-full"
                                  tw="max-width[200px]"
                                >
                                  {cartProduct.name}
                                </p>
                              </div>

                              {formatSpecs(cartProduct.add_ons).map(
                                (spec, i) => (
                                  <div
                                    key={i}
                                    className="spec flex justify-between items-center mb-2"
                                  >
                                    <div>
                                      <p className="font-sf--bold text-sm text-blue-md">
                                        {spec.name}
                                      </p>
                                    </div>
                                    {cartProduct.is_tshirt ? (
                                      <div tw="max-width[200px] w-full">
                                        <p className="font-sf text-sm text-blue-md capitalize">
                                          {cartProduct.add_ons_summary}
                                        </p>
                                      </div>
                                    ) : (
                                      <div tw="max-width[200px] w-full">
                                        {spec.options.map((option, i) => (
                                          <div key={i}>
                                            <p className="font-sf text-sm text-blue-md capitalize">
                                              {option.name}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                            <hr className="border-cream-md border-t-2" />
                          </div>
                        ))}
                        {/* cart item end */}
                        <Link to="/all-products">
                          <button className="px-6 bg-white c-cart-add text-blue-md font-sf--bold py-3 block ml-auto">
                            Add more Products
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="c-cart__other">
                      <div className="bg-cream-md px-4 py-3 font-sf text-sm text-blue-dark">
                        Instantly add these products to your cart
                      </div>
                      <div
                        className={`p-5 transition-opacity ${
                          addLoading && "pointer-events-none opacity-30"
                        }`}
                      >
                        {suggestions?.map((product, i) => (
                          <div className="other-item">
                            <div className="flex mt-3 mb-2">
                              <div className="w-20 mr-4">
                                <img
                                  src={`${ImageHelper.getCloudinaryUrlFromS3Path(
                                    product.thumbnail_path
                                  )}`}
                                  alt=""
                                  className="w-full object-cover h-20 rounded-sm"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
                                  {product.name}
                                </p>
                                <div className="flex items-center mt-auto">
                                  <div className="font-sf--bold md:text-lg text-blue-dark">
                                    ₦{product.minimum_price.toLocaleString()}
                                  </div>
                                  <button
                                    onClick={() =>
                                      router.push(`/designs/${product?.slug}`)
                                    }
                                    className="border-red ml-auto text-red-light hover:bg-red-light hover:text-white transition-colors font-sf rounded-sm bg-transparent md:px-5 px-3 py-2 text-sm"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                            <hr className="border-cream-md border-t-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>

          <footer
            className={`c-footer--fixed c-cart__footer ${
              isCollapse ? "collapse" : ""
            } fixed bottom-0 left-0 right-0 z-10`}
          >
            {cartItems.length > 0 && (
              <div className="inner-footer content-container mx-auto flex justify-between py-4 md:py-7">
                <div className="f-product-details md:flex mr-6 md:mr-0 max-w-xs md:max-w-md w-full justify-between">
                  <div className="flex">
                    <img
                      src={toS3Url(
                        getProductById(products, lastAdded?.product_id)
                          ?.thumbnail_path
                      )}
                      alt=""
                      className="object-cover w-12 h-12 hidden md:block mr-4"
                    />
                    <div>
                      <h3 className="font-sf md:text-base text-blue-dark mb-1 text-sm">
                        {lastAdded?.category_name}
                      </h3>
                      <div className="flex flex-wrap max-w-2xs">
                        {formatSpecs(lastAdded?.add_ons)?.map((spec) => (
                          <div key={spec.name}>
                            {spec.options.map((option) => (
                              <div key={option.name}>
                                <p className="font-sf text-sm hidden md:block mb-1 text-blue-md mr-1">
                                  {option.name} |
                                </p>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sf md:text-base text-blue-dark mb-1 text-sm">
                      Quantity
                    </h3>
                    <p className="font-sf text-xs mb-1 text-blue-md">
                      {lastAdded?.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-sf text-blue-dark md:block hidden">
                  {cartItems?.length - 1} other items in cart
                </p>
                <div>
                  <div className="f-order md:flex">
                    <div className="price mr-5">
                      <p className="text-xs mb-1 text-gray-sub font-sf">
                        Subtotal
                      </p>
                      <h1 className="font-sf--bold text-2xl md:text-3xl text-blue-dark">
                        ₦{orderData?.amount_before_tax.toLocaleString()}
                      </h1>
                    </div>
                    <a href="/checkout/information" className="mt-auto">
                      <button className="c-order__button c-order__button--green">
                        <span className="font-sf--bold">Checkout</span>
                      </button>
                    </a>
                  </div>
                  <div className="mt-1">
                    <p className="text-xs text-gray-sub font-sf">Tax</p>
                    <p className="mb-1 text-blue-dark font-sf">
                      ₦{orderData?.local_tax.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </footer>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default Cart;

export const getStaticProps = async () => {
  const response = await api.get(
    "/products.json?vendor_id=1&include=products&active=1&products$active=1&limit=1000&sort[name]=asc&include=quotes"
  );

  const products = response.data.data;

  return {
    props: {
      products,
    },
  };
};
