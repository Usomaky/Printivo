import Link from "../link";

const changeEmail = ({ showmodal, modalHandler }) => {
  return (
    <div
      className={`c-modal ${
        showmodal ? "active" : ""
      } px-3 c-modal--reset-password`}
    >
      <div className="modal-inner flex flex-col bg-modal-white">
        <div className="header">
          <h5 className="font-sf text-blue-md text-2xl">Change Your Email</h5>
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
            Here you can reset your email. We will log you out and send you a
            link to your new email so you can login.
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
                d="M36 23.238L28.072 30.338L20 23.216V35H30V37H19C18.7348 37 18.4804 36.8946 18.2929 36.7071C18.1054 36.5196 18 36.2652 18 36V20C18 19.7348 18.1054 19.4804 18.2929 19.2929C18.4804 19.1054 18.7348 19 19 19H37C37.2652 19 37.5196 19.1054 37.7071 19.2929C37.8946 19.4804 38 19.7348 38 20V29H36V23.238ZM35.501 21H20.511L28.061 27.662L35.502 21H35.501ZM33.05 35.548C32.9831 35.1857 32.9831 34.8143 33.05 34.452L32.036 33.866L33.036 32.134L34.05 32.72C34.328 32.482 34.649 32.295 35 32.17V31H37V32.17C37.351 32.295 37.672 32.482 37.95 32.72L38.964 32.134L39.964 33.866L38.95 34.452C39.0169 34.8143 39.0169 35.1857 38.95 35.548L39.964 36.134L38.964 37.866L37.95 37.28C37.6699 37.5203 37.3478 37.7067 37 37.83V39H35V37.83C34.6522 37.7067 34.3301 37.5203 34.05 37.28L33.036 37.866L32.036 36.134L33.05 35.548ZM36 36C36.2652 36 36.5196 35.8946 36.7071 35.7071C36.8946 35.5196 37 35.2652 37 35C37 34.7348 36.8946 34.4804 36.7071 34.2929C36.5196 34.1054 36.2652 34 36 34C35.7348 34 35.4804 34.1054 35.2929 34.2929C35.1054 34.4804 35 34.7348 35 35C35 35.2652 35.1054 35.5196 35.2929 35.7071C35.4804 35.8946 35.7348 36 36 36Z"
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
                    Current Email
                  </label>
                  <input
                    type="email"
                    name="name"
                    className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                    placeholder=" Current Email"
                    required
                  />
                </div>

                <div className="w-full lg:px-5">
                  <div className="flex justify-between mb-2 items-center">
                    <label
                      htmlFor="email"
                      className="inline-block font-15 font-sf--reg text-blue-dark"
                    >
                      Enter New Email
                    </label>
                  </div>
                  <input
                    type="email"
                    name="newEmail"
                    id="newEmail"
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="New Email"
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
                      Password
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

              <button className="save-modification">Save New Email</button>
            </form>
            {/* form */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default changeEmail;
