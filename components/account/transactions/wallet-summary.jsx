import React from "react";
import { fetcher } from "@/utils/index";
import useSWR from "swr";
import { useUser } from "@/hooks/useUser";

const WalletSummary = () => {
  const { user } = useUser();
  const storeId = user?.user?.store?.id;
  const { data: walletData, error } = useSWR(
    `/stores/${storeId}.json`,
    fetcher
  );

  return (
    <div className="c-wallet justify-between w-full">
      <div className="c-wallet__card p-5 pr-16 m-1 w-full">
        <h4 className="font-sf text-blue-md text-lg mb-3">Money Made</h4>
        <span className="font-dm text-blue-md text-lg mb-3">
          ₦{walletData?.money_made.toLocaleString()}
        </span>
      </div>
      <div className="c-wallet__card p-5 pr-16 m-1 w-full">
        <h4 className="font-sf text-blue-md text-lg mb-3">Money Available</h4>
        <span className="font-dm text-blue-md text-lg mb-3">
          ₦{walletData?.money_available.toLocaleString()}
        </span>
      </div>
      <div className="c-wallet__card p-5 pr-16 m-1 w-full">
        <h4 className="font-sf text-blue-md text-lg mb-3">Money Pending</h4>
        <span className="font-dm text-blue-md text-lg mb-3">
          ₦{walletData?.money_pending.toLocaleString()}
        </span>
      </div>

      <div className="c-wallet__card p-5 pr-16 m-1 w-full">
        <h4 className="font-sf text-blue-md text-lg mb-3">Money Withdrawn</h4>
        <span className="font-dm text-blue-md text-lg mb-3">
          ₦{walletData?.money_withdrawn.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default WalletSummary;
