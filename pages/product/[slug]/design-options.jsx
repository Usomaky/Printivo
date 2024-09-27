import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UploadModal from '@/components/design/upload-modal'
import Search from '@/components/global/search'
import Services from '@/components/global/services'
import Layout from '@/components/layout/layout'
import Link from '@/components/link'
import { useProducts } from '@/hooks/useProducts'

const DesignOptions = () => {
  const [isModal, setIsModal] = useState(false)
  const router = useRouter()

  const slug = router.query.slug

  const { currentProduct, addToCart } = useProducts()

  const modalHandler = () => {
    setIsModal(!isModal)
    document.querySelector('body').classList.toggle('no-scroll')
  }

  useEffect(() => {
    const isCurrentProductEmpty = Object.entries(currentProduct).length === 0

    if (isCurrentProductEmpty) {
      router.push(`/product/${slug}`)
    }
  }, [router.query])

  return (
    <>
      <Layout>
        <UploadModal modalHandler={modalHandler} showmodal={isModal} />
        <div
          onClick={modalHandler}
          className={`c-backdrop c-backdrop--blue ${isModal ? 'active' : ''}`}
        ></div>
        <div className="m-product mt-44 md:mt-20">
          <div className="content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{' '}
              </Link>{' '}
              <Link to="/all-products" className="text-gray-md">
                All Products /{' '}
              </Link>{' '}
              <Link to={`/product/${slug}`} className="text-gray-md">
                {router.query.slug} /{' '}
              </Link>{' '}
              <span className="text-red-light font-sf">design options</span>
            </header>

            <Search placeholder="Search for any product" />

            <section>
              <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-12">
                {currentProduct?.name}, Design Request
              </h1>

              <h3 className="font-sf--bold text-blue-dark mt-5 text-lg mb-4">
                Now all we need is the design file to print on your{' '}
                {currentProduct?.name}
              </h3>

              <div className="request-grid grid">
                {currentProduct?.product?.supports_custom_upload && (
                  <div className="request-option py-10 px-8 text-sm">
                    <div className="mx-auto mb-4">
                      <img
                        src="data:image/svg+xml,%3Csvg width='65' height='58' viewBox='0 0 65 58' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24.622 23.443a4.397 4.397 0 100-8.794 4.397 4.397 0 000 8.794z' fill='%23506683'/%3E%3Cpath d='M60.714 35.229c-2.077-1.954-4.703-3.237-7.573-3.603V9.275c0-2.382-.977-4.52-2.504-6.107C49.05 1.58 46.912.664 44.531.664H9.11c-2.382 0-4.52.977-6.107 2.504C1.416 4.756.5 6.893.5 9.275v36.458c0 2.381.977 4.519 2.504 6.107 1.588 1.587 3.725 2.503 6.107 2.503h34.26c2.259 1.832 5.068 2.993 8.182 2.993 3.604 0 6.84-1.466 9.16-3.786a12.919 12.919 0 003.787-9.16c0-3.604-1.466-6.84-3.786-9.161zM3.737 9.275c0-1.466.61-2.81 1.587-3.725a5.358 5.358 0 013.787-1.588h35.42c1.465 0 2.809.61 3.786 1.588a5.358 5.358 0 011.588 3.786v19.053l-9.039-9.038a1.64 1.64 0 00-2.32 0l-13.619 13.68-9.22-9.283a1.64 1.64 0 00-2.322 0l-9.648 9.771V9.275zM9.05 51.229v-.122c-1.466 0-2.81-.61-3.787-1.588-.916-.977-1.526-2.32-1.526-3.786V38.16l10.809-10.87 9.221 9.221c.61.611 1.649.611 2.32 0l13.62-13.679 8.915 8.977-.55.183c-.244.061-.488.122-.793.245-.245.06-.489.183-.733.244a1.827 1.827 0 00-.489.244c-.244.122-.427.183-.61.306l-.916.55c-.184.121-.306.182-.489.304-.122.062-.183.123-.305.184a7.37 7.37 0 00-1.466 1.282 12.919 12.919 0 00-3.786 9.16c0 .916.122 1.771.305 2.687.061.245.122.428.183.672.184.61.367 1.222.611 1.832v.061c.244.489.488 1.038.794 1.466H9.05zm49.282 0c-1.77 1.77-4.153 2.81-6.84 2.81a9.633 9.633 0 01-6.656-2.688c-.244-.244-.489-.55-.733-.794-.183-.183-.366-.427-.55-.61-.244-.306-.427-.672-.61-1.039-.122-.244-.244-.427-.367-.671a5.164 5.164 0 01-.305-1.039c-.061-.244-.183-.55-.244-.794a10.11 10.11 0 01-.184-1.954c0-2.687 1.1-5.068 2.81-6.84 1.71-1.77 4.152-2.809 6.84-2.809 2.686 0 5.068 1.1 6.84 2.81 1.77 1.77 2.808 4.152 2.808 6.84 0 2.625-1.099 5.007-2.809 6.778z' fill='%23506683'/%3E%3Cpath d='M52.653 37.855a2.131 2.131 0 00-.55-.366c-.183-.062-.366-.123-.55-.123h-.122c-.183 0-.366.061-.55.123a1.441 1.441 0 00-.549.366l-3.786 3.786c-.61.61-.61 1.649 0 2.32.61.611 1.649.611 2.32 0l.978-.976v6.717c0 .916.732 1.65 1.648 1.65.916 0 1.65-.734 1.65-1.65v-6.717l.976.977c.611.61 1.65.61 2.321 0 .61-.61.61-1.65 0-2.32l-3.786-3.787z' fill='%23506683'/%3E%3C/svg%3E"
                        alt="upload"
                        className="mx-auto"
                      />
                    </div>
                    <p className="mb-8 font-sf text-blue-dark text-center">
                      Upload your own design file. PNG, JPEG, PSD, AI, etc
                    </p>
                    <span className="inline-block w-full request-option__link mx-auto text-center">
                      <button
                        onClick={modalHandler}
                        className="rounded-sm px-6 py-3 bg-red-light text-white text-sm font-sf"
                      >
                        Upload
                      </button>
                    </span>
                  </div>
                )}

                {currentProduct?.product?.supports_design_request && (
                  <div className="request-option py-10 px-8 text-sm">
                    <div className="mx-auto mb-4">
                      <img
                        src="data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M42 47a1.25 1.25 0 10.001 2.501A1.25 1.25 0 0042 47z' fill='%23506683'/%3E%3Cpath d='M55.75 17.257v-4.632a4.372 4.372 0 00-6.462-3.844 4.383 4.383 0 00-4.163-3.031c-.755 0-1.466.192-2.087.53a4.383 4.383 0 00-4.163-3.03c-1.223 0-2.33.505-3.125 1.317a4.362 4.362 0 00-3.125-1.317 4.38 4.38 0 00-4.375 4.375v5.991a8.705 8.705 0 00-4.462 3.086c-3.541.432-6.069.857-7.662 1.29a6.25 6.25 0 00-8.089-1.611L.62 20.713a1.25 1.25 0 000 2.16l7.423 4.336c2.522 1.454 5.812.993 7.81-1.287 1.528.437 3.944.86 7.444 1.306a8.71 8.71 0 001.265 1.602l4.358 4.358a6.208 6.208 0 011.83 4.418v3.144h-.625a4.38 4.38 0 00-4.375 4.375 4.38 4.38 0 002.5 3.952V59.5c0 .69.56 1.25 1.25 1.25h25c.69 0 1.25-.56 1.25-1.25V49.077a4.38 4.38 0 002.5-3.952 4.38 4.38 0 00-4.375-4.375h-.625v-3.455c0-1.547.348-3.106 1.006-4.506 1.005-2.136 1.493-4.09 1.494-5.97C61.298 25.685 64 24.106 64 22c0-2.804-5.351-4.108-8.25-4.743zm-4.375-6.507c1.037 0 1.875.838 1.875 1.875v5a1.877 1.877 0 01-1.875 1.875 1.877 1.877 0 01-1.875-1.875v-5c0-1.034.841-1.875 1.875-1.875zm-6.25-2.5c1.034 0 1.875.841 1.875 1.875v6.25a1.877 1.877 0 01-1.875 1.875 1.874 1.874 0 01-1.875-1.875v-6.25c0-1.034.841-1.875 1.875-1.875zm-6.25-2.5c1.034 0 1.875.841 1.875 1.875v6.154a5.015 5.015 0 00-2.25-.529H37V7.625c0-1.034.841-1.875 1.875-1.875zM30.75 7.625c0-1.034.841-1.875 1.875-1.875s1.875.841 1.875 1.875v5.625h-3.75V7.625zm-8.535 16.938c-2.21-.305-3.912-.603-5.09-.89a6.257 6.257 0 00.105-3.386c1.188-.288 2.915-.585 5.165-.887A8.743 8.743 0 0022 22v.644c0 .645.074 1.29.215 1.919zm-12.917.484l-5.57-3.255 5.564-3.249c2.48-1.43 5.622.35 5.622 3.25 0 2.857-3.114 4.697-5.616 3.254zm21.39 6.373l-4.358-4.358a6.231 6.231 0 01-1.141-1.565 6.289 6.289 0 01-.689-2.853V22c0-3.41 2.754-6.25 6.25-6.25h7.75c1.353 0 2.5 1.105 2.5 2.5 0 1.378-1.122 2.5-2.5 2.5h-7.498a1.25 1.25 0 00-.074 2.498c5.552.332 8.338 5.39 6.985 9.732a1.25 1.25 0 102.386.745c.562-1.802.59-3.724.136-5.48 4.558-.04 9.015-.382 12.801-.976-.073 1.375-.481 2.837-1.242 4.456a13.188 13.188 0 00-1.244 5.57v3.455h-17.5v-3.144c0-2.337-.91-4.534-2.563-6.186zM55.75 45.125A1.877 1.877 0 0153.875 47H47a1.25 1.25 0 100 2.5h6.25v8.75h-22.5V49.5H37a1.25 1.25 0 100-2.5h-6.875a1.877 1.877 0 01-1.875-1.875c0-1.034.841-1.875 1.875-1.875h23.75c1.034 0 1.875.841 1.875 1.875zM54.27 24.56c-4.178.767-9.424 1.19-14.77 1.19h-.093a9.983 9.983 0 00-2.04-2.5H38.5a5.006 5.006 0 004.584-3.005 4.37 4.37 0 004.579-.31A4.375 4.375 0 0051.375 22c1.633 0 3.1-.917 3.85-2.299 4.352.95 5.917 1.925 6.241 2.326-.296.43-2.026 1.584-7.196 2.533z' fill='%23506683'/%3E%3C/svg%3E"
                        alt="create"
                        className="mx-auto"
                      />
                    </div>
                    <p className="mb-8 font-sf text-blue-dark text-center">
                      Get creative. Design with our online tools and templates
                    </p>
                    <Link
                      to={`/product/${slug}/custom-designs`}
                      className="inline-block w-full request-option__link mx-auto text-center"
                    >
                      <button className="rounded-sm px-6 py-3 bg-blue-dark text-white text-sm font-sf">
                        Create Yourself
                      </button>
                    </Link>
                  </div>
                )}

                <div className="request-option py-10 px-8 text-sm">
                  <div className="mb-4">
                    <img
                      src="data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)' fill='%23506683'%3E%3Cpath d='M63.925 4.778A4.975 4.975 0 0059.221.075c-5.13-.28-15.168-.007-24.767 4.957-4.893 2.531-10.068 6.822-14.197 11.773l-.151.184-9.373.724a4.948 4.948 0 00-3.77 2.218L.57 29.603a3.412 3.412 0 00-.276 3.276 3.413 3.413 0 002.61 2l7.896 1.224c-.027.153-.056.306-.081.46a4.972 4.972 0 001.394 4.325l10.999 10.999a4.984 4.984 0 004.325 1.394c.153-.026.307-.054.46-.082l1.223 7.897a3.413 3.413 0 002 2.61 3.42 3.42 0 003.277-.275l9.671-6.395a4.947 4.947 0 002.218-3.77l.724-9.373.184-.15c4.951-4.13 9.242-9.306 11.773-14.199 4.965-9.599 5.237-19.637 4.958-24.766zM42 53.908l-9.251 6.116-1.192-7.696c3.91-1.15 7.778-2.99 11.463-5.457l-.472 6.106c-.03.38-.23.72-.548.93zm-16.237-4.673L14.764 38.236c-.28-.28-.41-.675-.346-1.055a32.257 32.257 0 011.464-5.57l16.503 16.503a32.384 32.384 0 01-5.567 1.468 1.216 1.216 0 01-1.055-.347zm-14.74-27.783l6.105-.472c-2.466 3.685-4.308 7.553-5.457 11.463L3.975 31.25l6.117-9.252c.21-.318.55-.518.931-.547zm33.77 19.41c-3.03 2.527-5.97 4.355-8.68 5.677L17.46 27.886c1.732-3.538 3.846-6.484 5.677-8.678 3.822-4.582 8.575-8.535 13.041-10.845 8.81-4.557 18.091-4.802 22.84-4.544a1.23 1.23 0 011.162 1.163c.26 4.749.013 14.03-4.543 22.84-2.31 4.465-6.263 9.219-10.845 13.04z'/%3E%3Cpath d='M43.84 29.53c2.4 0 4.802-.914 6.629-2.741a9.313 9.313 0 002.746-6.629 9.314 9.314 0 00-2.746-6.629c-3.655-3.655-9.603-3.655-13.258 0a9.313 9.313 0 00-2.746 6.63c0 2.503.976 4.857 2.746 6.628a9.344 9.344 0 006.63 2.741zm-3.977-13.347a5.607 5.607 0 013.977-1.645c1.44 0 2.88.548 3.977 1.645a5.588 5.588 0 011.648 3.977 5.588 5.588 0 01-1.648 3.977 5.631 5.631 0 01-7.955 0 5.588 5.588 0 01-1.647-3.977c0-1.502.585-2.915 1.648-3.977zM1.913 52.742c.48 0 .96-.183 1.325-.549l6.122-6.122a1.875 1.875 0 10-2.652-2.651L.587 49.54a1.875 1.875 0 001.326 3.201zM14.97 49.03a1.875 1.875 0 00-2.652 0L.55 60.8a1.875 1.875 0 102.652 2.65L14.97 51.682a1.875 1.875 0 000-2.651zM17.929 54.64l-6.122 6.122a1.875 1.875 0 102.652 2.651l6.121-6.121a1.875 1.875 0 10-2.651-2.652z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='64' height='64' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
                      alt="request"
                      className="mx-auto"
                    />
                  </div>
                  <p className="mb-8 font-sf text-blue-dark text-center">
                    Let our creative team provide an awesome design for you
                  </p>
                  <Link
                    to={`/product/${slug}/request-design`}
                    className="inline-block w-full request-option__link mx-auto text-center"
                  >
                    <button className="rounded-sm px-6 py-3 bg-blue-dark text-white text-sm font-sf">
                      Send a Request
                    </button>
                  </Link>
                </div>

                {currentProduct?.product?.supports_straight_to_cart && (
                  <div className="request-option py-10 px-8 text-sm">
                    <div className="mx-auto mb-4">
                      <img
                        src="data:image/svg+xml,%3Csvg width='65' height='64' viewBox='0 0 65 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M55.983 20.222l2.994-2.995a5.631 5.631 0 000-7.954 5.63 5.63 0 00-7.954 0l-2.96 2.959a27.905 27.905 0 00-9.938-4.164V3.75H40A1.875 1.875 0 0040 0H25a1.875 1.875 0 000 3.75h1.875v4.318a27.901 27.901 0 00-9.939 4.164l-2.959-2.96a5.63 5.63 0 00-7.954 0 5.631 5.631 0 000 7.955l2.994 2.995A28.171 28.171 0 004.375 35.75C4.375 51.327 16.992 64 32.5 64s28.125-12.673 28.125-28.25c0-5.732-1.71-11.07-4.642-15.528zm-2.308-8.298c.73-.73 1.92-.73 2.65 0 .731.731.731 1.92 0 2.652l-2.628 2.628a28.436 28.436 0 00-2.64-2.663l2.617-2.617zM30.625 3.75h3.75v3.814A28.227 28.227 0 0032.5 7.5c-.63 0-1.255.023-1.875.064V3.75zM8.675 14.575a1.877 1.877 0 010-2.65c.73-.732 1.92-.732 2.65 0l2.618 2.616a28.436 28.436 0 00-2.64 2.663l-2.629-2.629zM32.5 60.25c-13.44 0-24.375-10.99-24.375-24.5 0-13.484 10.913-24.5 24.375-24.5 13.438 0 24.375 10.994 24.375 24.5 0 13.51-10.935 24.5-24.375 24.5z' fill='%23506683'/%3E%3Cpath d='M32.5 15.125c-11.373 0-20.625 9.252-20.625 20.625 0 5.505 2.146 10.702 6.041 14.634C21.824 54.328 27.003 56.5 32.5 56.5c5.496 0 10.676-2.172 14.584-6.116 3.895-3.932 6.041-9.129 6.041-14.634 0-11.373-9.252-20.625-20.625-20.625zm1.875 37.52v-1.77a1.875 1.875 0 00-3.75 0v1.77c-7.814-.875-14.035-7.146-14.897-15.02H17.5a1.875 1.875 0 000-3.75h-1.77c.867-7.81 7.085-14.028 14.895-14.895v1.77a1.875 1.875 0 003.75 0v-1.77c7.81.867 14.028 7.085 14.895 14.895H47.5c-1.035 0-1.875.84-1.875 1.875 0 1.035.84 1.862 1.875 1.862h1.772c-.862 7.875-7.082 14.158-14.897 15.032z' fill='%23506683'/%3E%3Cpath d='M40 33.875h-5.625V28.25a1.875 1.875 0 00-3.75 0v7.5c0 1.035.84 1.875 1.875 1.875H40a1.875 1.875 0 000-3.75z' fill='%23506683'/%3E%3C/svg%3E"
                        alt="checkout"
                        className="mx-auto"
                      />
                    </div>
                    <p className="mb-8 font-sf text-blue-dark text-center">
                      No design yet? Pay now and upload/get design later
                    </p>
                    <Link
                      to={`/designs/${currentProduct?.product?.slug}`}
                      className="inline-block w-full request-option__link mx-auto text-center"
                    >
                      <button className="rounded-sm px-6 py-3 bg-blue-dark text-white text-sm font-sf">
                        Proceed to Cart
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        <Services />
      </Layout>
    </>
  )
}

export default DesignOptions
