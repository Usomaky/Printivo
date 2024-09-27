import { formatProductText, toS3Url } from "@/utils/index";
import React from "react";
import "twin.macro";
import { Button } from "@/elements/Button/Button";
import { useRouter } from "next/router";


const ProductBox = ({ src, productName, cost, per, url }) => {

  const router = useRouter();

  return (
    <div className="c-preview__box font-sf cursor-pointer" onClick={() => router.push(url)}>
      <div className="c-box__image">
        <img className="w-full" src={toS3Url(src)} alt={productName} />
      </div>
      <div className="c-box__details p-4 font-sf--bold">
        <h3 className="mb-5">{productName}</h3>
        <p className="uppercase mb-2">starting at</p>
        <h3 className="mb-5 text-xl">
          ₦{cost} <span>per {per}</span>
        </h3>
        <Button href={url} withArrow={true}>
          <span>Browse {formatProductText(productName)}</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductBox;
