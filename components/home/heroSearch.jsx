import { toProductSlug, toS3Url } from "@/utils/index";
import Link from "../link";
import React, { useEffect, useState } from "react";

export default function HeroSearch({
  searchText,
  products,
  handleSearch,
  setSearchText,
}) {
  const [isMobile, setIsMobile] = useState(false);

  // check if user is on mobile device
  const checkIfMobile = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div className="c-search">
      <form
        method="get"
        action="/designs/search"
        onSubmit={handleSearch}
        autoComplete="off"
      >
        <label
          htmlFor="searchquery"
          className="font-sf--bold text-blue-dark mb-1 block"
        >
          What would you like to print today?
        </label>
        <div className="input-con">
          <input
            className="bg-white"
            type="text"
            autoFocus
            name="query"
            id="searchquery"
            value={searchText}
            onChange={setSearchText}
            placeholder="Search for Business cards, T-shirts, Mugs, etc"
          />
          <button type="submit" className="">
            <img
              src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 4a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z' fill='%23384A62'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.943 15.943a1 1 0 011.414 0l4.35 4.35a1 1 0 11-1.414 1.414l-4.35-4.35a1 1 0 010-1.414z' fill='%23384A62'/%3E%3C/svg%3E"
              alt="search"
            />
          </button>
        </div>
      </form>

      <div
        style={{ maxWidth: 630 }}
        className={`${
          searchText?.length > 0 ? "block" : "hidden"
        } absolute z-20 overflow-hidden c-search__results mt-1 right-5 left-5`}
      >
        <div className="hide-scroll overflow-y-scroll pr-8 h-full">
          <div className="bg-white">
            {products?.length > 0 ? (
              products?.slice(0, 2).map((item) => (
                <div className="bg-white c-suggestion" key={item.id}>
                  {item.products.map((product) => (
                    <Link to={toProductSlug(product.slug)} key={product.id}>
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
                          style={{
                            width: `${isMobile ? "50px" : "80px"}`,
                            height: `${isMobile ? "50px" : "80px"}`,
                          }}
                          src={toS3Url(product.thumbnail_path)}
                          alt={product.name}
                        />
                      </div>
                    </Link>
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
