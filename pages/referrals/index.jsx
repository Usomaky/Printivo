import NotFound from "components/404";
import Services from "components/global/services";
import Head from "components/layout/head";
import Search from "components/global/search";
import Layout from "components/layout/layout";
import image from "utils/image";
import { Button } from "elements/Button/Button";
import { useEffect, useRef } from "react";
import api from "services/api";
import "twin.macro";
import { toProductSlug } from "utils";
import Link from "components/link";

const ReferralProducts = ({ category, pageError }) => {
  const sectionRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  if (pageError) {
    return <NotFound />;
  }



  useEffect(() => {
    // Function to extract the coupon parameter from the URL
    const extractCouponFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const couponParam = urlParams.get('coupon');

      if (couponParam) {
        // Store the coupon parameter in localStorage
        localStorage.setItem('pressone-coupon', couponParam);
      }
    };

    // Call the function when the component mounts
    extractCouponFromURL();
  }, []);

  return (
    <>
      <Layout customHead={true}>
        <Head
          title={category.meta_title}
          description={category.meta_description}
          keywords={category.meta_keywords}
          image={category.banner_url}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}category/${category.slug}`}
        />
        <div className="m-product mt-44 md:mt-20">
          <div className="content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <Link to="/all-products" className="text-gray-md" children={undefined}>
                All Products /{" "}
              </Link>{" "}
              <span className="text-red-light font-sf">{category?.name}</span>
            </header>

            <Search placeholder="Search for any product" query={undefined} handleResult={undefined} />

            <section className="product-hero py-8">
              <div
                className="w-full rounded-sm md:px-10 md:py-12 px-5 py-5  relative"
                style={{
                  backgroundImage: `url(${image.getCloudinaryUrlFromS3Path(
                    category.banner
                  )})`,
                  backgroundColor: category.banner ? "" : "#383B54",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                }}
              >
                <h1 className="font-dm text-white md:text-3xl text-2xl mb-8">
                  {category?.name}
                </h1>

                <h3 className="font-sf max-w-lg text-lg text-white mb-2">
                  {category?.meta_title}
                </h3>
                <p className="font-sf--reg text-white max-w-sm md:text-sm mb-5">
                  {category?.meta_description}
                </p>
                <button
                  onClick={() => scrollTo(sectionRef)}
                  className="bg-white px-6 py-3 rounded-sm text-blue-dark font-sf--bold"
                >
                  See all {category?.name.toLowerCase()}
                </button>
              </div>
            </section>

            <section
              ref={sectionRef}
              className="product-categories py-10 justify-between"
            >
              {category?.products
                ?.filter((product) => product.active)
                .map(
                  ({
                    id,
                    minimum_price,
                    name,
                    summary,
                    thumbnail_path,
                    prop_finishing,
                    prop_material,
                    slug,
                  }) => (
                    <div key={id} className="c-category md:flex mb-12">
                      <div className="md:flex md:w-2/3 md:mr-5">
                        <div className="md:mr-6 img-con mb-5">
                          <img
                            src={`https://printivo.s3.amazonaws.com${thumbnail_path}`}
                            alt={name}
                            className="object-cover w-full h-72"
                          />
                        </div>

                        <div>
                          <div className="c-category__details max-w-md">
                            <h3 className="font-sf--bold text-blue-dark text-lg mb-2">
                              {name}
                            </h3>

                            <p className="md:max-w-xs font-sf--reg mb-5 text-blue-md">
                              {summary}
                            </p>
                          </div>

                          <div className="md:w-1/4 md:hidden my-5 c-category__details">
                            {!!prop_material.length && (
                              <div className="max-w-md">
                                <h3 className="font-sf text-blue-dark text-base mb-2">
                                  Material:
                                </h3>
                                <p className="md:max-w-xs font-sf--reg text-blue-md -mt-2">
                                  {prop_material}
                                </p>
                              </div>
                            )}

                            {!!prop_finishing.length && (
                              <div className="max-w-md">
                                <h3 className="font-sf text-blue-dark text-base mb-2">
                                  Finishing:
                                </h3>
                                <p className="md:max-w-xs font-sf--reg text-blue-md -mt-2">
                                  {prop_finishing}
                                </p>
                              </div>
                            )}

                            <div className="mt-3 max-w-md">
                              <h3 className="font-sf text-blue-dark text-base mb-2">
                                Delivery:
                              </h3>
                              <p className="md:max-w-xs font-sf--reg text-blue-md">
                                3 - 5 working days for Lagos
                              </p>
                              <p className="md:max-w-xs font-sf--reg text-blue-md">
                                5 - 7 working days for other cities
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-blue-md uppercase font-sf">
                            Starting at
                          </p>
                          <h1 className="font-sf--bold text-xl mb-2 text-blue-dark">
                            ₦{minimum_price.toLocaleString()}
                          </h1>
                          <Button href={toProductSlug(slug)} withArrow={true}>
                            <span className="font-sf--bold">Order Now</span>
                          </Button>
                        </div>
                      </div>

                      <div className="md:w-1/4 hidden md:block c-category__details">
                        {!!prop_material.length && (
                          <div>
                            <h3 className="font-sf text-blue-dark text-base mb-2">
                              Material:
                            </h3>
                            <p className="font-sf--reg text-blue-md -mt-2">
                              {prop_material}
                            </p>
                          </div>
                        )}
                        {!!prop_finishing.length && (
                          <div className="mt-3">
                            <h3 className="font-sf text-blue-dark text-base mb-2">
                              Finishing:
                            </h3>
                            <p className="font-sf--reg text-blue-md -mt-2">
                              {prop_finishing}
                            </p>
                          </div>
                        )}

                        <div className="mt-3">
                          <h3 className="font-sf text-blue-dark text-base mb-2">
                            Delivery:
                          </h3>
                          <p className="font-sf--reg text-blue-md">
                            3 - 5 working days for Lagos
                          </p>
                          <p className="font-sf--reg text-blue-md">
                            5 - 7 working days for other cities
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
            </section>

            <section className="c-blog pt-5 pb-8">
              <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-4">
                Tips and Ideas from Our Blog
              </h1>
              <div className="c-blog__grid grid">
                <div className="c-blog__post">
                  <div className="c-post__image mb-4">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611066603/printivo/Rectangle_18_sn1dah.png"
                      alt="blog post image"
                      className="w-full object-cover h-72"
                    />
                  </div>
                  <div className="c-post__content">
                    <h3 className="font-sf--bold pr-4 text-blue-dark md:text-lg mb-2">
                      Seven Ways to Make Your Business Card Your Best Marketing
                      Tool
                    </h3>

                    <p className="font-sf--reg pr-2 text-blue-md mb-4">
                      Every day we hand out a tiny brochure about our businesses
                      without even realizing it. Look at the stacks on your
                      desk, the deck in your drawer or the stash in your wallet.
                      Business cards, in all sizes, shapes and colors, are
                      everywhere.
                    </p>

                    <button className="bg-blue-dark text-sm py-3 px-6 text-white font-sf--bold rounded-sm">
                      Read More
                    </button>
                  </div>
                </div>

                <div className="c-blog__post">
                  <div className="c-post__image mb-4">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611066603/printivo/Rectangle_18_sn1dah.png"
                      alt="blog post image"
                      className="w-full object-cover h-72"
                    />
                  </div>
                  <div className="c-post__content">
                    <h3 className="font-sf--bold pr-4 text-blue-dark md:text-lg mb-2">
                      Seven Ways to Make Your Business Card Your Best Marketing
                      Tool
                    </h3>

                    <p className="font-sf--reg pr-2 text-blue-md mb-4">
                      Every day we hand out a tiny brochure about our businesses
                      without even realizing it. Look at the stacks on your
                      desk, the deck in your drawer or the stash in your wallet.
                      Business cards, in all sizes, shapes and colors, are
                      everywhere.
                    </p>

                    <button className="bg-blue-dark text-sm py-3 px-6 text-white font-sf--bold rounded-sm">
                      Read More
                    </button>
                  </div>
                </div>

                <div className="c-blog__post">
                  <div className="c-post__image mb-4">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611066603/printivo/Rectangle_18_sn1dah.png"
                      alt="blog post image"
                      className="w-full object-cover h-72"
                    />
                  </div>
                  <div className="c-post__content">
                    <h3 className="font-sf--bold pr-4 text-blue-dark md:text-lg mb-2">
                      Seven Ways to Make Your Business Card Your Best Marketing
                      Tool
                    </h3>

                    <p className="font-sf--reg pr-2 text-blue-md mb-4">
                      Every day we hand out a tiny brochure about our businesses
                      without even realizing it. Look at the stacks on your
                      desk, the deck in your drawer or the stash in your wallet.
                      Business cards, in all sizes, shapes and colors, are
                      everywhere.
                    </p>

                    <button className="bg-blue-dark py-3 px-6 text-sm text-white font-sf--bold rounded-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Services />
        {/* <Newsletter /> */}
      </Layout>
    </>
  );
};

export default ReferralProducts;

export const getServerSideProps = async ({ params, res }) => {
  const slug = 'business-cards';
  try {
    const response = await api.get(
      `/categories/${slug}.json?&include=products`
    );
    const category = response?.data;

    return {
      props: {
        category,
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
