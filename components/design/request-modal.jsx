import { useProducts } from "@/hooks/useProducts";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "../link";
import Loader from "../states/Loader";

const RequestModal = ({ showmodal, modalHandler }) => {
  const [isAgree, setIsAgree] = useState(false);
  const router = useRouter();

  const { currentProduct, addToCart, cartLoading } = useProducts();

  const toCart = async () => {
    try {
      await addToCart(currentProduct);
      modalHandler();
      router.push("/cart");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`c-modal c-modal--request px-3 ${showmodal ? "active" : ""}`}
    >
      <div className="inner w-full bg-white">
        <div className="c-modal--request__header w-full flex justify-between items-center py-2 px-6">
          <h1 className="font-sf text-blue-dark md:text-xl">
            Please Read Carefully
          </h1>
          <button onClick={modalHandler} className="close-modal">
            <img
              src="data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23B0B8C2' fill-opacity='.3'/%3E%3Cpath d='M20 30c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zM23 17l-6 6M17 17l6 6' stroke='%23506683' strokeWidth='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
              alt="close modal"
            />
          </button>
        </div>
        <hr className="border-cream" />

        <div className="c-modal--request__body p-6">
          <div className="inner">
            <h3 className="font-sf--bold font-15 text-blue-dark mb-2">
              Printivo Design Services
            </h3>
            <p className="text-blue-dark font-15 font-sf--reg mb-6">
              You will receive your first design options within 72 working hours
              of placing your order.
            </p>
            <p className="text-blue-dark font-15 font-sf--reg mb-6">
              The design service is an extra service which adds additional time
              to your order. Our delivery service level agreement (5 working
              days for Lagos and 7 working days for other Nigerian cities) will
              start counting when you approve your design.
            </p>
            <p className="text-blue-dark font-15 font-sf--reg mb-6">
              You will receive your artwork in two design options with the
              ability to request three changes on your selected option. Extra
              changes may attract extra charges.
            </p>
            <p className="text-blue-dark font-15 font-sf--reg mb-6">
              Payments made for designer services are non-refundable once we
              have sent you the designs.
            </p>
            <h3 className="font-sf--bold font-15 text-blue-dark mb-2">
              This service does NOT include:
            </h3>
            <ol>
              <li className="text-blue-dark font-15 font-sf--reg mb-3">
                1. Creating, editing or vectoring logos. If you would like to
                order a new logo design, please{" "}
                <Link to="/" className="text-red-light underline">
                  click here.
                </Link>
              </li>
              <li className="text-blue-dark font-15 font-sf--reg mb-3">
                2. Creation and revision of texts and sourcing of stock.
                Customers provide their own contents.
              </li>
            </ol>
          </div>
        </div>

        <div className="c-modal--request__footer flex items-center justify-between py-3 px-6 text-right">
          <div className="inline-flex relative items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              className="mr-2 c-checkbox c-checkbox--red"
              value={!isAgree}
              onChange={() => setIsAgree(!isAgree)}
            />
            <label
              htmlFor="acceptTerms"
              className="font-sf text-blue-dark font-15"
            >
              I agree to these terms
            </label>
          </div>
          <button
            disabled={!isAgree || cartLoading}
            className="text-sm font-sf flex text-white bg-red-light px-6 py-3 rounded-sm"
            onClick={toCart}
          >
            <span>Submit</span>
            {cartLoading && <Loader />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
