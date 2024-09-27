import Link from "../link";
import useScroll from "@/hooks/useScroll";
import { useState } from "react";
import SignIn from "../users/signin";
import MobileNav from "./mobileNav";
import { useUser } from "@/hooks/useUser";
import { getActiveCategory, getProductPreview } from "@/utils/nav";
import { useProducts } from "@/hooks/useProducts";
import {
  toProductSlug,
  toS3Url,
  checkIFDateIsOlderThan30Days,
  checkIFDateIsNotOlderThan30DaysCategory,
} from "@/utils/index";
import MobileSearch from "../global/mobileSearch";
import { useRouter } from "next/router";

export default function Nav() {
  const { isSticky, element } = useScroll();
  const [isModal, setIsModal] = useState(false);
  const [isNav, setIsNav] = useState(false);
  const { user, logout } = useUser();
  const { categoriesData, cartData } = useProducts();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const { asPath } = useRouter();
  const [currentTab, setCurrentTab] = useState("sign-in");
  const storeId = user?.user?.store?.id;

  const modalHandler = (isCollapse) => {
    setIsModal(!isModal);
    document.querySelector("body").classList.toggle("no-scroll");
    setCurrentTab("sign-in");

    if (isCollapse === false) {
      document.querySelector("body").classList.remove("no-scroll");
    }
  };

  const toggleNav = () => {
    setIsNav(!isNav);
    document.querySelector("body").classList.toggle("no-scroll");
  };

  const toggleProductsList = (slug) => {
    setActiveCategory(getActiveCategory(slug, categoriesData || []));
  };

  const togglePreview = (slug) => {
    setActiveProduct(getProductPreview(slug, activeCategory.products));
  };
  return (
    <div>
      {isModal && (
        <SignIn
          modalHandler={modalHandler}
          showmodal={isModal}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      )}
      <div
        onClick={modalHandler}
        className={`c-backdrop c-backdrop--dark ${isModal ? "active" : ""}`}
      ></div>
      <div className="w-full  mx-auto c-supportbar py-2 bg-cream-light text-blue-md">
        <div className="content-container mx-auto ">
          <div className="h-12 w-full flex justify-center">
            <div className="flex justify-between w-full items-center">
              <div className="c-nav__links hidden md:flex md:w-1/2 justify-start items-center">
                <Link to="/cost-calculator" className="mr-12 no-underline">
                  Cost Calculator
                </Link>
                <Link to="/stores" className="mr-12 no-underline">
                  Discover Stores
                </Link>
                <Link to="/track" className="no-underline">
                  Track Orders
                </Link>
              </div>
              <div className="flex justify-end items-center">
                <div className="sm:pl-1">
                  <span className="sm:inline hidden">Need help? Call:</span>

                    <div className="flex flex-col md:hidden">
                      <a href="tel:234.706.900.0083" className="call-link">
                        +2347069000083
                      </a>
                      <a href="tel:234.903.500.0505" className="call-link">
                      +2349035000505
                    </a>
                    </div>

                  <div className="items-center space-x-1 md:flex hidden">
                    <a href="tel:234.706.900.0083" className="call-link">
                      +2347069000083
                    </a>
                    <span className="mx-1 hidden md:block">or</span>
                    <a href="tel:234.903.500.0505" className="call-link">
                      +2349035000505
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center pl-2">
                <a
                  href="https://wa.me/2348091085333"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.838 26.921l.484.285a13.272 13.272 0 006.74 1.838h.005c7.3 0 13.24-5.912 13.242-13.178a13.068 13.068 0 00-3.875-9.324 13.187 13.187 0 00-9.362-3.865c-7.305 0-13.245 5.912-13.248 13.178a13.097 13.097 0 002.024 7.013l.315.498-1.338 4.863 5.013-1.308zM0 31.996l2.26-8.216a15.769 15.769 0 01-2.126-7.926C.137 7.112 7.284 0 16.067 0a15.869 15.869 0 0111.27 4.65A15.723 15.723 0 0132 15.867c-.004 8.741-7.152 15.855-15.933 15.855h-.006c-2.667-.001-5.287-.667-7.614-1.93L0 31.996z' fill='%23fff'/%3E%3Cpath d='M.683 15.862a15.223 15.223 0 002.054 7.652L.554 31.445l8.154-2.128a15.436 15.436 0 007.35 1.863h.007c8.477 0 15.377-6.867 15.38-15.306a15.176 15.176 0 00-4.5-10.828 15.32 15.32 0 00-10.88-4.49C7.586.557.686 7.423.682 15.863zM16.064 31.18z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M.134 15.858a15.77 15.77 0 002.127 7.927L0 32l8.446-2.204a15.98 15.98 0 007.614 1.93h.007c8.78 0 15.929-7.114 15.933-15.855a15.722 15.722 0 00-4.663-11.217 15.87 15.87 0 00-11.27-4.65C7.284.004.137 7.116.134 15.858zm5.03 7.512l-.316-.498a13.098 13.098 0 01-2.024-7.013C2.826 8.593 8.767 2.682 16.072 2.682a13.188 13.188 0 019.362 3.864 13.068 13.068 0 013.875 9.323c-.003 7.267-5.943 13.179-13.242 13.179h-.006a13.274 13.274 0 01-6.74-1.837l-.484-.286-5.012 1.308 1.338-4.863zm10.903 8.356z' fill='url(%23paint1_linear)'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.085 9.229c-.298-.66-.612-.673-.896-.685-.232-.01-.498-.01-.763-.01s-.697.1-1.061.497C9 9.427 7.97 10.386 7.97 12.335c0 1.95 1.427 3.834 1.626 4.099.199.264 2.754 4.393 6.8 5.982 3.363 1.32 4.047 1.057 4.777.99.73-.065 2.356-.957 2.687-1.883.332-.925.332-1.718.233-1.884-.1-.165-.365-.264-.764-.462-.398-.198-2.355-1.157-2.72-1.29-.365-.132-.63-.198-.896.2-.265.396-1.028 1.288-1.26 1.552-.232.265-.464.298-.863.1-.398-.199-1.68-.617-3.201-1.967-1.184-1.05-1.982-2.347-2.215-2.744-.232-.396-.025-.611.175-.809.179-.177.398-.462.597-.694.199-.231.265-.396.398-.66.133-.265.066-.497-.033-.695-.1-.198-.873-2.158-1.227-2.941' fill='%23fff'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='16' y1='31.442' x2='16' y2='.554' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2320B038'/%3E%3Cstop offset='1' stop-color='%2360D66A'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='16' y1='32.001' x2='16' y2='.005' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F9F9F9'/%3E%3Cstop offset='1' stop-color='%23fff'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
                    alt="contact us on +2348099561000"
                  />
                </a>
              </div>
              <div className="c-country-select flex items-center">
                <img
                  src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 2.667H0v10.666h16V2.666z' fill='%23F0F0F0'/%3E%3Cpath d='M5.333 2.667H0v10.666h5.333V2.666zM16 2.667h-5.333v10.666H16V2.666z' fill='%234A945A'/%3E%3C/svg%3E"
                  alt="nigerian flag"
                  className="inline-block mr-2"
                />
                <span>Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        ref={element}
        className={`c-nav font-sf ${isSticky ? "c-sticky" : ""}`}
      >
        <div className="inner-nav content-container mx-auto justify-between items-center flex">
          <div className="c-logo flex-shrink-0">
            <Link to="/">
              <div className="flex items-center space-x-2">
                <img
                  src="data:image/svg+xml,%3Csvg width='155' height='40' viewBox='0 0 155 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M.206 40h6.73V29.175h.105c.344.511.805.933 1.345 1.23a5.264 5.264 0 001.865.93c.81.218 1.646.322 2.485.31a9.296 9.296 0 005.59-1.756 9.606 9.606 0 002.179-2.362c.725-.928 1.14-1.958 1.554-3.197.414-1.34.518-2.68.518-4.33s-.206-3.3-.725-4.64a9.21 9.21 0 00-1.966-3.401 7.671 7.671 0 00-2.909-2.267 9.188 9.188 0 00-3.416-.722 9.504 9.504 0 00-4.245.927 8.022 8.022 0 00-2.998 2.578h-.1l-.31-2.985H0c0 1.03.104 2.062.104 3.3.104 1.229.104 2.578.104 3.917V40H.206zm6.73-21.133v-.618c.105-.205.105-.412.207-.516.115-.66.361-1.289.725-1.851.38-.493.879-.883 1.45-1.134.62-.31 1.139-.517 1.864-.517a3.997 3.997 0 012.485.826 4.215 4.215 0 011.547 2.16c.343.996.522 2.04.529 3.094 0 1.12-.178 2.233-.53 3.298a4.744 4.744 0 01-1.655 2.061 3.997 3.997 0 01-2.485.826c-.725 0-1.235-.206-1.865-.413a7.125 7.125 0 01-1.345-1.134c-.31-.517-.621-1.031-.725-1.65-.104-.205-.104-.412-.207-.721v-3.71h.006zM26.818 31.24h6.835V19.382c0-.206.104-.516.104-.722a3.956 3.956 0 011.553-2.474c.824-.618 1.859-.927 3.106-.927h1.036c.206.103.518.103.829.205V9.072c-.31 0-.519-.104-.725-.104h-.725c-.519 0-1.14 0-1.656.206a4.99 4.99 0 00-1.656.825 4.828 4.828 0 00-1.45 1.444c-.519.516-.83 1.229-1.14 2.061h-.206l-.206-4.021h-5.803c-.014.654.02 1.309.104 1.958v19.798zm23.81 0V9.485h-6.83v21.752l6.83.002zm5.385 0h6.834V17.733c.006-.254.077-.503.207-.722.104-.412.414-.825.725-1.23.279-.414.675-.736 1.139-.926.414-.31.931-.413 1.554-.413.829 0 1.553.206 2.07.618a3.77 3.77 0 011.035 1.65c.31.72.415 1.546.415 2.473v12.063h6.73V18.351c0-1.649-.206-2.985-.62-4.123-.31-1.23-.932-2.165-1.554-2.986-.725-.721-1.554-1.34-2.485-1.649a7.954 7.954 0 00-3.106-.618 9.097 9.097 0 00-2.485.31c-.725.308-1.45.516-1.967.927-.526.32-1.013.7-1.45 1.134-.31.413-.62.825-.829 1.134h-.206l-.31-2.985h-5.902c.104.927.104 2.062.207 3.196v18.546l-.002.002zM82.82 5.465v4.021h-2.887v4.949h2.9v8.867a13.818 13.818 0 00.518 3.917c.26.946.721 1.825 1.353 2.576a7.7 7.7 0 002.175 1.34 9.155 9.155 0 002.998.517c.866-.014 1.73-.083 2.587-.208.725-.103 1.346-.205 1.764-.412V25.98a1.318 1.318 0 00-.62.103h-1.45c-.621 0-1.14-.103-1.555-.413-.414-.205-.724-.618-.828-1.229-.206-.52-.31-1.244-.31-2.172v-7.836h4.867V9.485h-4.866V3.609L82.84 5.465h-.02zm25.368 4.021l7.972 21.753h6.73l8.076-21.753h-7.133l-2.797 10.103c-.206.927-.414 1.756-.621 2.68a18.886 18.886 0 00-.516 2.569h-.207a22.846 22.846 0 00-.518-2.578c-.193-.905-.435-1.8-.725-2.68l-2.898-10.095H108.2l-.012.001zm35.722-.516c-1.764 0-3.417.206-4.762.825a9.802 9.802 0 00-3.727 2.27c-1.035 1.03-1.864 2.165-2.381 3.608a14.413 14.413 0 00-.829 4.845 12.81 12.81 0 00.829 4.64 11.028 11.028 0 002.381 3.512 10.238 10.238 0 003.624 2.269c1.346.516 2.9.721 4.452.721 1.139 0 2.381-.103 3.416-.412a12.445 12.445 0 003.21-1.34 10.308 10.308 0 002.485-2.269c.829-.927 1.346-2.062 1.764-3.3.435-1.372.647-2.804.628-4.242 0-1.65-.206-3.197-.829-4.536-.518-1.34-1.235-2.578-2.175-3.512a9.824 9.824 0 00-3.527-2.27c-1.346-.618-2.9-.825-4.556-.825l-.003.016zm-.207 4.845c.725 0 1.45.104 1.967.516.517.413 1.035.826 1.346 1.444.364.675.609 1.407.725 2.165a8.75 8.75 0 01.31 2.37c0 1.23-.206 2.475-.621 3.402a4.56 4.56 0 01-1.45 2.27c-.62.617-1.449.825-2.278.825a3.996 3.996 0 01-2.485-.826 5.435 5.435 0 01-1.45-2.37c-.415-.928-.519-2.062-.519-3.3.013-.794.082-1.586.207-2.37.206-.826.414-1.444.829-2.062a4.856 4.856 0 011.345-1.548 4.094 4.094 0 012.071-.516h.003z' fill='%23000'/%3E%3Cpath d='M98.468 9.588v5.36h6.936v-5.36h-6.936z' fill='%2300AFEF'/%3E%3Cpath d='M98.468 14.948v5.465h6.936v-5.465h-6.936z' fill='%23EC268F'/%3E%3Cpath d='M98.468 20.413v5.361h6.936v-5.361h-6.936z' fill='%23FFF212'/%3E%3Cpath d='M98.468 25.774v5.463h6.936v-5.463h-6.936zM101.988 0c-2.07 0-3.727 1.649-3.727 3.609a3.673 3.673 0 001.085 2.631 3.701 3.701 0 002.642 1.081c1.967 0 3.625-1.649 3.625-3.71a3.647 3.647 0 00-1.074-2.54A3.676 3.676 0 00101.988 0zM47.313 0c-2.07 0-3.727 1.649-3.727 3.609a3.674 3.674 0 001.085 2.631 3.705 3.705 0 002.642 1.081c1.967 0 3.625-1.649 3.625-3.71a3.644 3.644 0 00-1.074-2.54A3.676 3.676 0 0047.314 0z' fill='%23000'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='155' height='40' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
                  alt="Printivo logo"
                />
                {/* <span className="text-blue-dark">x</span>
              <img
                src="https://res.cloudinary.com/dtuims4ku/image/upload/v1701202151/pressone_puw2sk.png"
                alt="PressOne logo"
                // className="-ml-2"
              /> */}
              </div>
            </Link>
          </div>
          <div className="nav-items flex">
            <ul className="c-nav__links flex mr-6 main-nav-list">
              {/* <Link to="/" className="no-underline mr-6 nav-link">
                Home
              </Link> */}

              <li className="c-nav__listitem  mr-6">
                <Link to="/all-products" className="nav-link no-underline">
                  All Products
                </Link>
                {categoriesData && (
                  <div className="hidden md:block w-full h-auto mx-auto bg-grey-lightest content-container absolute main-nav-sub-list">
                    <div className="p-8 flex c-navdropdown shadow-lg">
                      <div className="w-1/4 border-r-2 border-cream-md">
                        <div className="w-full main-nav-parent-items c-dropdown__main">
                          {categoriesData?.data?.map((category) => (
                            <a
                              className={`${
                                activeCategory?.slug === category.slug
                                  ? "active"
                                  : ""
                              } text-sm block py-1 transition-2`}
                              href={`/category/${category.slug}`}
                              data-slug={category.slug}
                              key={category.slug}
                              onMouseOver={() =>
                                toggleProductsList(category.slug)
                              }
                              onFocus={toggleProductsList}
                            >
                              {category.name}
                              {checkIFDateIsNotOlderThan30DaysCategory(
                                category
                              ) && (
                                <span
                                  class="ml-2 bg-magenta text-white font-medium mr-2 px-2 py-0.5 rounded-full "
                                  style={{ fontSize: "0.65rem" }}
                                >
                                  NEW
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="w-1/2 border-r-2 border-cream-md">
                        <div className="w-full pl-5 main-nav-sub-menu flex flex-col transition-2">
                          {activeCategory && (
                            <div
                              id={`${activeCategory.slug}-sub-menu`}
                              className="transition-5"
                              key={activeCategory.slug}
                            >
                              {activeCategory.products.map((product) => (
                                <a
                                  className={`text-sm mb-2 block ${
                                    activeProduct?.slug === product.slug
                                      ? "active"
                                      : ""
                                  }`}
                                  href={toProductSlug(product.slug)}
                                  onMouseOver={() =>
                                    togglePreview(product.slug)
                                  }
                                  onFocus={() => togglePreview(product.slug)}
                                  data-title={product.name}
                                  data-thumb={product.thumbnail_path}
                                  data-price={product.minimum_price}
                                  data-quantity={product.minimum_quantity}
                                  key={product.slug}
                                >
                                  {product.name}
                                  {!checkIFDateIsOlderThan30Days(
                                    product.created
                                  ) && (
                                    <span class="ml-2 bg-magenta text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
                                      NEW
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {activeProduct && (
                        <div className="w-1/4">
                          <div className="w-full pl-5 c-preview font-sf--bold">
                            <img
                              className="w-full c-preview__image h-44 object-cover"
                              src={toS3Url(activeProduct.thumbnail_path)}
                              alt={activeProduct.name}
                            />
                            <div className="w-full mt-1 p-4 text-grey-darkest c-preview__details">
                              <span className="block text-base font-sf--bold preview-title mb-4" />
                              <p className="uppercase  mb-1 font-sf--bold">
                                starting at
                              </p>
                              <span className="block text-xl preview-cost font-sf--bold">
                                ₦{activeProduct.minimum_price.toLocaleString()}{" "}
                                <span>
                                  per {activeProduct.minimum_quantity}
                                </span>
                              </span>
                              <div className="mt-1">
                                <a
                                  className="font-sf text-white"
                                  href={toProductSlug(activeProduct.slug)}
                                >
                                  <button type="button" className="text-white">
                                    <span>Browse</span>
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/*  */}
                    </div>
                  </div>
                )}
              </li>
              <Link to="/reseller" className="no-underline nav-link mr-6">
                Become a Reseller
              </Link>
              <a
                href="https://merch.printivo.com"
                target="_blank"
                className="no-underline nav-link mr-6"
              >
                Merch Store
              </a>

              <Link to="/sell" className="no-underline nav-link mr-6">
                Marketplace
              </Link>
            </ul>
            <div className="c-nav__userarea flex items-center">
              <div className="c-logged">
                {!user && (
                  <div className="c-logged__out flex">
                    <button
                      type="button"
                      className={`mr-6 text-red-light font-sf`}
                      onClick={modalHandler}
                    >
                      Sign in
                    </button>
                    <Link
                      to="/members/sign-up"
                      className="no-underline nav-link mr-6"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
                {user && (
                  <div className="c-logged__in items-center mr-2 md:mr-10">
                    <div className="c-user relative">
                      <div className="c-user__header items-center cursor-pointer flex">
                        <div className="c-user__avatar w-6">
                          <img
                            src={user?.user.avatar}
                            alt="user photo"
                            className="w-6 h-6 object-cover"
                          />
                        </div>
                        <div className="c-user__name ml-1.5 font-sf--bold text-red-light font-15">
                          {user?.user.full_name.split(" ")[0]}
                        </div>
                      </div>
                      <div className="c-user__dropdown">
                        <div className="dropdown-content h-full">
                          <div className="user-area py-3">
                            <div className="mb-4">
                              <h4 className="font-sf--bold text-blue-dark p-5 pb-3 pt-2 text-base">
                                My Account
                              </h4>
                              <div>
                                <Link
                                  to="/account#my-profile"
                                  className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  My Profile
                                </Link>
                              </div>

                              {/* <div>
                                <Link
                                  to="/account"
                                  className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  My Wallet
                                </Link>
                              </div> */}

                              <div>
                                <Link
                                  to="/account#my-saved-designs"
                                  className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  My Saved Designs
                                </Link>
                              </div>

                              <div>
                                <Link
                                  to="/account#account-setting"
                                  className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  Account Settings
                                </Link>
                              </div>

                              <div>
                                <Link
                                  to="/account#order-history"
                                  className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                >
                                  Order History
                                </Link>
                              </div>
                            </div>

                            {storeId && (
                              <>
                                <hr className="border-cream" />

                                <div className="mt-1">
                                  <h4 className="font-sf--bold text-blue-dark p-5 pb-3 text-base">
                                    My Store
                                  </h4>
                                  <div>
                                    <Link
                                      to="/account/store"
                                      className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                    >
                                      View My Store
                                    </Link>
                                  </div>

                                  <div>
                                    <Link
                                      to={`/account/transactions`}
                                      className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                    >
                                      Transactions
                                    </Link>
                                  </div>

                                  <div>
                                    <Link
                                      to="/account"
                                      className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                    >
                                      Payments
                                    </Link>
                                  </div>

                                  <div>
                                    <Link
                                      to="/account/store/uploads"
                                      className="text-blue-dark font-sf--reg text-base dropdown-link block py-2 px-8 mb-1.5"
                                    >
                                      Design Uploads
                                    </Link>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="dropdown-spacing"></div>

                          <div className="logout-area">
                            <button
                              to="/account"
                              className="text-blue-dark no-outline w-full py-5 px-8 font-sf--reg text-base block mb-2 text-left"
                              onClick={logout}
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                {/* <div className="c-search__icon mr-4 nav-link">
                  <img
                    src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 4a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0z' fill='%23506683'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.943 15.943a1 1 0 011.414 0l4.35 4.35a1 1 0 01-1.414 1.414l-4.35-4.35a1 1 0 010-1.414z' fill='%23506683'/%3E%3C/svg%3E"
                    alt="search"
                  />
                </div> */}
                <Link
                  to="/cart"
                  className="c-cart__icon flex-shrink-0 relative"
                >
                  <img
                    src="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28.2202 10.7466L25.3669 19.76C25.1536 20.4 24.5936 20.8267 23.9269 20.8267H12.9136C12.2736 20.8267 11.6602 20.4266 11.4469 19.8399L7.26024 8.55999H4.8069C4.22023 8.55999 3.74023 8.08 3.74023 7.49333C3.74023 6.90666 4.22023 6.42666 4.8069 6.42666H7.98023C8.43357 6.42666 8.83357 6.71998 8.99357 7.14665L13.3402 18.6666H23.4736L25.7402 11.4666H13.1802C12.5936 11.4666 12.1136 10.9866 12.1136 10.4C12.1136 9.8133 12.5936 9.3333 13.1802 9.3333H27.2069C27.5536 9.3333 27.8736 9.51996 28.0602 9.78662C28.2736 10.0533 28.3269 10.4266 28.2202 10.7466ZM13.4469 22.2133C12.9936 22.2133 12.5402 22.4 12.2202 22.72C11.9002 23.04 11.7136 23.4933 11.7136 23.9466C11.7136 24.4 11.9002 24.8533 12.2202 25.1733C12.5402 25.4933 12.9936 25.68 13.4469 25.68C13.9002 25.68 14.3536 25.4933 14.6736 25.1733C14.9936 24.8533 15.1802 24.4 15.1802 23.9466C15.1802 23.4933 14.9936 23.04 14.6736 22.72C14.3536 22.4 13.9002 22.2133 13.4469 22.2133ZM23.0202 22.2133C22.5669 22.2133 22.1136 22.4 21.7936 22.72C21.4736 23.04 21.2869 23.4933 21.2869 23.9466C21.2869 24.4 21.4736 24.8533 21.7936 25.1733C22.1136 25.4933 22.5669 25.68 23.0202 25.68C23.4736 25.68 23.9269 25.4933 24.2469 25.1733C24.5669 24.8533 24.7536 24.4 24.7536 23.9466C24.7536 23.4933 24.5669 23.04 24.2469 22.72C23.9269 22.4 23.4736 22.2133 23.0202 22.2133Z' fill='%23384A62'/%3E%3C/svg%3E%0A"
                    alt="cart"
                  />
                  {cartData.length > 0 && (
                    <span className="absolute c-cart__size font-sf--bold font-15 text-white bg-red-light">
                      {cartData.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={`c-mobilenav md:hidden`}>
          <div
            onClick={toggleNav}
            className={`c-backdrop c-backdrop--dark ${isNav ? "active" : ""}`}
          ></div>
          <div className="flex justify-between">
            <button
              onClick={toggleNav}
              className="c-mobilenav__button font-sf px-5 py-2.5 no-outline rounded-sm"
            >
              Menu
            </button>
            {(asPath !== "/" || isSticky) && (
              <MobileSearch placeholder="Quick Search" />
            )}
          </div>
          <MobileNav
            isNav={isNav}
            toggleNav={toggleNav}
            categoriesData={categoriesData || []}
          />
        </div>
      </nav>
    </div>
  );
}
