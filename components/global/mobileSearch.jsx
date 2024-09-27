import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import getSearch from "@/utils/search";
import { toS3Url } from "@/utils/index";
import { useRouter } from "next/router";

export default function MobileSearch({ placeholder, query, handleResult }) {
  const { categoriesData } = useProducts();
  const router = useRouter();

  const [queryText, setQueryText] = useState(query || "");
  const [searchSuggestion, setSearchSuggestion] = useState([]);

  function filterSearch(event) {
    const { data } = categoriesData;
  
    const value = event?.target?.value || "";
    const searchQuery = value.toLowerCase().replace(/\s/g, '');
    let modifiedSearchQuery = searchQuery;
    
    if (searchQuery === "tshirt") {
      modifiedSearchQuery = "t-shirt";
    }
    
    const { categoryResult, productsResult } = getSearch(data, modifiedSearchQuery);
  
    setQueryText(value);
    setSearchSuggestion(productsResult || categoryResult);
    query ? handleResult(productsResult || categoryResult) : "";
  }

  const onSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/find/products/?query=${queryText}`);
  };

  useEffect(() => {
    categoriesData && filterSearch({ target: { value: query } });
  }, [categoriesData]);

  return (
    <div className={`relative w-full mx-2`}>
      <form className="c-form" onSubmit={onSearchSubmit}>
        <input
          className="bg-white w-full c-form__input--grey font-sf text-base text-blue-dark placeholder-gray-md h-12 outline-none rounded"
          name="query"
          id="mobileSearchquery"
          autoComplete="off"
          value={queryText}
          onChange={filterSearch}
          placeholder={placeholder}
        />
        {/* <button type="submit" className="search-button">
          <img
            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 4a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z' fill='%23384A62'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.943 15.943a1 1 0 011.414 0l4.35 4.35a1 1 0 11-1.414 1.414l-4.35-4.35a1 1 0 010-1.414z' fill='%23384A62'/%3E%3C/svg%3E"
            alt="search"
          />
        </button> */}
      </form>

      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          background: "#fff",
        }}
        className={`${
          queryText?.length > 0 ? " md:block shadow-lg" : "hidden"
        } absolute z-10 overflow-hidden  ${
          searchSuggestion?.length > 0 ? "c-search__results" : "c-result__empty"
        } mt-1 `}
      >
        <div className="hide-scroll overflow-y-scroll h-full">
          <div className="bg-white">
            {searchSuggestion?.length > 0 ? (
              searchSuggestion?.slice(0, 2).map((item) => (
                <div className="bg-white c-suggestion" key={item.id}>
                  {item.products.map((product) => (
                    <a href={`/product/${product.slug}`} key={product.id}>
                      <div className="flex flex-row justify-between border-b border-grey-lighter">
                        <div className="p-5">
                          <h3 className="text-sm text-grey-darkest font-sf text-grey-darkest mb-3">
                            {product.name}
                          </h3>
                          <p className=" text-grey-dark font-light mt-1 font-sf--reg">
                            {item.name}
                          </p>
                        </div>

                        <img
                          className="my-3 mx-5"
                          style={{ width: "50px", height: "50px" }}
                          src={toS3Url(product.thumbnail_path)}
                          alt={product.name}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              ))
            ) : (
              <div className="bg-white c-suggestion">
                <a href={`#`}>
                  <div className="flex flex-row justify-between border-b border-grey-lighter">
                    <div className="p-5">
                      <h3 className="text-sm text-grey-darkest font-sf text-grey-darkest mb-3"></h3>
                      <p className=" text-grey-dark font-light mt-1 font-sf--reg">
                        No Product Found{" "}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            )}
            <a href="/all-products" className="bg-grey">
              <div className="p-2">
                <p className="text-sm text-grey-darkest text-center underline">
                  View all products
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
