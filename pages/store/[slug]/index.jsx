import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetcher, toCCUrl, getInitials, toS3Url } from "@/utils/index";
import useSWR from "swr";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import Loader from "@/components/states/Loader";
import ShareProduct from "@/components/global/shareProduct";
import NewPagination from "@/components/global/new-pagination";

const StoreDetails = () => {
  const { query } = useRouter();
  const [storeId, setStoreId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);
  const [designsData, setDesignsData] = useState(null);
  const [designTabsData, setDesignTabsData] = useState(null);
  const [currentTab, setCurrentTab] = useState("All Designs");
  const [currentDesigns, setCurrentDesigns] = useState(null);
  const [storeData, setstoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { data: foundStore, storeError } = useSWR(
  //   `/stores/${query.slug}.json?include=owners&limit=1000`,
  //   fetcher,
  // )

  const { data: storesData, error2 } = useSWR(
    "/stores.json?include=owners&limit=1000",
    fetcher
  );

  useEffect(() => {
    let alternativeSlug = window.location.pathname.split("/store/")[1];
    if (query.slug || alternativeSlug) {
      getStoreId(query.slug || alternativeSlug);
    }
  }, []);

  useEffect(() => {
    currentTab === "All Designs" && setCurrentDesigns(designsData?.data);
    setTotalProductCount(designsData?.meta?.filteredCount);
    setPerpage(designsData?.meta?.perPage);
    setPageProductNumber(designsData?.meta?.resultCount);
    setTotalPageCount(designsData?.meta?.pageCount);
  }, [designsData]);

  useEffect(() => {
    if (currentPage > 1) {
      setIsLoading(true);
      getDesignsData(storeId);
    }
  }, [currentPage]);

  const getStoreId = async (id) => {
    let req = await fetcher(`/stores/${id}.json?include=owners&limit=1000`);
    if (req) {
      getDesignsData(req.id);
      getDesignsTab(req.id);
      setstoreData(req);
      setStoreId(req.id);
    }
  };
  const getDesignsData = async (id) => {
    let req = await fetcher(
      `/designs.json?store_id=${id}&page=${currentPage}&include=product&limit=1000&sort=created+desc`
    );
    setDesignsData(req);
    setCurrentDesigns(req.data);
    setIsLoading(false);
  };
  const getDesignsTab = async (id) => {
    let req = await fetcher(
      `/designs.json?store_id=${id}&include=product&group_by=product_id,Product.name&group_fields=product_id,Product.name`
    );

    setDesignTabsData(req);
  };

  const handleTabChange = (name, id) => {
    setCurrentTab(name);

    if (name === "All Designs") {
      setCurrentDesigns(designsData.data);
    } else {
      const filteredDesigns = designsData.data.filter(
        (design) => design.product_id === id
      );
      setCurrentDesigns(filteredDesigns);
    }
  };

  const changePage = (e) => {
    setCurrentPage(e);
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store c-store--owner c-store--user md:pt-9 pt-11">
            <h1 className="font-dm text-blue-dark font-32 mb-10 content-container mx-auto">
              My Store
            </h1>
            {storeData && (
              <div className="c-store--owner__hero c-hero">
                <div
                  className="c-hero__background w-full"
                  tw="bg-cover!"
                  style={{
                    background: storeData.banner
                      ? `url(${
                          storeData?.banner.startsWith("https")
                            ? `${storeData.banner}`
                            : toS3Url(`/${storeData.banner}`)
                        }) no-repeat`
                      : "#383B54",

                    backgroundColor: "#383B54",
                  }}
                ></div>
                <div className="c-hero__info justify-between relative px-5">
                  <div className="c-owner md:flex">
                    <div
                      className="c-owner__avi md:mr-14 relative z-10 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: storeData.logo
                          ? `url(${
                              storeData?.logo.startsWith("https")
                                ? `${storeData.logo}`
                                : toS3Url(`/${storeData.logo}`)
                            }) no-repeat`
                          : "#383B54",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
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
                </div>
              </div>
            )}

            <section className="c-store--user__showcase md:flex mt-10 content-container mx-auto">
              <div className="c-tabs md:table w-full md:mr-14">
                <h2 className="font-dm text-blue-dark mb-1 text-2xl">
                  Designs
                </h2>
                <hr className="md:mb-8 mb-4"></hr>

                <div className="inner-tab font-sf--bold md:block flex text-blue-md text-sm">
                  <h5
                    onClick={() => handleTabChange("All Designs", null)}
                    className={`${
                      currentTab === "All Designs" ? "active" : ""
                    } mb-5 mr-6 md:mr-0 flex-shrink-0`}
                  >
                    All Designs
                  </h5>
                  {designTabsData?.data.map(({ product, product_id }, i) => (
                    <h5
                      key={product_id}
                      onClick={() => handleTabChange(product.name, product_id)}
                      className={`mb-5 mr-6 md:mr-0 flex-shrink-0 ${
                        currentTab === product.name ? "active" : ""
                      }`}
                    >
                      {product.name}
                    </h5>
                  ))}
                </div>
              </div>

              <div className="c-content md:table mb-20">
                <div className="c-content__header md:block hidden">
                  <div className="flex justify-between">
                    <h2 className="c-content__title text-blue-dark text-lg font-sf mb-1">
                      {currentTab}
                    </h2>
                    <div>
                      <ShareProduct path={`store/${query.slug}`} />
                    </div>
                  </div>
                  <hr className="md:mb-8 mb-4"></hr>
                  <div className="w-full my-1 py-5">
                    <div tw="mt-4">
                      <NewPagination
                        handleChange={(e) => changePage(e)}
                        totalCount={totalProductCount}
                        perPage={perPage}
                        currentPage={currentPage}
                        totalPageProduct={pageProductNumber}
                        pages={totalPageCount}
                      />
                    </div>
                  </div>
                </div>
                <div className="c-content__body c-products-preview">
                  <div className="c-preview__main">
                    {isLoading ? (
                      <Loader />
                    ) : (
                      currentDesigns?.map((design, i) => (
                        <div
                          key={i}
                          className="c-preview__box font-sf flex flex-col"
                        >
                          <div className="c-box__image">
                            <img
                              className="w-full"
                              src={
                                design.preview_file.startsWith("GetProofImage")
                                  ? toCCUrl(`${design.preview_file}`)
                                  : toS3Url(`/${design.preview_file}`)
                              }
                              alt={design.name}
                            />
                          </div>
                          <div className="c-box__details p-4 pb-0 font-sf--bold">
                            <h3 className="mb-1">{design.name}</h3>
                          </div>
                          <div className="c-box__details p-4 pt-2 mt-auto">
                            <h3 className="mb-4 text-xl font-sf">
                              ₦{design.product?.minimum_price.toLocaleString()}
                            </h3>
                            {design.supports_straight_to_cart && (
                              <Button
                                href={`/cart/add/${design?.slug}`}
                                withArrow={true}
                                tw="inline-block"
                              >
                                <span>Add to cart</span>
                              </Button>
                            )}
                            {!design.supports_straight_to_cart && (
                              <Button
                                href={`/product/${design?.product.slug}/design-builder?design=${design?.slug}`}
                                tw="inline-block"
                                withArrow={true}
                              >
                                <span>Customize</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div tw="mt-8">
                    <NewPagination
                      handleChange={(e) => changePage(e)}
                      totalCount={totalProductCount}
                      perPage={perPage}
                      currentPage={currentPage}
                      totalPageProduct={pageProductNumber}
                      pages={totalPageCount}
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default StoreDetails;
