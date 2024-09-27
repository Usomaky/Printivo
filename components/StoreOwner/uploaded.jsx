import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { fetcher, sortArrayofObjects } from "@/utils/index";
import useSWR, { mutate } from "swr";
import Link from "../link";
import swal from "sweetalert";
import api from "@/services/api";
import Loader from "../states/Loader";
import NewPagination from "@/components/global/new-pagination";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const ShareLinkButton = ({ design }) => {
  const handleCopyClick = () => {
    swal("Link Copied!", "", "success");
  };
  const storeDataAndCopyLink = () => {
    // Store necessary data in localStorage
    localStorage.setItem('designSlug', design?.slug);
    localStorage.setItem('productSlug', design?.product.slug);

    // Copy the link after storing data
    handleCopyClick();
  };
  return (
    <div className="flex items-center">
      <p className="mt-auto mr-4">{`Share your design:`}</p>

      <div className="flex flex-col">

        <CopyToClipboard
          text={`${process.env.NEXT_PUBLIC_BASE_URL}cart/add/${design.slug}`}
          onCopy={storeDataAndCopyLink}
        >
          <button
            type="button"
            className=""
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.3643 15.536L16.9503 14.12L18.3643 12.706C18.8319 12.2424 19.2034 11.6911 19.4573 11.0836C19.7113 10.4761 19.8428 9.8244 19.8442 9.16595C19.8457 8.5075 19.717 7.85525 19.4657 7.24665C19.2144 6.63804 18.8454 6.08507 18.3798 5.61947C17.9142 5.15387 17.3612 4.78483 16.7526 4.53351C16.144 4.2822 15.4917 4.15357 14.8333 4.15502C14.1748 4.15646 13.5232 4.28794 12.9157 4.54192C12.3082 4.79589 11.7568 5.16736 11.2933 5.63499L9.87926 7.04999L8.46426 5.63599L9.88026 4.22199C11.1931 2.90917 12.9736 2.17163 14.8303 2.17163C16.6869 2.17163 18.4674 2.90917 19.7803 4.22199C21.0931 5.53481 21.8306 7.31538 21.8306 9.17199C21.8306 11.0286 21.0931 12.8092 19.7803 14.122L18.3653 15.536H18.3643ZM15.5363 18.364L14.1213 19.778C12.8084 21.0908 11.0279 21.8283 9.17126 21.8283C7.31465 21.8283 5.53408 21.0908 4.22126 19.778C2.90843 18.4652 2.1709 16.6846 2.1709 14.828C2.1709 12.9714 2.90843 11.1908 4.22126 9.87799L5.63626 8.46399L7.05026 9.87999L5.63626 11.294C5.16863 11.7575 4.79716 12.3089 4.54318 12.9164C4.28921 13.5239 4.15773 14.1756 4.15628 14.834C4.15484 15.4925 4.28347 16.1447 4.53478 16.7533C4.78609 17.3619 5.15514 17.9149 5.62074 18.3805C6.08633 18.8461 6.63931 19.2152 7.24791 19.4665C7.85652 19.7178 8.50877 19.8464 9.16722 19.845C9.82567 19.8435 10.4774 19.712 11.0849 19.4581C11.6924 19.2041 12.2437 18.8326 12.7073 18.365L14.1213 16.951L15.5363 18.365V18.364ZM14.8283 7.75699L16.2433 9.17199L9.17226 16.242L7.75726 14.828L14.8283 7.75799V7.75699Z"
                fill={"#384A62"}
              />
            </svg>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};


const UploadedTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [perPage, setPerpage] = useState(0);
  const [pageProductNumber, setPageProductNumber] = useState(0);
  const [designs, setDesigns] = useState({ data: [] });
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const { data: designsData, error: designsError } = useSWR(
    () =>
      `/designs.json?store_id=${user.user.store.id}&include=product&limit=20`,
    fetcher
  );
  useEffect(() => {
    setTotalProductCount(designs?.meta?.filteredCount);
    setPerpage(designs?.meta?.perPage);
    setCurrentPage(designs?.meta?.page);
    setPageProductNumber(designs?.meta?.resultCount);
    setTotalPageCount(designs?.meta?.pageCount);
  }, [designs]);

  useEffect(() => {
    if (currentPage > 0) {
      getDesignData();
    }
  }, [currentPage]);

  useEffect(() => {
    if (user?.user?.store?.id) {
      getDesignData();
    }
  }, [user]);

  const getDesignData = async () => {
    if (user) {
      try {
        const designs = await fetcher(
          `/designs.json?store_id=${user.user.store.id}&include=product&limit=12&page=${currentPage}`
        );
        setDesigns(designs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changePage = (e) => {
    setCurrentPage(e);
  };

  const handleDeleteDesign = (slug) => {
    swal("Are you sure, you want to delete this design??", {
      buttons: {
        cancel: "Cancel!",
        confirm: {
          text: "Yes Proceed",
          value: "confirm",
        },
      },
    }).then(async (value) => {
      switch (value) {
        case "confirm":
          try {
            setLoading(true);
            await api.delete(`designs/${slug}.json`);
            await getDesignData();
            swal("Done!", "Design Deleted Successfully", "success");
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }

          break;

        default:
          swal("Alert", "Design Not deleted", "warning");
      }
    });
  };


  const router = useRouter();


  return (
    <div>
      <div className="owner-uploads">
        <Link to="/account/store/new-design">
          <button className="font-sf--bold block ml-auto text-blue-dark font-sm py-2 px-6 mb-8 text-sm add-new">
            <span>Add a New Product</span>
          </button>
        </Link>

        <div className="owner-uploads__grid mb-20">
          {sortArrayofObjects(designs.data, "id", "descending")?.map(
            (designs, i) => (
              <div className="design-box" key={i}>
                <div className="box-image">
                  <img
                    src={`https://sp.printivo.com/api/rendering//${designs.preview_file}`}
                    alt=""
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="box-title py-2.5 pb-4 px-4">
                    <h3 className="box-title text-blue-dark font-sf text-base mb-12">
                      {designs.name}
                    </h3>
                    {/* {designs.supports_straight_to_cart && (
                    <Link to={`/cart/add/${designs?.slug}`}>
                      <button
                        type="button"
                        className="text-white c-order__button bg-red-light"
                      >
                        <span>Add to cart</span>
                      </button>
                    </Link>
                  )} */}
                    {/* {!designs.supports_straight_to_cart && (
                    <Link
                      to={`/product/${designs?.product.slug}/design-builder?design=${designs.slug}`}
                    >
                      <button
                        type="button"
                        className="text-white c-order__button bg-red-light"
                      >
                        <span>Customize</span>
                      </button>
                    </Link>
                  )} */}

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/product/${designs?.product.slug}/design-builder?design=${designs.slug}`}
                      >
                        <button
                          type="button"
                          className="text-white c-order__button bg-red-light"
                        >
                          <span>Customize</span>
                        </button>
                      </Link>

                      <button
                        className="w-24 text-sm block bg-blue-dark text-white p-3 rounded"
                        disabled={loading}
                        onClick={() => handleDeleteDesign(designs.slug)}
                      >
                        {loading ? <Loader /> : <span>Delete</span>}
                      </button>
                    </div>
                    <br />
                    <ShareLinkButton design={designs} />

                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div className="my-10">
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
  );
};

export default UploadedTab;
