import React, { useState } from "react";
import NotFound from "@/components/404";
import api from "@/services/api";
import Layout from "@/components/layout/layout";
import Services from "@/components/global/services";
import Head from "@/components/layout/head";
import ProductBox from "@/components/product/productBox";
import { toProductSlug } from "@/utils/index";
import ReactPaginate from "react-paginate";

const Promotions = ({ promotions, pageError }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 10;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  if (pageError) {
    return <NotFound />;
  }

  console.log(promotions.data);
  return (
    <Layout customHead={true}>
      <Head
        title={"Promotions"}
        description={"Printivo Promotion page"}
        keywords={"Promotions"}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}promotion`}
      />
      <div className="m-product mt-44 md:mt-20">
        <section className="mt-16 bg-cream-md">
          <div className="w-full flex flex-col justify-center items-center md:px-10 md:py-24 px-5 py-10 relative campaign__hero_section">
            <h1 className="text-blue-dark text-3xl md:text-7xl font-normal font-serif campaign__header text-center mb-7">
              Get 10% off all banner orders this week
            </h1>
            <div className="flex justify-center items-center bg-blue-dark rounded-3xl py-2.5 px-6">
              <p className="text-sm md:text-base font-sans font-semibold text-cream-md text-center">
                Place an order between now and the weekend.
              </p>
            </div>
          </div>
        </section>
        <section className="content-container mx-auto mt-4 md:mt-16">
          <div className="flex justify-center items-center mb-10">
            <h2 className="font-bold md:font-semibold text-lg md:text-3xl font-sans campaign__order_info text-blue-dark text-center">
              Use coupon code{" "}
              <span className="items-center font-extrabold">B10</span> at
              checkout to activate offer.
            </h2>
          </div>
          <div className="c-content__body">
            <div className="products c-products-preview">
              {promotions.data
                .slice(startIndex, endIndex)
                .map((promotion, index) => (
                  <ProductBox
                    productName={promotion.name}
                    src={promotion.thumbnail_path}
                    cost={promotion.minimum_price.toLocaleString()}
                    url={toProductSlug(promotion.slug)}
                    per={promotion.minimum_quantity}
                    key={index}
                  />
                ))}
            </div>
            <ReactPaginate
              pageCount={Math.ceil(promotions.data.length / productsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </section>
      </div>
      <Services />
    </Layout>
  );
};

export default Promotions;

export const getServerSideProps = async ({ params, res }) => {
  try {
    const response = await api.get(
      `/products/featured.json?type=promotion&limit=100`
    );
    const promotions = response.data;
    return {
      props: {
        promotions,
      },
    };
  } catch (error) {
    res.StatusCode = 404;
    return {
      props: {
        pageError: true,
      },
    };
  }
};