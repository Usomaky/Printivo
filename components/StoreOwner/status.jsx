import React, { useState } from "react";
import { fetcher, toCCUrl } from "@/utils/index";
import useSWR, { mutate } from "swr";
import api from "@/services/api";
import Toastr from "toastr";

const PendingTab = () => {
  const { data: designsStatusData, error: designsError } = useSWR(
    () => `/designers/request.json?accepted=<null>`,
    fetcher
  );

  const [isLoading, setIsLoading] = useState(false);

  const deleteDesignRequest = async (id) => {
    setIsLoading(true);
    try {
      await api.delete(`/designers/request/${id}.json`);
      Toastr.success("Deleted Successfully");
      mutate("/designers/request.json");
    } catch (error) {
      Toastr.error("Unable to delete");
    } finally {
      setIsLoading(false);
    }
  };

  let pendingAndRejectedDesigns = [];

  if (designsStatusData) {
    pendingAndRejectedDesigns = [...designsStatusData.data];
  }

  return (
    <>
      {!pendingAndRejectedDesigns?.length && (
        <h1 className="font-serif text-3xl text-blue-dark my-16 text-center">
          You have no pending designs
        </h1>
      )}
      <div className="c-store--pending mt-1">
        {designsStatusData && (
          <>
            {pendingAndRejectedDesigns.map((design) => (
              <div className="c-pending mb-8 w-full" key={design.id}>
                <div className="c-pending__image">
                  <img src={toCCUrl(design.preview_file)} alt="" />
                </div>

                <div className="c-pending__right w-full">
                  <div className="c-pending__details px-6 py-2 flex flex-col">
                    <h5 className="text-blue-dark font-sf--bold text-base mb-5">
                      {design.name}
                    </h5>
                    <div className="mt-auto">
                      <h5 className="text-gray-sub uppercase font-sf--reg text-xs mb-1">
                        Description
                      </h5>
                      <p className="text-blue-md font-sf--bold text-base">
                        {design.description}
                      </p>
                    </div>
                  </div>
                  <div className="c-pending__status px-6 py-2 flex flex-col">
                    <h5 className="text-gray-sub uppercase font-sf--reg text-xs mb-1">
                      status
                    </h5>
                    <div
                      className={`c-status ${
                        design.accepted === false ? "rejected" : "pending"
                      } text-sm mb-5 capitalize`}
                    >
                      {design.accepted === false ? "rejected" : "pending"}
                    </div>

                    <div className="mt-auto">
                      <h5 className="text-gray-sub uppercase font-sf--reg text-xs mb-1">
                        reason
                      </h5>
                      <p className="text-blue-md font-sf--bold text-base">
                        {design.accepted_reason}
                      </p>
                    </div>
                  </div>

                  <div className="c-pending__tags px-6 py-2 flex flex-col">
                    <h5 className="text-gray-sub uppercase font-sf--reg text-xs mb-1">
                      tags
                    </h5>
                    <div className="text-sm flex flex-wrap text-blue-md c-tags">
                      {design.tags.map((tag) => (
                        <div className="c-tag">{tag}</div>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <h5 className="text-gray-sub uppercase font-sf--reg text-xs mb-1">
                        Date created
                      </h5>
                      <p className="text-blue-md font-sf--bold text-base">
                        March 14, 2021
                      </p>
                    </div>
                  </div>
                  <div className="c-pending__panels px-6 py-2 flex flex-col">
                    <div className="flex font-sf--bold text-sm">
                      {/* <button className="text-white bg-blue-dark mr-8">
                        Edit
                      </button> */}
                      <button
                        className="del-btn text-blue-dark"
                        onClick={() => deleteDesignRequest(design.id)}
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PendingTab;
