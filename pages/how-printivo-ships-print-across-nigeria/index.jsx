import Search from "@/components/global/search";
import Layout from "@/components/layout/layout";
import "twin.macro";

const QuestionAnswer = ({ question, children }) => (
  <div tw="mb-6">
    <h2 tw="font-serif text-blue-dark text-xl sm:text-2xl mb-4">{question}</h2>
    <p tw="font-sans block text-base text-blue-dark">{children}</p>
  </div>
);

const ShippingDelivery = () => {
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20 mb-20">
          <main className="c-cart content-container mx-auto" tw="mb-96">
            <Search placeholder="Search for any product" />

            <div>
              <div
                tw="sm:height[360px] height[250px] w-full mt-8 mb-14"
                css={`
                  background: url("https://res.cloudinary.com/dmwfd0zhh/image/upload/v1621864197/printivo/Rectangle_3_v1qd0c.jpg");
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: center center;
                `}
              />

              <div tw="max-width[840px] md:pl-28">
                <h1 className="font-dm text-blue-dark font-32 mb-14">
                  Shipping and delivery
                </h1>

                <div>
                  <QuestionAnswer question="What is the estimated delivery time?">
                    Depending on products ordered, it takes an average of 3
                    working days to 5 working days to make for print products
                    ordered on Printivo to ship and be delivered. If you are
                    ordering from other Nigerian cities accept Lagos, orders may
                    spend an it takes and extra 48hrs transit
                  </QuestionAnswer>
                  <QuestionAnswer question="How much are the delivery charges?">
                    Printivo.com delivers items purchased on the website across
                    Nigeria. Delivery charge is dependent on your location
                    within the country. Please see below the charges applicable
                    to your location: All print orders are exclusive of shipping
                    cost unless otherwise mentioned.
                  </QuestionAnswer>

                  <QuestionAnswer question="How will the delivery be done?">
                    Depending on your delivery address, we process our
                    deliveries through Printivo Direct Delivery and DHL. Central
                    Lagos, Victoria Island, Ikoyi, Lagos Island, Lekki, Ikeja are
                    shipped by Printivo Direct while other locations nationwide
                    are delivered by DHL.
                  </QuestionAnswer>
                  <QuestionAnswer question="Are prices inclusive of VAT?">
                    No, we charge a VAT of 7.5% on all costs. This is remitted to
                    the Nigerian Federal Inland Revenue Services according to
                    the Law.
                  </QuestionAnswer>
                  <QuestionAnswer question="Does Printivo.com deliver internationally?">
                    Printivo.com does not deliver items to locations outside
                    Nigeria currently. However, you can order print products on
                    our site from anywhere in the world, but you'll have to
                    ensure the delivery address is within Nigeria.
                  </QuestionAnswer>
                  <QuestionAnswer question="What is Printivo’s return policy?">
                    We offer a standard 7 day return policy for eligible print
                    items in case you need to make a return and request a
                    reprint. To return any items printed on Printivo.com, ensure
                    the item is in line with the conditions in the Return
                    Policy. All items have free insurance coverage against theft
                    and damage during transit.
                  </QuestionAnswer>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default ShippingDelivery;
