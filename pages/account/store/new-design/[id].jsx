import DesignerCanvas from "@/components/DesignerCanvas";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useUser } from "@/hooks/useUser";
import api from "@/services/api";
import { fetcher, toS3Url } from "@/utils/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const CustomizeNewDesign = () => {
  const { user } = useUser();
  const storeId = user?.user?.store.id;
  const { query } = useRouter();
  const productId = query.id;
  const [designData, setDesignData] = useState(null);

  const getDesignData = async () => {
    if (!storeId || !productId) return;
    const apiData = {
      store_id: storeId,
      state: null,
    };

    try {
      const res = await api.post(
        `/products/${productId}/cc-options.json`,
        apiData
      );

      setDesignData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDesignData();
  }, [storeId, productId]);

  return (
    <div>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-store--upload md:pt-9 pt-11 content-container mx-auto">
            <section>
              {designData && (
                <DesignerCanvas
                  designData={designData}
                  slug={designData.design.product.slug}
                />
              )}
            </section>
          </main>
        </div>
      </Layout>
    </div>
  );
};

export default CustomizeNewDesign;
