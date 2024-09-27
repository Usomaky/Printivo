import { useRouter } from "next/router";
import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";

const TrackOrder = () => {
  const router = useRouter();
  const submitTrackingNumber = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { trackingNumber } = Object.fromEntries(formData);
    router.push(`/track/${trackingNumber}`);
  };

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20 mb-20">
          <main className="c-cart content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{" "}
              </Link>{" "}
              <span className="text-blue-dark font-sf">Track Orders</span>
            </header>

            <Search placeholder="Search for any product" />

            <div className="c-trackorder">
              <div className="c-trackorder__request">
                <div className="mx-auto inline-block">
                  <div className="track-icon mb-7">
                    <img
                      src="data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M26.667 1.667c.92 0 1.666.746 1.666 1.666V5h8.334v10h-3.365l4.577 12.573c.293.752.454 1.57.454 2.425a6.667 6.667 0 01-13.123 1.668h-7.087a6.67 6.67 0 01-12.998-.377 3.333 3.333 0 01-1.792-2.956V11.667C3.333 10.745 4.08 10 5 10h11.667c.92 0 1.666.746 1.666 1.666V20c0 .92.747 1.666 1.667 1.666h3.333c.92 0 1.667-.746 1.667-1.666V5h-5V1.667h6.667zm-15 25a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm20-.002a3.333 3.333 0 103.133 2.193l-.027-.072a3.335 3.335 0 00-3.106-2.121zM29.755 15h-1.422v5a5 5 0 01-5 5H20a5 5 0 01-5-5H6.667v5.59a6.67 6.67 0 0111.457 2.743h7.086a6.67 6.67 0 017.614-4.901L29.755 15zM15 13.333H6.667v3.333H15v-3.333zm18.333-5h-5v3.333h5V8.333z' fill='%23384A62'/%3E%3C/svg%3E"
                      alt="order bike"
                      className="mx-auto"
                    />
                  </div>

                  <h2 className="font-dm text-blue-md font-22 mb-2">
                    Track your print order without hassles
                  </h2>
                  <p className="text-blue-md max-w-smaller mb-8 font-15 font-sf--reg">
                    Easily track the status your Printivo order using your order
                    number and see step by step progress on your order.
                  </p>
                </div>
                <form onSubmit={submitTrackingNumber} className="mb-10">
                  <label
                    htmlFor="trackingNumber"
                    className="font-sf--reg text-blue-dark mb-3 font-15 inline-block"
                  >
                    Tracking Number
                  </label>
                  <div className="input-row sm:flex">
                    <input
                      type="text"
                      name="trackingNumber"
                      id="trackingNumber"
                      className="input-border-brown w-full sm:mr-5 no-outline sm:mb-0 mb-2"
                      placeholder="Enter your tracking number"
                      required
                    />
                    <button className="no-outline flex-shrink-0 bg-red-light text-white block ml-auto font-sf font-15 px-6 py-3 rounded-sm">
                      Track Now
                    </button>
                  </div>
                </form>
                <p className="text-blue-md max-w-3sm mb-8 font-15 font-sf--reg">
                  If you would prefer to speak to someone personally about the
                  status of your order, please call:{" "}
                  <a href="tel:234.706.900.0083" className="font-sf">
                  +2347069000083
                  </a> , <a href="tel:234.903.500.0505" className="font-sf">
                  +2349035000505
                  </a> or <br />
                  whatsapp:{" "}
                  <a href="https://api.whatsapp.com/send?phone=8091085333">
                    08091085333.
                  </a> <br />
                  you can also send a mail to {" "}
                  <span className="text-red-light font-sf--reg">
                    <a href="mailto:info@company.com">orders@printivo.com</a>
                  </span>
                </p>
                
              </div>
            </div>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default TrackOrder;
