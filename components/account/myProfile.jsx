import { useCheckout } from '@/hooks/useCheckout'
import React, { useState, useEffect } from 'react'
import Link from '../link'
import EditProfile from './editProfile'
import ShippingModal from './shippingModal'
import 'twin.macro'
import api from '@/services/api'
import swal from 'sweetalert'
import { getDate } from '@/utils/index'

export default function MyProfile({ user }) {
  const [isModal, setIsModal] = useState(false)
  const [isShippingModal, setIsShippingModal] = useState(false)
  const { addresses } = useCheckout()
  const [address, setAddress] = useState(false)
  useEffect(() => {
    setAddress(addresses)
  }, [])

  const modalHandler = () => {
    setIsModal(!isModal)
    document.querySelector('body').classList.toggle('no-scroll')
  }

  const shippingModal = () => {
    setIsShippingModal(!isShippingModal)
    document.querySelector('body').classList.toggle('no-scroll')
  }

  const deleteAddress = (id) => {
    let filtered = []


    addresses.data.map((item) => {
      if (item.id != id) {
        return filtered.push(item)
      }
    })

    swal('Are you sure, you want to contiune', {
      buttons: {
        cancel: 'Cancel!',
        confirm: {
          text: 'Yes Proceed',
          value: 'confirm',
        },
      },
    }).then((value) => {
      switch (value) {
        case 'confirm':
          try {
            const { data } = api.delete(`addresses/${id}.json`)
            addresses.data = filtered
            swal('Done!', 'Address has been deleted.', 'success')
          } catch (error) {
            console.log(error)
          }

          break

        default:
          swal('Alert', 'Address Not deleted', 'warning')
      }
    })
  }

  return (
    <>
      <EditProfile
        modalHandler={modalHandler}
        showmodal={isModal}
        user={user}
      />

      <ShippingModal modalHandler={shippingModal} showmodal={isShippingModal} />
      <div
        onClick={modalHandler}
        className={`c-backdrop c-backdrop--blue ${isModal ? 'active' : ''}`}
      ></div>

      <div
        onClick={shippingModal}
        className={`c-backdrop c-backdrop--blue ${
          isShippingModal ? 'active' : ''
        }`}
      ></div>
      <section className="account__grid justify-between">
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

            {user?.additional_email &&
              user?.additional_email.map((item, index) => (
                <span key={index} className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
                  {item}
                </span>
              ))}

            <span className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
              {user.phone}
            </span>
            <p className="font-sf text-blue-dark text-sm mb-3 max-w-tiny">
              DATE OF BIRTH: <br />
              {getDate(user.date_of_birth).date || ''}
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

        <div className="shipping">
          <div className="shipping__header">
            <span className="font-sf text-blue-dark text-md mb-3 max-w-tiny w-100">
              Shipping Information
            </span>
          </div>
          {/*  */}
          {!addresses?.data.length && (
            <div className="shipping__card">
              <svg
                width="22"
                height="17"
                viewBox="0 0 22 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.965 13C7.84612 13.8343 7.43021 14.5977 6.79368 15.1499C6.15714 15.7022 5.34272 16.0063 4.5 16.0063C3.65728 16.0063 2.84286 15.7022 2.20632 15.1499C1.56979 14.5977 1.15388 13.8343 1.035 13H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H15C15.2652 0 15.5196 0.105357 15.7071 0.292893C15.8946 0.48043 16 0.734784 16 1V3H19L22 7.056V13H19.965C19.8461 13.8343 19.4302 14.5977 18.7937 15.1499C18.1571 15.7022 17.3427 16.0063 16.5 16.0063C15.6573 16.0063 14.8429 15.7022 14.2063 15.1499C13.5698 14.5977 13.1539 13.8343 13.035 13H7.965ZM14 2H2V10.05C2.39456 9.6472 2.8806 9.34568 3.41675 9.17112C3.9529 8.99655 4.52329 8.95411 5.07938 9.04739C5.63546 9.14068 6.16077 9.36693 6.61061 9.7069C7.06044 10.0469 7.42148 10.4905 7.663 11H13.337C13.505 10.647 13.73 10.326 14 10.05V2ZM16 8H20V7.715L17.992 5H16V8ZM16.5 14C16.898 14 17.2796 13.8419 17.561 13.5605C17.8424 13.2791 18.0005 12.8975 18.0005 12.4995C18.0005 12.1015 17.8424 11.7199 17.561 11.4385C17.2796 11.1571 16.898 10.999 16.5 10.999C16.102 10.999 15.7204 11.1571 15.439 11.4385C15.1576 11.7199 14.9995 12.1015 14.9995 12.4995C14.9995 12.8975 15.1576 13.2791 15.439 13.5605C15.7204 13.8419 16.102 14 16.5 14ZM6 12.5C6 12.303 5.9612 12.108 5.88582 11.926C5.81044 11.744 5.69995 11.5786 5.56066 11.4393C5.42137 11.3001 5.25601 11.1896 5.07403 11.1142C4.89204 11.0388 4.69698 11 4.5 11C4.30302 11 4.10796 11.0388 3.92597 11.1142C3.74399 11.1896 3.57863 11.3001 3.43934 11.4393C3.30005 11.5786 3.18956 11.744 3.11418 11.926C3.0388 12.108 3 12.303 3 12.5C3 12.8978 3.15804 13.2794 3.43934 13.5607C3.72064 13.842 4.10218 14 4.5 14C4.89782 14 5.27936 13.842 5.56066 13.5607C5.84196 13.2794 6 12.8978 6 12.5Z"
                  fill="#506683"
                />
              </svg>
              <span className="font-sf text-blue-dark text-md mb-3 max-w-tiny w-100">
                No shipping address has been added
              </span>
              <button
                className="text-white block"
                onClick={() => shippingModal()}
              >
                Add a shipping address
              </button>
            </div>
          )}
          {/*  */}

          {/* shipping content */}
          {addresses?.data?.length &&
            addresses?.data.map((address) => (
              <div
                className="shipping__content"
                key={address.id}
                tw="not-last:mb-6"
              >
                <h5 className="font-sf text-blue-md text-md mb-3 max-w-tiny">
                  {address.city}, {address.country}
                </h5>
                <span className="font-sf text-blue-md text-sm mb-3 max-w-tiny">
                  {address.line_one}
                </span>
                <span tw="inline-block">{address.line_two}</span>

                <span
                  className="close"
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
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                      fill="#384A62"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 3C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V5H15V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10ZM17 5V4C17 3.20435 16.6839 2.44129 16.1213 1.87868C15.5587 1.31607 14.7956 1 14 1H10C9.20435 1 8.44129 1.31607 7.87868 1.87868C7.31607 2.44129 7 3.20435 7 4V5H5C4.44772 5 4 5.44772 4 6V20C4 20.7957 4.31607 21.5587 4.87868 22.1213C5.44129 22.6839 6.20435 23 7 23H17C17.7957 23 18.5587 22.6839 19.1213 22.1213C19.6839 21.5587 20 20.7957 20 20V6C20 5.44772 19.5523 5 19 5H17ZM6 7V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20V7H6Z"
                      fill="#384A62"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10Z"
                      fill="#384A62"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z"
                      fill="#384A62"
                    />
                  </svg>
                </span>
              </div>
            ))}

          <button className="shipping__button" onClick={() => shippingModal()}>
            Add a new shipping address
          </button>
        </div>
      </section>
    </>
  )
}
