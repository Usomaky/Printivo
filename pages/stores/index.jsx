import NewPagination from "@/components/global/new-pagination";
import Layout from "@/components/layout/layout";
import { fetcher, toS3Url, getInitials } from "@/utils/index";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import { debounce } from "lodash";

const StoreHome = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);

  const { data: storesData, error } = useSWR(
    `/stores.json?include=owners&limit=40&page=${currentPage}stores&search=${debouncedSearch}`,
    fetcher
  );

  // Fetch and cache next page data
  const { data: preFetched, preFetchedError } = useSWR(
    `/stores.json?include=owners&limit=40&page=${currentPage}&search=${debouncedSearch}`,
    fetcher
  );

  const changePage = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (storesData) {
      setTotalProductCount(storesData.meta.filteredCount);
      setPerpage(storesData.meta.perPage);
      setCurrentPage(storesData.meta.page);
      setPageProductNumber(storesData.meta.resultCount);
      setTotalPageCount(storesData.meta.pageCount);
    }
  }, [storesData]);

  const searchHandler = useCallback(
    debounce((query) => {
      setDebouncedSearch(query);
    }, 500),
    []
  );

  const onInputChange = (e) => {
    const value = e.target.value;
    searchHandler(value);
    setSearchValue(value);
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store c-store--user md:pt-9 pt-11 content-container mx-auto">
            <h1 className="font-dm text-blue-dark font-32 mb-4">Stores</h1>
            <form
              className="c-form relative mb-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="bg-transparent w-full c-form__input--grey font-sf text-base text-blue-dark placeholder-gray-md h-12 outline-none rounded"
                name="query"
                id="searchquery"
                autoComplete="off"
                onChange={onInputChange}
                value={searchValue}
              />
              <button type="submit" className="search-button">
                <img
                  src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 4a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z' fill='%23384A62'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.943 15.943a1 1 0 011.414 0l4.35 4.35a1 1 0 11-1.414 1.414l-4.35-4.35a1 1 0 010-1.414z' fill='%23384A62'/%3E%3C/svg%3E"
                  alt="search"
                />
              </button>
            </form>

            <section className="mb-10">
              <div>
                {!storesData?.data.length && (
                  <h1 className="font-dm text-blue-dark font-32 mb-4">
                    No search results found for {searchValue}
                  </h1>
                )}
              </div>

              <div className="c-store--user__grid mb-16">
                {storesData?.data.map((store, i) => (
                  <div className="c-box" key={i}>
                    <div
                      className="c-box__image mb-2.5 flex items-center justify-center"
                      style={{
                        background: `${
                          store?.logo ? `transparent` : "#383B54"
                        }`,
                      }}
                    >
                      {store?.logo ? (
                        <img
                          src={`${
                            store?.logo.startsWith("https")
                              ? `${store.logo}`
                              : toS3Url(`/${store.logo}`)
                          }`}
                          alt=""
                          className="w-full"
                        />
                      ) : (
                        <h2 tw="text-6xl text-white font-sans font-bold uppercase">
                          {store.name && getInitials(store.name)}
                        </h2>
                      )}
                    </div>
                    <h2 className="text-base font-sf--bold mb-1 text-blue-dark">
                      {store.name}
                    </h2>
                    <p className="text-sm text-blue-md font-sf--reg mb-4">
                      By {store.owner?.full_name}
                    </p>
                    <Button
                      href={`/store/${store.slug}`}
                      buttonColor="blue"
                      withArrow={true}
                    >
                      <span className="font-sf--bold text-blue-dark">
                        View Store
                      </span>
                    </Button>
                  </div>
                ))}
              </div>
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
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default StoreHome;
