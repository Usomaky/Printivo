import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { fetcher } from "@/utils/index";
import { useRouter } from "next/router";
import useSWR from "swr";
import "twin.macro";

const CheckoutSuccess = () => {
  const { query } = useRouter();

  const { data: transaction, error } = useSWR(
    `/transactions/${query.id}.json`,
    fetcher
  );

  return (
    <>
      <Layout>
        <div className="mt-60 md:mt-20">
          <main className="c-cart content-container mx-auto">
            <Search placeholder="Search for any product" />

            {transaction && (
              <section className="c-checkout__status mx-auto flex">
                <div className="c-status__icon mr-3">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="20" cy="20" r="18.125" fill="#D9FAE7" />
                    <path
                      d="M28.8409 13.6539C29.4513 14.2642 29.4513 15.2536 28.8409 15.8636L18.3588 26.3461C17.7484 26.9562 16.7593 26.9562 16.149 26.3461L11.1591 21.3559C10.5487 20.7458 10.5487 19.7565 11.1591 19.1464C11.7691 18.5361 12.7585 18.5361 13.3685 19.1464L17.2537 23.0316L26.6312 13.6539C27.2415 13.0438 28.2309 13.0438 28.8409 13.6539ZM40 20C40 31.055 31.0535 40 20 40C8.94501 40 0 31.0535 0 20C0 8.94501 8.94653 0 20 0C31.055 0 40 8.94653 40 20ZM36.875 20C36.875 10.6723 29.3265 3.125 20 3.125C10.6723 3.125 3.125 10.6735 3.125 20C3.125 29.3277 10.6735 36.875 20 36.875C29.3277 36.875 36.875 29.3265 36.875 20Z"
                      fill="#4A945A"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-dm text-2xl mb-3 text-green-dark">
                    That was awesome!
                  </h3>
                  <div className="text-blue-dark">
                    <div className="font-sf font-15 mb-4" tw="max-width[350px]">
                      Your order was recieved, please check your email for order
                      confirmation.
                    </div>
                    <p className="font-sf--reg text-sm mb-1">
                      Transaction Ref: {transaction.id}
                    </p>
                    <p className="font-sf--reg text-sm">
                      Amount Paid:{" "}
                      {transaction.amount_as_money_with_currency_symbol}
                    </p>
                  </div>
                  <Link to="/">
                    <button className="py-3 mt-6 hidden md:inline-block input-rounded px-14 bg-green-dark text-white font-15 font-sf">
                      Return Home
                    </button>
                  </Link>
                </div>
              </section>
            )}
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default CheckoutSuccess;
