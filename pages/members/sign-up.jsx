import { useState } from "react";
import Services from "@/components/global/services";
import NewsLetter from "@/components/global/newsletter";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import SignUpComplete from "@/components/users/signUpComplete";
import api from "@/services/api";
import Toastr from "toastr";
import Loader from "@/components/states/Loader";
import { exceptionToErrors } from "@/utils/index";
import { IconContext } from "react-icons";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Signup = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, firstName, lastName, password, passwordConfirm, phone } =
      Object.fromEntries(formData);

    if (password !== passwordConfirm) {
      setIsPasswordsMatch(false);
      return;
    } else {
      setIsPasswordsMatch(true);
    }

    const postData = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
    };

    setIsLoading(true);
    try {
      await api.post("/register.json", postData);
      setIsSignedUp(true);
    } catch (error) {
      if (error) {
        const errors = error?.data?.errors?.username;
        if (errors) {
          Object.entries(errors).forEach(([key, errorMessage]) => {
            Toastr.error(errorMessage);
          });
        } else {
          Toastr.error("An error occurred");
        }
      } else {
        Toastr.error("A network error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleRetypePassword = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-signup content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /
              </Link>{" "}
              <span className="text-blue-dark font-sf">create Account</span>
            </header>

            {isSignedUp ? (
              <SignUpComplete />
            ) : (
              <section className="md:flex mt-5 justify-between pb-32">
                <div className=" w-full md:max-w-xl md:mr-8 c-signup__data">
                  <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-5">
                    Create Account
                  </h1>
                  <p className="text-blue-md font-15 max-w-para font-sf--reg">
                    Create an account to get your personal referral code to
                    share with your friends. Give your friends a 15% discount
                    now, get as high as N1,000 when they place their first
                    order. Everybody wins!
                  </p>
                  <form onSubmit={registerUser} className="mt-8">
                    <div className="input-row mb-2 sm:flex w-full">
                      <div className="mr-7 w-full">
                        <label
                          htmlFor="firstName"
                          className="c-form__label text-blue-dark mb-2 inline-block"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          autoFocus
                          id="firstName"
                          name="firstName"
                          className="c-form__input md:mb-8 mb-6 c-form__input--grey"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="lastName"
                          className="c-form__label text-blue-dark mb-2 inline-block"
                        >
                          Your Surname
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="c-form__input md:mb-8 mb-6 c-form__input--grey"
                          placeholder="Enter your surname"
                          required
                        />
                      </div>
                    </div>

                    <div className="input-row mb-2 sm:flex w-full">
                      <div className="mr-7 w-full">
                        <label
                          htmlFor="email"
                          className="c-form__label text-blue-dark mb-2 inline-block"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="c-form__input md:mb-8 mb-6 c-form__input--grey"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="phone"
                          className="c-form__label text-blue-dark mb-2 inline-block"
                        >
                          Phone Number
                        </label>
                        <input
                          type="number"
                          id="phone"
                          name="phone"
                          className="c-form__input md:mb-8 mb-6 c-form__input--grey"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    {!isPasswordsMatch && (
                      <p className="font-sans font-normal text-red-600 text-sm mb-1">
                        Passwords do not match
                      </p>
                    )}
                    <div className="input-row mb-2 sm:flex w-full">
                      <div className="sm:space-x-7 space-y-6 sm:space-y-0 sm:flex w-full ">
                        <div className="w-full flex flex-col">
                          <label
                            htmlFor="createPassword"
                            className="c-form__label text-blue-dark mb-2 inline-block"
                          >
                            Password
                          </label>
                          <div className="w-full border flex items-center justify-between border-[#cbcac8] h-auto">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              id="password"
                              placeholder="Enter password"
                              className="w-full py-2.5 px-4 outline-none focus:outline-none"
                            />
                            {showPassword ? (
                              <div
                                className="cursor-pointer p-3"
                                onClick={togglePassword}
                              >
                                <IconContext.Provider
                                  value={{ color: "#384a62", size: "20px" }}
                                >
                                  <div>
                                    <AiOutlineEye />
                                  </div>
                                </IconContext.Provider>
                              </div>
                            ) : (
                              <div
                                className="cursor-pointer p-3"
                                onClick={togglePassword}
                              >
                                <IconContext.Provider
                                  value={{ color: "#384a62", size: "20px" }}
                                >
                                  <div>
                                    <AiOutlineEyeInvisible />
                                  </div>
                                </IconContext.Provider>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-full flex flex-col">
                          <label
                            htmlFor="passwordConfirm"
                            className="c-form__label text-blue-dark mb-2 inline-block"
                          >
                            Re-Type Password
                          </label>
                          <div className="w-full border flex items-center justify-between border-[#cbcac8] h-auto">
                            <input
                              type={showRetypePassword ? "text" : "password"}
                              id="passwordConfirm"
                              name="passwordConfirm"
                              className="w-full py-2.5 px-4 outline-none focus:outline-none"
                              placeholder="Re-Type Password"
                              required
                            />
                            {showRetypePassword ? (
                              <div
                                className="cursor-pointer p-3"
                                onClick={toggleRetypePassword}
                              >
                                <IconContext.Provider
                                  value={{ color: "#384a62", size: "20px" }}
                                >
                                  <div>
                                    <AiOutlineEye />
                                  </div>
                                </IconContext.Provider>
                              </div>
                            ) : (
                              <div
                                className="cursor-pointer p-3"
                                onClick={toggleRetypePassword}
                              >
                                <IconContext.Provider
                                  value={{ color: "#384a62", size: "20px" }}
                                >
                                  <div>
                                    <AiOutlineEyeInvisible />
                                  </div>
                                </IconContext.Provider>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-3 ml-auto flex text-white bg-blue-dark font-sf py-3 px-6"
                      disabled={isLoading}
                    >
                      <span>Create Account</span>
                      {isLoading && <Loader />}
                    </button>
                  </form>
                </div>

                <div className="hidden c-signup__image md:block">
                  <img
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611817841/printivo/Rectangle_62_ints6t.png"
                    alt=""
                    className="w-full"
                  />
                </div>
              </section>
            )}
          </main>
        </div>
        <Services />
        {/* <NewsLetter /> */}
      </Layout>
    </>
  );
};

export default Signup;
