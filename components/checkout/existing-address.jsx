import { useEffect, useState } from "react";

const ExistingAddress = ({
  setIsNewAddress,
  filteredAddresses,
  changeAddress,
  orderData,
  pickup,
  onPickupChange,
  setIsPickUp,
}) => {
  const [collectOption, setCollectOption] = useState("delivery");

  useEffect(() => {
    orderData?.is_pickup && setCollectOption("pickup");
  }, [orderData]);

  return (
    <div className="">
      <div className="mb-14 maw-600">
        <div className="py-6 max-w-sm px-4 border-cream bg-pastel-brown mb-6">
          <div>
            <h3 className="text-blue-dark font-sf mb-1 text-base">
              {orderData?.customer?.full_name}
            </h3>
            <p className="text-blue-md font-sf--reg mb-1 text-sm">
              {orderData?.customer?.email}, {orderData?.customer?.phone}
            </p>
          </div>
        </div>
      </div>

      <button
        className="bg-transparent text-red-light text-base font-sf--reg underline"
        type="button"
        onClick={() => setIsNewAddress(true)}
      >
        Ship to someone else
      </button>

      <div className="mt-9">
        <h3 className="font-sf--bold mb-1 text-blue-dark text-lg">
          Shipping Information
        </h3>

        <hr className="border-cream-md border-t-1 maw-600" />

        <div className="options-picker existing-address mt-4 mb-8 flex">
          <div
            onClick={() => {
              setCollectOption("delivery");
              setIsPickUp(false);
            }}
            className={`option ${
              collectOption === "delivery" ? "active" : ""
            } w-full cursor-pointer py-5 mr-8 font-sf flex items-center justify-center rounded-sm`}
          >
            <div className="md:mr-5 mr-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 22.875a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM26.375 17.875a.625.625 0 100 1.25.625.625 0 000-1.25zM7.875 22.875a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
                  fill="currentColor"
                />
                <path
                  d="M29.373 15.415l-1.078-4.31a1.86 1.86 0 00.58-1.355A1.877 1.877 0 0027 7.875h-5V6a1.877 1.877 0 00-1.875-1.875H1.875A1.877 1.877 0 000 6v16.25c0 1.034.841 1.875 1.875 1.875h2.25a3.754 3.754 0 003.75 3.75 3.754 3.754 0 003.75-3.75H23.25a3.754 3.754 0 003.75 3.75 3.754 3.754 0 003.75-3.75c0-.036-.002-.071-.003-.107A1.878 1.878 0 0032 22.25V18.5a3.13 3.13 0 00-2.627-3.085zm-2.236-3.79l.938 3.75h-5.191l1.433-1.433a.625.625 0 10-.884-.884L22 14.491v-2.866h5.137zm.488-1.875c0 .345-.28.625-.625.625h-5v-1.25h5c.345 0 .625.28.625.625zM7.875 26.625a2.503 2.503 0 01-2.5-2.5c0-1.397 1.142-2.5 2.5-2.5 1.361 0 2.5 1.106 2.5 2.5 0 1.378-1.122 2.5-2.5 2.5zm3.535-3.75a3.763 3.763 0 00-3.535-2.5 3.763 3.763 0 00-3.536 2.5H1.875a.626.626 0 01-.625-.625V6c0-.345.28-.625.625-.625h18.25c.345 0 .625.28.625.625v16.875h-9.34zM27 26.625a2.503 2.503 0 01-2.5-2.5c0-1.397 1.142-2.5 2.5-2.5 1.361 0 2.5 1.106 2.5 2.5 0 1.378-1.122 2.5-2.5 2.5zm3.491-3.87A3.764 3.764 0 0027 20.376a3.763 3.763 0 00-3.536 2.5H22v-6.25h6.875c.815 0 1.51.523 1.768 1.25h-1.768a.625.625 0 100 1.25h1.875v3.125a.625.625 0 01-.259.506z"
                  fill="currentColor"
                />
                <path
                  d="M11 7.875A5.631 5.631 0 005.375 13.5 5.631 5.631 0 0011 19.125a5.631 5.631 0 005.625-5.625A5.631 5.631 0 0011 7.875zm0 10A4.38 4.38 0 016.625 13.5 4.38 4.38 0 0111 9.125a4.38 4.38 0 014.375 4.375A4.38 4.38 0 0111 17.875z"
                  fill="currentColor"
                />
                <path
                  d="M13.5 12.875h-1.875V11a.625.625 0 10-1.25 0v2.5c0 .345.28.625.625.625h2.5a.625.625 0 100-1.25z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-sm">Deliver to Me</p>
          </div>

          <div
            onClick={() => {
              setCollectOption("pickup");
              setIsPickUp(true);
              changeAddress(3); //The id for Lagos Office is 3 that's why the default id there, you could remove this function when we have other offices users can come pick their orders
            }}
            className={`option w-full cursor-pointer ${
              collectOption === "pickup" ? "active" : ""
            } py-5 font-sf flex items-center justify-center rounded-sm`}
          >
            <div className="md:mr-5 mr-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.932 10.527L28.925 4.6V2.25a.625.625 0 00-.625-.625H3.7a.625.625 0 00-.625.625V4.6L.068 10.528A.625.625 0 000 10.81v1.537a3.705 3.705 0 003.075 3.646v13.132h-.64a.625.625 0 000 1.25H29.565a.625.625 0 000-1.25h-.64V15.993A3.705 3.705 0 0032 12.347V10.81a.625.625 0 00-.068-.283zM4.325 2.875h23.35v1.25H4.325v-1.25zm15.372 7.872l-.545-5.372h3.765l1.683 5.528v1.444c0 1.351-1.099 2.45-2.45 2.45a2.453 2.453 0 01-2.45-2.45V10.81a.635.635 0 00-.003-.063zm-1.247.094v1.506c0 1.351-1.1 2.45-2.45 2.45a2.453 2.453 0 01-2.45-2.45v-1.506l.555-5.466h3.79l.555 5.466zm-5.601-5.466l-.546 5.372a.603.603 0 00-.003.063v1.537c0 1.351-1.099 2.45-2.45 2.45a2.453 2.453 0 01-2.45-2.45v-1.444l1.683-5.528h3.765zM1.25 12.347V10.96l2.834-5.584h3.692l-1.599 5.253a.626.626 0 00-.027.182v1.537c0 1.351-1.1 2.45-2.45 2.45a2.453 2.453 0 01-2.45-2.45zm23.925 16.778h-3.75V24.75h.625a.625.625 0 100-1.25h-.625v-4.375h3.75v10zm2.5 0h-1.25V18.5a.625.625 0 00-.625-.625H6.2a.625.625 0 00-.625.625v8.75c0 .345.28.625.625.625h13.975v1.25H4.325V15.993a3.707 3.707 0 002.45-1.59 3.7 3.7 0 003.075 1.644 3.7 3.7 0 003.075-1.645A3.7 3.7 0 0016 16.047c1.28 0 2.41-.654 3.075-1.645a3.7 3.7 0 003.075 1.645 3.7 3.7 0 003.075-1.645 3.707 3.707 0 002.45 1.591v13.132zm-14.754-10h2.177l-1.188 1.188a.625.625 0 00.884.884l2.072-2.072h3.309v7.5H6.825v-1.404l6.096-6.096zm-6.096 4.328v-4.328h4.328l-4.328 4.328zM30.75 12.347c0 1.351-1.1 2.45-2.45 2.45a2.453 2.453 0 01-2.45-2.45V10.81a.623.623 0 00-.027-.182l-1.6-5.253h3.693l2.834 5.584v1.388z"
                  fill="currentColor"
                />
                <path
                  d="M13.07 22.66c.16 0 .319-.06.441-.181l.01-.01a.625.625 0 00-.88-.887l-.011.01a.625.625 0 00.44 1.069zM.64 29.125H.625a.625.625 0 000 1.25H.64a.625.625 0 000-1.25zM31.374 29.125h-.015a.625.625 0 000 1.25h.015a.625.625 0 000-1.25z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-sm">Self Pickup</p>
          </div>
        </div>

        {collectOption === "delivery" ? (
          <div className="addresses-grid">
            <div className="py-8 max-w-sm flex flex-col justify-center items-center px-4 border-cream border-dashed bg-pastel-brown">
              <div>
                <img
                  src="data:image/svg+xml,%3Csvg width='22' height='17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.965 13a3.5 3.5 0 01-6.93 0H0V1a1 1 0 011-1h14a1 1 0 011 1v2h3l3 4.056V13h-2.035a3.5 3.5 0 01-6.93 0h-5.07zM14 2H2v8.05a3.5 3.5 0 015.663.95h5.674c.168-.353.393-.674.663-.95V2zm2 6h4v-.285L17.992 5H16v3zm.5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 12.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z' fill='%23506683'/%3E%3C/svg%3E"
                  alt="delivery bus"
                  className="mx-auto mb-6"
                />
                <button
                  onClick={() => setIsNewAddress(true)}
                  className="bg-red-light rounded-sm py-2 px-6 text-sm text-white font-sf"
                >
                  Add a new shipping address
                </button>
              </div>
            </div>
            {filteredAddresses?.map((address) => (
              <div className="pickup-option" key={address.id}>
                <div className="w-full h-full">
                  <input
                    type="radio"
                    name="pickupAddress"
                    id={address.id}
                    required
                    defaultChecked={orderData?.address_id === address.id}
                    onChange={() => changeAddress(address.id)}
                  />
                  <label
                    className="font-sf w-full h-full inline-block"
                    htmlFor={address.id}
                  >
                    <div className="label-header py-3 px-4 font-15">
                      Ship to this address
                    </div>
                    <div className="label-address leading-6 px-4 pt-6 pb-7 font-13">
                      <p>{address.line_one}</p>
                      <p>{address.line_two}</p>
                      {address.phone_number && (
                        <p>Tel: {address.phone_number}</p>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pickup-option collect-option md:flex maw-600">
            {pickup.map((address) => (
              <div
                className="mr-8 w-full mb-7 md:mb-0"
                style={{ maxWidth: "281px" }}
                key={address.id}
              >
                <input
                  type="radio"
                  name="pickupAddress"
                  id={address.id}
                  required
                  // defaultChecked={orderData?.address_id === address.id}
                  checked={orderData?.address_id === address.id}
                  onChange={() => onPickupChange(address.id)}
                />
                <label
                  className="font-sf w-full inline-block"
                  htmlFor={address.id}
                >
                  <div className="label-header py-3 px-4 font-15">
                    {address.label}
                  </div>
                  <div className="label-address leading-6 px-4 pt-6 pb-7 font-13">
                    <p>{address.line_one}</p>
                    <p>{address.line_two}</p>
                    <p>Self Pickup, Nigeria</p>
                    <p>Tel: {address.phone_number}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingAddress;
