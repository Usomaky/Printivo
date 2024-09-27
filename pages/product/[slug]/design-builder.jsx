import { useEffect, useState } from "react";
import CustomerCanvas from "@/components/CustomerCanvas";
import GetSavedDesign from "@/components/CustomerCanvas/GetSavedDesign";
import { useProducts } from "@/hooks/useProducts";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import Search from "../../../components/global/search";
import Services from "../../../components/global/services";
import Layout from "../../../components/layout/layout";
import Link from "../../../components/link";
import { fetcher } from "../../../utils";

const DesignBuilder = () => {
  const { cartData, addToCart, orderData } = useProducts();

  const { user } = useUser();
  const [designData, setDesignData] = useState(null);

  const router = useRouter();
  const slug = router.query.slug;
  const design = router.query.design;
  const edit = router.query.edit || false;

  useEffect(() => {
    if (edit) {
      getOptions();
    }
  }, [edit]);

  const getOptions = async () => {
    const response = await fetcher(`/saved-items/${edit}/cc-options.json`);
    setDesignData(response);
    console.table("saved-items: ", response);
  };

  return (
    <>
      <Layout>
        <div className="m-product mt-44 md:mt-20">
          <div className="content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <Link to={`/product/${slug}`} className="text-gray-md">
                {slug} /{" "}
              </Link>{" "}
              <Link
                to={`/product/${slug}/design-options`}
                className="text-gray-md"
              >
                Design Options /{" "}
              </Link>{" "}
              <span className="text-red-light font-sf"> Create Yourself</span>
            </header>

            <Search placeholder="Search for any product" />

            <section>
              <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-2">
                Create your design
              </h1>

              <p className="font-sf--reg font-15 text-blue-dark max-w-md">
                Create you own custom design with our online design tool. Remix
                any of our templates or start from a blank slate.
              </p>
            </section>
            {designData ? (
              <GetSavedDesign
                slug={slug}
                design={design}
                editMode={designData}
                user={user}
                cart={cartData.length > 0 ? cartData : null}
                orderData={orderData}
                designData={designData}
              />
            ) : (
              <CustomerCanvas
                slug={slug}
                design={design}
                editMode={designData}
                user={user}
                cart={cartData.length > 0 ? cartData : null}
                orderData={orderData}
              />
            )}
          </div>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default DesignBuilder;
