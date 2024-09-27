import React, { useEffect } from "react";
import _ from "lodash";
export default function Pagination({
  currentPage,
  pageSize,
  totalPages,
  pageRangeDisplayed,
  handleChange,
}) {
  let lastPageNum = totalPages;
  const pageCount = Math.ceil(totalPages / 1);
  if (pageCount === 1) return null;
  const pages = _.range(1, totalPages + 1);

  return (
    <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between work-sans">
      <div>
        <p className="text-sm leading-5 text-blue-md">
          Showing
          <span className="font-medium mx-1">{currentPage}</span>
          of
          <span className="font-medium mx-1">{totalPages}</span>
          results
        </p>
      </div>
      <div>
        <nav className="relative z-0 inline-flex shadow-sm">
          <div>
            <a
              href="#"
              className="relative inline-flex itemfrs-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-md focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div>
            {pages
              .slice(
                currentPage < 3 ? 0 : currentPage - 2,
                currentPage < 2
                  ? currentPage + pageRangeDisplayed
                  : currentPage + pageRangeDisplayed
              )
              .map((page, i) => (
                <button
                  key={page}
                  className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-md transition ease-in-out duration-150 cursor-pointer ${
                    currentPage === page
                      ? "z-10 outline-none border-blue-md shadow-outline-blue active:bg-tertiary active:text-gray-700"
                      : ""
                  }`}
                  onClick={() => handleChange(page)}
                >
                  {page}
                </button>
              ))}

            {lastPageNum >= pageRangeDisplayed && (
              <button
                className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-md transition ease-in-out duration-150 cursor-pointer ${
                  lastPageNum === currentPage
                    ? "z-10 outline-none border-blue-md shadow-outline-blue active:bg-tertiary active:text-gray-700"
                    : ""
                }`}
                onClick={() => handleChange(lastPageNum)}
              >
                {lastPageNum === currentPage
                  ? lastPageNum
                  : `... ${lastPageNum}`}
              </button>
            )}
          </div>
          <div v-if="pagination.current_page < pagination.last_page">
            <a
              href="#"
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-md focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
