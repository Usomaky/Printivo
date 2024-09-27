import React from "react";
import NotFound from "@/components/404";
import api from "@/services/api";
import Layout from "@/components/layout/layout";
import Services from "@/components/global/services";
import Head from "@/components/layout/head";
import image from "@/utils/image";
import ProductBox from "@/components/product/productBox";
import { toProductSlug } from "@/utils/index";

const CampaignMaterials = ({ campaign, pageError }) => {
  if (pageError) {
    return <NotFound />;
  }
  return (
    <Layout customHead={true}>
      <Head
        title={campaign.meta_title}
        description={campaign.meta_description}
        keywords={campaign.meta_keywords}
        image={campaign.banner_url}
        url={`${process.env.NEXT_PUBLIC_BASE_URL}campaign`}
      />
      <div className="m-product mt-44 md:mt-20">
        <section className="mt-16">
          <div
            className="w-full flex justify-center items-center md:px-10 md:py-24 px-5 py-10 relative campaign__hero_section"
            style={{
              backgroundImage: `url(https://printivo.s3.us-west-2.amazonaws.com/files/temp/1660584149-Political%20platform%20header.png)`,
              backgroundColor: campaign.banner ? "" : "#FDFAF0",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          ></div>
        </section>
        <section className="content-container mx-auto mt-4 md:mt-16">
          <div className="flex justify-center items-center mb-10">
            <h2 className="font-bold md:font-semibold text-lg md:text-3xl font-sans campaign__order_info text-blue-dark text-center">
              Order promotional print items and have them delivered to you
              anywhere in Nigeria
            </h2>
          </div>
          <div className="c-content__body">
            <div className="products c-products-preview">
              {campaign.products.map((product) => (
                <ProductBox
                  productName={product.name}
                  src={product.thumbnail_path}
                  cost={product.minimum_price.toLocaleString()}
                  url={toProductSlug(product.slug)}
                  per={product.minimum_quantity}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Services />
    </Layout>
  );
};

export default CampaignMaterials;

export const getServerSideProps = async ({ params, res }) => {
  try {
    const response = await api.get(
      `/categories/campaign-materials.json?&include=products`
    );
    const campaign = response.data;

    return {
      props: {
        campaign,
      },
    };
  } catch (error) {
    console.log(error);
    res.StatusCode = 404;
    return {
      props: {
        pageError: true,
      },
    };
  }
};
