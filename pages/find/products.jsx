import { useState } from "react";
import Link from "@/components/link";
import Layout from "@/components/layout/layout";
import NewsLetter from "@/components/global/newsletter";
import ProductTab from "@/components/results/productTab";
import CategoryTab from "@/components/results/categoryTab";
import { useRouter } from "next/router";
import Services from "@/components/global/services";
import Search from "@/components/global/search";
import { toProductsArray } from "@/utils/index";
const Products = () => {
  const router = useRouter();
  const { query } = router.query;
  const [currentTab, setCurrentTab] = useState("product");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [suggestedCategories, setSuggestedCategories] = useState([]);

  const tabHandler = (current) => {
    if (current !== currentTab) {
      setCurrentTab(current);
    }
  };

  const TABS = {
    product: (
      <ProductTab previewProducts={suggestedProducts} switchTabs={tabHandler} />
    ),
    category: (
      <CategoryTab
        previewProducts={suggestedProducts}
        switchTabs={tabHandler}
      />
    ),
  };

  const handleResult = (data) => {
    setSuggestedProducts(data);
  };

  return (
    <Layout>
      <div className="mt-44 md:mt-20 content-container mx-auto">
        <header className="bread-crumb font-sf text-xs mb-5">
          <Link to="/" className="text-gray-md">
            Home /{" "}
          </Link>{" "}
          <span className="text-blue-dark font-sf--bold">Search Results</span>
        </header>
        <h2 className="sm:text-3xl text-lg text-blue-dark font-dm mb-3">
          Showing all results for “{query}”
        </h2>
        <div className="input-con c-find hide-results relative max-w-md mb-10">
          <Search query={query} handleResult={handleResult} />
        </div>

        <div className="c-tabs">
          <div className="c-tabs__header flex items-center font-sf--bold mb-4">
            <button
              onClick={() => tabHandler("product")}
              className={`${
                currentTab === "product" ? "active" : ""
              } mr-4 flex items-center`}
            >
              <span>Product Results</span>{" "}
              <span className="bg-red-light flex justify-center items-center ml-2 font-sf text-xs px-2 py-0.5">
                {toProductsArray(suggestedProducts)?.length}
              </span>
            </button>
            <button
              onClick={() => tabHandler("category")}
              className={`${
                currentTab === "category" ? "active" : ""
              } flex items-center`}
            >
              <span>Category Results</span>{" "}
              <span className="bg-red-light flex justify-center items-center ml-2 font-sf text-xs px-2 py-0.5">
                {suggestedProducts?.length}
              </span>
            </button>
          </div>
          <hr />
          <div className="c-tab__body mt-5">{TABS[currentTab]}</div>
        </div>
      </div>
      <Services />
      {/* <NewsLetter /> */}
    </Layout>
  );
};

export default Products;
