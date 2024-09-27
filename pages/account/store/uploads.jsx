import { useState } from "react";
import Layout from "@/components/layout/layout";
import UploadedTab from "@/components/StoreOwner/uploaded";
import PendingTab from "@/components/StoreOwner/status";

const OwnerDesigns = () => {
  const [currentTab, setCurrentTab] = useState("uploaded");

  const tabHandler = (current) => {
    if (current !== currentTab) {
      setCurrentTab(current);
    }
  };

  const TABS = {
    uploaded: <UploadedTab switchTabs={tabHandler} />,
    pending: <PendingTab switchTabs={tabHandler} />,
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store c-store--owner md:pt-9 pt-11 content-container mx-auto">
            <h1 className="font-dm text-blue-dark font-32 mb-10">
              Design Upload
            </h1>
            <section className="c-store--owner-designs">
              <div className="c-tabs">
                <div className="c-tabs__header flex items-center font-sf--bold mb-4">
                  <button
                    onClick={() => tabHandler("uploaded")}
                    className={`${
                      currentTab === "uploaded" ? "active" : ""
                    } mr-4 mb-1 flex items-center text-base`}
                  >
                    <span>Uploaded Designs</span> <span></span>
                  </button>
                  <button
                    onClick={() => tabHandler("pending")}
                    className={`${
                      currentTab === "pending" ? "active" : ""
                    } flex items-center text-base mb-1`}
                  >
                    <span>Pending Designs</span> <span></span>
                  </button>
                </div>
                <hr />
                <div className="c-tab__body mt-10">{TABS[currentTab]}</div>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default OwnerDesigns;
