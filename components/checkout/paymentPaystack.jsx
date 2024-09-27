import { handleTransaction } from "@/services/paystack-payment";
import { useState } from "react";
import Loader from "../states/Loader";

export default function PaymentPaystack({ order }) {
  const [paymentOption, setPaymentOption] = useState("paystack");
  const [bankTransfer, setBankTransfer] = useState("");
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let values = {
    is_pickup: false,
    use_new_address: true,
    payment_option: "",
    checkout_step: "payment",
    bank: "",
    coupon_id: "",
    referral_code: "",
    reseller_id: "",
    member_id: "",
    address_id: "",
  };

  const handlePayment = () => {
    // console.log({ ...order });

    if (paymentOption === "paystack") {
      values.payment_option = paymentOption;
      // console.log("Values", values);
      const callback = (response) => {
      };
      handleTransaction(order, values, callback);
    }
    if (paymentOption === "bank-transfer") {
      values.payment_option = paymentOption;
      setIsLoading(true);
      values.bank = bankTransfer;
      const callback = (response) => {
        setTransactionDetails(response);
        setIsLoading(false);
      };
      handleTransaction(order, values, callback);
    }
  };

  return (
    <div>
      <div className="options-picker mt-4 mb-8 flex">
        <div
          onClick={() => setPaymentOption("paystack")}
          className={`option ${
            paymentOption === "paystack" ? "active" : ""
          } w-full cursor-pointer py-3 md:mr-8 mr-2 font-sf flex items-center justify-center rounded-sm`}
        >
          <div className="md:mr-5 mr-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.8 30.095a.781.781 0 00-1.088.197 8.828 8.828 0 01-.802.994 9.503 9.503 0 01-.764.718.781.781 0 001.013 1.19c.344-.294.654-.585.894-.843.345-.37.663-.763.944-1.169a.781.781 0 00-.198-1.087zM28.397 33.598a.781.781 0 00-1.04-.375l-.024.01a.781.781 0 10.688 1.404.782.782 0 00.376-1.039z"
                fill="currentColor"
              />
              <path
                d="M37.666 2.031H2.334A2.337 2.337 0 000 4.365V26.26a2.337 2.337 0 002.334 2.334h16.452c.697 2.95 2.274 5.04 3.653 6.38 2.012 1.954 4.318 2.995 5.21 2.995.89 0 3.197-1.041 5.209-2.996 1.378-1.339 2.955-3.428 3.653-6.38h1.155A2.337 2.337 0 0040 26.26V4.365a2.337 2.337 0 00-2.334-2.334zm-2.354 23.361c0 4.116-1.9 6.847-3.494 8.412-1.89 1.858-3.83 2.58-4.17 2.602-.34-.022-2.28-.744-4.17-2.602-1.594-1.565-3.494-4.296-3.494-8.412v-3.847a34.965 34.965 0 007.664-3.242 36.18 36.18 0 007.664 3.241v3.848zm3.126.868a.772.772 0 01-.772.771h-.884c.06-.523.093-1.07.093-1.639v-4.44a.781.781 0 00-.577-.754 34.465 34.465 0 01-8.255-3.471.782.782 0 00-.79 0 33.516 33.516 0 01-8.255 3.471.781.781 0 00-.576.754v4.44c0 .57.032 1.116.092 1.64H2.334a.772.772 0 01-.772-.772V12.969h36.876V26.26zm0-14.854H1.562V8.281h36.876v3.125zm0-4.687H1.562V4.365c0-.425.347-.771.772-.771h35.332c.425 0 .772.346.772.771V6.72z"
                fill="currentColor"
              />
              <path
                d="M9.375 18.438a3.52 3.52 0 00-1.367.277 3.52 3.52 0 00-4.883 3.239 3.52 3.52 0 004.883 3.238 3.52 3.52 0 004.882-3.239 3.52 3.52 0 00-3.515-3.515zM6.64 23.906a1.955 1.955 0 01-1.954-1.953c0-1.077.877-1.953 1.954-1.953s1.953.876 1.953 1.953a1.955 1.955 0 01-1.953 1.953zm2.927-.01a3.495 3.495 0 00.588-1.943c0-.718-.217-1.386-.588-1.943.987.097 1.76.932 1.76 1.943a1.956 1.956 0 01-1.76 1.944zM7.925 14.922H3.906a.781.781 0 100 1.563h4.019a.781.781 0 000-1.563zM10.233 14.922h-.037a.781.781 0 100 1.563h.037a.781.781 0 000-1.563zM31.937 23.596a.781.781 0 00-1.105 0l-4.178 4.177-2.19-2.19a.782.782 0 00-1.104 1.106l2.742 2.741a.779.779 0 001.104 0l4.73-4.73a.781.781 0 000-1.104z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-sm">Debit Card</p>
        </div>

        <div
          onClick={() => setPaymentOption("bank-transfer")}
          className={`option w-full cursor-pointer ${
            paymentOption === "bank-transfer" ? "active" : ""
          } py-3 font-sf flex items-center justify-center rounded-sm`}
        >
          <div className="md:mr-5 mr-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.334 33.333h-1.333v-.667a2 2 0 00-1.334-1.877V17.21a2 2 0 001.334-1.877v-.667a2 2 0 100-4h-.478L20.35.098a.666.666 0 00-.698 0L2.479 10.666h-.478a2 2 0 000 4v.667a2 2 0 001.333 1.877V30.79a2 2 0 00-1.333 1.877v.667H.668A.667.667 0 000 34v5.333c0 .368.298.667.667.667h38.666a.667.667 0 00.667-.667V34a.667.667 0 00-.667-.667zm-2.667-18a.667.667 0 01-.666.667h-2.667a.667.667 0 01-.667-.667v-.667h4v.667zM36.002 32c.368 0 .666.298.666.666v.667h-4v-.667c0-.368.299-.666.667-.666h2.667zm-2-1.334V17.333h1.333v13.333h-1.333zM2 13.333a.667.667 0 010-1.333h4.667v-1.334H5.023L20.001 1.45l14.978 9.217H10.668V12H38a.667.667 0 110 1.333H2zm13.333 17.456V17.21a2 2 0 001.334-1.877v-.667h6.666v.667a2 2 0 001.334 1.877V30.79a2 2 0 00-1.334 1.877v.667h-6.666v-.667a2 2 0 00-1.334-1.877zm-.666 1.21c.368 0 .666.3.666.667v.667h-4v-.667c0-.368.299-.666.667-.666h2.667zm-2-1.333V17.333H14v13.333h-1.333zm2-14.666H12a.667.667 0 01-.667-.667v-.667h4v.667a.667.667 0 01-.666.667zm10 16.666c0-.368.298-.666.666-.666h2.667c.368 0 .666.298.666.666v.667h-4v-.667zm1.333-2V17.333h1.333v13.333h-1.333zM28 16h-2.667a.667.667 0 01-.666-.667v-.667h4v.667A.667.667 0 0128 16zM4 16a.667.667 0 01-.667-.667v-.667h4v.667a.667.667 0 01-.666.667H4zm2 1.333v13.333H4.668V17.333H6zM3.334 32.666c0-.368.299-.666.667-.666h2.667c.368 0 .666.298.666.666v.667h-4v-.667zm5.334 6H1.334v-4h7.334v4zM7.334 30.79V17.21a2 2 0 001.334-1.877v-.667H10v.667a2 2 0 001.333 1.877V30.79a2 2 0 00-1.333 1.877v.667H8.668v-.667a2 2 0 00-1.334-1.877zm22.667 7.877H10v-1.333h16V36H10v-1.334h20v4zm-1.334-7.877V17.21a2 2 0 001.334-1.877v-.667h1.333v.667a2 2 0 001.333 1.877V30.79a2 2 0 00-1.333 1.877v.667h-1.333v-.667a2 2 0 00-1.334-1.877zm10 7.877h-7.333v-4h7.333v4z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-sm">Bank Transfer</p>
        </div>
      </div>
      {paymentOption === "paystack" ? (
        <div>
          <button
            className="py-3 input-rounded px-14 bg-green-dark text-white text-sm font-sf"
            onClick={() => handlePayment()}
          >
            Pay Now
          </button>
        </div>
      ) : (
        <div className="md:flex">
          <div className="w-full md:mr-8">
            <label
              htmlFor="bank"
              className="font-sf--bold text-blue-dark inline-block mb-1"
            >
              Select a bank to pay with
            </label>
            <select
              name="bank"
              id="bank"
              required
              className="input-border-brown capitalize appearance w-full font-15 indent outline font-sf--reg text-blue-dark h-11"
              onChange={(e) => setBankTransfer(e.target.value)}
            >
              <option value="">-- Select Bank --</option>

              <option value="alat-by-wema">ALAT by WEMA</option>
              <option value="sterling-bank">Sterling Bank</option>
              <option value="united-bank-for-africa">
                United Bank For Africa
              </option>
              <option value="missing" className="capitalize">
                My bank is not listed
              </option>
            </select>

            <button
              className={`py-3 mt-7 input-rounded flex px-14 bg-green-dark text-white text-sm font-sf`}
              onClick={() => handlePayment()}
              disabled={!bankTransfer || isLoading}
            >
              <span> Pay with Bank Transfer</span>
              {isLoading && <Loader />}
            </button>
          </div>
          {transactionDetails && (
            <div className="table w-full md:mt-0 mt-5">
              <div className="flex justify-between py-6 px-4 border-cream bg-pastel-brown">
                <div>
                  <h3 className="text-blue-dark font-sf mb-1 font-15">
                    Printivo Limited
                  </h3>
                  <p className="text-blue-md font-sf--reg mb-1 font-13">
                    3537404025
                  </p>
                  <p className="text-blue-md font-sf--reg font-13 uppercase">
                    FCMB
                  </p>
                </div>
                <div>
                  <img
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611573047/printivo/image_4_gvxanp.png"
                    alt=""
                    className="w-16 object-cover"
                  />
                </div>
              </div>
              <div className="max-w-xs">
                <p className="text-blue-dark font-sf font-13 mb-1 mt-3">
                  Please pay into the bank details above to confirm your order.
                </p>
                <p className="text-blue-dark font-sf font-13">
                  Quote {transactionDetails?.id} as your discription(or put the
                  product name)
                </p>
                <button
                  onClick={() =>
                    (window.location.href = `/checkout/success/${transactionDetails.id}`)
                  }
                  className="py-3 mt-7 w-full hidden md:block input-rounded bg-green-dark text-white text-sm font-sf"
                >
                  I have made the payment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
