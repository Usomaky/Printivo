import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useProducts } from '@/hooks/useProducts'
import RequestModal from '@/components/design/request-modal'
import Search from '@/components/global/search'
import Services from '@/components/global/services'
import Layout from '@/components/layout/layout'
import Link from '@/components/link'
import { toS3Url } from '@/utils/index'
import api from '@/services/api'

let count = 0
let uploadData = []

const RequestDesign = () => {
  const router = useRouter()
  const slug = router.query.slug

  const [isModal, setIsModal] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [file, setFile] = useState(null)
  const [buttonText, setButtonText] = useState('Upload')

  const {
    currentProduct,
    updateCurrentProduct,
    changeProductQuantity,
  } = useProducts()

  useEffect(() => {
    const isCurrentProductEmpty = Object.entries(currentProduct).length === 0
    if (isCurrentProductEmpty && slug) {
      router.push(`/product/${slug}`)
    }
  }, [router.query])

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent
      let percent = Math.floor((loaded * 100) / total)
      if (percent <= 100) {
        setUploadProgress(percent)
      }
    },
  }

  const uploadFile = () => {
    if (file) {
      file.forEach((image, i) => {
        singleUpload(image)
      })
    } else {
      Toastr.warning('Please Select file to upload')
    }
  }

  const singleUpload = async (image) => {
    const fileData = new FormData()
    fileData.append('file', image)
    setIsUploading(true)
    setButtonDisabled(true)
    try {
      const { data } = await api.post('/utils/upload.json', fileData, options)

      uploadData.push(data.full_path)

      count++
      if (count === file.length) {
        setButtonDisabled(false)
        setIsUploading(false)
        updateCurrentProduct({
          ...currentProduct,
          uploadUrl: uploadData,
        })
        setButtonText('Submit Request')
      }
    } catch (error) {
      console.log(error)
      setIsUploading(false)
    }
  }

  const onCheckbox = () => {
    setIsDisabled(!isDisabled)
    if (isDisabled) {
      setButtonText('Submit Request')
      if (file !== null) return
      setButtonDisabled(false)
    } else {
      setButtonText('Upload')
      if (file !== null) return
      setButtonDisabled(true)
    }
  }

  const onDrop = useCallback((files) => {
    const data = files
    setFile(data)
    setButtonDisabled(false)
  }, [])

  const deleteFIle = (name) => {
    let filtered = []
    file.map((item) => {
      if (item.name != name) {
        return filtered.push(item)
      }
    })
    setFile(filtered)
    setIsDisabled(true)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  const modalHandler = () => {
    setIsModal(!isModal)
    document.querySelector('body').classList.toggle('no-scroll')
  }

  const changeQuantity = (e) => {
    const quantity = e.target.value
    changeProductQuantity(quantity)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { requestNote } = Object.fromEntries(formData)
    if (uploadProgress === 100 || !isDisabled) {
      modalHandler()
      updateCurrentProduct({
        ...currentProduct,
        item_type: 'design-request',
        designType: 'Design Request',
        note: requestNote,
      })
    } else {
      uploadFile()
    }
  }

  return (
    <>
      <Layout>
        <RequestModal modalHandler={modalHandler} showmodal={isModal} />
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
              <Link to={`/product/${slug}`} className="text-gray-md">
                {slug} /{' '}
              </Link>{' '}
              <Link
                to={`/product/${slug}/design-options`}
                className="text-gray-md"
              >
                Design Options /{' '}
              </Link>{' '}
              <span className="text-red-light font-sf"> Request Design</span>
            </header>

            <Search placeholder="Search for any product" />

            <h1 className="font-dm text-blue-dark md:text-3xl text-2xl">
              Send a Request
            </h1>
            <section className="md:py-8 py-5 c-design-request mr-auto">
              <div className="md:flex pb-2">
                <form
                  onSubmit={onSubmit}
                  className="md:w-2/5 md:mr-32 flex-shrink-0 request-form"
                >
                  <div className="md:mt-4 md:max-w-md">
                    <label
                      htmlFor="quantity"
                      className="font-sf--reg text-blue-md mb-2 inline-block font-15"
                    >
                      Quantity
                    </label>
                    <div className="input-row flex items-end">
                      <select
                        name="quantity"
                        id="quantity"
                        value={currentProduct.quantity}
                        onChange={changeQuantity}
                        className="w-1/2 rounded-sm mw indent text-blue-dark font-sf--reg border-brown-light mr-4 input-border-brown h-11 font-15"
                      >
                        {currentProduct.product?.quotes.map((quote) => (
                          <option key={quote.id} value={quote.quantity}>
                            {quote.quantity}
                          </option>
                        ))}
                      </select>

                      <div>
                        <p className="font-sf text-xs text-gray-sub">Price</p>
                        <h3 className="font-sf--bold text-red-light font-15">
                          ₦{currentProduct.cost?.toLocaleString()}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="request-preview mobile md:hidden mb-16 w-full mt-6">
                    <h3 className="font-sf text-blue-dark mb-5">
                      {currentProduct?.name}
                    </h3>
                    <img
                      src={toS3Url(currentProduct.product?.thumbnail_path)}
                      alt="product image"
                      className="w-full h-72 object-cover mb-4"
                    />
                    <h3 className="font-sf--bold mb-5 text-blue-dark text-sm">
                      Product Specifications
                    </h3>
                    <div className="spec flex justify-between w-2/3 items-center mb-2">
                      <p className="font-sf--bold text-sm text-blue-md">
                        Paper Thickness
                      </p>
                      <p className="font-sf text-xs text-blue-md">
                        300mg Stock
                      </p>
                    </div>

                    <div className="spec flex justify-between w-2/3 items-center mb-2">
                      <p className="font-sf--bold text-sm text-blue-md">
                        Lamination
                      </p>
                      <p className="font-sf text-xs text-blue-md">
                        Matte Lamination
                      </p>
                    </div>
                    <div className="spec flex justify-between w-2/3 items-center mb-2">
                      <p className="font-sf--bold text-sm text-blue-md">
                        Corners
                      </p>
                      <p className="font-sf text-xs text-blue-md">
                        Square Corner
                      </p>
                    </div>
                    <div className="spec flex justify-between w-2/3 items-center mb-2">
                      <p className="font-sf--bold text-sm text-blue-md">
                        Shipping
                      </p>
                      <p className="font-sf text-xs text-blue-md capitalize">
                        {currentProduct.shippingType}
                      </p>
                    </div>
                    <button className="c-button__specs block mr-auto font-sf text-xs mt-6 text-blue-sky py-1.5 px-3">
                      Change Specifications
                    </button>
                  </div>

                  <div className="mt-6">
                    <p className="font-sf text-xs text-red-light">
                      Grapic Design Fee
                    </p>
                    <h3 className="font-sf text-blue-dark text-xl mb-3">
                      ₦5,000
                    </h3>
                    <p className="font-15 text-blue-dark font-sf--reg mb-2">
                      Please include all contact details and information you
                      want in your design here. Add all remarks, preferred
                      colours, references and additional instructions here.
                    </p>
                    <p className="text-xs max-w-xs text-blue-md font-sf--reg mb-3">
                      Please be detailed, for business cards please input the
                      company name, your name, your position, contact details
                      company addres.
                    </p>
                    <textarea
                      className="input-border-brown font-15 w-full pt-2 indent outline font-sf--reg placeholder text-blue-dark mb-5"
                      name="requestNote"
                      placeholder="Enter request"
                      id=""
                      cols="30"
                      rows="6"
                      required
                    ></textarea>

                    <label
                      htmlFor="upload"
                      className="font-15 text-blue-dark font-sf--reg mb-3 inline-block"
                    >
                      Upload design (e.g. logo) asset if any
                    </label>

                    <div className="upload-body">
                      {file === null ? (
                        <div
                          {...getRootProps()}
                          className={`mx-auto upload-input py-10 md:px-6 px-2 ${
                            !isDisabled ? 'disabled' : ''
                          } ${isDragActive ? 'drag-over' : ''}`}
                        >
                          <div className="mx-auto mb-3 w-full img-con">
                            <img
                              src="data:image/svg+xml,%3Csvg width='41' height='40' viewBox='0 0 41 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)' fill='%23506683'%3E%3Cpath d='M15.576 16.527a2.748 2.748 0 100-5.497 2.748 2.748 0 000 5.497z'/%3E%3Cpath d='M38.134 23.893a8.462 8.462 0 00-4.733-2.252V7.671c0-1.488-.61-2.824-1.565-3.816a5.333 5.333 0 00-3.817-1.565H5.882c-1.489 0-2.825.61-3.817 1.565A5.333 5.333 0 00.5 7.672V30.458c0 1.489.61 2.824 1.565 3.817a5.333 5.333 0 003.817 1.565h21.412c1.412 1.145 3.168 1.87 5.114 1.87a8.074 8.074 0 005.726-2.367 8.074 8.074 0 002.366-5.725 8.074 8.074 0 00-2.366-5.725zM2.523 7.672c0-.916.382-1.756.992-2.329a3.35 3.35 0 012.367-.992h22.137a3.35 3.35 0 012.367.992c.61.611.992 1.45.992 2.367v11.908l-5.649-5.649a1.025 1.025 0 00-1.45 0l-8.512 8.55-5.763-5.801a1.025 1.025 0 00-1.45 0l-6.031 6.106V7.672zm3.32 26.221v-.076a3.349 3.349 0 01-2.366-.993 3.483 3.483 0 01-.954-2.366v-4.733l6.756-6.794 5.763 5.764c.382.381 1.03.381 1.45 0l8.512-8.55 5.572 5.61-.343.115c-.153.038-.306.076-.496.153-.153.038-.306.114-.458.152-.115.039-.191.077-.306.153-.152.076-.267.115-.381.191l-.573.344c-.114.076-.19.114-.305.19-.077.039-.115.077-.191.115a4.604 4.604 0 00-.916.801 8.074 8.074 0 00-2.366 5.726c0 .572.076 1.107.19 1.679.038.153.077.267.115.42.114.381.229.763.381 1.145v.038c.153.305.306.649.497.916H5.844zm30.802 0a5.965 5.965 0 01-4.275 1.756 6.02 6.02 0 01-4.16-1.68c-.153-.152-.305-.343-.458-.496-.115-.114-.23-.267-.344-.381-.152-.191-.267-.42-.381-.65-.077-.152-.153-.267-.23-.42a3.224 3.224 0 01-.19-.648c-.038-.153-.115-.343-.153-.496a6.32 6.32 0 01-.114-1.222c0-1.679.687-3.168 1.755-4.274 1.07-1.107 2.596-1.756 4.275-1.756 1.68 0 3.168.687 4.275 1.756a5.966 5.966 0 011.756 4.274c0 1.642-.687 3.13-1.756 4.237z'/%3E%3Cpath d='M33.095 25.534a1.333 1.333 0 00-.343-.229c-.115-.038-.23-.076-.344-.076h-.076c-.115 0-.23.038-.344.076a.902.902 0 00-.343.23L29.278 27.9c-.381.381-.381 1.03 0 1.45.382.382 1.031.382 1.45 0l.611-.61v4.198c0 .572.459 1.03 1.031 1.03.573 0 1.03-.458 1.03-1.03V28.74l.611.61c.382.382 1.03.382 1.45 0 .382-.381.382-1.03 0-1.45l-2.366-2.367z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='40' height='40' fill='%23fff' transform='translate(.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"
                              alt="upload"
                              className="mx-auto w-full"
                            />
                          </div>
                          <p className="font-sf text-blue-dark text-center mb-2">
                            Drag and drop to upload <br /> or
                            <span className="text-red-light cursor-pointer">
                              {' '}
                              click here
                            </span>{' '}
                            to select a file from your system
                          </p>

                          <input {...getInputProps()} />
                        </div>
                      ) : (
                        <div className="upload-progress py-10 md:px-6 px-3">
                          <p className="font-sf text-blue-dark mb-3 font-15">
                            {uploadProgress === 0 ? 'Upload' : 'Uploading'} File
                          </p>
                          {file.map((item) => (
                            <div className="flex items-center  mb-2">
                              <p className="font-sf text-blue-md font-13 mr-4">
                                {item?.name}
                              </p>
                              {!isUploading && (
                                <button
                                  className="w-3"
                                  onClick={() => deleteFIle(item.name)}
                                >
                                  <img
                                    src="data:image/svg+xml,%3Csvg viewBox='0 0 20 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 5a1 1 0 011-1h18a1 1 0 110 2H1a1 1 0 01-1-1z' fill='%23384A62'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 2a1 1 0 00-1 1v1h6V3a1 1 0 00-1-1H8zm7 2V3a3 3 0 00-3-3H8a3 3 0 00-3 3v1H3a1 1 0 00-1 1v14a3 3 0 003 3h10a3 3 0 003-3V5a1 1 0 00-1-1h-2zM4 6v13a1 1 0 001 1h10a1 1 0 001-1V6H4z' fill='%23384A62'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8 9a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zM12 9a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z' fill='%23384A62'/%3E%3C/svg%3E"
                                    alt=""
                                    className="w-full"
                                  />
                                </button>
                              )}
                            </div>
                          ))}

                          {isUploading && (
                            <div className="c-progress">
                              <div>
                                <div className="c-progress__background"></div>
                                <div
                                  style={{ width: `${uploadProgress}%` }}
                                  className="c-progress__status"
                                ></div>
                              </div>
                              <p className="c-progress__precentage font-sf text-blue-dark font-12 text-right">
                                {uploadProgress}%
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-right mt-4">
                      <input
                        type="checkbox"
                        name="logoOption"
                        id="logoOption"
                        className="mr-2"
                        checked={!isDisabled}
                        onChange={onCheckbox}
                      />
                      <label
                        htmlFor="logoOption"
                        className="font-sf text-blue-dark"
                      >
                        I don't have a logo
                      </label>

                      <button
                        type="submit"
                        disabled={buttonDisabled}
                        className="text-white block font-sf text-sm ml-auto px-6 py-3 mt-5 rounded-sm bg-red-light"
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </form>

                <div className="request-preview hidden md:block max-w-sm w-full mt-6">
                  <h3 className="font-sf text-blue-dark mb-5">
                    {currentProduct?.name}
                  </h3>
                  <img
                    src={toS3Url(currentProduct.product?.thumbnail_path)}
                    alt="product image"
                    className="w-full h-72 object-cover mb-4"
                  />
                  <h3 className="font-sf--bold mb-5 text-blue-dark text-sm">
                    Product Specifications
                  </h3>
                  {currentProduct.specs?.map((spec, i) => (
                    <div
                      key={i}
                      className="spec flex justify-between w-2/3 items-center mb-2"
                    >
                      <p className="font-sf--bold text-sm text-blue-md">
                        {spec.name}
                      </p>
                      {spec.options.map((option, i) => (
                        <>
                          {option.selected && (
                            <p className="font-sf text-xs text-blue-md">
                              {option.name}
                            </p>
                          )}
                        </>
                      ))}
                    </div>
                  ))}
                  <button className="c-button__specs block mr-auto font-sf text-xs mt-6 text-blue-sky py-1.5 px-3">
                    <Link to={`/product/${slug}`}>Change Specifications</Link>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Services />
      </Layout>
    </>
  )
}

export default RequestDesign
