import Link from '../link'

const ResetPassword = ({ showmodal, modalHandler }) => {
  return (
    <div
      className={`c-modal ${
        showmodal ? 'active' : ''
      } px-3 c-modal--reset-password`}
    >
      <div className="modal-inner flex flex-col bg-modal-white">
        <div className="header">
          <h5 className="font-sf text-blue-md text-2xl">Reset Password</h5>
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
        <div className="alert">
          <p className="font-sf text-white text-md">
            Here you can reset your login password. The next time you login, we
            will ask for the new password you set.
          </p>
          <span className="close" onClick={modalHandler}>
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="28" fill="#506683" />
              <path
                d="M20.2219 22.8146V21.5183C20.2219 19.4555 21.0413 17.4772 22.5 16.0185C23.9586 14.5599 25.9369 13.7405 27.9997 13.7405C30.0625 13.7405 32.0408 14.5599 33.4994 16.0185C34.958 17.4772 35.7775 19.4555 35.7775 21.5183V22.8146H38.37C38.7138 22.8146 39.0436 22.9511 39.2867 23.1942C39.5298 23.4373 39.6663 23.767 39.6663 24.1108V39.6664C39.6663 40.0102 39.5298 40.3399 39.2867 40.583C39.0436 40.8261 38.7138 40.9627 38.37 40.9627H17.6293C17.2855 40.9627 16.9558 40.8261 16.7127 40.583C16.4696 40.3399 16.333 40.0102 16.333 39.6664V24.1108C16.333 23.767 16.4696 23.4373 16.7127 23.1942C16.9558 22.9511 17.2855 22.8146 17.6293 22.8146H20.2219ZM37.0737 25.4071H18.9256V38.3701H37.0737V25.4071ZM26.7034 32.8375C26.2091 32.5522 25.8228 32.1117 25.6044 31.5844C25.386 31.0571 25.3477 30.4725 25.4954 29.9213C25.6431 29.37 25.9686 28.8829 26.4214 28.5354C26.8742 28.188 27.429 27.9997 27.9997 27.9997C28.5704 27.9997 29.1252 28.188 29.5779 28.5354C30.0307 28.8829 30.3562 29.37 30.5039 29.9213C30.6516 30.4725 30.6133 31.0571 30.3949 31.5844C30.1765 32.1117 29.7902 32.5522 29.296 32.8375V35.7775H26.7034V32.8375ZM22.8145 22.8146H33.1849V21.5183C33.1849 20.1431 32.6386 18.8242 31.6662 17.8518C30.6937 16.8794 29.3749 16.3331 27.9997 16.3331C26.6245 16.3331 25.3056 16.8794 24.3332 17.8518C23.3608 18.8242 22.8145 20.1431 22.8145 21.5183V22.8146Z"
                fill="#FDFAF0"
              />
            </svg>
          </span>
        </div>
        <div className="body">
          <div className="form-group">
            {/* form */}
            <form onSubmit={(e) => e.preventDefault()} className="md:pr-2">
              <div className="flex-col lg:flex-row justify-evenly">
                <div className="w-full lg:px-5 lg:my-5">
                  <label
                    htmlFor="signEmail"
                    className="inline-block font-15 font-sf--reg mb-2 text-blue-dark"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="name"
                    className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                    placeholder=" Current Password"
                    required
                  />
                </div>

                <div className="w-full lg:px-5">
                  <div className="flex justify-between mb-2 items-center">
                    <label
                      htmlFor="password"
                      className="inline-block font-15 font-sf--reg text-blue-dark"
                    >
                      New Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="New Password"
                    required
                  />
                </div>
              </div>

              <div className="flex-col lg:flex-row justify-start">
                <div className="lg:m-5">
                  <div className="flex justify-between mb-2 items-center">
                    <label
                      htmlFor="password"
                      className="inline-block font-15 font-sf--reg text-blue-dark"
                    >
                      Re-Enter New Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="phone"
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Re-Enter New Password"
                    required
                  />
                </div>
              </div>

              <button className="save-modification">Save New Password</button>
            </form>
            {/* form */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
