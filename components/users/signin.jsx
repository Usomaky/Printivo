import { useUser } from "@/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import Link from "../../components/link";
import Toastr from "toastr";
import Loader from "../states/Loader";
import ForgotPassword from "./ForgotPassword";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignIn = ({ showmodal, modalHandler, currentTab, setCurrentTab }) => {
  const [isConfirmPage, setIsConfirmPage] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Check for path
  useEffect(() => {
    setIsConfirmPage(router.pathname.startsWith("/members/confirm"));
    setEmail(router.query.email || ""); // Set email state based on the query parameter
  }, [router.pathname, router.query.email]);

  // Error Effect
  useEffect(() => {
    setErrorMessage(null);
    return () => modalHandler(false);
  }, []);

  const { login, errorMessage, setErrorMessage, loading } = useUser();
  const formRef = useRef(null);

  const loginHandler = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { password } = Object.fromEntries(formData); // Only need password from form
    const resetForm = () => {
      formRef.current.reset();
    };
    const loginStatus = await login({ email, password }, resetForm);
    if (loginStatus) {
      modalHandler();
      if (isConfirmPage) {
        router.push("/");
      }
    }
  };
  errorMessage && Toastr.error(errorMessage);
  setErrorMessage(null);

  // Password view
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className={`c-modal active px-3 c-modal--signin`}>
      {currentTab === "sign-in" && (
        <div className="modal-inner flex bg-modal-cream">
          <div className="c-modal--signin__image">
            <img
              src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611749064/printivo/Rectangle_61_ojrdeo.png"
              alt="lamp"
              className="w-full"
            />
          </div>
          <div className="w-full px-7 md:pr-12 py-9 relative">
            <button
              className="close-button bg-transparent absolute"
              onClick={modalHandler}
            >
              <img
                src="data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14 1.4L12.6 0L7 5.6L1.4 0L0 1.4L5.6 7L0 12.6L1.4 14L7 8.4L12.6 14L14 12.6L8.4 7L14 1.4Z' fill='black' fill-opacity='0.54'/%3E%3C/svg%3E%0A"
                alt="close modal"
              />
            </button>

            <h1 className="text-blue-md font-dm font-22 mb-5">
              Sign in to your account
            </h1>

            <form onSubmit={loginHandler} ref={formRef} className="md:pr-2">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="inline-block font-15 font-sf--reg mb-2 text-blue-dark"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                  placeholder="Enter your email"
                  required={!isConfirmPage}
                  readOnly={isConfirmPage}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2 items-center">
                  <label
                    htmlFor="password"
                    className="inline-block font-15 font-sf--reg text-blue-dark"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setCurrentTab("reset")}
                    className="font-sf--bold underline text-blue-dark text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative mb-4">
                  <input
                    type={viewPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Enter your password"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={handleViewPassword}
                  >
                    <IconContext.Provider
                      value={{ color: "#ababaa", size: "20px" }}
                    >
                      <div>
                        {viewPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 flex ml-auto text-white bg-blue-dark font-sf"
                disabled={loading}
              >
                <span>Sign In</span>
                {loading && <Loader />}
              </button>
            </form>

            <p className="font-sf--reg text-right text-blue-dark font-15 mt-8">
              Don't have an account?{" "}
              <Link
                to="/members/sign-up"
                className="text-red-light underline font-sf"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      )}
      {currentTab === "reset" && (
        <ForgotPassword
          modalHandler={modalHandler}
          setCurrentTab={setCurrentTab}
        />
      )}
    </div>
  );
};

export default SignIn;
