import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import { useState, useRef } from "react";
import api from "@/services/api";
import Loader from "@/components/states/Loader";
import Toastr from "toastr";
import ReCAPTCHA from "react-google-recaptcha";
import { useUser } from "@/hooks/useUser";

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: "",
    full_name: "",
    email_address: "",
    phone_number: "",
    message: "",
  });
  const [loading, setIsLoading] = useState(false);
  const captchaRef = useRef(null);
  const { user } = useUser();


  const onChangeHandler = (field, e) => {
    setFormData((prev) => {
      return { ...prev, [field]: e.target.value };
    });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    formData.reCaptcha = token;
    if (!token) {
      Toastr.error("Please Confirm you are not a bot");
      return;
    }
    if (user) {
      formData.email_address = user.user.email;
    }
    setIsLoading(true);
    try {
      const response = await api.post("customers/contact-us.json", formData);
      Toastr.success(response.data.message);
    } catch (error) {
      Toastr.error(error.response.data.message);
    } finally {
      setIsLoading(false);
      captchaRef.current.reset();
    }
  };
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-contact content-container mx-auto md:pt-9 pt-11">
            <h1 className="font-dm text-blue-dark font-32 mb-2">Contact Us</h1>

            <section className="c-location py-8">
              <h3 className="font-sf--bold sm:text-center text-blue-dark mt-5 font-32 mb-14">
                {/* You are welcome to walk into any of our offices. */}
                You are welcome to walk into our office
              </h3>

              <div className="c-offices md:flex justify-center items-center mt-5 max-w-6xl">
                <div className="c-office md:mr-10 md:mb-0 mb-16">
                  <h5 className="c-office__name font-dm text-lg mb-1 text-blue-dark">
                    Printivo HQ
                  </h5>
                  <p className="c-office__address font-sf text-blue-md font-18 leading-6 mb-7">
                    Moyosore House, 180/182 Ikorodu Rd, <br /> Onipanu, Lagos.{" "}
                    <br /> Nigeria.
                  </p>
                  <img
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1615291507/printivo/Rectangle_87_pitimy.jpg"
                    className="w-full c-office__map"
                    alt=""
                  />
                  <div className="c-office__footer text-sm sm:flex justify-between mt-6">
                    <a
                      href="https://g.page/printivo?share"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-office__btn mb-6"
                    >
                      <button className="py-2 px-6 font-sf--reg bg-transparent text-blue-md">
                        Open In Maps
                      </button>
                    </a>
                    <div className="footer-right">
                      <div className="c-office__hours mb-4">
                        <h5 className="text-blue-dark font-sf--bold font-15 mb-1">
                          Office Hours
                        </h5>
                        <p className="text-blue-md font-sf--reg mb-2">
                          Mondays - Fridays: 9.00am - 5.00pm
                        </p>
                        <p className="text-blue-md font-sf--reg mb-2">
                          Saturdays: 10.00am - 3.00pm
                        </p>
                      </div>

                      <div className="c-office__phone">
                        <h5 className="text-blue-dark font-sf--bold mb-1">
                          Phone Number
                        </h5>
                        <p className="text-red-light font-sf--reg">
                        Call: +2347069000083 or +2349035000505 <br />
                          Whatsapp: +2348091085333
                        </p>
                      </div>


                      <div className="office-email mt-5">
                        <h5 className="text-blue-dark font-sf--bold mb-1">
                          Email:
                        </h5>
                        <p className="text-red-light font-sf--reg">
                          <a href="mailto:info@company.com">orders@printivo.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 
                <div className="c-office">
                  <h5 className="c-office__name font-dm text-lg mb-1 text-blue-dark">
                    Printivo Abuja Office
                  </h5>
                  <p className="c-office__address font-sf text-blue-md font-18 leading-6 mb-7">
                    29 Mambilla St, Three Arms Zone, <br />
                    Maitama, Abuja. <br />
                    Nigeria.
                  </p>
                  <img
                    src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1615291507/printivo/Rectangle_88_iinqtw.jpg"
                    className="w-full"
                    alt=""
                    className="c-office__map"
                  />
                  <div className="c-office__footer text-sm sm:flex justify-between mt-6">
                    <a
                      href="https://goo.gl/maps/GwrHNSVruZtnSM6u5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="c-office__btn mb-6"
                    >
                      <button className="py-2 px-6 font-sf--reg bg-transparent text-blue-md">
                        Open In Maps
                      </button>
                    </a>
                    <div className="footer-right">
                      <div className="c-office__hours mb-4">
                        <h5 className="text-blue-dark font-sf--bold font-15 mb-1">
                          Office Hours
                        </h5>
                        <p className="text-blue-md font-sf--reg mb-2">
                          Mondays - Fridays: 9.00am - 5.00pm
                        </p>
                        <p className="text-blue-md font-sf--reg mb-2">
                          Saturdays: 10.00am - 3.00pm
                        </p>
                      </div>

                      <div className="c-office__phone">
                        <h5 className="text-blue-dark font-sf--bold mb-1">
                          Phone Number
                        </h5>
                        <p className="text-red-light font-sf--reg">
                          07086622856
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </section>

            <section className="c-contact__form md:flex py-10 mt-14">
              {/* <div className="side-image mr-5">
                <img
                  src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1615302743/printivo/Rectangle_89_ephkhq.jpg"
                  alt=""
                />
              </div> */}
              <form onSubmit={submitForm} className="w-full mx-auto py-14 px-8">
                <div className="form-inner mx-auto">
                  <h2 className="font-sf text-blue-md md:text-2xl text-xl mb-7">
                    Fill out the form below and we will be in touch within
                    24hrs.
                  </h2>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="c-form__select"
                    required
                    onChange={(e) => onChangeHandler("subject", e)}
                  />
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Enter your fullname"
                    onChange={(e) => onChangeHandler("full_name", e)}
                  />
                  {user ? (
                    ""
                  ) : (
                    <div>
                      <label htmlFor="fullName">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email address"
                        onChange={(e) => onChangeHandler("email_address", e)}
                      />
                    </div>
                  )}
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="Enter your phone number"
                    onChange={(e) => onChangeHandler("phone_number", e)}
                  />

                  <label htmlFor="message">Message</label>
                  <textarea
                    className="mb-5 pt-3"
                    name="message"
                    placeholder="Type your message"
                    id=""
                    cols="30"
                    rows="6"
                    required
                    onChange={(e) => onChangeHandler("message", e)}
                  ></textarea>
                  <div className="mb-4 w-full">
                    <ReCAPTCHA
                      sitekey={"6Lde6_kSAAAAAOoVgJUnFx-OgxBpqX5VQItrYWqA"}
                      ref={captchaRef}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex justify-center items-center mx-auto bg-red-light font-sf px-6 py-3 rounded-sm text-white"
                  >
                    <span>Send Message</span>
                    {loading ? <Loader /> : ""}
                  </button>
                </div>
              </form>
              {/* <div className="mt-auto side-image ml-5">
                <img
                  src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1615302743/printivo/Rectangle_90_eky6bz.jpg"
                  alt=""
                />
              </div> */}
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default Contact;
