import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import LimitedTextArea from "@/components/form/LimitedTextArea";
import Toastr from "toastr";
import api from "@/services/api";
import { slugify } from "@/utils/index";
import React, { useRef, useState } from "react";
import "twin.macro";

const Sell = () => {
  const formRef = useRef(null);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const postData = Object.fromEntries(formData);

    setLoading(true);
    try {
      await api.post("/stores.json", { ...postData, slug });
      Toastr.success("Store successfully created");
      formRef.current.reset();
    } catch (error) {
      const { response } = error;
      Toastr.error(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const onNameChange = (e) => {
    setSlug(slugify(e.target.value));
  };

  return (
    <>
      <Layout>
        <div className="m-product mt-44 md:mt-20">
          <div className="content-container mx-auto">
            <div tw="pt-4">
              <Search placeholder="Search for any product" />
            </div>

            <section tw="py-8">
              <div tw="w-full relative py-8 sm:py-14 px-7 rounded-sm sm:px-12 background-color[#2C4752]">
                <div tw="z-10 relative">
                  <h1 tw="font-serif text-cream-md text-2xl sm:font-size[32px] md:mb-10 mb-5">
                    Sell your designs to printivo customers
                  </h1>
                  <h2 tw="text-white font-sans font-bold tracking-wider text-lg mb-2 leading-6">
                    Create awesome designs on printivo and earn royalties.
                  </h2>
                  <p tw="text-white font-sans max-width[630px] mb-6">
                    Our market place lets you upload your design and text to our
                    print products and you earn 15% of the order value each time
                    a customer makes use of your design. You can also sell
                    non-customizable designs to be printed on merchandise.
                  </p>

                  <button
                    tw="rounded-sm bg-white text-blue-dark font-sans font-bold py-3 px-6"
                    onClick={() => scrollTo(formRef)}
                  >
                    Get Started
                  </button>
                </div>
                <div tw="absolute right-0 bottom-0 h-full hidden md:flex max-width[516px] w-full items-center">
                  <img
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1617743994/printivo/branding-mockup-scene_1-removebg-preview_1_ufyare.png"
                    alt="brand mockup"
                    tw="w-full"
                  />
                </div>
              </div>
            </section>

            <section tw="py-8">
              <h1 tw="font-serif text-blue-dark text-2xl sm:font-size[32px] text-center md:mb-20 mb-14">
                How to get started! It is free!
              </h1>

              <div tw="flex max-width[530px] mx-auto mb-16">
                <div tw="sm:width[110px] sm:height[110px] width[70px] height[70px] flex items-center justify-center flex-shrink-0 bg-blue-dark text-cream-md font-serif font-size[32px] sm:mr-8 mr-5">
                  01
                </div>
                <div>
                  <h1 tw="text-blue-dark font-serif text-2xl mb-4">
                    Open a FREE Printivo Store
                  </h1>
                  <p tw="text-blue-md font-sans font-light">
                    Tell us about your store, the email address you would like
                    to use to access your account. Click on "Register" and we
                    will send you an email once your store has been created.
                  </p>
                </div>
              </div>

              <div tw="flex max-width[530px] mx-auto mb-16">
                <div tw="sm:width[110px] sm:height[110px] width[70px] height[70px] flex items-center justify-center flex-shrink-0 bg-blue-dark text-cream-md font-serif font-size[32px] sm:mr-8 mr-5">
                  02
                </div>
                <div>
                  <h1 tw="text-blue-dark font-serif text-2xl mb-4">
                    Create your designs
                  </h1>
                  <p tw="text-blue-md font-sans font-light">
                    Choose a product that you want to add a design to. Next,
                    upload your images or create text using the printivo
                    designer tool. Arrange and resize the different elements of
                    your design as desired.
                  </p>
                </div>
              </div>

              <div tw="flex max-width[530px] mx-auto mb-16">
                <div tw="sm:width[110px] sm:height[110px] width[70px] height[70px] flex items-center justify-center flex-shrink-0 bg-blue-dark text-cream-md font-serif font-size[32px] sm:mr-8 mr-5">
                  03
                </div>
                <div>
                  <h1 tw="text-blue-dark font-serif text-2xl mb-4">
                    Post your design for sale
                  </h1>
                  <p tw="text-blue-md font-sans font-light">
                    Once you are satisfied with how your design looks, click
                    "Post for sale.” Our team will review and approve your
                    design to go live on the website
                  </p>
                </div>
              </div>

              <div tw="flex max-width[530px] mx-auto">
                <div tw="sm:width[110px] sm:height[110px] width[70px] height[70px] flex items-center justify-center flex-shrink-0 bg-blue-dark text-cream-md font-serif font-size[32px] sm:mr-8 mr-5">
                  04
                </div>
                <div>
                  <h1 tw="text-blue-dark font-serif text-2xl mb-4">
                    Start making money!
                  </h1>
                  <p tw="text-blue-md font-sans font-light">
                    Each time your design sells, you earn money. You will
                    receive 15% of the total sum paid on your design. No need to
                    manage inventory or worry with customer service. Just create
                    designs and we’ll do the rest!
                  </p>
                </div>
              </div>
            </section>

            <section className="c-store--owner__form py-8">
              <form
                ref={formRef}
                tw="mx-auto py-14 px-8"
                onSubmit={submitHandler}
              >
                <div className="form-inner mx-auto">
                  <h1 tw="text-lg md:text-2xl font-sans font-semibold leading-6 text-center text-blue-md mb-8">
                    Send a request to join the program. We’d set up your store
                    as soon as we review the request
                  </h1>
                  <label htmlFor="name">Store Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Enter your store name, e.g Awesome Prints"
                    onChange={(e) => onNameChange(e)}
                  />

                  <label htmlFor="slug">Your Store URL</label>

                  <div className="input-row flex">
                    <div className="base-url py-3 px-4">
                      printivo.com/store/
                    </div>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      required
                      disabled
                      value={slug}
                      placeholder="my-store-name"
                    />
                  </div>

                  <label htmlFor="description">Store Description</label>
                  {/* <textarea
                    tw="mb-5 pt-3"
                    name="description"
                    id="description"
                    placeholder="Enter a catchy and short discription for your store."
                    cols="30"
                    rows="4"
                    required
                  ></textarea> */}
                  <LimitedTextArea
                    limit={130}
                    required={true}
                    name="description"
                    placeholder="Enter a catchy and short description for your store."
                    tw="mb-5 pt-3"
                    cols="30"
                    rows="4"
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="username"
                    id="email"
                    required
                    placeholder="Enter your email"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    tw="block ml-auto bg-blue-dark font-sans font-semibold px-6 py-3 rounded-sm text-white"
                  >
                    Register
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default Sell;
