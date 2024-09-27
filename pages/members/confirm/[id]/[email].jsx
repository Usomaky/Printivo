import Search from "@/components/global/search";
import Layout from "@/components/layout/layout";
import api from "@/services/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignIn from "@/components/users/signin";

const ConfirmEmail = () => {
  const { query } = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("sign-in");

  // router
  const Router = useRouter();

  useEffect(() => {
    const isQuery = Object.keys(query).length;
    if (isQuery) {
      const confirmUser = async () => {
        try {
          await api.get(`customers/${query.email}/verify/${query.id}.json`);
          setErrorMessage(
            "Your account has been successfully verified. You can now fully enjoy our offers and services."
          );
        } catch (error) {
          setErrorMessage(error?.response?.data?.message);
        } finally {
          setIsConfirmed(true);
        }
      };

      confirmUser();
    }
  }, [query]);

  const modalHandler = (isCollapse) => {
    setIsModal(!isModal);
    document.querySelector("body").classList.toggle("no-scroll");
    setCurrentTab("sign-in");

    if (isCollapse === false) {
      document.querySelector("body").classList.remove("no-scroll");
    }
  };

  return (
    <>
      {isModal && (
        <SignIn
          modalHandler={modalHandler}
          showmodal={isModal}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto pb-32">
            <Search placeholder="Search for any product" />

            {/* {isConfirmed && (
              <section className="c-checkout__status mx-auto flex">
                <div className="text-blue-dark">
                  <p className="font-sf--reg text-base">{errorMessage}</p>
                </div>

                <button
                  type="button"
                  className="mr-6 text-red-light font-sf"
                  onClick={modalHandler}
                >
                  Sign in
                </button>
              </section>
            )} */}
            <section className="c-checkout__status mx-auto flex">
              <div>
                <div className="text-blue-dark">
                  <p className="font-sf--reg text-base">
                    Your account has been successfully verified. You can now
                    fully enjoy our offers and services.
                    <br />
                    Please create a password to continue.
                  </p>
                </div>
                {/* go to reset passwod page */}
                <button
                  className="py-3 mt-6 hidden md:inline-block input-rounded px-14 bg-green-dark text-white font-15 font-sf"
                  onClick={() => {
                    Router.push(
                      `/members/password-reset/${query.id}/${query.email}`
                    );
                  }}
                >
                  Create Password
                </button>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ConfirmEmail;
