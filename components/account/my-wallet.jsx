import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/index";

export default function MyWallet({ user }) {
  const storeId = user?.store?.id;

  const { data: walletData, error } = useSWR(
    `/stores/${storeId}.json`,
    fetcher
  );

  return (
    <>
      {walletData && (
        <section className="w-full h-auto pb-52 ">
          <div className="c-wallet justify-between">
            <div className="c-wallet__card p-5 lg:pr-16 m-1">
              <h4 className="font-sf text-blue-md text-lg mb-3">Money Made</h4>
              <span className="font-dm text-blue-md text-lg mb-3">
                ₦{walletData?.money_made.toLocaleString()}
              </span>
            </div>
            <div className="c-wallet__card p-5 lg:pr-16 m-1">
              <h4 className="font-sf text-blue-md text-lg mb-3">
                Money Available
              </h4>
              <span className="font-dm text-blue-md text-lg mb-3">
                ₦{walletData?.money_available.toLocaleString()}
              </span>
            </div>
            <div className="c-wallet__card p-5 lg:pr-16 m-1">
              <h4 className="font-sf text-blue-md text-lg mb-3">
                Money Pending
              </h4>
              <span className="font-dm text-blue-md text-lg mb-3">
                ₦{walletData?.money_pending.toLocaleString()}
              </span>
            </div>

            <div className="c-wallet__card p-5 lg:pr-16 m-1">
              <h4 className="font-sf text-blue-md text-lg mb-3">
                Money Withdrawn
              </h4>
              <span className="font-dm text-blue-md text-lg mb-3">
                ₦{walletData?.money_withdrawn.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="w-full p-4 ghost">
            <span className="font-sf text-blue-md text-md mb-3">
              Earn up to ₦1,000 in your Wallet every time you refer someone new
              to Printivo.{" "}
              <a href="https://printivo.com/rewards" className="text-red-md">
                Learn how it works.
              </a>
            </span>
          </div>
        </section>
      )}
    </>
  );
}
