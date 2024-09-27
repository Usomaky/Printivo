import { useEffect, useState } from "react";
import "twin.macro";
import Link from "../link";
import {
  checkIFDateIsOlderThan30Days,
  checkIFDateIsNotOlderThan30DaysCategory,
} from "@/utils/index";

const MobileNav = ({ isNav, toggleNav, categoriesData }) => {
  const [categories, setCategories] = useState([]);

  let newCategories = [];
  if (categoriesData) {
    newCategories = categoriesData?.data?.map((category) => {
      return {
        ...category,
        activeAccordion: false,
      };
    });
  }

  useEffect(() => {
    categoriesData && setCategories(newCategories);
  }, [categoriesData]);

  const setActive = (id) => {
    const newCategories = categories.map((category, qid) => {
      return qid === id
        ? {
            ...category,
            activeAccordion: !category.activeAccordion,
          }
        : {
            ...category,
            activeAccordion: false,
          };
    });

    setCategories(newCategories);
  };

  return (
    <div
      className={`${isNav ? "active" : ""} c-nav--mobile bg-white px-5 py-7`}
    >
      <div className="text-right mb-6">
        <button className="close-button bg-transparent" onClick={toggleNav}>
          <img
            src="data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.947 9.66c.36.36.36.92 0 1.28-.18.18-.4.26-.64.26s-.46-.08-.64-.26l-3.66-3.66-3.66 3.66c-.18.18-.4.26-.64.26s-.46-.08-.64-.26a.894.894 0 010-1.28L4.727 6l-3.66-3.66a.894.894 0 010-1.28c.36-.36.92-.36 1.28 0l3.66 3.66 3.66-3.66c.36-.36.92-.36 1.28 0s.36.92 0 1.28L7.287 6l3.66 3.66z' fill='%23384A62'/%3E%3C/svg%3E"
            alt="close modal"
          />
        </button>
      </div>

      <div className="text-blue-dark text-lg">
        <div className="flex flex-col space-y-5 mb-6">
          <Link to="/" className="mb-6 inline-block font-sf--bold">
            Home
          </Link>
          <a
            href="https://merch.printivo.com"
            target="_blank"
            className="mb-6 inline-block font-sf--bold text-red-light"
          >
            Merch Store
          </a>
        </div>
        <h4 to="/" className="mb-6 font-sf--bold">
          All Products
        </h4>
        {categories?.map(({ name, activeAccordion, products }, id) => (
          <div
            key={id}
            className={`c-accordion c-accordion--nav mb-6 ${
              activeAccordion ? "active" : ""
            }`}
          >
            <div
              className="accordion-title text-base cursor-pointer font-sf--bold"
              onClick={() => setActive(id)}
            >
              {name}
              {checkIFDateIsNotOlderThan30DaysCategory({
                products: products,
              }) && (
                <span
                  class="ml-2 bg-magenta text-white font-medium mr-2 px-2 py-0.5 rounded-full "
                  style={{ fontSize: "0.65rem" }}
                >
                  NEW
                </span>
              )}
            </div>
            <div className="accordion-items">
              <div className="pt-5 font-sf text-blue-md font-15">
                {products.map((product, id) => (
                  <a
                    onClick={toggleNav}
                    href={`/product/${product.slug}`}
                    key={id}
                    className="mb-3 block"
                  >
                    {product.name}
                    {!checkIFDateIsOlderThan30Days(product.created) && (
                      <span class="ml-2 bg-magenta text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                        NEW
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}

        <Link to="/reseller" className="mb-6 table font-sf--bold">
          Become a reseller
        </Link>

        <Link to="/cost-calculator" className="mb-6 table font-sf--bold">
          Cost Calculator
        </Link>

        <Link to="/sell" className="mb-6 table font-sf--bold">
          Marketplace
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
