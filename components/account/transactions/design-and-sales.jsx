import React, { useEffect, useState } from "react";
import { fetcher } from "@/utils/index";
import useSWR from "swr";
import WalletSummary from "./wallet-summary";
import "twin.macro";
import NewPagination from "@/components/global/new-pagination";

export default function DesignSales({ user }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);

  const storeId = user?.store?.id;

  const { data: storeSales, storeSalesError } = useSWR(
    `/stores/product-sales/${storeId}.json?limit=20&page=${currentPage}`,
    fetcher
  );

  const changePage = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (storeSales) {
      setTotalProductCount(storeSales.meta.filteredCount);
      setPerpage(storeSales.meta.perPage);
      setCurrentPage(storeSales.meta.page);
      setPageProductNumber(storeSales.meta.resultCount);
      setTotalPageCount(storeSales.meta.pageCount);
    }
  }, [storeSales]);

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
                        Thumbnail
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Designs
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Orders Count
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        Units Sold
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
                    {storeSales?.data?.map((design) => (
                      <tr
                        className="border-b hover:bg-gray-100"
                        key={design.id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={design.preview_file_path} tw="w-12 h-12" />
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {design.name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {design.products.name}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-md">
                            {design.order_item_count}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-md">
                          {design.quantity_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                          <div className="text-sm text-blue-md">
                            ₦{design.amount.toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-8">
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
