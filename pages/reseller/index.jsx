import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Loader from "@/components/states/Loader";
import Link from "@/components/link";
import { useState } from "react";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import Toastr from "toastr";
import api from "@/services/api";

const Reseller = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUpHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { firstName, lastName, email, phone } = Object.fromEntries(formData);

    const resellerData = {
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      phone_number: phone,
    };

    setIsLoading(true);
    try {
      await api.post("/reseller-requests.json", resellerData);
      setIsComplete(true);
    } catch (error) {
      const { response } = error;
      if (response) {
        Toastr.error(response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="mt-56 md:mt-20">
          <main className="c-reseller content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /
              </Link>{" "}
              <span className="text-blue-dark font-sf">Become a Reseller</span>
            </header>

            <h1 className="font-dm text-blue-dark mt-4 md:text-3xl text-2xl mb-3">
              Become an Affiliate
            </h1>

            <section className="flex md:flex-row flex-col-reverse mt-4 justify-between pb-32">
              {!isComplete && (
                <div>
                  <p className="text-blue-md font-15 max-w-para font-sf--reg mb-6">
                    Sign Up for an affiliate account to get your personal
                    referral code to share with your customers.
                  </p>
                  <div className=" w-full md:max-w-xl md:mr-8 c-reseller__data">
                    <form onSubmit={signUpHandler}>
                      <div className="input-row mb-2 sm:flex w-full">
                        <div className="mr-7 w-full">
                          <label
                            htmlFor="firstName"
                            className="c-form__label font-15 text-blue-dark mb-2 inline-block"
                          >
                            Your First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            autoFocus
                            name="firstName"
                            className="c-form__input"
                            placeholder="Enter your name"
                            required
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="lastName"
                            className="c-form__label font-15 text-blue-dark mb-2 inline-block"
                          >
                            Your Surname
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            autoComplete="off"
                            className="c-form__input"
                            placeholder="Enter your surname"
                            required
                          />
                        </div>
                      </div>

                      <div className="input-row mb-2 sm:flex w-full">
                        <div className="mr-7 w-full">
                          <label
                            htmlFor="email"
                            className="c-form__label font-15 text-blue-dark mb-2 inline-block"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="c-form__input"
                            placeholder="Enter your email"
                            required
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="phone"
                            className="c-form__label font-15 text-blue-dark mb-2 inline-block"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="c-form__input"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-3 flex ml-auto font-15 text-white bg-blue-dark font-sf py-3 px-6"
                        disabled={isLoading}
                      >
                        <span>Sign Up</span>
                        {isLoading && <Loader />}
                      </button>

                      <p className="max-w-3xs -mt-10 md:mx-auto text-green-dark font-sf font-15 md:text-center">
                        No more subscription fees, free forever!
                      </p>
                    </form>
                  </div>
                </div>
              )}

              {isComplete && (
                <div
                  className="c-checkout__status flex"
                  tw="m-0! height[fit-content] align-self[center]"
                >
                  <div>
                    <h3 className="font-dm text-2xl mb-3 text-green-dark">
                      One More Step!
                    </h3>
                    <div className="text-blue-dark">
                      <p className="font-sf--reg text-sm">
                        Thank you for joining our reseller platform, kindly
                        check your email for next steps.
                      </p>
                    </div>
                    <Button tw="px-14 mt-6" buttonColor="green" href="/">
                      <span>Return Home</span>
                    </Button>
                  </div>
                </div>
              )}

              <div className="c-reseller__benefits mb-10 md:mb-0 ml-10 flex-shrink-0">
                <div className="c-benefit flex items-center">
                  <div className="c-benefit__discount table items-center">
                    <div className="relative inline-block">
                      <h1 className="text-blue-dark mb-1 disc-text font-dm text-9xl">
                        20% <sup className="text-2xl">Off</sup>
                      </h1>
                    </div>
                    <h4 className="text-blue-md ml-2 discount-desc font-dm font-22">
                      All print products on the website
                    </h4>
                  </div>
                  <div className="c-benefit__image relative w-full">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611818931/printivo/eye-for-ebony-3dqSZidOkvs-unsplash-removebg-preview_1_zoztfs.png"
                      alt=""
                      className="object-cover w-full"
                    />
                  </div>
                </div>
                <h3 className="text-blue-dark font-dm font-17 my-3">
                  Request to Join the Program
                </h3>
                <ul className="c-list font-sf--reg text-blue-md font-15">
                  <li>Ship directly to your customers nationwide</li>
                  <li>Free sample pack when you join</li>
                  <li>Special resellers exclusive deals</li>
                  <li>Dedicated account executive</li>
                </ul>
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default Reseller;
