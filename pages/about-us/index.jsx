import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useRef } from "react";
import "twin.macro";

const AboutUs = () => {
  const sectionRef = useRef();
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-contact content-container mx-auto md:pt-9 pt-11">
            <section tw="flex flex-col-reverse md:flex-row justify-between pt-16 mb-40">
              <div tw="py-10 max-width[600px] w-full mr-8">
                <h1 tw="md:text-7xl text-3xl whitespace-nowrap font-serif relative z-10 mb-5 md:mb-20 text-blue-dark">
                  Providing quality print <br /> services across africa
                </h1>
                <div tw="md:flex justify-between">
                  <p tw="text-blue-dark text-lg font-normal md:max-width[284px] md:mb-0 mb-10 leading-6 mr-8">
                    Born out of our love for paper and ink, Printivo aims to
                    help African business print marketing and business materials
                    with ease.
                  </p>
                  <div>
                    <p tw="text-blue-dark text-lg font-normal md:max-width[284px] mb-4 leading-6">
                      We are setting news standards for prints through quality,
                      quick delivery and remarkable designs.
                    </p>
                    <button
                      onClick={() =>
                        sectionRef.current.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                      css={`
                        background: rgba(56, 74, 98, 0.1);
                        box-shadow: 0px 10px 20px 1px rgba(164, 164, 164, 0.1);
                        border-radius: 3px;
                        display: flex;
                      `}
                      tw="py-3 px-6 text-blue-dark font-bold"
                    >
                      <span tw="inline-block mr-2.5">But Why Print?</span>
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5651 14.3804L12.5651 19.3604C12.4051 19.5204 12.2051 19.6004 12.0051 19.6004C11.8051 19.6004 11.6051 19.5204 11.4451 19.3604L6.44507 14.3804C6.12507 14.0604 6.12507 13.5604 6.44507 13.2404C6.76507 12.9204 7.26508 12.9204 7.58508 13.2404L11.2251 16.8604V5.20039C11.2251 4.76039 11.5851 4.40039 12.0251 4.40039C12.4651 4.40039 12.8251 4.76039 12.8251 5.20039V16.8804L16.4651 13.2604C16.7851 12.9404 17.2851 12.9404 17.6051 13.2604C17.8851 13.5604 17.8851 14.0604 17.5651 14.3804Z"
                            fill="#384A62"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div tw="md:max-width[667px] w-full">
                <img
                  src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1622027908/printivo/Rectangle_100_yypzbv.jpg"
                  alt=""
                  tw="h-full object-cover"
                />
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[1194px] ml-auto" />

            <section tw="pt-6 pb-14 md:flex justify-between" ref={sectionRef}>
              <p tw="text-xs hidden md:block mt-20 font-semibold text-blue-dark">
                Why should you invest <br /> in print?
              </p>
              <div tw="max-width[950px] w-full md:flex justify-between">
                <div>
                  <h2 tw="font-serif text-blue-dark font-size[32px] mb-8">
                    Why Print?
                  </h2>
                  <div tw="md:hidden mb-10">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1622818720/printivo/Rectangle_104_rdgza2.jpg"
                      alt=""
                    />
                  </div>
                  <div tw="md:flex">
                    <p tw="text-blue-dark text-lg font-normal md:max-width[284px] md:mb-0 mb-6 leading-6 mr-8">
                      The internet is a great platform for networking. Social
                      media is amazing and it is gradually changing the ways we
                      do business. <br /> <br /> Think about it, can you put
                      your online profile in your pocket? You have on one minute
                      to win an elevator pitch, wouldn’t you rather close it
                      with a business card?
                    </p>
                    <p tw="text-blue-dark text-lg font-normal md:max-width[300px] w-full md:mb-0 mb-10 leading-6 mr-8">
                      Touch it, feel it, give it, write on it, hand it out at
                      conferences. Only prints can do this. It's time to do
                      business beyond virtual.
                    </p>
                  </div>
                </div>
                <div tw="hidden md:block">
                  <img
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1622818720/printivo/Rectangle_104_rdgza2.jpg"
                    alt=""
                  />
                </div>
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[1194px] ml-auto" />
            <section tw="max-width[1194px] ml-auto w-full mb-60">
              <h1 tw="md:text-7xl text-3xl font-serif my-6 text-blue-dark">
                How Printivo Works
              </h1>
              <div tw="flex flex-wrap">
                <div tw="max-width[284px] w-full mr-8 mb-8">
                  <img
                    tw="w-full mb-3"
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1622027878/printivo/Rectangle_101_o0rqib.jpg"
                    alt=""
                  />
                  <h3 tw="mb-3 text-lg font-bold letter-spacing[.5px] text-blue-dark">
                    Browse and Select
                  </h3>
                  <p tw="text-blue-dark text-base">
                    Browse through any of our <br /> easily customizable
                    tamplates <br /> and products, then select the one you like.
                  </p>
                </div>

                <div tw="max-width[284px] w-full mr-8 mb-8">
                  <img
                    tw="w-full mb-3"
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1622027878/printivo/Rectangle_102_bshjok.jpg"
                    alt=""
                  />
                  <h3 tw="mb-3 text-lg font-bold letter-spacing[.5px] text-blue-dark">
                    Customize and order
                  </h3>
                  <p tw="text-blue-dark text-base">
                    Custimize the selected template to your taste. You can
                    change/ upload images and even insert logos. <br /> Place
                    your order when done.
                  </p>
                </div>

                <div tw="max-width[284px] w-full mb-8">
                  <img
                    tw="w-full mb-3"
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1622027878/printivo/Rectangle_103_ecbxna.jpg"
                    alt=""
                  />
                  <h3 tw="mb-3 text-lg font-bold letter-spacing[.5px] text-blue-dark">
                    We print and ship
                  </h3>
                  <p tw="text-blue-dark text-base mb-6">
                    We print your order based on your specification and ship it
                    within days to your selected location accross the continent.
                  </p>
                  <Link
                    to="/all-products"
                    tw="py-3 px-6 bg-red-light text-white block border-radius[3px] font-bold letter-spacing[.5px] box-shadow[0px 10px 20px 1px rgba(164, 164, 164, 0.1)]"
                  >
                    See all our avaliable products
                  </Link>
                  <div tw="flex items-center mt-3">
                    <h5 tw="text-blue-dark mb-1 font-serif text-4xl relative mr-2.5">
                      20%{" "}
                      <sup tw="font-size[7px] absolute right[9px] top[6px]">
                        Off
                      </sup>
                    </h5>
                    <p tw="text-xs leading-5 font-semibold w-full">
                      Ship and print with us today and get 20% off your very
                      first order.
                    </p>
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

export default AboutUs;
