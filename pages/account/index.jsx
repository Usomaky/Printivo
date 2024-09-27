import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AccountSetting from "@/components/account/accountSetting";
import MyProfile from "@/components/account/myProfile";
import OrderHistory from "@/components/account/orderHistory";
import MyWallet from "@/components/account/my-wallet";
import MySavedDesigns from "@/components/account/my-saved-designs";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

export default function Account() {
  // const{user} = useUser()
  const [tab, setTab] = useState("my-profile");
  const { user } = useUser();

  const { asPath } = useRouter();

  const currentTabs = [
    "my-profile",
    "my-saved-designs",
    "account-setting",
    "order-history",
  ];

  useEffect(() => {
    if (asPath) {
      setTab(asPath.split("/account#")[1]);
    } else {
      setTab("my-profile");
    }
  }, [asPath]);

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto">
            <h1 className="my-10 font-dm text-blue-dark md:text-3xl text-2xl mb-2">
              My Account
            </h1>
            <section className="pt-5 pb-8 md:flex justify-between">
              {/* tab */}
              <div className="tab flex-col lg:flex-row">
                <div
                  className={`tab__child ${
                    tab === "my-profile" ? "tab__active" : ""
                  }`}
                  onClick={() => setTab("my-profile")}
                >
                  <span
                    className={`font-sf ${
                      tab === "my-profile" ? " text-blue-dark" : "text-gray-md"
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    My Profile
                  </span>
                </div>

                {/* <div
                  className={`tab__child ${
                    tab === "my-wallet" ? "tab__active" : ""
                  }`}
                  onClick={() => setTab("my-wallet")}
                >
                  <span
                    className={`font-sf ${
                      tab === "my-wallet" ? " text-blue-dark" : "text-gray-md"
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    My Wallet
                  </span>
                </div> */}

                <div
                  className={`tab__child ${
                    tab === "my-saved-designs" ? "tab__active" : ""
                  }`}
                  onClick={() => setTab("my-saved-designs")}
                >
                  <span
                    className={`font-sf ${
                      tab === "my-saved-designs"
                        ? " text-blue-dark"
                        : "text-gray-md"
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    My Saved Designs
                  </span>
                </div>
                <div
                  className={`tab__child ${
                    tab === "account-setting" ? "tab__active" : ""
                  }`}
                  onClick={() => setTab("account-setting")}
                >
                  <span
                    className={`font-sf ${
                      tab === "account-setting"
                        ? " text-blue-dark"
                        : "text-gray-md"
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    Account Settings
                  </span>
                </div>

                <div
                  className={`tab__child ${
                    tab === "order-history" ? "tab__active" : ""
                  }`}
                  onClick={() => setTab("order-history")}
                >
                  <span
                    className={`font-sf ${
                      tab === "order-history"
                        ? " text-blue-dark"
                        : "text-gray-md"
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    Order History
                  </span>
                </div>
              </div>
              {/* tab */}
            </section>

            {tab === "my-profile" && user && <MyProfile user={user.user} />}
            {/*  */}
            {tab === "my-wallet" && user && <MyWallet user={user.user} />}
            {/*  */}
            {tab === "my-saved-designs" && user && (
              <MySavedDesigns user={user.user} />
            )}
            {/*  */}
            {tab === "account-setting" && user && (
              <AccountSetting user={user.user} />
            )}
            {/*  */}
            {tab === "order-history" && user && <OrderHistory />}
          </main>
        </div>
        {/* <Services /> */}
      </Layout>
    </>
  );
}
