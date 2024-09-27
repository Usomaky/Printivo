import React from "react";

export default function NewPaginstion({
  handleChange,
  totalCount,
  perPage,
  currentPage,
  totalPageProduct,
  pages,
}) {
  const pageLastRange = (currentPage - 1) * perPage + totalPageProduct;
  const pageStartRange = (currentPage - 1) * perPage + 1;
  const range = () => {
    const pageRange = [];
    for (let i = 0; i < pages; i++) {
      pageRange.push(i + 1);
    }
    return pageRange;
  };

  const totalRange = range();
  const RangeDeterminer = () => {
    const totalRange = range();
    if (totalRange.length < 5 || totalRange.length === 5) {
      return totalRange;
    } else {
      if (currentPage - 1 < 1) {
        const newRange = [...totalRange];
        return newRange.splice(0, 5);
      } else if (
        (currentPage - 2 > 1 || currentPage - 2 === 1) &&
        (currentPage + 2 === totalRange.length ||
          currentPage + 2 < totalRange.length)
      ) {
        const newRange = [...totalRange];
        return newRange.splice(currentPage - 3, 5);
      } else if (currentPage === 2) {
        const newRange = [...totalRange];
        return newRange.splice(0, 5);
      } else if (currentPage + 1 > totalRange.length) {
        const newRange = [...totalRange];
        return newRange.splice(currentPage - 5, 5);
      } else if (currentPage + 2 > totalRange.length) {
        const newRange = [...totalRange];
        return newRange.splice(currentPage - 4, 5);
      }
    }
  };

  const solvedRange = RangeDeterminer();
  const prevHandler = () => {
    if (currentPage > 1) {
      handleChange(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPage < totalRange.length) {
      handleChange(currentPage + 1);
    }
  };

  const goToFirstPage = () => {
    handleChange(1);
  };

  const goToLastPage = () => {
    handleChange(pages);
  };
  return (
    <div
      className={`mb-12 ${
        pages === 1 ? "hidden" : "flex"
      } flex-col md:flex-row justify-between md:items-center`}
    >
      <div className="page__1__of">
        <p className="text-sm md:text-base text-blue-dark font-normal">
          Page {currentPage} of {pages}, showing {totalPageProduct} record(s)
          out of {totalCount} total
        </p>
      </div>

      <div className="flex items-center">
        {currentPage > 1 && totalRange.length > 5 && (
          <div className="cursor-pointer" onClick={prevHandler}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <div className="flex justify-center items-center mr-5 mt-4 md:mt-0">
          {solvedRange[0] > totalRange[0] && (
            <div className="flex justify-center items-center h-6 w-6 rounded-sm cursor-pointer">
              <p className="text-blue-dark text-sm" onClick={goToFirstPage}>
                ...
              </p>
            </div>
          )}
          {solvedRange.map((page) => (
            <div
              key={page}
              className={`flex justify-center items-center px-2.5 rounded-sm py-1 ${
                page === currentPage ? "bg-red-light" : ""
              } cursor-pointer`}
              onClick={() => handleChange(page)}
            >
              <p
                className={`${
                  currentPage === page ? "text-white" : "text-blue-dark"
                } text-sm`}
              >
                {page}
              </p>
            </div>
          ))}
          {solvedRange[solvedRange.length - 1] < totalRange.length && (
            <div className="flex justify-center items-center h-6 w-6 rounded-sm cursor-pointer">
              <p className="text-blue-dark text-sm" onClick={goToLastPage}>
                ...
              </p>
            </div>
          )}
        </div>
        {currentPage < totalRange.length && totalRange.length > 5 && (
          <div className="cursor-pointer" onClick={nextHandler}>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
