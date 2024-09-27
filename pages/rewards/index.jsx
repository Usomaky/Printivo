import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useRef } from "react";
import "twin.macro";

const Rewards = () => {
  const sectionRef = useRef();

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-contact content-container mx-auto md:pt-9 pt-11">
            <section tw="flex flex-col-reverse md:flex-row justify-between pt-16 mb-40">
              <div tw="py-10 max-width[600px] w-full mr-8">
                <h1 tw="md:text-7xl text-3xl whitespace-nowrap font-serif relative z-10 mb-5 md:mb-20 text-blue-dark">
                  Give your friends huge <br />
                  discounts on Printivo
                </h1>
                <div tw="md:flex justify-between">
                  <div>
                    <p tw="text-blue-dark text-lg font-normal md:max-width[284px] mb-4 leading-6">
                      Earn as high as N1000 every time your friends print on
                      Printivo.com!
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
                      <span tw="inline-block mr-2.5">See how it works</span>
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
                  src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623064395/printivo/Rectangle_100_kbfpmj.jpg"
                  alt=""
                  tw="h-full object-cover"
                />
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[1194px] ml-auto" />

            <section tw="pt-6 pb-36 md:flex justify-between" ref={sectionRef}>
              <p tw="text-xs hidden md:block mt-20 font-semibold text-blue-dark">
                How to give your friends <br />
                discounts:
              </p>
              <div tw="max-width[950px] w-full">
                <h2 tw="font-serif text-blue-dark font-size[32px] mb-8">
                  How it works
                </h2>
                <div tw="flex flex-wrap w-full">
                  <div tw="max-width[284px] w-full mr-8">
                    <div tw="">
                      <img
                        src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623160764/printivo/image_3_zuvjk8.png"
                        alt=""
                        tw="mb-2 mix-blend-mode[luminosity]"
                      />
                    </div>
                    <p tw="text-blue-dark text-lg leading-6">
                      Login to your Printivo account or create a new account
                    </p>
                  </div>

                  <div tw="max-width[284px] mb-8 w-full mr-8">
                    <div tw="">
                      <img
                        src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623160764/printivo/image_5_sfzi9n.png"
                        alt=""
                        tw="mb-2 mix-blend-mode[luminosity]"
                      />
                    </div>
                    <p tw="text-blue-dark text-lg leading-6">
                      On the "Rewards" page, copy your referral link and share
                      it with your friends
                    </p>
                  </div>

                  <div tw="max-width[284px] mb-8 w-full mr-8">
                    <div tw="">
                      <img
                        src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623160764/printivo/image_4_uprw32.png"
                        alt=""
                        tw="mb-2 mix-blend-mode[luminosity]"
                      />
                    </div>
                    <p tw="text-blue-dark text-lg leading-6">
                      Earn up to N1,000 each time someone new orders with your
                      referral link
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[1194px] ml-auto" />

            <section tw="max-width[1194px] margin-top[76px] ml-auto w-full mb-36">
              <h3 tw="sm:font-size[32px] text-2xl font-serif text-blue-dark mb-2">
                Your friends are in good company <span role="img">👑</span>
              </h3>
              <p tw="max-width[765px] mb-11 text-blue-md sm:text-2xl text-xl font-semibold">
                Our print services and solutions are trusted by these brands and
                over 15,000 other businesses in Nigeria.
              </p>
              <div>
                <img
                  src="https://res.cloudinary.com/dmwfd0zhh/image/upload/q_auto:best/v1623162061/printivo/Group_157_icigzp.png"
                  alt="brands we've partnered with"
                />
              </div>
            </section>
            <section tw="mb-28">
              <div tw="flex flex-col justify-center items-center">
                <h4 tw="font-serif text-blue-dark font-size[32px] mb-4">
                  Start earning Now!
                </h4>
                <Link
                  to="/members/sign-up"
                  css={`
                    box-shadow: 0px 10px 20px 1px rgba(164, 164, 164, 0.1);
                    border-radius: 3px;
                    display: flex;
                  `}
                  tw="py-3 px-6 text-white font-bold bg-red-light"
                >
                  <span tw="inline-block mr-2.5 letter-spacing[.5px]">
                    Sign Up
                  </span>
                  <span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.3653 12.56L14.3853 17.56C14.2253 17.72 14.0253 17.8 13.8253 17.8C13.6253 17.8 13.4253 17.72 13.2653 17.56C12.9453 17.24 12.9453 16.74 13.2653 16.42L16.8853 12.78H5.20527C4.76527 12.78 4.40527 12.42 4.40527 11.98C4.40527 11.54 4.76527 11.18 5.20527 11.18H16.8853L13.2653 7.54004C12.9453 7.22004 12.9453 6.72003 13.2653 6.40003C13.5853 6.08003 14.0853 6.08003 14.4053 6.40003L19.3853 11.4C19.6853 11.74 19.6853 12.26 19.3653 12.56Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default Rewards;
