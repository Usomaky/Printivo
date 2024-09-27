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

const TermsConditions = () => {
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20 mb-20">
          <main className="c-cart content-container mx-auto">
            <Search placeholder="Search for any product" />

            <div>
              <h1 className="font-dm text-blue-dark font-32 mb-14">
                Printivo Terms and conditions
              </h1>
              <div tw="flex md:min-height[2000px]">
                <div tw="border-right[1px solid rgba(56, 74, 98, 0.1)] max-width[290px] w-full hidden md:block">
                  <div tw="pr-3 sticky top[80px] max-height[80vh] overflow-auto">
                    <SubHeading tw="text-red-light mb-6">
                      Introduction
                    </SubHeading>

                    <SubLink href="#about" tw="mb-5">
                      About Us
                    </SubLink>

                    <SubLink href="#agreement" tw="mb-5">
                      The Agreement
                    </SubLink>

                    <SubLink href="#age-restriction" tw="mb-5">
                      Age Restriction
                    </SubLink>

                    <SubLink href="#registration" tw="mb-5">
                      Registration
                    </SubLink>

                    <SubLink href="#use-of-site" tw="mb-5">
                      Use Of Site
                    </SubLink>

                    <SubLink href="#approvals" tw="mb-5">
                      Approvals
                    </SubLink>

                    <SubLink href="#availability" tw="mb-5">
                      Availability and Delivery
                    </SubLink>

                    <SubLink href="#non-delivery" tw="mb-5">
                      Non-Delivery
                    </SubLink>

                    <SubLink href="#risk-title" tw="mb-5">
                      Risk and Title
                    </SubLink>

                    <SubLink href="#replacement-policy" tw="mb-5">
                      Our Replacement Policy
                    </SubLink>

                    <SubLink href="#force-majeure" tw="mb-5">
                      Force Majeure
                    </SubLink>

                    <SubLink href="#indemnification" tw="mb-5">
                      Indemnification
                    </SubLink>

                    <SubLink href="#amendments" tw="mb-5">
                      Updates, Modifications and Amendments
                    </SubLink>

                    <SubLink href="#price-payments" tw="mb-5">
                      Price and Payment
                    </SubLink>

                    <SubLink href="#refund-policy" tw="mb-5">
                      Refund Policy
                    </SubLink>

                    <SubLink href="#ip-right" tw="mb-5">
                      Intellectual Property Right
                    </SubLink>

                    <SubLink href="#communication" tw="mb-5">
                      Written Communications
                    </SubLink>

                    <SubLink href="#law" tw="mb-5">
                      Applicable Law
                    </SubLink>

                    <SubLink href="#warranty" tw="mb-5">
                      Disclaimer of Warranty
                    </SubLink>

                    <SubLink href="#liability" tw="mb-5">
                      Limitation of Liability
                    </SubLink>

                    <SubLink href="#dispute-resolution" tw="mb-5">
                      Dispute Resolution
                    </SubLink>

                    <SubLink href="#severability" tw="mb-5">
                      Severability
                    </SubLink>
                  </div>
                </div>

                <div tw="w-full md:px-8 max-width[870px]">
                  <h1 tw="text-2xl text-blue-dark font-sans font-semibold mb-4">
                    Introduction
                  </h1>
                  <Paragraph>
                    Please read these Terms and Conditions carefully before
                    using this website. These Terms and Conditions govern your
                    access and use of this website. By accessing or using this
                    website, you agree to be bound by these Terms and
                    Conditions. Printivo reserves the right to make changes to
                    this website and to these Terms and Conditions at any time
                    without prior notice. You should review these Terms and
                    Conditions each time you access this website.
                  </Paragraph>

                  <section id="about" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">About Us</SubHeading>
                    <Paragraph tw="mb-4">
                      Printivo is an online print provider providing its
                      customers with free templates created by designers across
                      Nigeria. Born out of our love for paper and ink, we aim to
                      help Nigeria start-ups and SMEs print business and
                      marketing materials with ease.
                    </Paragraph>
                  </section>

                  <section id="agreement" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      The Agreement
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      These Terms and Conditions is an agreement between you and
                      us. It details our obligations to you. It also highlights
                      certain risks on using our services and you must consider
                      such risks carefully as you will be bound by the provision
                      of this agreement through your use of this website or any
                      of our services.
                    </Paragraph>
                  </section>

                  <section id="age-restriction" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Age Restriction
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Our website and Services are not directed to children
                      under 18. We do not knowingly transact or provide any
                      services to children under 18.
                    </Paragraph>
                  </section>

                  <section id="registration" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Registration
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      To use Printivo, you have to create a Printivo account by
                      registering. To register, you will provide us with certain
                      information such as your first name, last name, email
                      address and phone number and we may seek to verify your
                      information, after which we will approve your account
                      unless deemed risky. You give us permission to do all
                      these.
                    </Paragraph>
                  </section>

                  <section id="use-of-site" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Use of Site
                    </SubHeading>
                    <Paragraph
                      tw="mb-4 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: `You are granted permission to access and use this website and its content for the sole purpose of preparing, evaluating, and ordering products or services solely through Printivo (referred to herein as “Products”). No other download, retention, use, publication, or distribution of any portion of the content is authorized or permitted. Obtaining products from Printivo does not entitle you to use any portion of content apart from the finished products as they are supplied by Printivo.

                        Without limitation, no portion of the content may be utilized as a trademark or service mark, for any pornographic use, for any unlawful purpose or use, to defame any person, to violate any person’s right of privacy or publicity, to infringe upon any copyright, trade name, trademark, service mark or other intellectual property right of any person or entity. You agree that you will not use the website to produce products that are offensive, unlawful, harassing, libelous, threatening, harmful, obscene, malicious or otherwise objectionable. Printivo may terminate its service to customers found to be using Printivo to engage in undesirable activities.
                        
                        You are solely responsible for your use of content in combination with any other images, graphics, text or other materials you incorporate into your products. You agree that you will not include any text, image, design, trademark, service mark, or any copyrighted work of any third party in your products unless you have obtained the appropriate authorisations from the owners. You warrant that your products do not infringe upon any rights of any third party, including copyright, trademark, right of publicity or privacy, and will not libel or defame any third party, and that you have all required rights or permissions necessary to incorporate third party material into your products, including any third party material made available via a third party design service which may be accessed via the website. By placing an order on this website, you warrant that you have all necessary permission, right and authority to place the order and you authorise Printivo to produce the products on your behalf.
                        
                        You agree that you are responsible for protecting your password and controlling access to your registered account. You agree that you will be responsible for all orders placed or other actions that are taken through your registered account.`,
                      }}
                    />
                  </section>

                  <section id="approvals" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">Approvals</SubHeading>
                    <Paragraph tw="mb-4">
                      Prior to producing the products designed using our
                      templates, we make an electronic proof of the product
                      available for your approval. You are responsible for
                      approving these proofs. You accept that once you have
                      approved the proof, the Products cannot be changed nor
                      cancelled. We shall have no liability to you for any
                      errors in the proof subsequently discovered by you. For
                      order made using your own design files, Printivo shall not
                      be held liable for errors due to mistakes on files
                      uploaded.
                    </Paragraph>
                  </section>

                  <section id="availability" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Availability and Delivery
                    </SubHeading>
                    <Paragraph
                      tw="mb-4 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: `Unless there are exceptional circumstances, your products will be dispatched for delivery in accordance with the delivery service chosen by you during the ordering process. Working days are Monday to Friday, excluding public holidays. Where delivery is delayed due to exceptional circumstances, we will complete the work as soon as we reasonably can. Where delivery is not possible as a result of us being provided with the incorrect delivery address details, our delivery service will return the products to us. We reserve the right to make an additional delivery charge for re-despatch of the products to the correct delivery address.

                      All products will be signed for upon delivery, if anyone other than the intended recipient signs for the product and the product is subsequently not delivered to the intended recipient, we will incur no liability provided that the product was delivered to the address provided by the purchaser.
                    `,
                      }}
                    />
                  </section>

                  <section id="non-delivery" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Non-Delivery
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      You must notify us within 30 days of any failure on our
                      part to deliver the products in order that we can
                      investigate the failure and take appropriate action. Once
                      you have notified us, we will then send you a form to
                      complete and return to us. Once the form is received, we
                      will redeliver the products to you at no further cost or
                      expense to you.
                    </Paragraph>
                  </section>

                  <section id="risk-title" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Risk and Title
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      The products will be at your risk from the time of
                      delivery. Ownership of the products will pass to you on
                      delivery.
                    </Paragraph>
                  </section>

                  <section id="replacement-policy" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Our Replacement Policy
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      If you believe that a product is defective, we may request
                      that you return the product for our examination.
                    </Paragraph>
                  </section>

                  <section id="force-majeure" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Force Majeure
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Printivo shall be under no liability if unable to carry
                      out any provision of the contract for any reason beyond
                      Printivo’s reasonable control including (without limiting
                      the foregoing): Act of God, legislation,war, fire, flood,
                      inadequacy or unsuitability of any instruction, data or
                      materials required for the performance of the contract.
                      During the continuance of such a contingency, you may by
                      written notice to Printivo elect to terminate the contract
                      and pay for work done and materials used, but subject
                      thereto shall otherwise accept delivery when available.
                    </Paragraph>
                  </section>

                  <section id="indemnification" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Indemnification
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      You agree that you shall indemnify and defend Printivo and
                      all parties from whom Printivo has licensed portions of
                      content, and their directors, officers, and employees,
                      against all claims, liability, damages, costs and
                      expenses, including reasonable legal fees and expenses
                      arising out of or related to (i) your breach of these
                      Terms and Conditions or (ii) any suit, claim, or demand
                      arising from or relating to any text, photograph, image,
                      graphic or other material you incorporated into products
                      that was not part of the standard website content.
                    </Paragraph>
                  </section>

                  <section id="amendments" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Updates, Modifications and Amendments
                    </SubHeading>
                    <Paragraph
                      tw="mb-4 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: `We may need to update, modify or amend our Terms and Conditions as our technology evolves. We reserve the right to make changes to these Terms and Conditions at any time by giving notice to users on this page.

                        We advise that you check this page often, referring to the date of the last modification on the page If a user objects to any of the changes to the Terms and Conditions, the User must cease using our website and/or services immediately.
                    `,
                      }}
                    />
                  </section>

                  <section id="price-payments" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Price and Payment
                    </SubHeading>
                    <Paragraph
                      tw="mb-4 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: `The price of any product will be as quoted on our site from time to time. These prices do not include VAT and delivery costs, which may be added to the total amount due as set out in the basket section of the online ordering process. 

                        Prices are liable to change at any time but changes will not affect orders in respect of which we have already sent you an order confirmation.
                    `,
                      }}
                    />
                  </section>

                  <section id="refund-policy" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Refund Policy
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Printivo offers a Seven (7) working days refund policy for
                      items/orders that do not meet its customer’s expectations
                      or are defective and after other channels do not meet
                      client expectations which include a reprint or a credit to
                      print a new order. Please note that the request for a
                      refund has to be reported within 3 working days after
                      receipt of orders as Printivo will not make a refund if an
                      order has been delivered and no issue was raised within 3
                      working days after the order was received.
                    </Paragraph>
                  </section>

                  <section id="ip-right" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Intellectual Property Right
                    </SubHeading>
                    <Paragraph
                      tw="mb-4 whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: `Unless otherwise indicated or anything contained to the contrary or any proprietary material owned by a third party and so expressly mentioned, Printivo owns all intellectual property rights to and into the website, including, without limitation, any and all rights, interest in and title to copyright, related rights, patents, utility models, trademarks, trade names, service marks, designs, know-how, trade secrets and inventions (whether patentable or not), goodwill, source code, databases, text, content, graphics, icons, and hyperlinks. You acknowledge and agree that you shall not use, reproduce or distribute any content from the website belonging to Printivo without obtaining authorization from Printivo.

                        Notwithstanding the foregoing, it is expressly clarified that you will retain ownership and shall solely be responsible for any content that you provide or upload when using any service, including any text, data, information, images, photographs, music, sound, video or any other material which you may upload, transmit or store when making use of our various service. However, with regard to the product customization service (as against other services like blogs and forums) you expressly agree that by uploading and posting content on to the website for public viewing and reproduction/use of your content by third party users, you accept the User whereby you grant a non-exclusive license for the use of the same.
                    `,
                      }}
                    />
                  </section>

                  <section id="communication" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Written Communications
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      When using our site, you accept that communication with us
                      will be by electronic means only. We will contact you by
                      e-mail or provide you with information by posting notices
                      on our site, For contractual purposes, you agree to this
                      electronic means of communication and you acknowledge that
                      all contracts, notices, information and other
                      communications that we provide to you electronically
                      comply with any legal requirement that such communications
                      be in writing.
                    </Paragraph>
                  </section>

                  <section id="law" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Applicable Law
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      These Terms and Conditions shall be interpreted and
                      governed by the laws currently in force in the Federal
                      Republic of Nigeria.
                    </Paragraph>
                  </section>

                  <section id="warranty" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Disclaimer of Warranty
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      THE SITE AND ITS CONTENT ARE PROVIDED "AS IS" WITHOUT
                      WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
                      INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF
                      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
                      NON-INFRINGEMENT. YOU ACKNOWLEDGE THAT OPERATION OF THE
                      SITE MAY NOT BE UNINTERRUPTED OR ERROR FREE. REFERENCES
                      AND LINKS TO PRODUCTS OR SERVICES OF INDEPENDENT COMPANIES
                      MAY APPEAR ON THE SITE. THESE REFERENCES AND LINKS ARE
                      PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER
                      EXPRESSED OR IMPLIED.
                    </Paragraph>
                  </section>

                  <section id="liability" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Limitation of Liability
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      IN NO EVENT SHALL PRINTIVO OR ITS LICENSORS, SUPPLIERS, OR
                      VENDORS, THEIR OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS
                      BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR
                      CONSEQUENTIAL DAMAGE OF ANY KIND, OR FOR ANY DAMAGES
                      WHATSOEVER RESULTING FROM LOSS OF USE, DATA, OR PROFITS,
                      WHETHER OR NOT PRINTIVO HAS BEEN ADVISED OF THE
                      POSSIBILITY OF DAMAGE, ARISING OUT OF OR IN CONNECTION
                      WITH THE USE OR PERFORMANCE OF THE SITE OR OF FAILURE TO
                      PROVIDE PRODUCTS OR SERVICES THAT YOU ORDER FROM PRINTIVO,
                      INCLUDING WITHOUT LIMITATION, DAMAGES ARISING FROM
                      MISTAKE, OMISSION, VIRUS, DELAY, OR INTERRUPTION OF
                      SERVICE. IN NO EVENT SHALL PRINTIVO BE LIABLE OR
                      RESPONSIBLE FOR ANY DAMAGES OR CONSEQUENCES ARISING FROM
                      OR RELATED TO YOUR INAPPROPRIATE OR UNAUTHORISED USE OF
                      THIS SITE OR ITS CONTENT.
                    </Paragraph>
                  </section>

                  <section id="dispute-resolution" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Dispute Resolution
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      We shall make an effort to settle all disputes amicably.
                      Any dispute arising out of this Terms and Conditions,
                      which cannot be settled, by mutual agreement/negotiation
                      within 1 (one) month shall be referred to arbitration by a
                      single arbitrator at the Lagos Multi-Door Courthouse
                      (“LMDC”) and governed by the Arbitration and Conciliation
                      Act, Cap A10, Laws of the Federal Republic of Nigeria. The
                      arbitrator shall be appointed by both of us (we and you),
                      where both of us are unable to agree on the choice of an
                      arbitrator, the choice of arbitration shall be referred to
                      the LMDC. The findings of the arbitrator and subsequent
                      award shall be binding on both of us. Each of us shall
                      bear our respective costs in connection with the
                      Arbitration. Venue for the arbitration shall be Lagos,
                      Nigeria.
                    </Paragraph>
                  </section>

                  <section id="severability" tw="md:pl-28 pl-10 mb-6">
                    <SubHeading tw="text-blue-dark mb-2">
                      Severability
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      If any portion of these Terms and Conditions is held by
                      any competent court or tribunal to be invalid or
                      unenforceable, either in whole or in part, then that part
                      shall be severed from these Terms and Conditions and shall
                      not affect the validity or enforceability of any other
                      part in this Terms and Conditions.
                    </Paragraph>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </>
  );
};

export default TermsConditions;
