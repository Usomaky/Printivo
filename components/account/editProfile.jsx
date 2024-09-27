import React, { useState, useRef, useEffect  } from "react";
import Toastr from "toastr";
import { getToken, setCookie, deleteCookie } from "@/services/cookies";
import api, { useAxiosInterceptors } from "@/services/api";
import { useUser } from "@/hooks/useUser";
import { getDate } from "@/utils/index";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

export default function EditProfile({ showmodal, modalHandler, user }) {
  const [emails, setEmails] = useState(() => {
    // Retrieve emails from localStorage on component mount
    const storedEmails = localStorage.getItem("additionalEmails");
    return storedEmails ? JSON.parse(storedEmails) : [];
  });

  const [form, setForm] = useState({
    avatar: user.avatar,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    date_of_birth: getDate(user.date_of_birth).birth_date,
    additional_email: emails,
  });
  const [upLoading, setUpLoading] = useState(false);
  const aviInput = useRef(null);
  const { userHandler } = useUser();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        additional_email: emails,
      }));
    }
  }, [user, emails]);
  

  const openAviFile = () => {
    aviInput.current.click();
  };
  const uploadFile = async (file) => {
    const fileData = new FormData();
    fileData.append("file", file);
    setUpLoading(true);
    try {
      const { data } = await api.post("/utils/upload.json", fileData);
      console.log(data);
      setForm((prev) => ({ ...prev, avatar: data.full_path }));
      setUpLoading(false);
    } catch (error) {
      setUpLoading(false);
      const { response } = error;
      if (response) {
        Toastr.error(response.data.message);
      } else {
        Toastr.error("An error occured, please try again");
      }
    }
  };

  const onAviChange = (e) => {
    uploadFile(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    useAxiosInterceptors();
    const response = await api.put(`/customers/${user.id}.json`, form);
    const { data } = response;
    if (data) {
      console.log(data);
      Toastr.success("Profile updated successfully");
      let token = getToken();
      setTimeout(() => {
        userHandler(token, () => {});
        modalHandler(false);
        // window.location.reload();
      }, 2000);
    }

    // Save emails to localStorage after successful update
    localStorage.setItem("additionalEmails", JSON.stringify(emails));
  };

  return (
    <div
      className={`c-modal ${
        showmodal ? "active" : ""
      } px-3 c-modal--edit__profile `}
    >
      <div className="modal-inner flex flex-col bg-modal-white">
        <div className="header">
          <h5 className="font-sf text-blue-md text-2xl">Edit Profile</h5>
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
          <div className="image__uploader">
            <div className="image__uploader-preview">
              <img
                src={form.avatar}
                alt={form.full_name}
                style={{ width: "120px", height: "120px" }}
                className="rounded-full"
              />
            </div>
            {!upLoading ? (
              <button
                className="font-sf text-red-light text-md underline cursor-pointer mt-2"
                onClick={openAviFile}
              >
                <span>Upload a new picture</span>
              </button>
            ) : (
              <span className="font-sf text-red-light text-md cursor-auto mt-2">
                Uploading Picture...
              </span>
            )}

            <input
              type="file"
              name="avi"
              id="avi"
              className="hidden"
              ref={aviInput}
              onChange={onAviChange}
              accept="image/*"
            />
          </div>

          <div className="form-group">
            {/* form */}
            <form onSubmit={handleSubmit} className="md:pr-2">
              <div className="w-full flex flex-col lg:flex-row justify-evenly">
                <div className="w-full lg:m-5">
                  <label
                    htmlFor="signEmail"
                    className="inline-block font-15 font-sf--reg mb-2 text-blue-dark"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Enter Your Name"
                    value={form.first_name}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        first_name: event.target.value,
                      }))
                    }
                  />
                </div>

                <div className="w-full lg:m-5">
                  <div className="flex justify-between mb-2 items-center">
                    <label
                      htmlFor="surname"
                      className="inline-block font-15 font-sf--reg text-blue-dark"
                    >
                      Your Surname
                    </label>
                  </div>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    value={form.last_name}
                    placeholder="Enter Your Surname"
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        last_name: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="w-full flex flex-col lg:flex-row justify-evenly">
                <div className="w-full lg:m-5">
                  <label
                    htmlFor="signEmail"
                    className="inline-block font-15 font-sf--reg mb-2 text-blue-dark"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Enter Your Email Address"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    disabled="true"
                  />
                </div>

                <div className="w-full lg:m-5">
                  <div className="flex justify-between mb-2 items-center">
                    <label
                      htmlFor="password"
                      className="inline-block font-15 font-sf--reg text-blue-dark"
                    >
                      Phone Number
                    </label>
                  </div>
                  <input
                    type="number"
                    name="phone"
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Enter Your Phone Number"
                    value={form.phone}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        phone: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="w-full flex flex-col lg:flex-row justify-evenly">
                <div className="w-full lg:m-5">
                  <label
                    htmlFor="signEmail"
                    className="inline-block font-15 font-sf--reg mb-2 text-blue-dark"
                  >
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={form.date_of_birth}
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Select Day"
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        date_of_birth: event.target.value,
                      }))
                    }
                  />

                  {/* <select className="input-border-brown p-3 mb-4 w-full text-blue-dark outline-none font-sf--reg">
                    <option>Day</option>
                    {[...Array(31)].map((_, i) => (
                      <option value={i + 1}>{i + 1}</option>
                    ))}
                  </select> */}
                </div>

                {/* <div className="w-full lg:m-5 lg:my-11">
                  <div className="flex justify-between mb-2 items-center"></div>
                  <input
                    type="text"
                    name="month"
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Select Month"
                   
                  />
                </div> */}

                {/* <div className="w-full lg:m-5 lg:my-11">
                  <div className="flex justify-between mb-2 items-center"></div>
                  <input
                    type="text"
                    name="day"
                    className="input-border-brown mb-4 w-full text-blue-dark outline-none font-sf--reg"
                    placeholder="Select Day"
                   
                  />
                </div> */}
              </div>

              <div className="w-full flex flex-col lg:flex-row justify-evenly">
                <div className="w-full lg:m-5">
                  <label htmlFor="signEmail" className="inline-block font-15 font-sf--reg mb-2 text-blue-dark">
                    Additional Email Address
                  </label>
                  <ReactMultiEmail
                    placeholder="Input your email"
                    emails={emails}
                    onChange={(emails) => {
                      setEmails(emails);
                    }}
                    autoFocus={false}
                    onFocus={() => setFocused(false)}
                    onBlur={() => setFocused(false)}
                    className="input-border-brown w-full text-blue-dark outline-none font-sf--reg"
                    getLabel={(email, index, removeEmail) => {
                      return (
                        <div data-tag key={index}>
                          <div data-tag-item>{email}</div>
                          <span data-tag-handle onClick={() => removeEmail(index)}>
                            ×
                          </span>
                        </div>
                      );
                    }}
                  />

                </div>
              </div>
              <button className="save-modification">Save Modifications</button>
            </form>
            {/* form */}
          </div>
        </div>
      </div>
    </div>
  );
}
