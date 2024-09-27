import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useProducts } from "@/hooks/useProducts";
import { toS3Url, toParseS3Url, toCCUrl, fetcher } from "@/utils/index";
import useSWR from "swr";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import NewPagination from "@/components/global/new-pagination";
import image from "@/utils/image";

const CreateDesign = () => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const { currentProduct } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);
  const isCurrentProductEmpty = Object.entries(currentProduct).length === 0;
  const [designsData, setDesignsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isCurrentProductEmpty) {
      router.push(`/product/${slug}`);
    } else {
      if (isCurrentProductEmpty && slug) {
        router.push(`/product/${slug}`);
      } else {
        getDesignData();
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (currentPage > 1) {
      getDesignData();
    }
  }, [currentPage]);

  const getDesignData = async () => {
    setLoading(true);
    const result = await fetcher(
      `/designs.json?limit=100&fields=id,supports_straight_to_cart,supports_customization,product.slug,product.id,slug,preview_file,psd_file,name&include=owner,product&product_id=${currentProduct?.product?.id}&limit=40&page=${currentPage}&store_type=regular&sort[created]=desc`
    );

    setDesignsData(result);
    setTotalProductCount(result.meta.filteredCount);
    setPerpage(result.meta.perPage);
    setPageProductNumber(result.meta.resultCount);
    setTotalPageCount(result.meta.pageCount);
    setLoading(false);
  };

  const changePage = (e) => {
    setCurrentPage(e);
  };

  // useEffect(() => {
  //   if (designsData) {

  //   }
  // }, [designsData])

  return (
    <>
      <Layout>
        <div className="m-product mt-44 md:mt-20">
          <div className="content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <Link to={`/product/${slug}`} className="text-gray-md">
                {slug} /{" "}
              </Link>{" "}
              <Link
                to={`/product/${slug}/design-options`}
                className="text-gray-md"
              >
                Design Options /{" "}
              </Link>{" "}
              <span className="text-red-light font-sf"> Create Yourself</span>
            </header>

            <Search placeholder="Search for any product" />

            <section>
              <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-2">
                Create your design
              </h1>

              <p className="font-sf--reg font-15 text-blue-dark max-w-md">
                Create you own custom design with our online design tool. Remix
                any of our templates or start from a blank slate.
              </p>

              <h3 className="font-sf text-blue-dark mt-6 font-22 mb-6">
                Customize any of our {currentProduct?.name} templates
              </h3>

              <>
                <div tw="mb-4">
                  <NewPagination
                    handleChange={(e) => changePage(e)}
                    totalCount={totalProductCount}
                    perPage={perPage}
                    currentPage={currentPage}
                    totalPageProduct={pageProductNumber}
                    pages={totalPageCount}
                  />
                </div>

                {loading ? (
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
                ) : (
                  <div className="create-design__grid grid">
                    {designsData?.data?.map((design, i) => (
                      <div className="design-option" key={i}>
                        <img
                          src={
                            design.preview_file.startsWith("GetProofImage")
                              ? toCCUrl(`${design.preview_file}`)
                              : toS3Url(`${design.preview_file}`)
                          }
                          alt={design.name}
                          className="w-full h-48"
                        />
                        <h2 className="font-sf--bold text-blue-dark text-lg my-3">
                          {design.name}
                        </h2>
                        <Button
                          href={`/product/${slug}/design-builder?design=${design.slug}`}
                          buttonColor="blue"
                          withArrow={true}
                        >
                          <span className="font-sf--bold">Start Designing</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

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
              </>
            </section>
          </div>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default CreateDesign;
