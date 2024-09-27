import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { fetcher, toS3Url } from "@/utils/index";
import { useRouter } from "next/router";
import useSWR from "swr";
import "twin.macro";

const NewUpload = () => {
  const { data: designData, error } = useSWR(
    "/products.json?vendor_id=1&limit=155&active=1&parent_id=<not-null>&designer_request_base_psd=<not-null>",
    fetcher
  );
  const router = useRouter();


  return (
    <div>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store--upload md:pt-9 pt-11 content-container mx-auto">
            <h1 className="font-dm text-blue-dark font-32 mb-8">
              Design Upload
            </h1>
            <button
              onClick={() => router.back()}
              className="back-to py-1 px-2.5 mb-10 inline-block text-sm font-sf--bold"
            >
              <span>Back</span>
            </button>

            <section>
              <p className="font-sf--reg text-base max-w-2xl text-blue-md mb-10">
                Start by adding artwork, texts, or colors to the various
                products, add them to your store. We will review and approve
                within 48hrs and your design will be made available for Printivo
                customers to use. You earn anytime a Printivo customer makes use
                of or purchases your design.
              </p>
              <h3 className="text-blue-md font-sf--bold text-base mb-4">
                Choose the product you would love to create a design for.
              </h3>

              <div className="upload-choices mb-10">
                {designData?.data.map((item) => (
                  <div className="design-box" key={item.id} tw="flex flex-col">
                    <div className="box-image">
                      <img
                        src={toS3Url(`${item.thumbnail_path}`)}
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div tw="h-full">
                      <div
                        className="box-title py-2.5 pb-4 px-4"
                        tw="h-full flex flex-col"
                      >
                        <h3 className="box-title text-blue-dark font-sf text-base mb-12">
                          {item.name}
                        </h3>
                        <Link
                          to={`/account/store/new-design/${item.id}`}
                          tw="mt-auto"
                        >
                          <button className="c-order__button font-sf">
                            <span>Upload Design</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </div>
  );
};

export default NewUpload;
