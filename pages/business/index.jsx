import Search from '@/components/global/search'
import Services from '@/components/global/services'
import Layout from '@/components/layout/layout'
import Link from '@/components/link'
import BrandsServices from '@/components/global/brands'
import { useRef, useState } from 'react'
import { fetcher } from '@/utils/index'
import api from "@/services/api";
import Toastr from 'toastr'

const CorporatePricing = () => {
  const sectionRef = useRef(null)

  const [form, setForm] = useState({
    first_name:'',
    last_name: '',
    email: '',
    phone_number: '',
    company: '',
    address: '',
    employee_no: '',
    annual_print_spend: '',
  })

  const scrollTo = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(form)

    try {
      console.log('Business')
      await api.post(`/business_requests.json`, form)
      Toastr.success('Successfully updated')
    } catch (error) {
      const { response } = error
      if (response) {
        Toastr.error(response.data.message)
      }
    }
  }

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-pricing content-container mx-auto">
            <header className="bread-crumb font-sf text-xs hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /{' '}
              </Link>{' '}
              <span className="text-blue-dark font-sf">Corporate Pricing</span>
            </header>

            <Search placeholder="Search for any product" />

            <section className="c-pricing__hero relative overflow-hidden bg-cream-pastel pb-16 pt-14 px-4 md:px-10 mt-8">
              <div className="max-w-2sm  z-10 relative text-blue-dark">
                <h1 className="font-dm md:text-3xl text-2xl mb-8">
                  Corporate Pricing
                </h1>
                <h4 className="font-sf--bold text-blue-dark text-lg mb-3">
                  Manage all your Corporate Print in one place.
                </h4>
                <p className="font-15 font-sf--reg">
                  Smarter, better, faster and trackable, way for your company to
                  order print stationery and making product.
                </p>
                <button
                  onClick={scrollTo}
                  className="bg-white mt-5 font-15 text-blue-dark font-sf--bold rounded-sm px-6 py-3"
                >
                  Get Started
                </button>
              </div>
              <div className="hero-image absolute max-w-3sm right-0 bottom-0">
                <img
                  src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611586201/printivo/paper-bag-mockup-scene_1_kc2br4.png"
                  alt="printivo branded bag object-cover"
                />
              </div>
            </section>
            <section className="py-10 c-pricing__perks">
              <h1 className="font-dm text-blue-dark md:text-3xl text-2xl mb-16 mt-10 text-center">
                The perks of owning a corporate account
              </h1>
              <div>
                <div className="c-perk mx-auto md:mb-44 mb-20 md:flex justify-center">
                  <div className="c-perk__image md:mb-0 mb-10">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611589958/printivo/Rectangle_68_dzpgzu.png"
                      alt=""
                    />
                    <div className="c-perk__number hidden sm:block absolute text-3xl font-dm text-blue-md md:px-10 md:py-9 px-6 py-5 bg-cream-md">
                      01
                    </div>
                  </div>
                  <div className="mt-6 max-w-sm">
                    <h4 className="font-dm mb-4 text-blue-dark text-2xl">
                      Your own custom print portal with ready-to-edit templates
                    </h4>
                    <p className="font-sf--reg font-15 max-w-sm text-blue-md">
                      Get your own dedicated website,
                      <span className="font-sf--bold inline">
                        {' '}
                        yourbusinessname.printivo.com{' '}
                      </span>
                      👑 with your choice print products pre-loaded with
                      templates that has your logo and branding elements
                      matching your colours and standards.
                    </p>
                  </div>
                </div>

                <div className="c-perk mx-auto md:mb-44 mb-20 md:flex justify-center">
                  <div className="c-perk__image md:mb-0 mb-10">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611665927/printivo/Rectangle_70_d2c4zx.png"
                      alt=""
                    />
                    <div className="c-perk__number hidden sm:block absolute text-3xl font-dm text-blue-md md:px-10 md:py-9 px-6 py-5 bg-cream-md">
                      02
                    </div>
                  </div>
                  <div className="mt-6 max-w-sm">
                    <h4 className="font-dm mb-4 text-blue-dark text-2xl">
                      Ship to your teams anywhere in Nigeria
                    </h4>
                    <p className="font-sf--reg font-15 max-w-sm text-blue-md">
                      Create print products on your Printivo business site and
                      ship directly to your teams anywhere in Nigeria
                    </p>
                  </div>
                </div>

                <div className="c-perk mx-auto md:mb-44 mb-20 md:flex justify-center">
                  <div className="c-perk__image md:mb-0 mb-10">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611665929/printivo/Rectangle_72_hpaugg.png"
                      alt=""
                    />
                    <div className="c-perk__number hidden sm:block absolute text-3xl font-dm text-blue-md md:px-10 md:py-9 px-6 py-5 bg-cream-md">
                      03
                    </div>
                  </div>
                  <div className="mt-6 max-w-sm">
                    <h4 className="font-dm mb-4 text-blue-dark text-2xl">
                      Your own dedicated account executive
                    </h4>
                    <p className="font-sf--reg font-15 max-w-sm text-blue-md">
                      Get on time supports from dedicated account executive,
                      have your print orders printed and shipped to taste
                    </p>
                  </div>
                </div>

                <div className="c-perk mx-auto md:mb-44 mb-20 md:flex justify-center">
                  <div className="c-perk__image md:mb-0 mb-10">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611665928/printivo/Rectangle_74_lqrifk.png"
                      alt=""
                    />
                    <div className="c-perk__number hidden sm:block absolute text-3xl font-dm text-blue-md md:px-10 md:py-9 px-6 py-5 bg-cream-md">
                      04
                    </div>
                  </div>
                  <div className="mt-6 max-w-sm">
                    <h4 className="font-dm mb-4 text-blue-dark text-2xl">
                      Assign multiple users to your account
                    </h4>
                    <p className="font-sf--reg font-15 max-w-sm text-blue-md">
                      Assign people within your team can create and order print
                      products. Track all transactions and savings.
                    </p>
                  </div>
                </div>

                <div className="c-perk mx-auto mb-20 md:flex justify-center">
                  <div className="c-perk__image md:mb-0 mb-10">
                    <img
                      src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611665939/printivo/Rectangle_76_soocwk.png"
                      alt=""
                    />
                    <div className="c-perk__number hidden sm:block absolute text-3xl font-dm text-blue-md md:px-10 md:py-9 px-6 py-5 bg-cream-md">
                      05
                    </div>
                  </div>
                  <div className="mt-6 max-w-sm">
                    <h4 className="font-dm mb-4 text-blue-dark text-2xl">
                      Save more on your print budget
                    </h4>
                    <p className="font-sf--reg font-15 max-w-sm text-blue-md">
                      Get huge discounts on print orders created by your team
                      members and easily track how much you are s
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <BrandsServices />
            <section
              ref={sectionRef}
              className="c-pricing__application flex items-center justify-between pb-16"
            >
              <form
                className="c-pricing__form w-full md:mx-0 mx-auto md:mr-6 md:p-16 p-8"
                onSubmit={handleSubmit}
              >
                <h2 className="max-w-prose mb-10 text-blue-md font-sf font-22 ">
                  Fill in your details below and one of our friendly Account
                  Managers will be in touch.
                </h2>
                <div className="input-row mb-2 sm:flex w-full">
                  <div className="mr-7 w-full">
                    <label
                      htmlFor="firstName"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="c-form__input"
                      placeholder="Enter your name"
                      value={form.first_name}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          first_name: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="lastName"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Your Surname
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="c-form__input"
                      placeholder="Enter your surname"
                      value={form.last_name}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          last_name: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="input-row mb-2 sm:flex w-full">
                  <div className="mr-7 w-full">
                    <label
                      htmlFor="email"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="c-form__input"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          email: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="phone"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="c-form__input"
                      placeholder="Enter your phone number"
                      value={form.phone_number}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          phone_number: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="input-row mb-2 sm:flex w-full">
                  <div className="mr-7 w-full">
                    <label
                      htmlFor="companyName"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      className="c-form__input"
                      placeholder="Enter company name"
                      value={form.company}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          company: event.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="employees"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Number of Employees
                    </label>
                    <select
                      type="text"
                      id="employees"
                      name="employees"
                      className="c-form__select"
                      value={form.employee_no}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          employee_no: event.target.value,
                        }))
                      }
                      required
                    >
                      <option value="none">Select</option>
                      <option value="1-10">1-10</option>
                      <option value="11-20">11-20</option>
                      <option value="11-20">20-50</option>
                      <option value="11-20">50-100</option>
                    </select>
                  </div>
                </div>

                <div className="input-row mb-2 sm:flex w-full">
                  <div className="w-full mr-7">
                    <label
                      htmlFor="annualSpend"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Annual print spend (estimate)
                    </label>
                    <select
                      type="text"
                      id="annualSpend"
                      name="annualSpend"
                      className="c-form__select"
                      value={form.annual_print_spend}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          annual_print_spend: event.target.value,
                        }))
                      }
                      required
                    >
                      <option value="none">Select</option>
                      <option value="1-10">100,000</option>
                      <option value="11-20">200,000</option>
                      <option value="11-20">400,000</option>
                      <option value="11-20">600,000</option>
                      <option value="11-20">1,000,000</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="c-form__label text-blue-dark mb-2 inline-block"
                    >
                      Company Address
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      cols="30"
                      rows="4"
                      className="pt-2"
                      placeholder="Enter company address"
                      value={form.address}
                      onChange={(event) =>
                        setForm((state) => ({
                          ...state,
                          address: event.target.value,
                        }))
                      }
                      required
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 block ml-auto text-white bg-blue-dark font-sf py-3 px-6"
                >
                  Submit Application
                </button>
              </form>

              <div className="c-pricing__image max-w-sm hidden md:block">
                <img
                  src="https://res.cloudinary.com/dmwfd0zhh/image/upload/v1611672477/printivo/Rectangle_78_tjldik.png"
                  alt="pricing"
                />
              </div>
            </section>
          </main>
        </div>
        <Services />
      </Layout>
    </>
  )
}

export default CorporatePricing
