import { useUser } from "@/hooks/useUser";
const Newsletter = () => {
  const { user, logout } = useUser();
  return (
    <>
      {!user && (
        <div
          className="px-6 c-newsletter md:text-2xl md:py-20 py-10 mb-0 mx-auto"
          id="newsletterSubscriptionContainer"
        >
          <div className="c-newsletter__inner max-w-6xl mx-auto px-0 md:px-20">
            <h5 className="font-sf mb-3 text-blue-dark  c-newsletter__title">
              Subscribe to our newsletter now, and get super exclusive tips on
              brand building!
            </h5>
            <form
              className="w-full block md:flex justify-between"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-con mr-5 md:w-1/3 mb-6 md:mb-0 w-full">
                <input
                  className="w-full rounded font-sf text-blue-dark"
                  id="subscriptionFirstName"
                  name="first_name"
                  // disabled={isSubmitting}
                  placeholder="Firstname or Business Name"
                />
                {/* <ErrorMessage name="first_name" render={ErrorBox} /> */}
              </div>
              <div className="input-con md:w-2/3 w-fill mb-6 md:mb-0">
                <div className="input relative">
                  <input
                    id="subscriptionEmail"
                    name="email"
                    className="w-full font-sf text-blue-dark"
                    // disabled={isSubmitting}
                    placeholder="Email address"
                  />
                  <button
                    type="submit"
                    className="md:absolute md:block hidden font-sf text-xl"
                  >
                    Subscribe
                  </button>
                </div>
                {/* <ErrorMessage name="email" render={ErrorBox} /> */}
              </div>
              <button
                type="submit"
                className="block md:hidden static font-sf md:text-xl text-lg ml-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Newsletter;
