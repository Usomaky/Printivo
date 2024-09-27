import React, { useRef, useState } from "react";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import Loader from "../states/Loader";
import api from "@/services/api";
import Toastr from "toastr";

const ForgotPassword = ({ modalHandler, setCurrentTab }) => {
  const [isReset, setIsReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);

  const handleReset = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { resetEmail } = Object.fromEntries(formData);

    setIsLoading(true);
    try {
      await api.post(`/customers/${resetEmail}/reset-password.json`);
      setIsReset(true);
    } catch (error) {
      const { response } = error;
      if (response) {
        Toastr.error(response.data.message);
      }
    } finally {
      setIsLoading(false);
      formRef.current.reset();
    }
  };

  return (
    <div tw="bg-white border-radius[8px] box-shadow[0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 10px 34px -16px rgba(0, 0, 0, 0.08)] filter[drop-shadow(0px 6px 4px rgba(164, 164, 164, 0.06))]">
      <div tw="flex justify-between items-center py-2 px-6">
        <h1 tw="font-sans text-blue-dark md:text-2xl text-xl font-semibold">
          Forgot Password
        </h1>
        <button
          onClick={modalHandler}
          tw="p-2.5 background[rgba(176, 184, 194, 0.3)] rounded-full"
        >
          <img
            src="data:image/svg+xml,%3Csvg width='22' height='22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10zM14 8l-6 6M8 8l6 6' stroke='%23506683' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
            alt="close modal"
          />
        </button>
      </div>
      <div tw="py-4 px-6 bg-blue-dark flex justify-between items-center">
        <p tw="text-white font-sans text-sm font-semibold max-width[358px]">
          {isReset
            ? `Check your email for the password reset link.`
            : `Please enter the email used to register with us at Printivo, and we will send a reset link to your email.`}
        </p>
        <figure tw="p-3 background[rgba(176, 184, 194, 0.3)] rounded-full">
          <img
            src="data:image/svg+xml,%3Csvg width='32' height='32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.222 10.815V9.519a7.778 7.778 0 0115.556 0v1.296h2.592a1.296 1.296 0 011.297 1.296v15.556a1.297 1.297 0 01-1.297 1.296H5.63a1.296 1.296 0 01-1.297-1.296V12.11a1.296 1.296 0 011.297-1.296h2.592zm16.852 2.592H6.926V26.37h18.148V13.407zm-10.37 7.43a2.593 2.593 0 112.592 0v2.94h-2.592v-2.94zm-3.89-10.022h10.371V9.519a5.185 5.185 0 00-10.37 0v1.296z' fill='%23FDFAF0'/%3E%3C/svg%3E"
            alt="secure reset"
          />
        </figure>
      </div>

      <form onSubmit={handleReset} tw="padding-top[21px]" ref={formRef}>
        {isReset ? (
          <div tw="padding-bottom[67px] padding-top[35px] px-6 flex justify-center w-full">
            <div tw="flex items-center">
              <figure tw="mr-4">
                <img
                  src="data:image/svg+xml,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='18.125' fill='%23D9FAE7'/%3E%3Cpath d='M28.84 13.654c.611.61.611 1.6 0 2.21L18.36 26.346c-.61.61-1.6.61-2.21 0l-4.99-4.99a1.562 1.562 0 112.21-2.21l3.885 3.886 9.377-9.378c.61-.61 1.6-.61 2.21 0zM40 20c0 11.055-8.947 20-20 20C8.945 40 0 31.053 0 20 0 8.945 8.947 0 20 0c11.055 0 20 8.947 20 20zm-3.125 0c0-9.328-7.549-16.875-16.875-16.875-9.328 0-16.875 7.549-16.875 16.875 0 9.328 7.549 16.875 16.875 16.875 9.328 0 16.875-7.549 16.875-16.875z' fill='%234A945A'/%3E%3C/svg%3E"
                  alt="success"
                />
              </figure>
              <h2 tw="text-green-dark font-serif text-2xl">
                Password reset link sent
              </h2>
            </div>
          </div>
        ) : (
          <div tw="padding-bottom[62px] px-6">
            <label
              htmlFor="resetEmail"
              tw="text-blue-dark text-base mb-2 block"
            >
              E-mail
            </label>
            <input
              type="email"
              tw="w-full h-12 font-sans border-radius[3px] max-width[285px] text-base border[1px solid #CBCAC8] placeholder:(color[#B0B8C2])"
              required
              id="resetEmail"
              autoFocus
              name="resetEmail"
              placeholder="Enter your email address"
            />
          </div>
        )}

        <div tw="background[#F9F8F4] px-6 py-2.5">
          {isReset ? (
            <Button
              type="button"
              tw="text-base ml-auto flex"
              onClick={modalHandler}
            >
              <span>Close</span>
              {isLoading && <Loader />}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              tw="text-base ml-auto flex"
            >
              <span>Submit</span>
              {isLoading && <Loader />}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
