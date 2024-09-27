import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import Services from "@/components/global/services";
import api from "@/services/api";
import Search from "@/components/global/search";
import Link from "@/components/link";
import { toS3Url } from "@/utils/index";

const SearchResults = ({ products }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(router.query.keyword);
  const [searchResults, setSearchResults] = useState(products);

  useEffect(() => {
    console.log("searchResults", searchResults);
  }, [searchResults]);

  const searchProducts = async (e) => {
    e.preventDefault();
    if (searchText === "") {
      return;
    }

    // const response = await api.get(
    //   `/products.json?vendor_id=1&include=categories&search=${searchText}&active=1&limit=100&sort[name]=asc`
    // );
    // const products = response.data.data;
    // setSearchResults(products);

    Router.push({
      pathname: "/search-results",
      query: { keyword: searchText },
    });
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <span className="text-red-blue font-sf">Search Products</span>
            </header>

            <div
              className={`search-con hidden md:block relative ${
                searchText ? "max-w-md" : "max-w-xs"
              } mt-0 ml-auto`}
            >
              <form className="c-form--search" onSubmit={searchProducts}>
                <input
                  className="bg-transparent w-full c-form__input--grey font-sf text-base text-blue-dark placeholder-gray-md h-12 outline-none rounded"
                  name="search"
                  type="text"
                  autoComplete="off"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  placeholder="Search for any product"
                />
                <button type="submit" className="search-button">
                  <img
                    src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 4a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z' fill='%23384A62'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.943 15.943a1 1 0 011.414 0l4.35 4.35a1 1 0 11-1.414 1.414l-4.35-4.35a1 1 0 010-1.414z' fill='%23384A62'/%3E%3C/svg%3E"
                    alt="search"
                  />
                </button>
              </form>
            </div>

            <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-2 -mt-4">
              Search results for "{router.query.keyword}"
            </h1>

            <section className="c-allproducts md:flex w-full justify-between mt-16">
              <div className="md:table c-searchproducts__content">
                <div className="mb-16">
                  <div className="c-searchproducts__grid w-full">
                    {products?.map(
                      ({
                        id,
                        name,
                        meta_description,
                        thumbnail_path,
                        slug,
                      }) => (
                        <div key={id} className="c-box flex flex-col">
                          <div className="c-box__image">
                            <img src={toS3Url(thumbnail_path)} alt={name} />
                          </div>
                          <h2 className="c-box__name font-sf--bold text-blue-dark font-15 pt-4 pb-2">
                            {name}
                          </h2>
                          <p className="font-sf font-13 mb-3 c-box__desc  text-gray-sub">
                            {meta_description
                              ? `${meta_description}`
                              : "No description for this product"}
                          </p>
                          <Link
                            to={`/product/${slug}`}
                            className="mt-auto inline-block"
                          >
                            <button className="c-order__button">
                              <span>Order Now</span>
                            </button>
                          </Link>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default SearchResults;

export async function getServerSideProps(context) {
  // get the keyword from the query string
  const { keyword } = context.query;

  // fetch the products from the API
  const response = await api.get(
    `/products.json?vendor_id=1&include=categories&search=${keyword}&active=1&limit=100&sort[name]=asc`
  );

  const products = response.data.data;

  return {
    props: {
      products,
      keyword,
    },
  };
}
