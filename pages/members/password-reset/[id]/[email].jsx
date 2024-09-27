import Search from "@/components/global/search";
import Layout from "@/components/layout/layout";
import api from "@/services/api";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import Toastr from "toastr";
import Loader from "@/components/states/Loader";

const ResetPassword = () => {
  const { query } = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifiedToken, setIsVerifiedToken] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setisShowPassword] = useState();
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const isQuery = Object.keys(query).length;
    if (isQuery) {
      const confirmUser = async () => {
        try {
          const res = await api.get(
            `/password-resets/${query.email}/${query.id}.json`
          );
          setIsVerifiedToken(true);
          setTokenData(res.data);
        } catch (error) {
          const { response } = error;
          response && setErrorMessage(response.data.message);
          setIsVerifiedToken(false);
        } finally {
          setIsConfirmed(true);
        }
      };

      confirmUser();
    }
  }, [query]);

  const formRef = useRef(null);

  const handleReset = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { password1, password2 } = Object.fromEntries(formData);

    if (password1 !== password2) {
      Toastr.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    let config = {
      headers: {
        Authorization: `Bearer ${tokenData.tokenIfo.token}`,
      },
    };

    try {
      const res = await api.put(
        `/customers/update-password/${tokenData.customer.id}.json`,
        { password: password1 },
        config
      );
      setIsReset(true);
    } catch (error) {
      const { response } = error;
      if (response) {
        Toastr.error(response.data.message);
      } else {
        Toastr.error("Something went wrong");
       }
    } finally {
      setIsLoading(false);
      formRef.current.reset();
    }
  };
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto pb-32">
            <Search placeholder="Search for any product" />

            {isConfirmed && (
              <>
                {isVerifiedToken ? (
                  <div tw="mt-10">
                    {isReset ? (
                      <div tw="max-width[495px] mx-auto border[1px solid #ECE8D9]background[#FDFAF0] pt-10 pb-14 px-10 flex">
                        <figure tw="mr-4">
                          <img
                            src="data:image/svg+xml,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='18.125' fill='%23D9FAE7'/%3E%3Cpath d='M28.84 13.654c.611.61.611 1.6 0 2.21L18.36 26.346c-.61.61-1.6.61-2.21 0l-4.99-4.99a1.562 1.562 0 112.21-2.21l3.885 3.886 9.377-9.378c.61-.61 1.6-.61 2.21 0zM40 20c0 11.055-8.947 20-20 20C8.945 40 0 31.053 0 20 0 8.945 8.947 0 20 0c11.055 0 20 8.947 20 20zm-3.125 0c0-9.328-7.549-16.875-16.875-16.875-9.328 0-16.875 7.549-16.875 16.875 0 9.328 7.549 16.875 16.875 16.875 9.328 0 16.875-7.549 16.875-16.875z' fill='%234A945A'/%3E%3C/svg%3E"
                            alt="success"
                          />
                        </figure>

                        <div>
                          <h2 tw="text-green-dark font-serif text-2xl mb-2">
                            Your password has been reset successfully
                          </h2>
                          <p tw="text-blue-dark text-base mb-5 font-semibold">
                            You can continue shopping with us.
                          </p>
                          <Button
                            tw="px-14"
                            buttonColor="green"
                            href="/"
                            disabled={isLoading}
                          >
                            <span>Return Home</span>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div tw="max-width[285px] mx-auto">
                        <h1 tw="font-serif text-xl md:font-size[32px] text-blue-dark mb-8">
                          Reset Password
                        </h1>
                        <form onSubmit={handleReset} ref={formRef}>
                          <label
                            htmlFor="password1"
                            tw="text-blue-dark text-base mb-2 block"
                          >
                            Create New Password
                          </label>
                          <div tw="relative mb-6">
                            <input
                              type={`${isShowPassword ? "text" : "password"}`}
                              tw="w-full h-12 pl-3 font-sans border-radius[3px] text-base border[1px solid #CBCAC8] placeholder:(color[#B0B8C2])"
                              required
                              id="password1"
                              name="password1"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              tw="text-red-light font-bold text-sm capitalize absolute top[50%] right-4 transform[translateY(-50%)]"
                              onClick={() => setisShowPassword(!isShowPassword)}
                            >
                              {isShowPassword ? "hide" : "show"}
                            </button>
                          </div>

                          <label
                            htmlFor="password2"
                            tw="text-blue-dark text-base mb-2 block"
                          >
                            Re-enter New Password
                          </label>
                          <div tw="relative mb-2">
                            <input
                              type={`${isShowPassword ? "text" : "password"}`}
                              tw="w-full h-12 pl-3 font-sans border-radius[3px] text-base border[1px solid #CBCAC8] placeholder:(color[#B0B8C2])"
                              required
                              id="password2"
                              name="password2"
                              placeholder="Re-enter password"
                            />

                            <button
                              type="button"
                              tw="text-red-light font-bold text-sm capitalize absolute top[50%] right-4 transform[translateY(-50%)]"
                              onClick={() => setisShowPassword(!isShowPassword)}
                            >
                              {isShowPassword ? "hide" : "show"}
                            </button>
                          </div>

                          <Button
                            type="submit"
                            disabled={isLoading}
                            tw="text-base ml-auto flex"
                          >
                            <span>Submit</span>
                            {isLoading && <Loader />}
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="c-checkout__status mx-auto flex">
                    <div className="text-blue-dark">
                      <p className="font-sf--reg text-base">{errorMessage}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ResetPassword;
