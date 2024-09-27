import { useEffect, useState } from "react";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Search from "@/components/global/search";
import { fetcher } from "@/utils/index";
import useSWR from "swr";
import { useRouter } from "next/router";
import "twin.macro";
import ImageHelper from "@/utils/image";
import { computeAddon } from "@/utils/cart";
import RenderAddOnSet from "@/components/cart/RenderAddonSet";
import { useProducts } from "@/hooks/useProducts";
import Loader from "@/components/states/Loader";
import { Button } from "@/elements/Button/Button";
import Toastr from "toastr";

const CustomizeProductDesign = () => {
  const router = useRouter();

  const [currentQuantity, setCurrentQuantity] = useState(null);
  const [currentCost, setCurrentCost] = useState(null);
  const [quotesIndex, setQuotesIndex] = useState(0);
  const [addOnsSelected, setAddonsSelected] = useState({});
  const [quotes, setQuotes] = useState([]);
  const { addToCart, cartLoading } = useProducts();
  const { data: design, error: tabsError } = useSWR(
    `designs/${router.query.slug}.json?include=product.quotes,product.add_on_set`,
    fetcher
  );

  const chooseAddon = (addonKey, addonvalue, index, addNew, leftover) => {
    computeAddon(
      design.product,
      quotes,
      addOnsSelected,
      addonKey,
      addonvalue,
      index,
      addNew,
      leftover,
      setAddonsSelected,
      "add-to-cart"
    );
  };

  useEffect(() => {
    if (design?.product) {
      const addOnsSelectedValuesArray = Object.values(addOnsSelected);
      let totalPrice = design.product.minimum_price;

      addOnsSelectedValuesArray.length > 0 &&
        addOnsSelectedValuesArray.forEach((item) => {
          if (item[0] && item[0].price) {
            totalPrice += parseFloat(item[0].price);
          }
        });
      setCurrentCost(totalPrice);
    }
  }, [addOnsSelected]);

  const cartHandler = async () => {
    if (design?.product.is_tshirt) {
      let selectedQuantity = 0;
      addOnsSelected.Size.forEach((size) => {
        selectedQuantity += Number(size.quantity);
      });
      if (selectedQuantity !== Number(currentQuantity)) {
        Toastr.error("Please Select a correct quantity");
        return;
      }
    }
    const currentProduct = {
      id: design.product_id,
      design_id: design.id,
      quantity: currentQuantity,
      product: {
        vendor_id: design.product.vendor_id,
      },
      cost: currentCost,
      add_ons: addOnsSelected,
      state_file_name: design.state,
      name: design.name,
      page_1_preview: design.preview_file,
    };

    try {
      await addToCart(currentProduct, true);
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (design) {
      setCurrentCost(design.product.minimum_price);
      setCurrentQuantity(design.product.minimum_quantity);

      const tempval = Object.values(design.product.quotes[0].add_ons);
      const tempkey = Object.keys(design.product.quotes[0].add_ons);
      const tempSelected = {};

      tempval.map((item, index) => {
        const temp = tempkey[index];
        tempSelected[temp] = [item[0]];
      });
      setAddonsSelected(tempSelected);
      setQuotes(design.product.quotes[0].add_ons);
    }
  }, [design]);

  const setTotalCost = (e) => {
    const value = e.target.value;
    setCurrentQuantity(value);
    const selectedQuote = design.product.quotes.find(
      (quote) => quote.quantity === +value
    );
    const selectedQuoteIndex = design.product.quotes.findIndex(
      (quote) => quote.quantity === +value
    );

    setQuotes(design.product.quotes[selectedQuoteIndex].add_ons);
    setQuotesIndex(selectedQuoteIndex);
    setCurrentCost(selectedQuote.price);
  };

  return (
    <div>
      <Layout>
        <div className="m-product c-store--user mt-28 md:mt-20 pt-20 md:pt-0">
          <div className="content-container mx-auto">
            <div className="search-con hidden md:block relative max-w-xs -mt-3 ml-auto">
              <Search placeholder="Search for any product" />
            </div>

            <section className="c-product-showcase mt-8">
              <h1 className="font-dm md:hidden text-blue-dark md:text-3xl text-2xl mb-2">
                {design?.name}
              </h1>
              <div className="showcase-details grid">
                <div>
                  {design?.preview_file && (
                    <img
                      tw="w-full height[400px] object-contain"
                      src={
                        design?.preview_file?.startsWith("files")
                          ? `${ImageHelper.getCloudinaryUrlFromS3Path(
                              design?.preview_file || ""
                            )}`
                          : `${ImageHelper.getCloudinaryUrlFromCcPath(
                              design?.preview_file || ""
                            )}`
                      }
                      alt=""
                    />
                  )}
                </div>

                <div className="w-full">
                  <h1 className="font-dm text-blue-dark hidden md:block text-4xl mb-6">
                    {design?.name}
                  </h1>
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
                      className="w-full border-brown-light mr-6"
                      tw="height[45px] border[1px solid #cbcac8] text-indent[10px]"
                      value={currentQuantity}
                      onChange={setTotalCost}
                    >
                      {design?.product.quotes.length < 1 && (
                        <option value={design?.product.minimum_quantity}>
                          {design?.product.minimum_quantity}
                        </option>
                      )}

                      {design?.product.quotes.map((quote) => (
                        <option key={quote.id} value={quote.quantity}>
                          {quote.quantity}
                        </option>
                      ))}
                    </select>
                  </div>

                  {design?.addOns || design?.product.add_on_set ? (
                    <RenderAddOnSet
                      addOns={design?.addOns || design?.product.add_on_set}
                      chooseAddon={chooseAddon}
                      addOnsSelected={addOnsSelected}
                      setAddonsSelected={setAddonsSelected}
                      isTshirt={design?.product.is_tshirt}
                      tshirtQuantity={
                        design?.product.quotes[quotesIndex].quantity
                      }
                    />
                  ) : (
                    ""
                  )}

                  <div tw="flex items-end mt-8">
                    <div tw="mr-6">
                      <h2>Total:</h2>
                      <h3 tw="font-sans font-bold items-center text-3xl text-blue-dark">
                        ₦{currentCost?.toLocaleString()}
                      </h3>
                    </div>
                    <Button
                      tw="height[45px] items-center flex"
                      onClick={cartHandler}
                      disabled={cartLoading}
                      withArrow={true}
                    >
                      <span>Order Now</span>
                      {cartLoading && <Loader />}
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Services />
        </div>
      </Layout>
    </div>
  );
};

export default CustomizeProductDesign;
