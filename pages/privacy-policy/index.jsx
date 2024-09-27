import Search from "@/components/global/search";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import tw, { css } from "twin.macro";

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

const PrivacyPolicy = () => {
  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20 mb-20">
          <main className="c-cart content-container mx-auto">
            <Search placeholder="Search for any product" />

            <div>
              <h1 className="font-dm text-blue-dark font-32 mb-14">
                Printivo Ltd, Privacy Policy
              </h1>
              <div tw="flex md:min-height[2000px]">
                <div tw="border-right[1px solid rgba(56, 74, 98, 0.1)] max-width[290px] w-full hidden md:block">
                  <div tw="pr-3 sticky top[80px] max-height[80vh] overflow-auto">
                    <SubHeading tw="text-red-light mb-6">
                      Introduction
                    </SubHeading>
                    <div>
                      <SubLink href="#info-collection">
                        Collection and use of personal information
                      </SubLink>
                      <div tw="pl-4 mb-8">
                        <SideLink>What we collect</SideLink>
                        <SideLink>How we use it</SideLink>
                        <SideLink>Updating your personal information</SideLink>
                        <SideLink>Payment and card details</SideLink>
                      </div>
                    </div>

                    <SubLink href="#cookie-policy">Our cookie policy</SubLink>

                    <div>
                      <SubLink href="#info-sharing">
                        Information sharing and disclosure
                      </SubLink>
                      <div tw="pl-4 mb-8">
                        <SideLink>Disclosure for legal reasons</SideLink>
                        <SideLink>Performance of our operations</SideLink>
                        <SideLink>Changes in printivo ltd business</SideLink>
                      </div>
                    </div>

                    <div>
                      <SubLink href="#info-control">
                        Controlling your personal information
                      </SubLink>
                      <div tw="pl-4 mb-8">
                        <SideLink>Transfer of information</SideLink>
                        <SideLink>Data retention period</SideLink>
                      </div>
                    </div>

                    <div>
                      <SubLink href="#fb-permissions">
                        Facebook Photo Permissions
                      </SubLink>
                      <div tw="pl-4 mb-8">
                        <SideLink>Basic Information</SideLink>
                        <SideLink>Photos</SideLink>
                        <SideLink>Printivo ltd. social share tools</SideLink>
                      </div>
                    </div>

                    <SubLink href="#opt-out-policy" tw="mb-5">
                      Opt-Out Policy: Your Ability To Edit And Cancel Your
                      Account
                    </SubLink>

                    <SubLink href="#privacy-policy-changes" tw="mb-5">
                      Changes to this privacy policy
                    </SubLink>

                    <SubLink href="#third-party-links" tw="mb-5">
                      Links to 3rd party sites
                    </SubLink>

                    <SubLink href="#contacting-printivo" tw="mb-5">
                      Contacting Printivo Limited
                    </SubLink>
                  </div>
                </div>

                <div tw="w-full md:px-8 max-width[870px]">
                  <h1 tw="text-2xl text-blue-dark font-sans font-semibold mb-4">
                    Introduction
                  </h1>
                  <Paragraph>
                    At Printivo, we believe you should be aware of information
                    we collect and how we use them to serve you. Please note
                    that privacy is as important to us as it is to you. Giving
                    us your personal details and data is an act of trust, and
                    one that we take seriously. Printivo will never show your
                    details to anyone else, sell, rent or otherwise disclose any
                    of your personal information, including your email address,
                    to any third party without your prior consent. And unless
                    you give us specific consent to act otherwise, the following
                    Privacy and policy outlines how Printivo handles your
                    private information.
                  </Paragraph>

                  <section id="info-collection" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      1. Collection and use of personal information
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Printivo Ltd. collects your personal information when you
                      use our website:
                    </Paragraph>
                    <div tw="md:pl-24 pl-8">
                      <div tw="mb-4">
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          What we collect
                        </Paragraph>
                        <ul>
                          <ListItem>Full name</ListItem>
                          <ListItem>Username</ListItem>
                          <ListItem>Password</ListItem>
                          <ListItem>Email Address</ListItem>
                          <ListItem>Shipping Address</ListItem>
                          <ListItem>Telephone Number</ListItem>
                        </ul>
                      </div>

                      <div tw="mb-10">
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          How we use it
                        </Paragraph>
                        <ul>
                          <ListItem>
                            To communicate with you on PRINTIVO-related matters
                          </ListItem>
                          <ListItem>
                            To provide you with order and billing history
                            information
                          </ListItem>
                          <ListItem>
                            To process your order and give you updates at every
                            stage
                          </ListItem>
                        </ul>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Updating Your Personal Information
                        </Paragraph>
                        <Paragraph>
                          If you want to change your name, e-mail address,
                          password, and/or preferred communication method after
                          you’ve registered; you can access your account in my
                          account session of Printivo and make any changes you
                          would love to make.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Payment and Card Details
                        </Paragraph>
                        <Paragraph>
                          All Credit card and Debit card payments on Printivo
                          are processed through secure and trusted payment
                          gateways managed by leading Nigerian banks. Printivo
                          uses latest encryption technology to protect your card
                          information while securely transmitting it to the
                          Banks for processing the payment. Printivo does not
                          store your card details as all transactions on your
                          cards are routed through trusted payment gateways
                          giving your maximum security, protection and rest of
                          mind.
                        </Paragraph>
                      </div>
                    </div>
                  </section>

                  <section id="cookie-policy" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      2. Our Cookie Policy
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      To get the most out of Printivo.com, your computer will
                      need to accept Cookies, as we’re only able to provide you
                      with certain personalised features of our website by using
                      them. This will also help us serve you in best ways Just
                      to emphasise, our Cookies don't store sensitive personal
                      information: they simply hold the 'key' that, once you're
                      signed in, is associated with this information. However,
                      if you'd prefer to restrict, block or delete Cookies from
                      Printivo.com, or any other website, you can easily use
                      your browser to do this.
                    </Paragraph>
                  </section>

                  <section id="info-sharing" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      3. Information Sharing And Disclosure
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Printivo.com is committed to protecting your personal
                      information. We will not disclose your personally
                      identifiable information to third parties without your
                      consent except:
                    </Paragraph>
                    <div tw="md:pl-24 pl-8">
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Disclosure for legal reasons
                        </Paragraph>
                        <Paragraph>
                          We reserve the right to communicate your personal
                          information to third parties make a legally compliant
                          request for its disclosure when backed by Legal
                          requestions according to the laws of the country in
                          which we operate.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Performance of our operations
                        </Paragraph>
                        <Paragraph>
                          The service is necessary for the performance of our
                          operations: mail delivery, hosting services,
                          protecting us from fraud, and payment of your account.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Changes in Printivo Ltd. business
                        </Paragraph>
                        <Paragraph>
                          If the assets that Printivo Ltd. use to operate its
                          business are acquired by a third party, we may
                          transfer personal data we then hold to that party. If
                          Printivo Ltd. buys or sells subsidiaries or business
                          units then in such transactions customer information
                          is one of the transferred assets, but would remain
                          subject to the commitments made in our Privacy Policy.
                        </Paragraph>
                      </div>
                    </div>
                  </section>

                  <section id="info-control" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      4. Controlling Your Personal Information
                    </SubHeading>

                    <div tw="md:pl-24 pl-8">
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Transfer of information
                        </Paragraph>
                        <Paragraph>
                          Personal information collected on Printivo Ltd. may be
                          stored and processed in the Nigeria or any other
                          country in which Printivo Ltd. maintain facilities and
                          servers, and by using this site, you consent to any
                          such transfer of information outside your country. We
                          will not supply your personal data to a third party
                          for commercial exploitation unless explicitly
                          authorized by you; so you can sleep easy knowing that
                          we won’t sell your name, personal details or email
                          addresses to any third party without express consent
                          from you. The only circumstances in which we will
                          provide any of your personal data to a third party for
                          non-commercial purposes are those contained in this
                          Privacy Policy.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Data Retention Period
                        </Paragraph>
                        <Paragraph>
                          We will retain your personal data only as long as is
                          necessary for the purposes to which you consent under
                          the Printivo Ltd. Terms and Conditions and this
                          Privacy Policy, or as is required by applicable law,
                          and then we will delete it (we absolutely promise).
                        </Paragraph>
                      </div>
                    </div>
                  </section>

                  <section id="fb-permissions" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      5. Facebook Photo Permissions
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      While creating designs using the Printivo design tool and
                      you intend to insert pictures from your Facebook account,
                      Printivo may ask for some Facebook permissions allowing it
                      to perform such actions with the your Facebook account and
                      to retrieve information, including Personal Data, from it.
                      <br />
                      The permissions asked are the following:
                    </Paragraph>

                    <div tw="md:pl-24 pl-8">
                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Basic information
                        </Paragraph>
                        <Paragraph>
                          By default, this includes certain User’s Data such as
                          id, name, picture, gender, and their locale. Certain
                          connections of the User, such as the Friends, are also
                          available. If the user has made more of their data
                          public, more information will be available.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Photos
                        </Paragraph>
                        <Paragraph>
                          Provides access to the photos your have uploaded on
                          Facebook, and photos your were have been tagged in.
                          Printivo Ltd. Does not make use of any information or
                          data directly and will not share such information with
                          anybody.
                        </Paragraph>
                      </div>

                      <div>
                        <Paragraph tw="font-bold letter-spacing[.5px] mb-1">
                          Printivo Ltd. Social 'share' tools
                        </Paragraph>
                        <Paragraph>
                          If you decide to 'share' Printivo Ltd content with
                          friends through social networks – like Facebook and
                          Twitter - you may be sent Cookies from these websites.
                          We don't control the setting of these Cookies, so we
                          suggest you check the third-party websites for more
                          information about their Cookies and how to manage
                          them.
                        </Paragraph>
                      </div>
                    </div>
                  </section>

                  <section id="opt-out-policy" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      6. Opt-Out Policy: Your Ability To Edit And Cancel Your
                      Account
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      You can access your account on the site to update and
                      correct the details that we gathered when you subscribed.
                      You must be logged in to access this information. All
                      information is password-protected so no one can access the
                      information but you.
                    </Paragraph>
                  </section>

                  <section
                    id="privacy-policy-changes"
                    tw="md:pl-28 pl-10 mb-10"
                  >
                    <SubHeading tw="text-blue-dark mb-2">
                      7. Changes To This Privacy Policy
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Occasionally, Printivo Ltd. will review and possibly
                      change or edit this policy in accordance with potential
                      changes to our business and as required by law. Printivo
                      Ltd. reserves the right to change its Privacy Policy at
                      any time.
                    </Paragraph>
                  </section>

                  <section id="third-party-links" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      8. Links To Third Party Sites
                    </SubHeading>
                    <Paragraph tw="mb-4">
                      Our site may contain links to other sites. Printivo Ltd.
                      is not responsible for the privacy practices, or the
                      content, of those web sites.
                    </Paragraph>
                  </section>

                  <section id="contacting-printivo" tw="md:pl-28 pl-10 mb-10">
                    <SubHeading tw="text-blue-dark mb-2">
                      9. Contacting Printivo Ltd
                    </SubHeading>
                    <Paragraph tw="mb-8">
                      If you have any questions about this privacy policy, the
                      practices of this site, or your dealings with Printivo
                      Ltd., you can contact us. You can also use this address if
                      you wish to request from Printivo Ltd. a copy of the
                      personal data we hold about you.
                    </Paragraph>
                    <Paragraph tw="mb-8">
                      Moyosore House, 180/182 Ikorodu Rd, <br /> Onipanu, Lagos.{" "}
                      <br />
                      Nigeria.
                    </Paragraph>
                    <Paragraph tw="mb-4">
                      Call +2342013306047, +2348091085333
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

export default PrivacyPolicy;
