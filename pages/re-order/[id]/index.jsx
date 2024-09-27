import { useEffect, useState } from "react";
import Link from "@/components/link";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Search from "@/components/global/search";
import { useProducts } from "@/hooks/useProducts";
import FaqAccordion from "@/components/product/faqaccordion";
import api from "@/services/api";
import { toS3Url } from "@/utils/index";
import { formatSpecs, setActiveSpecs, specsToObject } from "@/utils/product";
import { useRouter } from "next/router";
import ImageHelper from "@/utils/image";
import "twin.macro";
import NotFound from "@/components/404";
import Loader from "@/components/states/Loader";

const ReOrderItem = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [orderItem, setOrderItem] = useState({});
  const [currentQuantity, setCurrentQuantity] = useState(null);
  const [currentCost, setCurrentCost] = useState(
    orderItem?.product?.minimum_price
  );
  const [currentSpecs, setCurrentSpecs] = useState([]);
  const [pageError, setPageError] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useRouter().query;
  const router = useRouter();

  const setInitialActiveSpecs = (add_ons, add_on_set) => {
    const specs = Array.isArray(add_on_set)
      ? []
      : formatSpecs(add_on_set, "product");
    const optionSelected = (spec) => {
      const options = [];
      spec.options.map((option) => {
        if (Array.isArray(add_ons)) {
          options.push({ ...option, selected: false });
        } else {
          for (let key in add_ons) {
            if (spec.name === key) {
              add_ons[key].forEach((add_on) => {
                if (add_on.name === option.name) {
                  options.push({ ...option, selected: true });
                } else {
                  options.push({ ...option, selected: false });
                }
              });
            }
          }
        }
      });
      return options;
    };
    const newSpecs = specs.map((spec) => {
      return {
        ...spec,
        options: optionSelected(spec),
      };
    });
    newSpecs.forEach((spec, index) => {
      if (spec.options.length === 0) {
        specs.forEach((fullSpec) => {
          if (fullSpec.name === spec.name) {
            const options = [];
            fullSpec.options.forEach((option) => {
              options.push({ ...option, selected: false });
            });
            newSpecs[index] = {
              ...fullSpec,
              options,
            };
          }
        });
      }
    });
    setCurrentSpecs(newSpecs);
  };
  const hasShipping = currentSpecs.find((spec) => spec.name === "Shipping");
  const hasOtherSpecs = currentSpecs.find((spec) => spec.name !== "Shipping");
  const getItemDetails = async (id) => {
    try {
      const response = await api.get(
        `/order-items/${id}.json?include=product.quotes`
      );
      setOrderItem(response.data);
      setInitialActiveSpecs(
        response.data.add_ons,
        response.data.product.add_on_set
      );
      setCurrentQuantity(response.data.quantity);

      setCurrentCost(response.data.price);
    } catch (error) {
      setPageError(true); //Would have check for the status code to determine if it's 404 but I can't get access to the error response
    }
  };
  useEffect(async () => {
    if (id) {
      await getItemDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (hasOtherSpecs || hasShipping) {
      const currentQuote = orderItem?.product?.quotes?.find(
        (quote) => quote.quantity === +currentQuantity
      );

      const specObject = specsToObject(currentSpecs);
      const formattedAddOns = formatSpecs(currentQuote?.add_ons);
      let specCosts = 0;

      for (const key in specObject) {
        const element =
          specObject[key].length < 1 ? "" : specObject[key][0].name;
        formattedAddOns.map((addon) => {
          addon.options.forEach((option) => {
            if (option.name === element) {
              specCosts += +option.price;
            }
          });
        });
      }

      setCurrentCost(currentQuote?.price + specCosts);
    }
  }, [currentSpecs, currentQuantity]);

  const handleSpecsChange = (index, specTitle) => {
    setCurrentSpecs(setActiveSpecs(currentSpecs, index, specTitle));
  };
  const setTotalCost = (e) => {
    const value = e.target.value;
    setCurrentQuantity(value);
    const selectedQuote = orderItem?.product?.quotes?.find(
      (quote) => quote.quantity === +value
    );
    setCurrentCost(selectedQuote.price);
  };

  const handleNoteOnchange = (e) => {
    setNote(e.target.value);
  };

  const orderAgainHandler = async () => {
    setLoading(true);
    const data = {
      quantity: currentQuantity,
      note: note,
    };
    const selectedQuote = orderItem?.product?.quotes?.find(
      (quote) => quote.quantity === +currentQuantity
    );

    const formattedAddons = Array.isArray(selectedQuote?.add_ons)
      ? []
      : formatSpecs(selectedQuote.add_ons);
    const add_ons = {};
    formattedAddons.forEach((add_on) => {
      currentSpecs.forEach((spec) => {
        if (add_on.name === spec.name) {
          add_ons[add_on.name] = [];
          spec.options.forEach((specOption) => {
            if (specOption.selected) {
              add_on.options.forEach((addOnOption) => {
                if (specOption.name === addOnOption.name) {
                  add_ons[add_on.name].push(addOnOption);
                }
              });
            }
          });
        }
      });
    });
    data.add_ons = { ...add_ons };
    try {
      const response = await api.post(`/order-items/${id}/reorder.json`, data);
      router.push("/cart");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (pageError) {
    return <NotFound />;
  }
  return (
    <div>
      <Layout customHead={true}>
        <div className="m-product mt-44 md:mt-20 pt-4 md:pt-0">
          <div className="content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <Link to="/all-products" className="text-gray-md">
                All Products /{" "}
              </Link>{" "}
              <span className="text-red-light font-sf">{orderItem?.name}</span>
            </header>

            <Search placeholder="Search for any product" />

            <section className="c-product-showcase mt-8">
              <h1 className="font-dm md:hidden text-blue-dark md:text-3xl text-2xl mb-2">
                {orderItem?.name}
              </h1>
              <div className="showcase-details grid">
                <div>
                  <img
                    src={
                      orderItem?.preview_paths?.length &&
                      orderItem?.preview_paths[activeImage]
                    }
                    alt=""
                    className={`main-image ${
                      orderItem?.is_tshirt ? "object-contain" : "object-cover"
                    }`}
                  />

                  {orderItem?.preview_paths?.length && (
                    <div className={`toggle-images mt-4 max-w-md flex`}>
                      {orderItem?.preview_paths?.map((link, i) => (
                        <button
                          key={i}
                          className={`rounded-sm cursor-pointer mr-2 md:mr-5 ${
                            i === activeImage ? "border-2" : ""
                          } border-red-light`}
                          onClick={() => setActiveImage(i)}
                        >
                          <img src={link} alt="preview" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="main-details">
                  <h2 className="font-dm hidden md:block text-blue-dark md:text-3xl text-2xl mb-2">
                    {orderItem?.name}
                  </h2>
                  {/* <p className="md:max-w-xs font-sf--reg text-blue-md">
                    {product.meta_description}
                  </p>
                  {!!product.prop_material.length && (
                    <div className="mt-4">
                      <h3 className="font-sf text-blue-dark text-base mb-2">
                        Material:
                      </h3>
                      <p className="md:max-w-xs font-sf--reg text-blue-md -mt-2">
                        {product.prop_material}
                      </p>
                    </div>
                  )}

                  {!!product.prop_finishing.length && (
                    <div className="mt-3">
                      <h4 className="font-sf text-blue-dark text-base mb-2">
                        Finishing:
                      </h4>
                      <p className="md:max-w-xs font-sf--reg text-blue-md -mt-2">
                        {product.prop_finishing}
                      </p>
                    </div>
                  )} */}
                  <div className="flex flex-col my-4">
                    <label
                      htmlFor="quantity"
                      className="font-sf--reg text-blue-md mb-2 inline-block"
                    >
                      Note
                    </label>
                    <textarea
                      rows={7}
                      className="p-2 rounded"
                      style={{ border: "1px solid #cbcac8" }}
                      value={note}
                      onChange={handleNoteOnchange}
                    ></textarea>
                  </div>
                  <div className="mt-4 max-w-sm">
                    <label
                      htmlFor="quantity"
                      className="font-sf--reg text-blue-md mb-2 inline-block"
                    >
                      Quantity
                    </label>
                    <div className="input-row flex items-center justify-between">
                      <select
                        name="quantity"
                        id="quantity"
                        className="w-1/2 border-brown-light mr-6"
                        value={currentQuantity}
                        onChange={setTotalCost}
                      >
                        {orderItem?.product?.quotes.length < 1 && (
                          <option value={orderItem?.product.minimum_quantity}>
                            {orderItem?.product?.minimum_quantity}
                          </option>
                        )}
                        {orderItem?.product?.quotes?.map((quote) => (
                          <option key={quote.id} value={quote.quantity}>
                            {quote.quantity}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={orderAgainHandler}
                        disabled={loading}
                        className="flex justify-center items-center py-5 w-1/2 bg-red-light px-4 font-sans rounded font-semibold text-sm text-white"
                      >
                        Order Again
                        {loading ? <Loader /> : ""}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="product-specs md:flex mt-12">
              {hasOtherSpecs && (
                <div className="c-specs mr-14 md:pr-10">
                  <h3 className="font-sf--bold text-blue-dark text-lg mb-2">
                    Specifications
                  </h3>
                  <hr />
                  <div className="c-specs__main flex flex-wrap justify-between mt-5">
                    {orderItem?.is_tshirt ? (
                      <>
                        {currentSpecs?.map((spec) => (
                          <div
                            key={spec.name}
                            className={`${
                              spec.name === "Shipping" && "hidden"
                            } mb-8 mr-4`}
                          >
                            <h3 className="text-blue-md text-sm mb-3 font-sf">
                              {spec.name}
                            </h3>
                            <div className="flex">
                              {spec.options.map((option, i) => (
                                <div key={option.name} className="mr-5">
                                  <button
                                    className={`no-outline ${
                                      option.selected
                                        ? "bg-red-light text-white"
                                        : "text-blue-dark"
                                    }`}
                                    tw="width[31px] height[31px] flex items-center justify-center p-1"
                                    onClick={() =>
                                      handleSpecsChange(i, spec.name)
                                    }
                                  >
                                    {option.name}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {currentSpecs?.map((spec) => (
                          <div
                            key={spec.name}
                            className={`c-spec__type ${
                              spec.name === "Shipping" && "hidden"
                            } mb-8 mr-4`}
                          >
                            <h3 className="text-blue-md text-sm mb-3 font-sf">
                              {spec.name}
                            </h3>
                            <div className="c-options flex">
                              {spec.options.map((option, i) => (
                                <div key={option.name} className="option mr-5">
                                  <div
                                    className={`${
                                      option.selected ? "active" : ""
                                    } relative w-28`}
                                    onClick={() =>
                                      handleSpecsChange(i, spec.name)
                                    }
                                  >
                                    <img
                                      src={option.image}
                                      alt={option.name}
                                      className="w-full h-24 rounded-sm"
                                    />
                                  </div>
                                  <p className="font-sf--reg text-blue-md text-sm mt-1">
                                    {option.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}

              {hasShipping && (
                <div className="c-shipping">
                  <h3 className="font-sf--bold text-blue-dark text-lg mb-2">
                    Shipping
                  </h3>
                  <hr />
                  <div className="c-specs__main flex flex-wrap justify-between mt-5">
                    {currentSpecs?.map((spec) => (
                      <div
                        key={spec.name}
                        className={`c-spec__type ${
                          spec.name !== "Shipping" && "hidden"
                        } mb-8 mr-4`}
                      >
                        <h3 className="text-blue-md text-sm mb-3 font-sf">
                          {spec.name}
                        </h3>
                        <div className="c-options flex">
                          {spec.options.map((option, i) => (
                            <div key={option.name} className="option mr-5">
                              <div
                                className={`${
                                  option.selected ? "active" : ""
                                } relative w-28`}
                                onClick={() => handleSpecsChange(i, spec.name)}
                              >
                                <img
                                  src={option.image}
                                  alt={option.name}
                                  className="w-full h-24 rounded-sm"
                                />
                              </div>
                              <p className="font-sf--reg text-blue-md text-sm mt-1">
                                {option.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* <section className="md:flex justify-between mt-10">
              <div className="c-faq md:mr-5 w-full max-w-2xl md-max-w-none md:mb-0 mb-24">
                <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-4">
                  Frequently Asked Questions
                </h1>
                <FaqAccordion />
              </div>
              <div className="md:w-2/5 flex-shrink-0">
                <div className="c-testimonials py-8 px-5 md:px-8">
                  <div className="c-testimonials__inner mx-auto">
                    <h1 className="c-testimonials__title font-dm mb-6 md:text-3xl text-2xl">
                      What Customers Say
                      <span role="img" aria-label="hands">
                        🙌🏾
                      </span>
                    </h1>
                    <div className="c-testimonials__grid grid">
                      <div className="c-test-box relative sm:grid block p-4">
                        <div className="social-icon absolute">
                          <img
                            src="data:image/svg+xml,%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18233 9.17582C6.99168 9.17582 9.07486 6.02241 9.07486 3.28788C9.07486 3.19831 9.07303 3.10915 9.06901 3.02039C9.47338 2.72829 9.82485 2.36377 10.1021 1.94881C9.73099 2.11362 9.33166 2.22457 8.91275 2.2746C9.34033 2.01841 9.66859 1.61314 9.82346 1.13001C9.42332 1.36704 8.9802 1.53932 8.50838 1.63233C8.13046 1.2301 7.59242 0.978516 6.99667 0.978516C5.85298 0.978516 4.92555 1.90527 4.92555 3.04762C4.92555 3.21001 4.94372 3.36796 4.97925 3.51947C3.258 3.43293 1.73172 2.60948 0.710253 1.35736C0.532393 1.66318 0.429836 2.01842 0.429836 2.39746C0.429836 3.11542 0.79546 3.74923 1.35145 4.12001C1.01167 4.10952 0.692486 4.01632 0.413509 3.86119C0.413205 3.86988 0.413203 3.87834 0.413203 3.88762C0.413203 4.88982 1.12707 5.72657 2.0747 5.91618C1.90068 5.96358 1.71758 5.989 1.5286 5.989C1.39536 5.989 1.26555 5.9759 1.13937 5.95168C1.40303 6.77392 2.16758 7.37226 3.07402 7.38898C2.36519 7.94413 1.47227 8.27477 0.501816 8.27477C0.334856 8.27477 0.169918 8.26528 0.0078125 8.24613C0.924378 8.83316 2.01271 9.17569 3.18245 9.17569' fill='%231DA1F2'/%3E%3C/svg%3E%0A"
                            alt="twitter icon"
                          />
                        </div>
                        <div className="c-test__img mb-2"></div>
                        <div className="c-content">
                          <div className="c-test-box__name my-2 font-sf text-sm">
                            Amina Ebele{" "}
                            <a
                              href="https://twitter.com/DeliciousAmina"
                              target="_blank"
                              tw="text-blue-sky"
                            >
                              @DeliciousAmina
                            </a>
                          </div>
                          <div className="c-test-box__desc font-sf--reg my-4">
                            I am now the unofficial{" "}
                            <a
                              href="https://twitter.com/Printivo"
                              target="_blank"
                              tw="text-blue-sky"
                            >
                              @Printivo
                            </a>{" "}
                            ambassador. What these guys just pulled to ensure I
                            got my menu cards today is stunning!
                          </div>
                        </div>
                      </div>

                      <div className="c-test-box relative sm:grid block p-4">
                        <div className="social-icon absolute">
                          <img
                            src="data:image/svg+xml,%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18233 9.17582C6.99168 9.17582 9.07486 6.02241 9.07486 3.28788C9.07486 3.19831 9.07303 3.10915 9.06901 3.02039C9.47338 2.72829 9.82485 2.36377 10.1021 1.94881C9.73099 2.11362 9.33166 2.22457 8.91275 2.2746C9.34033 2.01841 9.66859 1.61314 9.82346 1.13001C9.42332 1.36704 8.9802 1.53932 8.50838 1.63233C8.13046 1.2301 7.59242 0.978516 6.99667 0.978516C5.85298 0.978516 4.92555 1.90527 4.92555 3.04762C4.92555 3.21001 4.94372 3.36796 4.97925 3.51947C3.258 3.43293 1.73172 2.60948 0.710253 1.35736C0.532393 1.66318 0.429836 2.01842 0.429836 2.39746C0.429836 3.11542 0.79546 3.74923 1.35145 4.12001C1.01167 4.10952 0.692486 4.01632 0.413509 3.86119C0.413205 3.86988 0.413203 3.87834 0.413203 3.88762C0.413203 4.88982 1.12707 5.72657 2.0747 5.91618C1.90068 5.96358 1.71758 5.989 1.5286 5.989C1.39536 5.989 1.26555 5.9759 1.13937 5.95168C1.40303 6.77392 2.16758 7.37226 3.07402 7.38898C2.36519 7.94413 1.47227 8.27477 0.501816 8.27477C0.334856 8.27477 0.169918 8.26528 0.0078125 8.24613C0.924378 8.83316 2.01271 9.17569 3.18245 9.17569' fill='%231DA1F2'/%3E%3C/svg%3E%0A"
                            alt="twitter icon"
                          />
                        </div>
                        <div className="c-test__img mb-2"></div>
                        <div className="c-content">
                          <div className="c-test-box__name my-2 font-sf text-sm">
                            Oluwatosin{" "}
                            <a
                              tw="text-blue-sky"
                              href="https://twitter.com/tosingirlfx"
                              target="_blank"
                            >
                              @tosingirlfx
                            </a>
                          </div>
                          <div className="c-test-box__desc font-sf--reg my-4">
                            <a
                              href="https://twitter.com/Printivo"
                              target="_blank"
                              tw="text-blue-sky"
                            >
                              @Printivo
                            </a>{" "}
                            delivered my mugs in 24hrs. Thank you so much! It's
                            nice doing business with you. More to come.
                          </div>
                        </div>
                      </div>

                      <div className="c-test-box relative sm:grid block p-4">
                        <div className="social-icon absolute">
                          <img
                            src="data:image/svg+xml,%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18233 9.17582C6.99168 9.17582 9.07486 6.02241 9.07486 3.28788C9.07486 3.19831 9.07303 3.10915 9.06901 3.02039C9.47338 2.72829 9.82485 2.36377 10.1021 1.94881C9.73099 2.11362 9.33166 2.22457 8.91275 2.2746C9.34033 2.01841 9.66859 1.61314 9.82346 1.13001C9.42332 1.36704 8.9802 1.53932 8.50838 1.63233C8.13046 1.2301 7.59242 0.978516 6.99667 0.978516C5.85298 0.978516 4.92555 1.90527 4.92555 3.04762C4.92555 3.21001 4.94372 3.36796 4.97925 3.51947C3.258 3.43293 1.73172 2.60948 0.710253 1.35736C0.532393 1.66318 0.429836 2.01842 0.429836 2.39746C0.429836 3.11542 0.79546 3.74923 1.35145 4.12001C1.01167 4.10952 0.692486 4.01632 0.413509 3.86119C0.413205 3.86988 0.413203 3.87834 0.413203 3.88762C0.413203 4.88982 1.12707 5.72657 2.0747 5.91618C1.90068 5.96358 1.71758 5.989 1.5286 5.989C1.39536 5.989 1.26555 5.9759 1.13937 5.95168C1.40303 6.77392 2.16758 7.37226 3.07402 7.38898C2.36519 7.94413 1.47227 8.27477 0.501816 8.27477C0.334856 8.27477 0.169918 8.26528 0.0078125 8.24613C0.924378 8.83316 2.01271 9.17569 3.18245 9.17569' fill='%231DA1F2'/%3E%3C/svg%3E%0A"
                            alt="twitter icon"
                          />
                        </div>
                        <div className="c-test__img mb-2"></div>
                        <div className="c-content">
                          <div className="c-test-box__name my-2 font-sf text-sm">
                            Oluwatosin{" "}
                            <a
                              tw="text-blue-sky"
                              href="https://twitter.com/olgablark"
                              target="_blank"
                            >
                              @olgablark
                            </a>
                          </div>
                          <div className="c-test-box__desc font-sf--reg my-4">
                            These guys{" "}
                            <a
                              href="https://twitter.com/Printivo"
                              target="_blank"
                              tw="text-blue-sky"
                            >
                              @Printivo
                            </a>{" "}
                            are really awesome and affordable. Excellent
                            customer service and delivery too. Thank you.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
          </div>
          <Services />

          <footer
            className={`c-footer--fixed fixed bottom-0 left-0 right-0 z-10`}
          >
            <div className="inner-footer content-container items-center mx-auto flex justify-between py-4 md:py-6">
              <div className="f-product-details md:flex mr-6 md:mr-0 max-w-xs md:max-w-md w-full justify-between">
                <div className="flex">
                  <img
                    src={
                      orderItem?.preview_paths?.length &&
                      orderItem?.preview_paths[activeImage]
                    }
                    alt=""
                    className="object-cover w-12 h-12 hidden md:block mr-4"
                  />
                  <div>
                    <h3 className="font-sf md:text-base text-blue-dark mb-1 text-sm">
                      {orderItem?.name}
                    </h3>
                    <div className="flex flex-wrap max-w-2xs">
                      {currentSpecs.map((spec) => (
                        <div key={spec.name}>
                          {spec.options.map((option) => (
                            <div key={option.name}>
                              {option.selected && (
                                <p className="font-sf text-xs hidden md:block mb-1 text-blue-md mr-1">
                                  {option.name} |
                                </p>
                              )}
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
                    {currentQuantity}
                  </p>
                </div>
              </div>
              <div className="f-order md:flex items-end flex-shrink-0">
                <div className="price mr-5">
                  <h1 className="font-sf--bold text-2xl md:text-3xl text-blue-dark">
                    ₦{currentCost?.toLocaleString()}
                  </h1>
                </div>

                <button
                  disabled={loading}
                  onClick={orderAgainHandler}
                  className="font-sans py-2.5 px-4 flex justify-center items-center text-white bg-red-light rounded font-semibold text-sm"
                >
                  <span className="font-sf--bold">Order Again</span>
                  {loading ? <Loader /> : ""}
                </button>
              </div>
            </div>
          </footer>
        </div>
      </Layout>
    </div>
  );
};

export default ReOrderItem;
