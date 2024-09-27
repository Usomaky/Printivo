import Search from "@/components/global/search";
import Services from "@/components/global/services";
import Layout from "@/components/layout/layout";
import Link from "@/components/link";
import { useRef } from "react";
import "twin.macro";

const Careers = () => {
  const sectionRef = useRef();

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-contact content-container mx-auto pt-6">
            <Search placeholder="Search for any product" />
            <section tw="pt-8">
              <div
                tw="height[458px] mb-16"
                css={`
                  background: url("https://res.cloudinary.com/aroicx/image/upload/v1630483742/Printivo_80.jpg");
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-position: center center;
                `}
              />

              <h1 tw="md:text-7xl text-4xl font-serif md:line-height[100.8px] mb-6 text-blue-dark max-width[932px] mx-auto text-center">
                Join us in building a seamless Printing Platform for Africa
              </h1>

              <button
                onClick={() =>
                  sectionRef.current.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                css={`
                  background: rgba(56, 74, 98, 0.1);
                  box-shadow: 0px 10px 20px 1px rgba(164, 164, 164, 0.1);
                  border-radius: 3px;
                  display: flex;
                `}
                tw="py-3 px-6 text-blue-dark font-bold mx-auto"
              >
                <span tw="inline-block mr-2.5">See all roles</span>
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5651 14.3804L12.5651 19.3604C12.4051 19.5204 12.2051 19.6004 12.0051 19.6004C11.8051 19.6004 11.6051 19.5204 11.4451 19.3604L6.44507 14.3804C6.12507 14.0604 6.12507 13.5604 6.44507 13.2404C6.76507 12.9204 7.26508 12.9204 7.58508 13.2404L11.2251 16.8604V5.20039C11.2251 4.76039 11.5851 4.40039 12.0251 4.40039C12.4651 4.40039 12.8251 4.76039 12.8251 5.20039V16.8804L16.4651 13.2604C16.7851 12.9404 17.2851 12.9404 17.6051 13.2604C17.8851 13.5604 17.8851 14.0604 17.5651 14.3804Z"
                      fill="#384A62"
                    />
                  </svg>
                </span>
              </button>
            </section>

            <section tw="pt-20 md:pb-52 pb-20 max-width[1024px] mx-auto">
              <div tw="md:flex mb-28">
                <div tw="md:max-width[380px] mr-9 mb-8">
                  <h2 tw="text-2xl text-blue-dark font-serif mb-4">
                    We are the humans of Printivo
                  </h2>
                  <p tw="text-blue-dark">
                    We are a team of highly curious, creative and
                    high-performance individuals with a common goal to build
                    Afica's largest online printing platform.
                  </p>
                </div>

                <div tw="flex">
                  <div tw="max-width[284px] w-full mr-8 mb-8">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623327391/printivo/Rectangle_106_biytaq.jpg"
                      alt=""
                    />
                  </div>

                  <div tw="max-width[284px] w-full">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623327392/printivo/Rectangle_107_kn89d7.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div tw="flex flex-col-reverse md:flex-row">
                <div tw="flex">
                  <div tw="max-width[284px] w-full mr-8">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623327392/printivo/Rectangle_108_ljesvt.jpg"
                      alt=""
                    />
                  </div>

                  <div tw="max-width[284px] w-full mr-8">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623327392/printivo/Rectangle_109_ym9mds.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div tw="md:max-width[380px] mb-8">
                  <h2 tw="text-2xl text-blue-dark font-serif mb-4">
                    Printivo Culture
                  </h2>
                  <p tw="text-blue-dark">
                    Ours is an open organisation where we believe being able to
                    work together to create something bigger than all of us
                    starts with honest and clear conversations.
                  </p>
                </div>
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[1030px] ml-auto" />

            <section tw="pt-6 pb-36 md:flex justify-between">
              <p tw="hidden md:block mt-20 font-semibold text-blue-dark">
                The perks of <br />
                working with us.
              </p>
              <div tw="max-width[1030px] w-full">
                <h2 tw="font-serif text-blue-dark font-size[32px] mb-8 sm:text-left text-center">
                  Benefits
                </h2>
                <div tw="md:flex justify-between">
                  <p tw="text-blue-dark text-lg mr-6 sm:max-width[284px] sm:text-left text-center mb-14 md:mb-0">
                    Working with us has it perks, and you can be rest assured
                    that your needs will also get taken care of.
                  </p>
                  <div tw="max-width[630px] mx-auto -mt-5 w-full">
                    <div tw="sm:flex justify-between">
                      <div tw="mb-14">
                        <div tw="max-width[80px] mx-auto">
                          <img
                            src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623332556/printivo/M_icons_1-min_1_dxyk0g.png"
                            alt=""
                            tw="mb-2"
                          />
                        </div>
                        <p tw="text-blue-dark text-center">Health Insurance</p>
                      </div>

                      <div tw="mb-14">
                        <div tw="max-width[80px] mx-auto">
                          <img
                            src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623332555/printivo/image_1_uvvasl.png"
                            alt=""
                            tw="mb-2"
                          />
                        </div>
                        <p tw="text-blue-dark text-center">
                          Professional Development
                        </p>
                      </div>

                      <div tw="mb-14">
                        <div tw="max-width[80px] mx-auto">
                          <img
                            src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623332555/printivo/1_bark_Ilo_s_5_xu1mtg.png"
                            alt=""
                            tw="mb-2"
                          />
                        </div>
                        <p tw="text-blue-dark text-center">
                          Adequate Worktools
                        </p>
                      </div>
                    </div>

                    <div tw="sm:flex justify-between">
                      <div tw="mb-14">
                        <div tw="max-width[80px] mx-auto">
                          <img
                            src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623332555/printivo/M_icons_2-min_1_gfetoy.png"
                            alt=""
                            tw="mb-2"
                          />
                        </div>
                        <p tw="text-blue-dark text-center">Paid Annual Leave</p>
                      </div>

                      <div tw="mb-14">
                        <div tw="max-width[80px] mx-auto">
                          <img
                            src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623332555/printivo/M_icons_3-min_1_cxii6p.png"
                            alt=""
                            tw="mb-2"
                          />
                        </div>
                        <p tw="text-blue-dark text-center">
                          Amazing and Kind colleagues
                        </p>
                      </div>

                      <div tw="mb-14">
                        <div tw="max-width[80px] mx-auto">
                          <img
                            src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1623332555/printivo/image_2_w2d73d.png"
                            alt=""
                            tw="mb-2"
                          />
                        </div>
                        <p tw="text-blue-dark text-center">
                          Workplace Pensions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div tw="height[1px] bg-blue-dark max-width[954px] ml-auto" />

            <section tw="pt-6 pb-36 md:flex justify-between" ref={sectionRef}>
              <p tw="hidden md:block font-semibold text-blue-dark">
                Open Roles:
              </p>
              <div tw="max-width[954px] w-full">
                {/* <h2 tw="text-2xl text-blue-dark font-serif mb-4">
                  We currently have no open roles
                </h2> */}
                {/* <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Customer Happiness Associate
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full-time. Intermediate, Lagos.
                    </span>
                  </div>
                  <a href="https://forms.gle/Y5bw1Y4zGbnwuE1m7" target="_blank">
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div> */}

                {/* <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Graphics Designer
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full-time. Intermediate, Lagos.
                    </span>
                  </div>
                  <a href="https://forms.gle/5mmB283hFExLN2vf7" target="_blank">
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div> */}

                {/* <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">Accountant</p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full-time. Intermediate, Lagos.
                    </span>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/1wkMHpyzM-iJPGFLPfQ918DnMXf-aSUdISkwbkizoIBQ/edit"
                    target="_blank"
                  >
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div> */}

                <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Procurement/ Inventory Officer
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full Time, Lagos.
                    </span>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/1mu0FD-9haRiX0HipYj4WBkzQFF-yjbfRlHZt-bXyLOE/edit"
                    target="_blank"
                  >
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div>

                <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Order Manager
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full Time, Lagos.
                    </span>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScV54etvZZe82bVtg0bM7jkykCGsHXs0c_571VTyY4YUFINoA/viewform"
                    target="_blank"
                  >
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Quality Control/ Outsourcing Manager
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full Time, Lagos.
                    </span>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/1xHMR2-EHl9f2puco33Hvg4G7FsAjtsKIuGUl8W9Zd-Q/edit"
                    target="_blank"
                  >
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Marketing Associate
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full Time, Lagos.
                    </span>
                  </div>
                  <a href="https://bit.ly/3FmheBg" target="_blank">
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Head of Growth & Marketing
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full Time, Lagos.
                    </span>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc9Exqn1l5LvL7FV_WuCflqNuERY1upbFQnw-sSEE8DQsmPGQ/viewform"
                    target="_blank"
                  >
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Field Sales Agent
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full Time, Remote and On-Site Lagos.
                    </span>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScuGW1LqpvSM2MG5EarL5ChUvZJW8Lx_uquxGBY9LJ9KKNY3w/viewform"
                    target="_blank"
                  >
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
                <div className="flex justify-between border-b py-5">
                  <div className="flex flex-col">
                    <p className="text-md text-blue-dark font-sf">
                      Back-end Developer
                    </p>
                    <span
                      className="text-md text-blue-dark font-sf"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      Full Time, Remote
                    </span>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc8qIE5mk1_Rs-mF1wAN_cB32VjCdv4QMFJG05LhwTgc-5k1Q/viewform"
                    target="_blank"
                  >
                    <button className="flex justify-between bg-red-light text-white p-3 pl-5 rounded outline-none">
                      Apply
                      <svg
                        className="ml-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.3643 12.5602L14.3843 17.5602C14.2243 17.7202 14.0243 17.8002 13.8243 17.8002C13.6243 17.8002 13.4243 17.7202 13.2643 17.5602C12.9443 17.2402 12.9443 16.7401 13.2643 16.4201L16.8843 12.7802H5.2043C4.7643 12.7802 4.4043 12.4202 4.4043 11.9802C4.4043 11.5402 4.7643 11.1802 5.2043 11.1802H16.8843L13.2643 7.54016C12.9443 7.22016 12.9443 6.72016 13.2643 6.40016C13.5843 6.08016 14.0843 6.08016 14.4043 6.40016L19.3843 11.4002C19.6843 11.7402 19.6843 12.2602 19.3643 12.5602Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  );
};

export default Careers;
