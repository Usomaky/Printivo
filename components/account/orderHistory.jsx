import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, getDate, sortArrayofObjects } from "@/utils/index";
import { formatSpecs } from "@/utils/product";
import NewPagination from "../global/new-pagination";
import "twin.macro";
import numeral from "numeraljs";
import Link from "../link";

export default function OrderHistory({}) {
  const { data: orderHistory, error } = useSWR(
    "/orders.json?include=address,items.design",
    fetcher
  );

  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);
  const [designsData, setDesignsData] = useState([]);
  //const isCurrentProductEmpty = Object.entries(currentProduct).length === 0;

  const orderFilter = (orderHistory) => {
    if (orderHistory) {
      // return orderHistory.filter((order) => {
      //   return order.status === "completed";
      // });
      return orderHistory;
    } else {
      return [];
    }
  };

  useEffect(() => {
    // // setDesignsData(orderHistory);
    setTotalProductCount(orderHistory?.meta.filteredCount);
    setPerpage(orderHistory?.meta.perPage);
    setPageProductNumber(orderHistory?.meta.resultCount);
    setTotalPageCount(orderHistory?.meta.pageCount);
  }, []);

  const changePage = (e) => {
    setCurrentPage(e);
  };

  console.log(orderHistory);
  console.log(orderHistory?.meta);

  return (
    <div>
      <span className="font-sf text-blue-md">
        This is a list of all your purchases with us so far
      </span>

      {currentOrder && (
        <div className="w-full flex my-5">
          <button
            className="bg-red-light font-sf text-white px-5 py-2 rounded-sm"
            onClick={() => {
              setCurrentOrder(null);
            }}
          >
            Back
          </button>
        </div>
      )}

      {!currentOrder && (
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
                        ORDER
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        DATE
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        AMOUNT
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      >
                        STATUS
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-6 text-left text-xs font-medium text-blue-md uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderHistory?.data &&
                      sortArrayofObjects(
                        orderFilter(orderHistory?.data),
                        "id",
                        "descending"
                      ).map((order, _) => (
                        <tr className="border-b hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-md">
                              {order?.number}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-md">
                              {order?.created
                                ? getDate(order?.created).date
                                : ""}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-md">
                              {numeral(parseFloat(order?.amount)).format(
                                "0,0.00"
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white uppercase bg-blue-300 py-2 text-center rounded-full">
                              {order?.status}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              className="bg-red-light font-sf text-white px-5 py-2 rounded-sm"
                              onClick={() => {
                                setCurrentOrder(order);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div tw="mb-4" className="border">
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
      )}

      {currentOrder && (
        <section className="flex py-10 flex-col">
          <div key={_ + 1}>
            {currentOrder?.items?.map((item) => (
              <div className="order-history--card" key={item.id}>
                {/* <div className="image"></div> */}
                <div className="product">
                  <p className="font-sf text-blue-dark text-md">
                    {item.category_name}
                  </p>
                  <span className="font-sf text-blue-md text-md">
                    Qty Ordered: {item.quantity}
                  </span>
                  <Link to={`/re-order/${item?.id}`}>
                    <button className="c-order__button c-order__button--green mt-10">
                      <span className="font-sf--bold">Order Again</span>
                    </button>
                  </Link>
                </div>
                <div className="divider"></div>
                <div className="description">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col" tw="md:mr-6">
                      <span className="font-sf text-blue-md">Amount Spent</span>

                      <span className="font-sf text-blue-md">
                        ₦{item?.amount?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-sf text-blue-md">Ordered On:</span>
                      <span className="font-sf text-blue-md">
                        {currentOrder?.created
                          ? getDate(currentOrder?.created).date
                          : "Order not completed successfully."}
                      </span>
                    </div>
                  </div>
                  <div className="my-5">
                    <h3 className="font-sf--bold mb-2 text-blue-dark text-sm">
                      Product Specifications
                    </h3>
                    {formatSpecs(item.add_ons).map((spec, i) => (
                      <div
                        key={i}
                        className="spec flex justify-between items-center mb-2"
                      >
                        <div>
                          <p className="font-sf--bold text-sm text-blue-dark ">
                            {spec.name}
                          </p>
                        </div>
                        {currentOrder.is_tshirt ? (
                          <div tw="max-width[200px] w-full">
                            <p className="font-sf text-sm text-blue-dark mx-2 capitalize">
                              {currentOrder.add_ons_summary}
                            </p>
                          </div>
                        ) : (
                          <div tw="max-width[200px] w-full">
                            {spec.options.map((option, i) => (
                              <div key={i}>
                                <p className="font-sf text-sm text-blue-dark mx-2 capitalize">
                                  {option.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col my-1">
                    <span className="font-sf text-blue-md font-light">
                      Delivered to:
                    </span>
                    <span className="font-sf text-blue-md">
                      {currentOrder?.address?.line_one}
                    </span>
                    <span className="font-sf text-blue-md">
                      {currentOrder?.address?.city ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <br />
      <br />
      <br />
      {/*  */}
    </div>
  );
}
