import React, { useState, useEffect } from 'react'
import Link from '../link'
import { fetcher } from '@/utils/index'
import api from '@/services/api'
import { useUser } from '@/hooks/useUser'
import Toastr from 'toastr'

const ShippingModal = ({ showmodal, modalHandler }) => {
  const [states, setStates] = useState([])
  const { user } = useUser()
  const user_id = user?.user?.id

  const [data, setData] = useState({
    name: user?.user.full_name,
    phone_number: user?.user.phone,
    line_one: '',
    line_two: '',
    state_id: null,
    city: '',
    user_id,
    country_id: 3,
  })

  useEffect(() => {
    fetcher('/states.json?limit=100&sort=name')
      .then((response) => {
        const { data } = response
        setStates(data)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleAddress = (event) => {
    event.preventDefault()

    api
      .post('/addresses.json', data)
      .then((response) => {
        const { data } = response
        if (data) {
          Toastr.success('Address added successfully')
          modalHandler(false)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div
      className={`c-modal ${
        showmodal ? 'active' : ''
      } px-3 c-modal--edit__profile `}
    >
      <div className="modal-inner flex flex-col bg-modal-white">
        <div className="header">
          <h5 className="font-sf text-blue-md text-2xl">
            Add new shipping Address
          </h5>
          <span className="close" onClick={modalHandler}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="40"
                height="40"
                rx="20"
                fill="#B0B8C2"
                fillOpacity="0.3"
              />
              <path
                d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z"
                stroke="#506683"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 17L17 23"
                stroke="#506683"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 17L23 23"
                stroke="#506683"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="body">
          <div className="form-group">
            {/* form */}
            <form onSubmit={handleAddress} className="md:pr-2">
              {/* <div className="flex flex-row lg:flex-col justify-evenly mt-2"> */}
              <div className="w-full lg:p-5">
                <label
                  htmlFor="address1"
                  className="inline-block required-sign-container font-15 font-sf--reg mb-2 text-blue-dark"
                >
                  Address Line 1 <span className="text-red-md required-sign">*</span>
                </label>
                <input
                  type="text"
                  name="address1"
                  id="address1"
                  className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                  placeholder="Printivo, Moyosore House, 180/182 Ikorodu Road, Onipanu."
                  value={data.line_one}
                  onChange={(e) =>
                    setData({ ...data, line_one: e.target.value })
                  }
                  required
                />
              </div>

              <div className="w-full lg:p-5">
                <div className="flex justify-between mb-2 items-center">
                  <label
                    htmlFor="address2"
                    className="inline-block font-15 font-sf--reg text-blue-dark"
                  >
                    Address Line 2
                  </label>
                </div>
                <input
                  type="text"
                  name="address2"
                  id="address2"
                  className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                  placeholder="Lagos, Nigeria"
                  value={data.line_two}
                  onChange={(e) =>
                    setData({ ...data, line_two: e.target.value })
                  }
                />
              </div>
              {/* </div> */}

              <div className="flex flex-col lg:flex-row justify-evenly lg:-mt-10">
              <div className="w-full lg:m-5">
                  <div className="flex justify-between mb-2 items-center">
                    <label
                      htmlFor="state"
                      className="inline-block font-15 font-sf--reg required-sign-container text-blue-dark"
                    >
                      State <span className="text-red-md required-sign">*</span>
                    </label>
                  </div>

                  <select
                    name="state"
                    required
                    className="input-border-brown capitalize appearance w-full font-15 indent outline font-sf--reg text-blue-dark h-11"
                    value={data.state}
                    onChange={(e) =>
                      setData({ ...data, state_id: e.target.value })
                    }
                  >
                    <option value="">-- Select State --</option>
                    {states?.map((state) => (
                      <option value={state.id}>{state.name}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full lg:m-5">
                  <label
                    htmlFor="city"
                    className="inline-block font-15 font-sf--reg required-sign-container mb-2 text-blue-dark"
                  >
                    City <span className="text-red-md required-sign">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Ikorodu"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    required
                  />
                </div>

              </div>

              <br />

              <button className="save-modification">Save Address</button>
            </form>
            {/* form */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingModal
