import React, { useEffect, useState } from "react";
import { fetcher, getDate } from "@/utils/index";
import useSWR from "swr";
import WalletSummary from "./wallet-summary";
import NewPagination from "@/components/global/new-pagination";

export default function Payout({ user }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);

  const storeId = user?.store?.id;
  const { data: transactionData, error } = useSWR(
    `/store-transactions.json?store_id=${storeId}&type=debit&include=store_banks&sort[created]=desc&limit=20&page=${currentPage}`,
    fetcher
  );

  const { data: prefetched, prefetchedError } = useSWR(
    `/store-transactions.json?store_id=${storeId}&type=debit&include=store_banks&sort[created]=desc&limit=20&page=${
      currentPage + 1
    }`,
    fetcher
  );

  const changePage = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (transactionData) {
      setTotalProductCount(transactionData.meta.filteredCount);
      setPerpage(transactionData.meta.perPage);
      setCurrentPage(transactionData.meta.page);
      setPageProductNumber(transactionData.meta.resultCount);
      setTotalPageCount(transactionData.meta.pageCount);
    }
  }, [transactionData]);

  return (
    <>
      <section className="w-full h-auto pb-12 ">
        {/* <div className="w-1/2 p-4 ghost">
          <span className="font-sf text-blue-md text-sm mb-3">
            You need to first setup your payment information.
            <a href="#" className="text-red-md">
              Do that now.
            </a>
          </span>
        </div> */}

        <WalletSummary />

        <div className="flex flex-col mt-5">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className=" overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 py-5">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Bank Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Account Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Account Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Amount Made
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactionData?.data.map((transaction) => (
                      <tr
                        className="border-b hover:bg-gray-100"
                        key={transaction.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {getDate(transaction.created).date}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {transaction.store_bank.bank_name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {transaction.store_bank.account_name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {transaction.store_bank.account_number}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-md">
                          {transaction.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <div className="text-sm text-blue-md">
                            ₦{(transaction.amount * -1).toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-10">
                  <NewPagination
                    handleChange={(e) => changePage(e)}
                    totalCount={totalProductCount}
                    perPage={perPage}
                    currentPage={currentPage}
                    totalPageProduct={pageProductNumber}
                    pages={totalPageCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
