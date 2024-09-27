import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useUser } from "@/hooks/useUser";
import { fetcher, getInitials } from "@/utils/index";
import useSWR from "swr";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import ShareProduct from "@/components/global/shareProduct";

const AccountStore = () => {
  const { user } = useUser();

  const storeId = user?.user?.store?.id;
  const [designsData, setDesignsData] = useState(null);
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    if (storeId) {
      getStoreData();
    }
  }, [storeId]);

  const getStoreData = async () => {
    const result = await fetcher(`/stores/${storeId}.json`);
    if (result) {
      setStoreData(result);
      getDesignData();
    }
  };

  const getDesignData = async () => {
    const result = await fetcher(
      `/designs.json?store_id=${storeId}&include=product&limit=1000&sort=created+desc`
    );
    if (result) {
      setDesignsData(result);
    }
  };

  const imageUrlParser = (url) => {
    const printivoUrl = "https://printivo.s3.us-west-2.amazonaws.com/";
    if (url) {
      if (url.length > 44) {
        const urlPrefix = url.substring(0, 44);
        if (urlPrefix === printivoUrl) {
          return url;
        } else {
          return `${printivoUrl}${url}`;
        }
      } else {
        return `${printivoUrl}${url}`;
      }
    } else {
      return "";
    }
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store c-store--owner md:pt-9 pt-11">
            <h1 className="font-dm text-blue-dark font-32 mb-10 content-container mx-auto">
              My Store
            </h1>
            <div className="c-store--owner__hero c-hero">
              <div
                className="c-hero__background w-full"
                tw="bg-cover!"
                style={{
                  background: `${
                    storeData?.banner
                      ? `url(${imageUrlParser(
                          storeData?.banner
                        )}) no-repeat center center`
                      : "#383B54"
                  }`,
                  backgroundColor: "#383B54",
                }}
              >
                <div className="c-inner w-full p-4">
                  <Link to="/account/store/edit">
                    <button className="py-2 px-4 font-sf--reg text-lg">
                      <span>Edit store details</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="c-hero__info justify-between relative px-5">
                <div className="c-owner md:flex">
                  <div
                    className="c-owner__avi md:mr-14 flex items-center justify-center flex-shrink-0"
                    tw="bg-cover!"
                    style={{
                      background: `${
                        storeData?.logo
                          ? `url(${imageUrlParser(
                              storeData?.logo
                            )}) no-repeat center center`
                          : "#383B54"
                      }`,
                      backgroundColor: "#383B54",
                    }}
                  >
                    {!storeData?.logo && (
                      <h2 tw="text-6xl text-white font-sans font-bold">
                        {storeData?.name && getInitials(storeData?.name)}
                      </h2>
                    )}
                  </div>
                  <div className="c-owner__name mt-10">
                    <h1 className="font-dm text-blue-dark text-3xl md:text-4xl mb-2">
                      {storeData?.name}
                    </h1>
                    <p className="text-sm font-sf--reg text-blue-dark">
                      {storeData?.description}
                    </p>
                  </div>
                </div>
                <Link
                  to="/account/store/new-design"
                  className="c-hero__button mt-10 inline-block"
                >
                  <button className="font-sf--bold text-blue-dark font-sm py-2 px-6 text-sm">
                    <span>Add a New Product</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="c-store--owner__products c-products-preview pb-64 mt-10 content-container mx-auto">
              {designsData?.data.length > 0 && (
                <div className="flex justify-end mb-4">
                  <ShareProduct path={`store/${storeData?.slug}`} />
                </div>
              )}
              <div className="c-preview__main">
                {designsData?.data.map((designs, i) => (
                  <div key={i} className="c-preview__box font-sf flex flex-col">
                    <div className="c-box__image">
                      <img
                        className="w-full"
                        src={`https://sp.printivo.com/api/rendering//${designs.preview_file}`}
                      />
                    </div>
                    <div className="c-box__details p-4 pb-0 font-sf--bold">
                      <h3 className="mb-1">{designs.name}</h3>
                    </div>
                    <div className="c-box__details p-4 pt-2 mt-auto">
                      <h3 className="mb-4 text-xl font-sf">
                        ₦{designs.product?.minimum_price.toLocaleString()}
                      </h3>
                      {designs.supports_straight_to_cart && (
                        <Button
                          withArrow={true}
                          href={`/cart/add/${designs?.slug}`}
                        >
                          <span>Add to cart</span>
                        </Button>
                      )}
                      {!designs.supports_straight_to_cart && (
                        <Button
                          withArrow={true}
                          href={`/product/${designs?.product?.slug}/design-builder?design=${designs.slug}`}
                        >
                          <span>Customize</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default AccountStore;
