import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import api from "@/services/api";
import { useState } from "react";
import {
  toS3Url,
  checkIFDateIsNotOlderThan30DaysCategory,
} from "@/utils/index";

const AllProducts = ({ categories }) => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [activeProducts, setActiveProducts] = useState(categories);

  const categoryTitles = () => {
    return categories.map((category) => category.name);
  };

  const displayProducts = (categoryName) => {
    if (categoryName === "All") {
      setActiveProducts(categories);
      setCurrentCategory("All");
    } else {
      const selectedCategory = categories.find(
        (category) => category.name === categoryName
      );
      setActiveProducts([selectedCategory]);
      setCurrentCategory(categoryName);
    }
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
              <span className="text-red-blue font-sf">All Products</span>
            </header>

            <Search placeholder="Search for any product" />

            <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-2 -mt-4">
              All products
            </h1>

            <section className="c-allproducts md:flex w-full justify-between mt-16">
              <div className="c-allproducts__tabs md:table w-full md:mr-16">
                <h2 className="font-dm text-blue-dark mb-1 font-22">Filter</h2>
                <hr className="md:mb-10 mb-4" />
                <div className="inner-tab font-sf md:block flex text-blue-md font-13">
                  <h5
                    className={`${
                      currentCategory === "All" ? "active" : ""
                    } mb-5 mr-6 md:mr-0 flex-shrink-0`}
                    onClick={() => displayProducts("All")}
                  >
                    All
                  </h5>
                  {categoryTitles().map((category) => (
                    <h5
                      key={category}
                      className={`${
                        currentCategory === category ? "active" : ""
                      } mb-5 mr-6 md:mr-0 flex-shrink-0`}
                      onClick={() => displayProducts(category)}
                    >
                      {category}
                      {checkIFDateIsNotOlderThan30DaysCategory(
                        categories.filter((c) => c.name === category)[0]
                      ) && (
                        <span
                          class="ml-2 bg-magenta text-white font-medium mr-2 px-2 py-0.5 rounded-full "
                          style={{ fontSize: "0.65rem" }}
                        >
                          NEW
                        </span>
                      )}
                    </h5>
                  ))}
                </div>
              </div>
              <div className="md:table c-allproducts__content">
                {activeProducts.map(({ name, products }) => (
                  <div key={name} className="mb-16">
                    <h2 className="font-dm text-blue-dark mb-6 font-22">
                      {name}
                    </h2>
                    <div className="c-allproducts__grid">
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
                ))}
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default AllProducts;

export const getServerSideProps = async () => {
  const response = await api.get(
    "/categories.json?vendor_id=1&include=products&active=1&products$active=1&limit=100&sort[name]=asc"
  );

  const categories = response.data.data;

  return {
    props: {
      categories,
    },
  };
};
