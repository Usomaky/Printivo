import React, { useState } from "react";
import Link from "../link";
import EditProfile from "./editProfile";
import ResetPassword from "./resetPassword";
import ShippingModal from "./shippingModal";
import ChangeEmail from "./changeEmail";
import { useCheckout } from "@/hooks/useCheckout";
import api from "@/services/api";
import swal from "sweetalert";
import { getDate } from "@/utils/index";

export default function AccountSetting({ user }) {
  const { addresses } = useCheckout();

  const [isModal, setIsModal] = useState(false);
  const [isModalResetPassword, setIsModalResetPassword] = useState(false);
  const [isChangeEmailModal, setIsChangeEmailModal] = useState(false);
  const [isShippingModal, setIsShippingModal] = useState(false);

  const modalHandler = () => {
    setIsModal(!isModal);
    document.querySelector("body").classList.toggle("no-scroll");
  };
  const changeEmailModal = () => {
    setIsChangeEmailModal(!isChangeEmailModal);
    document.querySelector("body").classList.toggle("no-scroll");
  };
  const resetPasswordModal = () => {
    setIsModalResetPassword(!isModalResetPassword);
    document.querySelector("body").classList.toggle("no-scroll");
  };
  const shippingModal = () => {
    setIsShippingModal(!isShippingModal);
    document.querySelector("body").classList.toggle("no-scroll");
  };

  const deleteAddress = (id) => {
    swal("Are you sure, you want to contiune", {
      buttons: {
        cancel: "Cancel!",
        confirm: {
          text: "Yes Proceed",
          value: "confirm",
        },
      },
    }).then((value) => {
      switch (value) {
        case "confirm":
          try {
            const { data } = api.delete(`addresses/${id}.json`);

            swal("Done!", "Address has been deleted.", "success");
          } catch (error) {
            console.log(error);
          }

          break;

        default:
          swal("Alert", "Address Not deleted", "warning");
      }
    });
  };

  return (
    <div>
      <EditProfile
        modalHandler={modalHandler}
        showmodal={isModal}
        user={user}
      />
      <ResetPassword
        modalHandler={resetPasswordModal}
        showmodal={isModalResetPassword}
      />
      <ChangeEmail
        modalHandler={changeEmailModal}
        showmodal={isChangeEmailModal}
      />
      <ShippingModal modalHandler={shippingModal} showmodal={isShippingModal} />

      <section className="account__grid">
        <div className="user">
          {user?.avatar && (
            <div
              className="user__profile"
              tw="rounded-full"
              css={`
                background-image: url(${user?.avatar});
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center center;
              `}
            />
          )}
          <div className="user__details">
            <span className="font-sf text-blue-dark  text-xl mb-3 max-w-tiny w-100">
              {user.full_name}
            </span>

            <span className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
              {user.email}
            </span>

            <span className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
              {user.phone}
            </span>
            <p className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
              DATE OF BIRTH: <br />
              {getDate(user.date_of_birth).date || ""}
            </p>

            <Link
              to="#"
              className="text-red-light text-sm flex"
              onClick={() => modalHandler()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.414 16.0001L16.556 5.85808L15.142 4.44408L5 14.5861V16.0001H6.414ZM7.243 18.0001H3V13.7571L14.435 2.32208C14.6225 2.13461 14.8768 2.0293 15.142 2.0293C15.4072 2.0293 15.6615 2.13461 15.849 2.32208L18.678 5.15108C18.8655 5.33861 18.9708 5.59292 18.9708 5.85808C18.9708 6.12325 18.8655 6.37756 18.678 6.56508L7.243 18.0001ZM3 20.0001H21V22.0001H3V20.0001Z"
                  fill="#D77F81"
                />
              </svg>
              &nbsp; Edit
            </Link>
          </div>
        </div>

        <div className="make-mod">
          <div className="make-mod__header">
            <span className="font-sf text-blue-dark text-md mb-3 max-w-tiny w-100">
              Make Modifications
            </span>
          </div>

          {/* make-mod content */}
          {/* <div className="make-mod__content flex flex-row justify-between ">
            <span className="font-sf text-blue-md text-sm">
              Edit Shipping Addresses
            </span>

            <span className="">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.965 18C8.84612 18.8343 8.43021 19.5977 7.79368 20.1499C7.15714 20.7022 6.34272 21.0063 5.5 21.0063C4.65728 21.0063 3.84286 20.7022 3.20632 20.1499C2.56979 19.5977 2.15388 18.8343 2.035 18H1V6C1 5.73478 1.10536 5.48043 1.29289 5.29289C1.48043 5.10536 1.73478 5 2 5H16C16.2652 5 16.5196 5.10536 16.7071 5.29289C16.8946 5.48043 17 5.73478 17 6V8H20L23 12.056V18H20.965C20.8461 18.8343 20.4302 19.5977 19.7937 20.1499C19.1571 20.7022 18.3427 21.0063 17.5 21.0063C16.6573 21.0063 15.8429 20.7022 15.2063 20.1499C14.5698 19.5977 14.1539 18.8343 14.035 18H8.965ZM15 7H3V15.05C3.39456 14.6472 3.8806 14.3457 4.41675 14.1711C4.9529 13.9966 5.52329 13.9541 6.07938 14.0474C6.63546 14.1407 7.16077 14.3669 7.61061 14.7069C8.06044 15.0469 8.42148 15.4905 8.663 16H14.337C14.505 15.647 14.73 15.326 15 15.05V7ZM17 13H21V12.715L18.992 10H17V13ZM17.5 19C17.898 19 18.2796 18.8419 18.561 18.5605C18.8424 18.2791 19.0005 17.8975 19.0005 17.4995C19.0005 17.1015 18.8424 16.7199 18.561 16.4385C18.2796 16.1571 17.898 15.999 17.5 15.999C17.102 15.999 16.7204 16.1571 16.439 16.4385C16.1576 16.7199 15.9995 17.1015 15.9995 17.4995C15.9995 17.8975 16.1576 18.2791 16.439 18.5605C16.7204 18.8419 17.102 19 17.5 19ZM7 17.5C7 17.303 6.9612 17.108 6.88582 16.926C6.81044 16.744 6.69995 16.5786 6.56066 16.4393C6.42137 16.3001 6.25601 16.1896 6.07403 16.1142C5.89204 16.0388 5.69698 16 5.5 16C5.30302 16 5.10796 16.0388 4.92597 16.1142C4.74399 16.1896 4.57863 16.3001 4.43934 16.4393C4.30005 16.5786 4.18956 16.744 4.11418 16.926C4.0388 17.108 4 17.303 4 17.5C4 17.8978 4.15804 18.2794 4.43934 18.5607C4.72064 18.842 5.10218 19 5.5 19C5.89782 19 6.27936 18.842 6.56066 18.5607C6.84196 18.2794 7 17.8978 7 17.5Z"
                  fill="#506683"
                />
              </svg>
            </span>
          </div> */}
          {/* make-mod content */}

          {/* make-mod content */}
          <div
            className="make-mod__content flex flex-row justify-between"
            onClick={() => resetPasswordModal()}
          >
            <span className="font-sf text-blue-md text-sm">
              Change Password
            </span>

            <span className="">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H6V7C6 5.4087 6.63214 3.88258 7.75736 2.75736C8.88258 1.63214 10.4087 1 12 1C13.5913 1 15.1174 1.63214 16.2426 2.75736C17.3679 3.88258 18 5.4087 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7V8H16Z"
                  fill="#384A62"
                />
              </svg>
            </span>
          </div>
          {/* make-mod content */}

          {/* make-mod content */}
          {/* <div
            className="make-mod__content flex flex-row justify-between"
            onClick={() => changeEmailModal()}
          >
            <span className="font-sf text-blue-md text-sm">
              Change Your Email
            </span>

            <span className="">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7.238L12.072 14.338L4 7.216V19H14V21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V13H20V7.238ZM19.501 5H4.511L12.061 11.662L19.502 5H19.501ZM17.05 19.548C16.9831 19.1857 16.9831 18.8143 17.05 18.452L16.036 17.866L17.036 16.134L18.05 16.72C18.328 16.482 18.649 16.295 19 16.17V15H21V16.17C21.351 16.295 21.672 16.482 21.95 16.72L22.964 16.134L23.964 17.866L22.95 18.452C23.0169 18.8143 23.0169 19.1857 22.95 19.548L23.964 20.134L22.964 21.866L21.95 21.28C21.6699 21.5203 21.3478 21.7067 21 21.83V23H19V21.83C18.6522 21.7067 18.3301 21.5203 18.05 21.28L17.036 21.866L16.036 20.134L17.05 19.548ZM20 20C20.2652 20 20.5196 19.8946 20.7071 19.7071C20.8946 19.5196 21 19.2652 21 19C21 18.7348 20.8946 18.4804 20.7071 18.2929C20.5196 18.1054 20.2652 18 20 18C19.7348 18 19.4804 18.1054 19.2929 18.2929C19.1054 18.4804 19 18.7348 19 19C19 19.2652 19.1054 19.5196 19.2929 19.7071C19.4804 19.8946 19.7348 20 20 20Z"
                  fill="#384A62"
                />
              </svg>
            </span>
          </div> */}
          {/* make-mod content */}
        </div>
      </section>

      <section className="account__grid">
        <div className="edit-shipping">
          <div className="edit-shipping__header">
            <span className="font-sf text-blue-dark text-md mb-3 max-w-tiny w-100">
              Edit Shipping Addresses
            </span>
          </div>

          <div className="flex flex-col lg:flex-row justify-start">
            {addresses?.data?.length &&
              addresses?.data.map((address) => (
                <div
                  className="edit-shipping__card my-2 lg:my-10 relative mr-4"
                  key={address.id}
                >
                  <h5 className="font-sf text-blue-md">
                    {" "}
                    {address.city}, {address.country}
                  </h5>
                  <span className="font-sf text-blue-md">
                    {address.line_one}
                  </span>
                  <span tw="inline-block">{address.line_two}</span>

                  <div className="flex flex-row absolute top-5 right-5">
                    <span
                      className="mx-2 cursor"
                      onClick={() => shippingModal()}
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.414 14.0001L13.556 3.85808L12.142 2.44408L2 12.5861V14.0001H3.414ZM4.243 16.0001H0V11.7571L11.435 0.322083C11.6225 0.134612 11.8768 0.0292969 12.142 0.0292969C12.4072 0.0292969 12.6615 0.134612 12.849 0.322083L15.678 3.15108C15.8655 3.33861 15.9708 3.59292 15.9708 3.85808C15.9708 4.12325 15.8655 4.37756 15.678 4.56508L4.243 16.0001ZM0 18.0001H18V20.0001H0V18.0001Z"
                          fill="#506683"
                        />
                      </svg>
                    </span>

                    <span
                      className="mx-2 cursor"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                          fill="#384A62"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 3C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10ZM17 5V4C17 3.20435 16.6839 2.44129 16.1213 1.87868C15.5587 1.31607 14.7956 1 14 1H10C9.20435 1 8.44129 1.31607 7.87868 1.87868C7.31607 2.44129 7 3.20435 7 4V5H5C4.44772 5 4 5.44772 4 6V20C4 20.7957 4.31607 21.5587 4.87868 22.1213C5.44129 22.6839 6.20435 23 7 23H17C17.7957 23 18.5587 22.6839 19.1213 22.1213C19.6839 21.5587 20 20.7957 20 20V6C20 5.44772 19.5523 5 19 5H17ZM6 7V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V7H6Z"
                          fill="#384A62"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10Z"
                          fill="#384A62"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z"
                          fill="#384A62"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
          </div>

          <button onClick={() => shippingModal()}>
            Add a new shipping address
          </button>
        </div>
      </section>

      {/*  */}
    </div>
  );
}
