import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import api from "@/services/api";
import BrandsServices from "@/components/global/brands";
import Newsletter from "@/components/global/newsletter";
import Services from "@/components/global/services";
import HeroSearch from "@/components/home/heroSearch";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import ProductBox from "@/components/product/productBox";
import { toProductSlug, toCategorySlug } from "@/utils/index";
import getSearch from "@/utils/search";
import "twin.macro";
import Slider from "react-slick";
import Router, { useRouter } from "next/router";
import Marquee from "react-fast-marquee";

export default function IndexPage({ featuredProducts }) {
  const router = useRouter();
  const { categoriesData } = useProducts();
  const [promotionsNew, setPromotionsNew] = useState(null);

  const [queryText, setQueryText] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);

  function filterSearch(event) {
    const { data } = categoriesData || [];

    const value = event?.target?.value || "";
    const searchQuery = value.toLowerCase().replace(/\s/g, "");
    let modifiedSearchQuery = searchQuery;

    if (searchQuery === "tshirt") {
      modifiedSearchQuery = "t-shirt";
    }

    const { categoryResult, productsResult } = getSearch(
      data,
      modifiedSearchQuery
    );

    setQueryText(value);
    setSearchSuggestion(productsResult || categoryResult);
  }

  function handleSearch(event) {
    event.preventDefault();

    if (queryText === "") {
      return false;
    }
    Router.push({
      pathname: "/search-results",
      query: { keyword: queryText },
    });
  }

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await api.get(`/promotions`);
        const promotionsData = response.data;
        setPromotionsNew(promotionsData?.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const learnMore = () => {
    router.push("/pressone");
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
  };

  const bannerSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const colors = ["#f3b1cd", "#a5d5d5"]; // Array of colors

  return (
    <div className="home-nav-mobile">
      <Layout>
        <div className="c-landing w-full">
          <Slider {...bannerSettings}>
            <div className="c-hero-landing relative  mx-auto">
            <div className="c-hero-landing__main mt-16 content-container mx-auto px-20">
                <div className="title font-dm text-4xl mb-8">
                  Quality Prints
                </div>
                <div className="sub font-sf text-2xl mb-9">
                  Shipped to your doorstep
                </div>
                <HeroSearch
                  handleSearch={handleSearch}
                  searchText={queryText}
                  setSearchText={filterSearch}
                  products={searchSuggestion}
                />
              </div>
              <div
              className="absolute"
              tw="right-0 bottom-0 md:width[432px] width[350px] hidden sm:block"
            >
              <img
                src="https://res.cloudinary.com/dmwfd0zhh/image/upload/q_auto,f_auto/v1623764552/printivo/Card3_n9kqin.png"
                alt="card mockup"
                width={550}
              />
            </div>
            </div>
          </Slider>

          {/* 
              <div>
       <Slider {...bannerSettings}>
            {/* Slide 2 *
            <div className="c-hero-landing relative  mx-auto">
              <div className="c-hero-landing__main mt-16 content-container mx-auto px-20">
                <div className="title font-dm text-4xl mb-8">
                  Quality Prints
                </div>
                <div className="sub font-sf text-2xl mb-9">
                  Shipped to your doorstep
                </div>
                <HeroSearch
                  handleSearch={handleSearch}
                  searchText={queryText}
                  setSearchText={filterSearch}
                  products={searchSuggestion}
                />
              </div>
              <div
                className="absolute"
                tw="right-20 bottom-0 md:width[432px] width[350px] hidden sm:block"
              >
                <img
                  src="https://res.cloudinary.com/dtuims4ku/image/upload/v1702376637/1702376605-trimmy-happy-woman-with-christmas-gifts_copy_1_d0peqs.png"
                  alt=""
                  width={600}
                />
              </div>
            </div>

            <div className="c-hero-landing relative mx-auto">
              <div className="c-hero-landing__main mt-16 content-container mx-auto px-20">
                <div className="font-dm mb-8 black-f-2">
                  Announcing our partnership <br /> with{" "}
                  <span className="text-red-light">PressOne Africa.</span>
                </div>
                <div
                  style={{ fontSize: "16px", lineHeight: "20px" }}
                  className="sub font-sf mb-3"
                >
                  Get professional business phone number on a discount online.{" "}
                  <span
                    onClick={learnMore}
                    className="text-red-light cursor-pointer"
                  >
                    Learn More
                  </span>
                </div>{" "}
                <div
                  style={{ fontSize: "16px", lineHeight: "20px" }}
                  className="sub font-sf"
                >
                  <span style={{ fontSize: "22px" }} className="text-red-light">
                    Get 20% discount!
                  </span>{" "}
                  <br />
                  <p>on the purchase of your New business number</p>
                </div>{" "}
                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      "https://web.pressone.africa/sign-up?coupon=pressone&utm_source=printivo&utm_medium=social&utm_campaign=Printivo&utm_id=Printivo",
                      "_blank"
                    );
                  }}
                  className="mb-16 mt-5 font-15 text-white bg-blue-dark font-sf py-3 px-6"
                  style={{ borderRadius: "4px" }}
                >
                  <span>Get A Business Number!</span>
                </button>
                <HeroSearch
                  handleSearch={handleSearch}
                  searchText={queryText}
                  setSearchText={filterSearch}
                  products={searchSuggestion}
                />
              </div>
              <div
                className="absolute"
                tw="right-20 bottom-0 md:width[432px] width[350px] hidden sm:block"
              >
                <img
                  src="https://res.cloudinary.com/dtuims4ku/image/upload/v1702376637/1702376605-trimmy-happy-woman-with-christmas-gifts_copy_1_d0peqs.png"
                  alt="card mockup"
                  width={550}
                />
              </div>
            </div>
          </Slider>
       </div> */}

          {/* <div className="promo-banner-2 md:px-32 px-5 bg-[#a5d5d5]">
            <Marquee pauseOnHover={true}>
              <p className="text-[18px] font-[500] text-black">
              Notice of Closure: We will be closing our office on Friday, 22nd of December 2023 and will resume normal operations on Wednesday, 27th of December 2023.Additionally, we will have a half-day on Friday, 29th of December 2023 and will be back in full swing on Wednesday,3rd of January 2024.
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            </Marquee>
          </div> */}

          {/* Promo banner slider */}
          <div>
            <Slider {...settings}>
              {promotionsNew?.map((promotion, i) => {
                {
                  /* const colorIndex = i % colors.length;
              const backgroundColor = colors[colorIndex]; */
                }

                return (
                  <div
                    key={i}
                    className="promo-banner px-2 bg-[#f3b1cd]"
                    // style={{ backgroundColor: `${backgroundColor}` }}
                  >
                    <div className="text-div">
                      <p className="promo-banner-text">
                        {promotion.name}
                        <span
                          className="promo-banner-btn"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            router.push(`/promotion/${promotion.id}`)
                          }
                        >
                          Shop now
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>

          <div className="c-products-preview content-container mx-auto py-14">
            <div className="c-preview__header flex align-center justify-between">
              <h3 className="font-dm sm:text-3xl text-xl">Popular Products</h3>
              <Link to="/all-products" className="font-sf sm:text-base text-sm">
                See All Products
              </Link>
            </div>
            <div className="c-preview__main mt-6">
              {featuredProducts.map(
                ({
                  minimum_price,
                  id,
                  name,
                  slug,
                  minimum_quantity,
                  thumbnail_path,
                  parent_id,
                }) =>
                  parent_id !== null ? (
                    <ProductBox
                      productName={name}
                      key={id}
                      src={thumbnail_path}
                      cost={minimum_price.toLocaleString()}
                      url={
                        parent_id ? toProductSlug(slug) : toCategorySlug(slug)
                      }
                      per={minimum_quantity}
                    />
                  ) : (
                    ""
                  )
              )}
            </div>
          </div>

          <div className="c-products-preview content-container mx-auto py-8">
            <div className="c-preview__header flex align-center justify-between">
              <h3 className="font-dm sm:text-3xl text-xl">
                Popular Categories
              </h3>
              <Link to="/all-products" className="font-sf sm:text-base text-sm">
                See All Categories
              </Link>
            </div>
            <div className="c-preview__main mt-6">
              {/* {previewCategories.map(({ name, src, cost, desc, btn }, i) => (
                <div className="c-preview__box font-sf" key={name}>
                  <div className="c-box__image">
                    <img className="w-full" src={src} alt={name} />
                  </div>
                  <div
                    className="c-box__details p-4 font-sf--bold"
                    tw="height[240px] flex flex-col"
                  >
                    <div>
                      <h3 className="mb-1">{name}</h3>
                      <h3 className="mb-4 desc">{desc}</h3>
                    </div>
                    <div tw="mt-auto">
                      <p className="uppercase mb-2">starting at</p>
                      <h3 className="mb-5 text-xl">
                        ₦{cost} <span>per 100</span>
                      </h3>
                      <button
                        type="button"
                        tw="width[max-content] mt-auto"
                        className={`text-white ${i === 0 ? "eco" : ""}`}
                      >
                        <span>Browse {btn}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))} */}

              {featuredProducts
                .slice(2, 6)
                .map(
                  ({
                    minimum_price,
                    id,
                    name,
                    slug,
                    minimum_quantity,
                    thumbnail_path,
                    parent_id,
                    categories,
                  }) =>
                    parent_id === null ? (
                      <ProductBox
                        productName={name}
                        key={id}
                        src={thumbnail_path}
                        cost={minimum_price.toLocaleString()}
                        url={toCategorySlug(slug)}
                        per={minimum_quantity}
                      />
                    ) : (
                      ""
                    )
                )}
            </div>
          </div>

          <BrandsServices />
          <section className="c-testimonials py-16 mx-auto">
            <div className="c-testimonials__inner content-container mx-auto">
              <div className="c-testimonials__title font-dm mb-6 text-3xl">
                What Customers Say About Us{" "}
                <span role="img" aria-label="crown">
                  🙌🏾
                </span>
              </div>
              <div className="c-testimonials__grid grid">
                <div className="c-test-box relative grid p-4">
                  <div tw="w-8 h-8 margin-top[2px] rounded-full flex items-center justify-center border[0.97235px solid #ECE8D9]">
                    <img
                      src="data:image/svg+xml,%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18233 9.17582C6.99168 9.17582 9.07486 6.02241 9.07486 3.28788C9.07486 3.19831 9.07303 3.10915 9.06901 3.02039C9.47338 2.72829 9.82485 2.36377 10.1021 1.94881C9.73099 2.11362 9.33166 2.22457 8.91275 2.2746C9.34033 2.01841 9.66859 1.61314 9.82346 1.13001C9.42332 1.36704 8.9802 1.53932 8.50838 1.63233C8.13046 1.2301 7.59242 0.978516 6.99667 0.978516C5.85298 0.978516 4.92555 1.90527 4.92555 3.04762C4.92555 3.21001 4.94372 3.36796 4.97925 3.51947C3.258 3.43293 1.73172 2.60948 0.710253 1.35736C0.532393 1.66318 0.429836 2.01842 0.429836 2.39746C0.429836 3.11542 0.79546 3.74923 1.35145 4.12001C1.01167 4.10952 0.692486 4.01632 0.413509 3.86119C0.413205 3.86988 0.413203 3.87834 0.413203 3.88762C0.413203 4.88982 1.12707 5.72657 2.0747 5.91618C1.90068 5.96358 1.71758 5.989 1.5286 5.989C1.39536 5.989 1.26555 5.9759 1.13937 5.95168C1.40303 6.77392 2.16758 7.37226 3.07402 7.38898C2.36519 7.94413 1.47227 8.27477 0.501816 8.27477C0.334856 8.27477 0.169918 8.26528 0.0078125 8.24613C0.924378 8.83316 2.01271 9.17569 3.18245 9.17569' fill='%231DA1F2'/%3E%3C/svg%3E%0A"
                      alt="twitter icon"
                      tw="width[14px]"
                    />
                  </div>
                  <div className="c-content">
                    <div className="c-test-box__name my-2 font-sf text-sm">
                      Amina Ebele{" "}
                      <a
                        href="https://twitter.com/DeliciousAmina"
                        target="_blank"
                        tw="text-blue-sky"
                      >
                        @DeliciousAmina
                      </a>
                    </div>
                    <div className="c-test-box__desc font-sf--reg my-4">
                      I am now the unofficial{" "}
                      <a
                        href="https://twitter.com/Printivo"
                        target="_blank"
                        tw="text-blue-sky"
                      >
                        @Printivo
                      </a>{" "}
                      ambassador. What these guys just pulled to ensure I got my
                      menu cards today is stunning!
                    </div>
                  </div>
                </div>

                <div className="c-test-box relative grid p-4">
                  <div tw="w-8 h-8 margin-top[2px] rounded-full flex items-center justify-center border[0.97235px solid #ECE8D9]">
                    <img
                      src="data:image/svg+xml,%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18233 9.17582C6.99168 9.17582 9.07486 6.02241 9.07486 3.28788C9.07486 3.19831 9.07303 3.10915 9.06901 3.02039C9.47338 2.72829 9.82485 2.36377 10.1021 1.94881C9.73099 2.11362 9.33166 2.22457 8.91275 2.2746C9.34033 2.01841 9.66859 1.61314 9.82346 1.13001C9.42332 1.36704 8.9802 1.53932 8.50838 1.63233C8.13046 1.2301 7.59242 0.978516 6.99667 0.978516C5.85298 0.978516 4.92555 1.90527 4.92555 3.04762C4.92555 3.21001 4.94372 3.36796 4.97925 3.51947C3.258 3.43293 1.73172 2.60948 0.710253 1.35736C0.532393 1.66318 0.429836 2.01842 0.429836 2.39746C0.429836 3.11542 0.79546 3.74923 1.35145 4.12001C1.01167 4.10952 0.692486 4.01632 0.413509 3.86119C0.413205 3.86988 0.413203 3.87834 0.413203 3.88762C0.413203 4.88982 1.12707 5.72657 2.0747 5.91618C1.90068 5.96358 1.71758 5.989 1.5286 5.989C1.39536 5.989 1.26555 5.9759 1.13937 5.95168C1.40303 6.77392 2.16758 7.37226 3.07402 7.38898C2.36519 7.94413 1.47227 8.27477 0.501816 8.27477C0.334856 8.27477 0.169918 8.26528 0.0078125 8.24613C0.924378 8.83316 2.01271 9.17569 3.18245 9.17569' fill='%231DA1F2'/%3E%3C/svg%3E%0A"
                      alt="twitter icon"
                      tw="width[14px]"
                    />
                  </div>
                  <div className="c-content">
                    <div className="c-test-box__name my-2 font-sf text-sm">
                      Oluwatosin{" "}
                      <a
                        tw="text-blue-sky"
                        href="https://twitter.com/tosingirlfx"
                        target="_blank"
                      >
                        @tosingirlfx
                      </a>
                    </div>
                    <div className="c-test-box__desc font-sf--reg my-4">
                      <a
                        href="https://twitter.com/Printivo"
                        target="_blank"
                        tw="text-blue-sky"
                      >
                        @Printivo
                      </a>{" "}
                      delivered my mugs in 24hrs. Thank you so much! It's nice
                      doing business with you. More to come.
                    </div>
                  </div>
                </div>

                <div className="c-test-box relative grid p-4">
                  <div tw="w-8 h-8 margin-top[2px] rounded-full flex items-center justify-center border[0.97235px solid #ECE8D9]">
                    <img
                      src="data:image/svg+xml,%3Csvg width='11' height='10' viewBox='0 0 11 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.18233 9.17582C6.99168 9.17582 9.07486 6.02241 9.07486 3.28788C9.07486 3.19831 9.07303 3.10915 9.06901 3.02039C9.47338 2.72829 9.82485 2.36377 10.1021 1.94881C9.73099 2.11362 9.33166 2.22457 8.91275 2.2746C9.34033 2.01841 9.66859 1.61314 9.82346 1.13001C9.42332 1.36704 8.9802 1.53932 8.50838 1.63233C8.13046 1.2301 7.59242 0.978516 6.99667 0.978516C5.85298 0.978516 4.92555 1.90527 4.92555 3.04762C4.92555 3.21001 4.94372 3.36796 4.97925 3.51947C3.258 3.43293 1.73172 2.60948 0.710253 1.35736C0.532393 1.66318 0.429836 2.01842 0.429836 2.39746C0.429836 3.11542 0.79546 3.74923 1.35145 4.12001C1.01167 4.10952 0.692486 4.01632 0.413509 3.86119C0.413205 3.86988 0.413203 3.87834 0.413203 3.88762C0.413203 4.88982 1.12707 5.72657 2.0747 5.91618C1.90068 5.96358 1.71758 5.989 1.5286 5.989C1.39536 5.989 1.26555 5.9759 1.13937 5.95168C1.40303 6.77392 2.16758 7.37226 3.07402 7.38898C2.36519 7.94413 1.47227 8.27477 0.501816 8.27477C0.334856 8.27477 0.169918 8.26528 0.0078125 8.24613C0.924378 8.83316 2.01271 9.17569 3.18245 9.17569' fill='%231DA1F2'/%3E%3C/svg%3E%0A"
                      alt="twitter icon"
                      tw="width[14px]"
                    />
                  </div>
                  <div className="c-content">
                    <div className="c-test-box__name my-2 font-sf text-sm">
                      Oluwatosin{" "}
                      <a
                        tw="text-blue-sky"
                        href="https://twitter.com/olgablark"
                        target="_blank"
                      >
                        @olgablark
                      </a>
                    </div>
                    <div className="c-test-box__desc font-sf--reg my-4">
                      These guys{" "}
                      <a
                        href="https://twitter.com/Printivo"
                        target="_blank"
                        tw="text-blue-sky"
                      >
                        @Printivo
                      </a>{" "}
                      are really awesome and affordable. Excellent customer
                      service and delivery too. Thank you.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Services />

          <section className="c-mentions  mx-auto">
            <div className="inner content-container mx-auto">
              <div className="c-mentions__title font-dm mb-8 text-2xl sm:text-3xl">
                Our amazing work got noticed by:
              </div>
              <div className="c-mentions__grid grid">
                <div className="c-company">
                  <div className="c-company__img">
                    <img
                      src="data:image/svg+xml,%3Csvg width='212' height='30' viewBox='0 0 212 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M39.615 10H59.44V0H39.615v10zM0 0v10h9.895v20h9.895V10h9.93V0H0zM29.72 30h29.72V20H39.615V10H29.72v20zM84.708 7.552h-14.56v4.161h4.877v13.042h4.806V11.713h4.877v-4.16zM90.186 11.573c-3.428 0-5.973 2.273-5.973 6.749 0 3.95 2.156 6.713 6.079 6.713 2.05 0 3.71-.524 5.3-1.468l-1.696-2.833c-1.308.665-2.226.91-3.392.91-1.202 0-2.05-.63-2.227-2.063h7.669c.035-.21.035-.49.035-.875.035-4.79-2.191-7.133-5.795-7.133zm-1.838 5.245c.141-1.294.707-1.958 1.731-1.958 1.308 0 1.767.665 1.98 1.958h-3.711zM104.498 21.434c-1.202 0-1.838-1.05-1.838-3.112 0-2.028.565-3.182 1.732-3.182.954 0 1.378.524 2.014 1.678l3.075-2.308c-1.131-1.818-2.545-2.937-5.019-2.937-4.17 0-6.22 2.728-6.22 6.679 0 4.335 2.298 6.748 6.114 6.748 2.297 0 3.711-.874 5.231-3.077l-2.828-2.203c-.848 1.26-1.413 1.714-2.261 1.714zM119.906 11.573c-1.555 0-2.474.525-3.287 1.12v-5.84l-4.488 1.783V24.79h4.488v-7.377c0-1.609.565-2.063 1.52-2.063.918 0 1.484.454 1.484 2.098v7.342h4.488v-7.902c0-3.392-1.378-5.315-4.205-5.315zM134.889 20.874c-2.085 0-2.933-2.098-2.933-4.72 0-2.727.884-4.72 2.898-4.72 1.59 0 2.191 1.014 2.792 2.622l4.382-1.713c-1.202-3.252-2.898-5.07-7.174-5.07-4.665 0-7.951 3.357-7.951 8.88 0 5.106 2.756 8.882 7.916 8.882 4.134 0 6.078-2.203 7.244-4.44l-4.064-2.133c-.954 1.608-1.59 2.412-3.11 2.412zM149.272 12.797v-.944h-4.488v12.902h4.488v-7.028c0-1.573.672-2.098 1.767-2.098.884 0 1.52.455 2.085 1.084l1.06-4.58c-.53-.315-1.166-.56-2.12-.56-1.166 0-2.05.49-2.792 1.224zM163.761 19.23c0 1.609-.565 2.064-1.484 2.064s-1.484-.455-1.484-2.098v-7.343h-4.488v7.902c0 3.392 1.378 5.28 4.241 5.28 1.519 0 2.473-.525 3.251-1.119v.874h4.488V11.888h-4.488v7.343M179.275 11.573c-1.555 0-2.473.525-3.286 1.12v-.875h-4.488V24.72h4.488v-7.377c0-1.609.565-2.063 1.519-2.063.919 0 1.485.454 1.485 2.098v7.342h4.488v-7.902c0-3.321-1.343-5.245-4.206-5.245zM192.386 21.434c-1.201 0-1.837-1.05-1.837-3.112 0-2.028.565-3.182 1.696-3.182.954 0 1.378.524 2.014 1.678l3.075-2.308c-1.131-1.818-2.545-2.937-5.018-2.937-4.17 0-6.22 2.728-6.22 6.679 0 4.335 2.297 6.748 6.114 6.748 2.297 0 3.71-.874 5.23-3.077l-2.827-2.203c-.778 1.26-1.379 1.714-2.227 1.714zM207.794 11.573c-1.555 0-2.474.525-3.287 1.12v-5.84l-4.488 1.783V24.79h4.488v-7.377c0-1.609.566-2.063 1.52-2.063.919 0 1.484.454 1.484 2.098v7.342h4.488v-7.902c.036-3.392-1.343-5.315-4.205-5.315z' fill='%23506683'/%3E%3C/svg%3E"
                      alt="techcrunch logo"
                    />
                  </div>
                  <a
                    className="c-company__link font-sf inline-block mt-1 underline cursor-pointer"
                    href="https://techcrunch.com/2015/10/23/printivo/"
                  >
                    Read the article here
                  </a>
                </div>

                <div className="c-company">
                  <div className="c-company__img">
                    <img
                      src="data:image/svg+xml,%3Csvg width='112' height='30' viewBox='0 0 112 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M63.448 10.111c0-3.222.056-6.222.224-9l-8.568 1.611V3.5l.84.111c.616.056 1.008.278 1.232.611.224.39.392.945.504 1.778.112 1.611.224 5.278.168 11.055 0 5.723-.056 9.334-.168 10.723 3.08.666 5.488.944 7.28.944 3.36 0 5.992-.944 7.896-2.889 1.904-1.889 2.912-4.555 2.912-7.833 0-2.611-.728-4.778-2.184-6.5-1.456-1.722-3.304-2.556-5.488-2.556-1.456 0-2.968.39-4.648 1.167zm.168 17.111c-.112-1.778-.224-7.11-.224-15.833.504-.167 1.176-.278 2.016-.278 1.344 0 2.408.667 3.192 2.056.784 1.389 1.176 3.055 1.176 5.166 0 2.611-.448 4.723-1.344 6.5-.896 1.723-2.016 2.611-3.416 2.611-.448-.11-.896-.166-1.4-.222zM22.96 1.667H.56v1.11l1.176.112c.896.167 1.512.5 1.904 1 .392.555.616 1.444.672 2.667.448 6 .448 11.61 0 16.777C4.2 24.556 3.976 25.444 3.64 26c-.392.555-1.008.889-1.904 1l-1.176.167v1.11h14.448v-1.11l-1.512-.112c-.896-.11-1.512-.5-1.904-1-.392-.555-.616-1.444-.672-2.666-.168-2.222-.28-4.778-.28-7.611l3.024.055c1.624.056 2.744 1.278 3.304 3.722h1.12V10.5h-1.12c-.56 2.389-1.624 3.611-3.304 3.667l-3.024.055c0-5 .112-8.555.28-10.722h4.424c3.136 0 5.264 2 6.496 6l1.344-.389-.224-7.444zm-2.632 17.11c0 2.89.84 5.278 2.464 7.167 1.624 1.89 4.032 2.778 7.056 2.778s5.488-.944 7.28-2.889c1.792-1.889 2.632-4.277 2.632-7.166 0-2.89-.84-5.278-2.464-7.167-1.624-1.889-4.032-2.778-7.056-2.778s-5.488.945-7.28 2.89c-1.792 1.888-2.632 4.277-2.632 7.166zm12.488-6.333c.672 1.611.952 3.723.952 6.278 0 5.89-1.232 8.778-3.64 8.778-1.232 0-2.184-.833-2.856-2.5-.672-1.667-.952-3.778-.952-6.278 0-5.833 1.232-8.722 3.64-8.722 1.232-.056 2.184.778 2.856 2.444zm47.32 13.5c1.848 1.834 4.2 2.778 7 2.778 1.736 0 3.248-.333 4.592-1.055 1.344-.667 2.408-1.5 3.136-2.5l-.56-.667c-1.232.944-2.632 1.389-4.256 1.389-2.24 0-3.976-.722-5.152-2.222-1.232-1.5-1.792-3.39-1.68-5.834H95.2c0-2.666-.672-4.833-2.072-6.555-1.4-1.667-3.36-2.5-5.88-2.5-3.136 0-5.544 1-7.28 2.944-1.736 1.945-2.576 4.333-2.576 7.167 0 2.889.896 5.222 2.744 7.055zM84.28 12c.616-1.333 1.4-2 2.464-2 1.68 0 2.52 2.111 2.52 6.389l-5.936.111c.056-1.667.336-3.167.952-4.5zm25.984-2.222c-1.512-.667-3.416-1.056-5.712-1.056-2.352 0-4.2.611-5.6 1.778-1.4 1.167-2.128 2.611-2.128 4.333 0 1.5.448 2.667 1.288 3.5.84.834 2.184 1.556 3.92 2.167 1.568.555 2.688 1.111 3.248 1.611.56.556.896 1.167.896 2 0 .778-.28 1.5-.896 2.056-.56.61-1.344.888-2.352.888-2.464 0-4.312-1.777-5.6-5.333l-.952.278.224 5.555c2.016.778 4.256 1.167 6.72 1.167 2.576 0 4.536-.555 5.992-1.722 1.456-1.111 2.184-2.722 2.184-4.722 0-1.334-.336-2.445-1.064-3.278-.728-.833-1.904-1.556-3.584-2.222-1.848-.667-3.136-1.278-3.808-1.834-.672-.555-1.008-1.222-1.008-2.055 0-.833.224-1.5.728-2.056.504-.555 1.12-.777 1.904-.777 2.24 0 3.864 1.61 4.872 4.777l.952-.277-.224-4.778zm-53.872-.5c-.784-.39-1.624-.556-2.576-.556s-1.904.39-2.968 1.167c-1.064.778-1.848 1.833-2.464 3.278l.056-4.445-8.512 1.667v.778l.84.055c1.064.111 1.68.945 1.792 2.445.336 3.444.336 7.11 0 11-.112 1.5-.728 2.277-1.792 2.444l-.84.111v1.056H51.8v-1.056l-1.512-.11c-1.064-.112-1.68-.945-1.792-2.445a56.305 56.305 0 01-.112-10.223c.336-.555 1.064-.889 2.184-1 1.12-.11 2.408.223 3.752 1l2.072-5.166z' fill='%23506683'/%3E%3C/svg%3E"
                      alt="forbes logo"
                    />
                  </div>
                  <a
                    className="c-company__link font-sf inline-block underline cursor-pointer"
                    href="https://www.forbes.com/sites/montymunford/2017/10/18/these-are-the-top-african-tech-startups-you-need-to-know-about/#7b5645124161"
                  >
                    Read the article here
                  </a>
                </div>

                <div className="c-company">
                  <div className="c-company__img">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1610286399/printivo/Techpoint_Logo_ucyvgg.png"
                      alt="techpoint logo"
                    />
                  </div>
                  <a
                    className="c-company__link font-sf inline-block underline cursor-pointer"
                    href="https://techpoint.africa/2017/02/09/printivo-makes-500-startups-last-batch/"
                  >
                    Read the article here
                  </a>
                </div>

                <div className="c-company">
                  <div className="c-company__img">
                    <img
                      src="data:image/svg+xml,%3Csvg width='143' height='30' viewBox='0 0 143 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)' fill='%23506683'%3E%3Cpath d='M0 14.805V29.61h23.454l3.221-3.233 3.182-3.195V0H0v14.805zm8.918-6.234c.196.702.55.78 2.946.78h2.711l-.118 1.441-.118 1.48-2.632.117-2.671.117v3.078c0 2.494.118 3.117.589 3.117s.59-.545.59-2.532v-2.533h4.36l-.118 4.559-.118 4.597-3.064.117-3.104.117-1.925-1.91-1.925-1.908V7.792h2.2c1.847 0 2.24.117 2.397.78zm16.618 2.338v3.117h-2.161c-2.121 0-2.16 0-2.16-1.169 0-.896-.158-1.169-.786-1.169-.747 0-.786.273-.786 3.701 0 3.429.04 3.702.786 3.702.707 0 .785-.273.785-2.143v-2.143h4.321v2.416c0 2.26-.078 2.532-1.453 3.896l-1.453 1.48H15.32V11.143l1.65-1.676 1.65-1.675h6.915v3.117zM73.464 15v7.597H77v-2.649c0-4.753 1.218-6.974 2.907-5.299.472.468.629 1.442.629 4.286v3.662h4.046l-.196-4.402c-.118-2.766-.354-4.675-.707-5.221-1.14-1.753-3.929-2.22-5.657-.857l-1.022.78V7.402h-3.536V15zM110.786 15v7.597h1.532c1.021 0 1.611-.194 1.768-.623.235-.584.314-.584 1.218 0 1.1.701 3.025.818 4.203.195 1.689-.896 2.475-5.572 1.454-8.494-.786-2.182-3.693-3.039-5.54-1.597l-.982.74.197-2.688.196-2.727h-4.046V15zm6.443-.117c.825 1.169.785 3.156-.079 4.208-.629.74-.864.818-1.571.428-.708-.39-.865-.779-.865-2.57 0-1.598.157-2.183.707-2.494.943-.585 1.14-.546 1.808.428zM136.714 15v7.597h3.536V7.403h-3.536V15zM42.036 9.974c0 .312-.511 1.13-1.179 1.792-1.257 1.247-1.532 2.26-.59 2.26.472 0 .59.545.59 2.416 0 3.078.59 5.26 1.572 5.766.825.428 3.496.506 4.478.156.393-.156.629-.702.629-1.598 0-.818-.157-1.246-.432-1.09-.197.155-.825.155-1.375.038-.904-.233-.943-.428-.943-2.96v-2.728h1.375c1.296 0 1.375-.078 1.375-1.364 0-1.285-.079-1.363-1.375-1.363-1.218 0-1.375-.117-1.375-.974s-.157-.974-1.375-.974c-.982 0-1.375.155-1.375.623zM51.936 11.922c-1.69.857-2.515 2.455-2.515 4.987-.039 3.78 1.925 5.688 5.893 5.688 2.986 0 4.007-.506 4.007-1.948 0-1.169-.039-1.207-1.453-.896-2.279.468-3.732.273-4.322-.506-.275-.39-.51-.818-.51-1.013 0-.156 1.61-.312 3.535-.312h3.536v-1.169c0-1.558-.864-3.506-1.925-4.441-1.178-1.052-4.557-1.247-6.246-.39zm4.007 2.338c1.021.974.746 1.324-1.179 1.324-1.296 0-1.69-.117-1.493-.506.943-1.598 1.65-1.831 2.672-.818zM64.94 11.883c-1.808.78-2.868 2.688-2.868 5.182 0 3.701 1.728 5.532 5.264 5.532 2.671 0 3.771-.623 3.771-2.22 0-1.403-.196-1.48-1.807-.857-2.318.857-4.046-.74-3.496-3.234.353-1.598 1.689-2.338 3.26-1.87 1.179.311 1.297.272 1.808-.896.51-1.17.471-1.286-.511-1.715-1.375-.623-3.89-.584-5.422.078zM89.768 11.805c-2.593 1.208-3.654 3.896-2.79 7.208.59 2.377 2.28 3.584 5.03 3.584 2.67 0 3.456-.506 3.456-2.181 0-1.17-.118-1.364-.668-1.13-1.846.701-2.789.662-3.614-.156-1.1-1.091-1.1-3.273-.04-4.325.904-.896.944-.896 2.633-.428 1.178.35 1.257.272 1.65-.857.314-.78.314-1.325.04-1.598-.63-.623-4.4-.701-5.697-.117zM100.1 11.766c-1.375.35-1.414.429-1.021 1.48.353 1.053.471 1.13 2.592 1.053 1.808-.078 2.24.039 2.358.584.117.546-.118.701-.904.701-.55 0-1.846.195-2.789.429-1.415.35-1.925.701-2.397 1.714-1.139 2.377.315 4.87 2.829 4.87 1.453 0 3.339-.7 3.339-1.246 0-.624.747-.312.982.467.197.585.59.78 1.611.78h1.336v-3.936c0-4.636-.59-6.311-2.436-6.935-1.454-.506-3.496-.506-5.5.04zm4.007 6.74c0 1.052-1.178 1.87-2.121 1.52-1.375-.546-.432-2.494 1.218-2.494.707 0 .903.234.903.974zM126.029 11.766c-1.375.35-1.415.429-1.022 1.48.354 1.053.472 1.13 2.593 1.053 1.807-.078 2.239.039 2.357.584.118.546-.118.701-.903.701-.55 0-1.847.195-2.79.429-1.414.35-1.925.701-2.396 1.714-1.139 2.377.314 4.87 2.828 4.87 1.454 0 3.34-.7 3.34-1.246 0-.624.746-.312.982.467.196.585.589.78 1.611.78h1.335v-3.936c0-4.636-.589-6.311-2.435-6.935-1.454-.506-3.497-.506-5.5.04zm4.007 6.74c0 1.052-1.179 1.87-2.122 1.52-1.375-.546-.432-2.494 1.218-2.494.707 0 .904.234.904.974z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='143' height='30' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
                      alt="techcabal logo"
                    />
                  </div>
                  <a
                    className="c-company__link font-sf inline-block underline cursor-pointer"
                    href="https://techcabal.com/2016/01/14/the-printivo-story/"
                  >
                    Read the article here
                  </a>
                </div>

                <div className="c-company">
                  <div className="c-company__img">
                    <img
                      src="data:image/svg+xml,%3Csvg width='65' height='30' viewBox='0 0 65 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M20 8.571h-5a6.429 6.429 0 100 12.858h5.593a.836.836 0 00.836-.836V5.836a5.835 5.835 0 0110.9-2.893l6.242 10.921V5.836a5.836 5.836 0 0110.9-2.893l6.243 10.921V0h3.572L60 .714 60.714 0h3.572v24.164a5.836 5.836 0 01-10.9 2.893l-6.243-10.921v8.028a5.836 5.836 0 01-10.9 2.893L30 16.136v8.028A5.836 5.836 0 0124.164 30H15a15 15 0 010-30h5v3.571l-.714.715L20 5v3.571z' fill='%23506683'/%3E%3Cpath d='M20 4.286h-5a10.714 10.714 0 100 21.428h9.164a1.55 1.55 0 001.55-1.55V5.836a1.55 1.55 0 012.893-.772l11.357 19.872a1.55 1.55 0 002.893-.772V5.836a1.55 1.55 0 012.893-.772l11.357 19.872A1.55 1.55 0 0060 24.164V0' stroke='%23fff' stroke-width='1.429'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='64.286' height='30' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
                      alt="CNN logo"
                    />
                  </div>
                  <a
                    className="c-company__link font-sf inline-block underline cursor-pointer"
                    href="https://edition.cnn.com/videos/world/2016/12/28/african-start-up-printivo.cnn"
                  >
                    Read the article here
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* <Newsletter /> */}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async () => {
  const featuredProductsResponse = await api.get(
    "/products/featured.json?type=printivo&limit=100"
  );

  const featuredProducts = featuredProductsResponse.data.data;

  return {
    props: {
      featuredProducts,
    },
  };
};
