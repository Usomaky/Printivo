import { useEffect, useState } from "react";
import SelectComponent from "@/components/form/SelectComponent";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import api from "@/services/api";
import image from "@/utils/image";

export default function CostCalculator({}) {
  const [productList, setProductList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState({});
  const [productIndex, setProductIndex] = useState(0);
  const [quotes, setQuotes] = useState({});
  const [quotesIndex, setQuotesIndex] = useState(0);
  const [addOns, setAddons] = useState({});
  const [summary, setSummary] = useState(0);
  const [designerRequest, setDesignerRequest] = useState(false);

  const handleAddon = (addons, action) => {
    const temp = {};
    if (addons) {
      Object.keys(addons).forEach((e, index) => {
        const temp2 = Object.values(addons)[index];
        temp[e] = temp2[0];
      });
      action(temp);
    }
  };

  const handleCategory = (e) => {
    const productComp = productIndex <= productList[e].products.length - 1;
    let index = 0;
    setCategory(productList[e]);

    if (productComp) {
      index = productIndex;
      setProduct(productList[e].products[productIndex]);
    } else {
      setProductIndex(0);
      console.log("productList2", productList[e].products[0]);
      setProduct(productList[e].products[0]);
    }

    const j = quotesIndex > productList[e].products[index].quotes.length - 1;

    if (j) {
      setQuotesIndex(0);
      setQuotes(productList[e].products[index]?.quotes[0]);
      handleAddon(
        productList[e].products[index]?.quotes[0]?.add_ons,
        setAddons
      );
    } else {
      setQuotes(productList[e].products[index].quotes[quotesIndex]);
      handleAddon(
        productList[e].products[index].quotes[quotesIndex]?.add_ons,
        setAddons
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .get("categories.json?include=products.quotes&limit=100&vendor_id=1")
      // .get('categories.json?include=products.quotes&limit=100')
      .then(({ data: { data } }) => {
        const tempAddon = data[0].products[0].quotes[0]?.add_ons;

        setProductList(data);
        setCategory(data[0]);
        setProduct(data[0].products[0]);
        setQuotes(data[0].products[0].quotes[0]);
        handleAddon(tempAddon, setAddons);
        setLoaded(true);
      });
  }, [loaded]);

  useEffect(() => {
    let temp;
    const designReq = designerRequest ? product?.graphic_design_amount : 0;
    if (
      product &&
      Object.keys(product).length > 0 &&
      quotes &&
      Object.keys(quotes).length > 0 &&
      addOns &&
      Object.keys(addOns).length >= 0
    ) {
      const addOnPrices = Object.values(addOns).map((item) => item.price);
      temp =
        addOnPrices.length > 0
          ? addOnPrices.reduce(
              (a, b) => Number.parseFloat(a) + Number.parseFloat(b)
            )
          : 0;
      const sum =
        Number.parseFloat(quotes.price) +
        Number.parseFloat(temp) +
        Number.parseFloat(designReq);
      setSummary(sum);
    }
  }, [category, product, quotes, addOns, designerRequest]);

  const orderTypes = [
    "I have my own design file",
    "I will choose a free Printivo template and customize it",
    "I want Printivo to help me create a design",
  ];

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-reseller content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /
              </Link>{" "}
              <span className="text-blue-dark font-sf">Cost Calculator</span>
            </header>
            <br />
            <br />
            <br />

            <div className="c-store--owner__form pb-56 content-container mx-autoz">
              {loaded ? (
                <div className="content-container mx-auto">
                  <h1 className="font-dm text-blue-dark mt-4 md:text-3xl my-5 text-2xl mb-3">
                    Print Quote Calculator
                  </h1>

                  <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                      <div className="p-3">
                        <div className="w-full py-3">
                          Select a Category.
                          <SelectComponent
                            value="index"
                            tag="products"
                            onchange={handleCategory}
                            items={productList
                              .filter((item) => item.products.length > 0)
                              .map((item) => item.name)}
                          />
                        </div>

                        <div className="w-full flex flex-col md:flex-row">
                          <div className="w-full md:w-1/2 py-3 sm:pr-2">
                            What product do you want to order?
                            <SelectComponent
                              tag="products"
                              value="index"
                              items={category.products.map((item) => item.name)}
                              onchange={(e) => {
                                setProduct(category.products[e]);
                                setProductIndex(e);
                                setQuotes(
                                  category.products[e].quotes[quotesIndex]
                                );
                                handleAddon(
                                  category.products[e].quotes[quotesIndex]
                                    ?.add_ons,
                                  setAddons
                                );
                              }}
                            />
                          </div>

                          <div className="w-full md:w-1/2 py-3 sm:pl-2">
                            Quantity
                            <SelectComponent
                              tag="products"
                              items={product.quotes.map(
                                (item) => item.quantity
                              )}
                              value="index"
                              onchange={(e) => {
                                setQuotesIndex(e);
                                setQuotes(
                                  category.products[productIndex].quotes[e]
                                );
                                handleAddon(
                                  category.products[productIndex].quotes[e]
                                    .add_ons,
                                  setAddons
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="w-full py-3 flex flex-col">
                          Addons
                          <div className="w-full flex py-3 flex-col">
                            {quotes &&
                            quotes.add_ons &&
                            Object.keys(quotes.add_ons).length > 0 ? (
                              Object.keys(quotes.add_ons).map(
                                (addon, index) => {
                                  const quotesAddon = Object.values(
                                    quotes.add_ons
                                  )[index];

                                  return (
                                    <div
                                      key={addon}
                                      className="w-full flex items-center pb-3"
                                    >
                                      <div className="w-1/2 border-l border-tivo-magenta pl-8 py-3">
                                        {addon}
                                      </div>
                                      <div className="w-1/2 relative">
                                        <select
                                          id="addon"
                                          name="addons"
                                          value={JSON.stringify(addOns[addon])}
                                          className="appearance-none"
                                          onChange={(e) =>
                                            setAddons({
                                              ...addOns,
                                              [addon]: JSON.parse(
                                                e.target.value
                                              ),
                                            })
                                          }
                                        >
                                          {quotesAddon.map((item) => (
                                            <option
                                              key={JSON.stringify(item)}
                                              value={JSON.stringify(item)}
                                            >
                                              {item.name}
                                            </option>
                                          ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                                          <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                          >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )
                            ) : (
                              <div className="w-full py-5 text-center border border-tivo-magenta">
                                This product has no Addon
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full py-3">
                          How do you want to order?
                          <SelectComponent
                            value="index"
                            tag="order type"
                            items={orderTypes}
                            onchange={(e) =>
                              e === "2"
                                ? setDesignerRequest(true)
                                : setDesignerRequest(false)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2">
                      <div className="w-full p-5 sm:p-10">
                        <div className="border mx-auto flex flex-col p-10">
                          <div className="w-full pb-8 h-64 flex justify-center">
                            <div className="pb-10 border-b border-tivo-magenta flex">
                              <img
                                src={
                                  product.thumbnail_path
                                    ? image.getCloudinaryUrlFromS3Path(
                                        product.thumbnail_path
                                      )
                                    : "/images/placeholder.png"
                                }
                                alt={product.name}
                                className="h-full w-auto mx-auto"
                              />
                            </div>
                          </div>
                          <div className="font-bold uppercase text-lg text-center">
                            {product.name}
                          </div>
                          <div className="py-3 flex justify-between">
                            <div>{`${quotes?.quantity} units`}</div>
                            <div>₦{quotes?.price.toLocaleString()}</div>
                          </div>
                          <div className="py-3 flex justify-between">
                            <div>Addons</div>
                            <div>
                              ₦
                              {Object.values(addOns).map((item) => item.price)
                                .length > 0
                                ? Object.values(addOns)
                                    .map((item) => item.price)
                                    .reduce(
                                      (a, b) =>
                                        Number.parseFloat(a) +
                                        Number.parseFloat(b)
                                    )
                                : 0}
                            </div>
                          </div>
                          <div className="py-3 flex justify-between">
                            <div> Design fee </div>
                            <div>
                              ₦
                              {designerRequest
                                ? product.graphic_design_amount
                                : 0}
                            </div>
                          </div>
                          <div className="py-3 flex justify-between">
                            <div> VAT </div>
                            <div>₦{0.5 * summary}</div>
                          </div>
                          <div className="py-3 pl-2 border-t border-b-2 border-tivo-magenta mb-8 text-right text-2xl font-bold">
                            ₦{summary.toLocaleString()}
                          </div>

                          <Link to={`/product/${product.slug}`}>
                            <div
                              role="button"
                              className="w-full sm:w-64 bg-red-light self-end text-center
                        uppercase text-white mx-auto py-4 border border-red-light
                        hover:bg-white hover:text-red-light"
                            >
                              Order Now
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="w-full flex max-w-4xl mx-auto my-16">
                    <img
                      src={image.getCloudinaryUrlFromS3Path(
                        "/img/tivo-loader-90px.gif"
                      )}
                      alt="Loading..."
                      className="p-5 mx-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
}
