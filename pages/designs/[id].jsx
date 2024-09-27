import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/index";
import useSWR from "swr";
import "twin.macro";
import api from "@/services/api";
import { Button } from "@/elements/Button/Button";
import NewPagination from "@/components/global/new-pagination";

const ProductDesigns = () => {
  const { query } = useRouter();
  console.log(query);

  const { data: designTabsData, error: tabsError } = useSWR(
    `/designs/tags.json?product$slug=${query.id}`,
    fetcher
  );

  let designId;
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);
  const [tags, setTags] = useState([]);
  const [designsData, setDesignsData] = useState(null);

  const getDesigns = () => {
    api
      .get(
        `/designs.json?limit=33&fields=id,supports_straight_to_cart,supports_customization,product.slug,product.id,slug,preview_file,psd_file,name,store.slug,store.name,owner.full_name&include=store,owner,product&product$slug=${
          designId || window?.location?.pathname?.replace("/designs/", "")
        }&supports_straight_to_cart=1&page=${currentPage}`
      )
      .then((res) => {
        setDesignsData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const changePage = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    designId = window?.location?.pathname?.replace("/designs/", "") || 0;
    if (designsData) {
      setTotalProductCount(designsData.meta.filteredCount);
      setPerpage(designsData.meta.perPage);
      setPageProductNumber(designsData.meta.resultCount);
      setTotalPageCount(designsData.meta.pageCount);
    } else {
      designId = window?.location?.pathname?.replace("/designs/", "") || 0;
      getDesigns();
    }
  }, [designsData, currentPage]);

  useEffect(() => {
    if (designTabsData) {
      const modifiedTags = designTabsData.map((tag) => {
        return {
          ...tag,
          active: false,
        };
      });

      setTags(modifiedTags);
    }
  }, [designTabsData]);

  useEffect(() => {
    getDesigns();
  }, [currentPage]);

  const filterDesigns = async (name) => {
    const modifiedTags = tags.map((tag) => {
      if (tag.name === name) {
        return {
          ...tag,
          active: !tag.active,
        };
      } else {
        return {
          ...tag,
        };
      }
    });

    const activeTags = modifiedTags.filter((tag) => tag.active);

    if (activeTags.length) {
      let tagQuery = "";
      if (activeTags.length === 1) {
        tagQuery = `&tags=${encodeURIComponent(activeTags[0].name)}`;
      } else {
        activeTags.forEach((tag) => {
          tagQuery = tagQuery.concat(`&tags[]=${encodeURIComponent(tag.name)}`);
        });
      }

      api
        .get(
          `/designs.json?limit=33&fields=id,supports_straight_to_cart,supports_customization,product.slug,product.id,slug,preview_file,psd_file,name,store.slug,store.name,owner.full_name&include=store,owner,product&product_id=${
            designId || window?.location?.pathname?.replace("/designs/", "")
          }&supports_straight_to_cart=1&page=${currentPage}${tagQuery}`
        )
        .then((res) => {
          setDesignsData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("empty array");
      getDesigns();
    }

    setTags(modifiedTags);
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store c-store--owner c-store--user md:pt-9 pt-11">
            <h1 className="font-dm text-blue-dark font-32 mb-10 content-container mx-auto">
              Designs
            </h1>

            <section className="c-store--user__showcase md:flex mt-10 content-container mx-auto">
              <div className="c-tabs md:table w-full md:mr-14">
                <h2 className="font-dm text-blue-dark mb-1 text-2xl">Tags</h2>
                <hr className="md:mb-8 mb-4"></hr>
                <div className="inner-tab font-sf--bold md:block flex text-blue-md text-sm">
                  {tags?.map(({ name, active }, i) => (
                    <h5
                      key={i}
                      onClick={() => filterDesigns(name)}
                      className={`mb-5 mr-6 md:mr-0 flex-shrink-0 ${
                        active && "active"
                      }`}
                    >
                      {name.replace(/[\]/\\#,()$~%.'":*?<>{}]/g, "")}
                    </h5>
                  ))}
                </div>
              </div>

              <div className="c-content md:table mb-20 mt-9">
                <div className="c-content__body c-products-preview">
                  <div className="my-10">
                    <NewPagination
                      handleChange={(e) => changePage(e)}
                      totalCount={totalProductCount}
                      perPage={perPage}
                      currentPage={currentPage}
                      totalPageProduct={pageProductNumber}
                      pages={totalPageCount}
                    />
                  </div>
                  <div className="c-preview__main">
                    {designsData?.data.length === 0 && (
                      <h1 className="font-dm text-blue-dark font-32 mb-10 content-container mx-auto">
                        No Designs found
                      </h1>
                    )}
                    {designsData?.data?.map((designs, i) => (
                      <div
                        key={i}
                        className="c-preview__box font-sf flex flex-col"
                      >
                        <div className="c-box__image">
                          <img
                            className="w-full"
                            src={`https://sp.printivo.com/api/rendering//${designs.preview_file}`}
                          />
                        </div>
                        <div className="c-box__details p-4 pb-0 font-sf--bold">
                          <h3 className="mb-1">{designs.name}</h3>
                        </div>
                        <div className="c-box__details p-4 pt-0 mt-auto">
                          <h4 className="mb-4 text-sm font-sf">
                            {designs.store?.name}
                          </h4>
                          <Button
                            href={`/cart/add/${designs.slug}`}
                            withArrow={true}
                          >
                            <span>Add To Cart</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* {designsData && ( */}
                  <div className="my-10">
                    <NewPagination
                      handleChange={(e) => changePage(e)}
                      totalCount={totalProductCount}
                      perPage={perPage}
                      currentPage={currentPage}
                      totalPageProduct={pageProductNumber}
                      pages={totalPageCount}
                    />
                  </div>
                  {/* )} */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ProductDesigns;
