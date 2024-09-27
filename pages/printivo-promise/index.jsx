import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useRef } from "react";
import "twin.macro";

const Promise = () => {
  const sectionRef = useRef();
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-contact content-container mx-auto md:pt-9 pt-11">
            <section tw="md:pt-16 md:mb-40 mb-16">
              <h1 tw="md:text-7xl text-3xl font-serif mb-8 text-blue-dark">
                Our Promise
              </h1>
              <div tw="flex flex-col-reverse md:flex-row">
                <div tw="md:max-width[284px] mt-8 md:mt-0 w-full mr-8">
                  <h2 tw="text-2xl text-blue-dark font-semibold mb-4">
                    Happiness all the way
                  </h2>

                  <p tw="text-blue-dark text-lg font-normal leading-6 w-full">
                    First, we don’t have Customer Service Officers, we have{" "}
                    <b tw="font-semibold">Customer Happiness</b> Officers whose
                    job is to ensure you are happy with your orders. Should ever
                    receive a Printivo delivery and you are not happy. Please
                    get in touch with us and we will fix it immediately.
                  </p>
                </div>
                <div tw="md:max-width[916px] w-full">
                  <img
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623066054/printivo/Rectangle_105_doaofv.jpg"
                    alt=""
                    tw="w-full h-full object-cover mb-2"
                  />
                  <p tw="text-sm text-blue-dark">
                    Printivo ensures all orders are shipped fast and are in good
                    condition.
                  </p>
                </div>
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[950px] ml-auto" />

            <section tw="pt-6 pb-14 md:flex justify-between" ref={sectionRef}>
              <p tw="text-base hidden md:block font-semibold text-blue-dark">
                Here is how we ensure <br />
                you are happy:
              </p>
              <div tw="max-width[950px] w-full flex flex-wrap">
                <div tw="max-width[284px] w-full mr-8 mb-8">
                  <img
                    tw="w-full mb-3"
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623067094/printivo/Rectangle_101_qqyry0.jpg"
                    alt=""
                  />
                  <h3 tw="mb-3 text-lg font-bold letter-spacing[.5px] text-blue-dark">
                    A Message
                  </h3>
                  <p tw="text-blue-dark text-base">
                    An automated confirmation that we have received your
                    message.
                  </p>
                </div>

                <div tw="max-width[284px] w-full mr-8 mb-8">
                  <img
                    tw="w-full mb-3"
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623067094/printivo/Rectangle_102_xaexps.jpg"
                    alt=""
                  />
                  <h3 tw="mb-3 text-lg font-bold letter-spacing[.5px] text-blue-dark">
                    A Call
                  </h3>
                  <p tw="text-blue-dark text-base">
                    A happiness officer will call you to personally help you fix
                    the issue.
                  </p>
                </div>

                <div tw="max-width[284px] w-full mr-8 mb-8">
                  <img
                    tw="w-full mb-3"
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623067094/printivo/Rectangle_103_vrlhsy.jpg"
                    alt=""
                  />
                  <h3 tw="mb-3 text-lg font-bold letter-spacing[.5px] text-blue-dark">
                    A Solution
                  </h3>
                  <p tw="text-blue-dark text-base">
                    We will do anything to fix the issue with your order,
                    including a replacement or a full refund.
                  </p>
                </div>
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[950px] ml-auto" />

            <section tw="pt-6 pb-14 md:flex justify-between" ref={sectionRef}>
              <p tw="text-base hidden md:block font-semibold text-blue-dark">
                Timelines associated <br />
                with shipping:
              </p>
              <div tw="max-width[950px] w-full flex flex-wrap">
                <div tw="max-width[284px] w-full mr-8 mb-8">
                  <h3 tw="mb-3 text-lg font-medium letter-spacing[.5px] text-blue-dark">
                    Business cards, letterhead, envelops, stickers, roll up
                    banner
                  </h3>
                  <p tw="text-blue-dark text-base">
                    <b tw="font-semibold">Lagos</b> – Five working days.
                  </p>

                  <p tw="text-blue-dark text-base">
                    <b tw="font-semibold">Other Nigerian cities</b> – Seven
                    working days.
                  </p>
                </div>

                <div tw="max-width[284px] w-full mr-4 mb-8">
                  <h3 tw="mb-3 text-lg font-medium letter-spacing[.5px] text-blue-dark">
                    Greeting cards, bags, imitations (special), notepads, flyers
                    etc.
                  </h3>
                  <p tw="text-blue-dark text-base">
                    <b tw="font-semibold">Lagos</b> – Five working days.
                  </p>

                  <p tw="text-blue-dark text-base">
                    <b tw="font-semibold">Other Nigerian cities</b> – Seven
                    working days.
                  </p>
                </div>

                <div tw="max-width[310px] w-full mb-8 bg-blue-dark text-white px-3 py-6">
                  <h3 tw="mb-3 text-lg font-medium letter-spacing[.5px] text-white">
                    Special product with unique specifications
                  </h3>

                  <p tw="text-base">
                    Shipping dates subject to agreement made at the point of
                    order based on required specifications.
                  </p>
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

export default Promise;
