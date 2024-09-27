import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import "twin.macro";

const CheckoutFailure = () => {
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto">
            <Search placeholder="Search for any product" />

            <section className="c-checkout__status c-checkout__status--failure mx-auto flex">
              <div className="c-status__icon mr-3">
                <svg
                  width="40"
                  height="40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="19" fill="#FADFDF" />
                  <path
                    d="M34.141 5.859A19.858 19.858 0 0020 0 19.858 19.858 0 005.859 5.859 19.858 19.858 0 000 20c0 5.345 2.08 10.362 5.859 14.141A19.858 19.858 0 0020 40c5.345 0 10.362-2.08 14.141-5.859A19.858 19.858 0 0040 20c0-5.345-2.08-10.362-5.859-14.141zm-1.607 26.675A17.613 17.613 0 0120 37.727c-4.73 0-9.184-1.843-12.534-5.193-6.91-6.911-6.91-18.157 0-25.068A17.612 17.612 0 0120 2.273c4.73 0 9.183 1.843 12.534 5.193 6.91 6.911 6.91 18.157 0 25.068z"
                    fill="#EB5757"
                  />
                  <path
                    d="M28.812 11.187a1.133 1.133 0 00-1.607 0l-7.206 7.205-7.205-7.205a1.133 1.133 0 00-1.608 0 1.133 1.133 0 000 1.607L18.392 20l-7.206 7.205a1.133 1.133 0 000 1.608c.219.219.514.337.8.337.286 0 .58-.11.8-.337l7.205-7.205 7.205 7.205c.22.219.514.337.8.337.295 0 .58-.11.8-.337a1.133 1.133 0 000-1.608L21.607 20l7.205-7.206a1.133 1.133 0 000-1.607z"
                    fill="#EB5757"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-dm text-2xl mb-3" tw="color[#EB5757]">
                  Transaction Failed
                </h3>
                <div className="text-blue-dark">
                  <div className="font-sf font-15 mb-4" tw="max-width[350px]">
                    Your order was not completed. Please check your email for
                    more details.
                  </div>
                  {/* <p className="font-sf--reg text-sm mb-1">
                    Transaction Ref: 394954848493939
                  </p>
                  <p className="font-sf--reg text-sm">
                    Amount Paid: ₦67,999.00
                  </p> */}
                </div>
                <Link to="/">
                  <button className="py-3 mt-6 hidden md:inline-block input-rounded px-14 bg-green-dark text-white font-15 font-sf">
                    Return Home
                  </button>
                </Link>
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default CheckoutFailure;
