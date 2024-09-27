import Search from "@/components/global/search";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import tw from "twin.macro";

const SubLink = tw.a`font-sans font-bold mb-4 block letter-spacing[.5px] text-sm line-height[24px] text-blue-dark cursor-pointer`;
const SideLink = tw.a`font-sans block text-sm mb-4 text-blue-dark`;
const Paragraph = tw.p`font-sans block text-base mb-4 text-blue-dark`;
const SubHeading = tw.h2`text-lg font-sans font-medium letter-spacing[.5px]`;
const ListItem = ({ children }) => (
  <li
    tw="text-base text-blue-dark ml-3"
    css={`
      display: grid;
      grid-gap: 0.8em;
      grid-template-columns: 0 0.85fr;

      &:not(:last-of-type) {
        margin-bottom: 2px;
      }

      &:before {
        content: "";
        width: 5px;
        height: 5px;
        margin-top: 8px;
        border-radius: 50%;
        background-color: #384a62;
      }
    `}
  >
    {children}
  </li>
);

const Pressone = () => {
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20 mb-20">
          <main className="c-cart content-container mx-auto">
            <Search placeholder="Search for any product" />

            <div>
              <h1 className="font-dm text-blue-dark font-32 mb-14">
                Pressone Introduction
              </h1>
              <div tw="flex md:min-height[800px]" className="flex flex-col md:flex-row md:space-x-16 space-y-10 sm:space-y-0 space-x-0">
                <div className="w-full">
                  <h1 className="font-dm text-red-light font-32 mb-3 leading-tight">
                   Professional business number that's <br /> better than your
                    sim number
                  </h1>
                  <SubHeading tw="text-blue-dark mb-2">
                    Standout, earn customer trust and respect, and get <br />
                    paid what you charge.
                  </SubHeading>

                  <div className="mt-10">
                  <SubHeading tw="text-red-light mb-2">
                    Why do you need this?
                  </SubHeading>
                  <Paragraph tw="mb-4">
                     Professional image and better deals: Customers will regard you
                     as a professional business and will pay what you charge.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     Stay in control of your business: You can monitor the staff-customer
                     conversations; they can't poach your customers.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     24/7 availability: Your business number is never switched off. it 
                     can't be lost or stolen.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     You work with your current setup: Sign up in less than 10minutes, no new 
                     sim or device needed. Get started for as low as $1,499/month only. 
                    </Paragraph>
                  </div>

                </div>
                <div className="w-full">
                <div className="rounded-3xl shadow-lg p-7">
                  <SubHeading tw="text-red-light mb-2">
                    Here's what you will enjoy
                  </SubHeading>
                  <Paragraph tw="mb-4">
                     A single number for all staff: Simplify your communication
                     process with a unified number for your entire team.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     Welcome greetings: Make a lasting impression with personalized
                     welcome greetings for your callers.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     Call transfer: Effortlessly calls within your team for seamless
                     collaboration.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     Call records: Capture important conversations for future reference 
                     and quality assurance. 
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     Call analysis: Leverage artificial intelligence for valuable
                     insights to convert your lead into paying customers.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                     Voice mail: Never miss an important opportunity even when
                     you're unavailable.
                    </Paragraph>
                    <Paragraph tw="mt-10">
                     Explore the smart business number at pressone africa and enjoy 20%
                     discount on all purchases.
                    </Paragraph>
                    <button
                type="button"
                onClick={() => {
                  window.open(
                    "https://web.pressone.africa/sign-up?coupon=pressone&utm_source=printivo&utm_medium=social&utm_campaign=Printivo&utm_id=Printivo",
                    "_blank"
                  );
                }}
                className="font-15 text-white bg-blue-dark font-sf py-3 px-6"
                style={{ borderRadius: "4px" }}
              >
                <span>Get A Business Number!</span>
              </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default Pressone;
