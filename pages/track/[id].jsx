import Search from '@/components/global/search'
import Layout from '@/components/layout/layout'
import Link from '@/components/link'
import { fetcher, getDate } from '@/utils/index'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import 'twin.macro'

const OrderStatus = () => {
  const { query } = useRouter()

  const { data: orderTrackingInfo, error } = useSWR(
    `/orders/track/${query?.id}.json`,
    fetcher,
  )

  const getNoteTitle = (notes) => {
    return notes && notes.split('to ').splice(1, 2).join('to ')
  }

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20 mb-20">
          <main className="c-cart content-container mx-auto">
            <header className="bread-crumb font-sf font-12 hidden md:block">
              <Link to="/" className="text-gray-md">
                Home /
              </Link>
              <span className="text-blue-dark font-sf">Track Orders</span>
            </header>

            <Search placeholder="Search for any product" />

            <h2 className="font-dm text-blue-md font-22 mb-5 mt-10">
              Tracking Details
            </h2>

            {error && (
              <div className="mx-auto w-full">
                <h1 className="font-dm text-blue-dark mt-16 px-5 md:text-3xl text-center text-2xl mb-6">
                  No tracking information available, please check back later.
                </h1>
                <div className="text-center">
                  <Link to="/track">
                    <button className="bg-red-light font-sf text-white px-6 py-3 mx-auto rounded-sm">
                      Track another order
                    </button>
                  </Link>
                </div>
              </div>
            )}

            <div className="c-orderstatus md:flex mt-3">
              <div className="order-timeline w-full">
                {orderTrackingInfo?.logs.map((log, i) => (
                  <div
                    className={`c-timeline ${
                      getNoteTitle(log.notes).toLowerCase() === 'completed' &&
                      'c-timeline--complete'
                    } flex justify-between`}
                  >
                    <div>
                      <h2 className="font-sf--bold progress-header text-blue-md">
                        {getNoteTitle(log.notes)}
                      </h2>
                      <h4 className="font-sf font-12 progress-desc mt-2 text-blue-md">
                        {log.notes} <br />
                        {orderTrackingInfo?.status === 'ready-for-pickup' &&
                          'at 180, Moyosore House, 182 Ikorodu Rd, Onipanu, Lagos'}
                      </h4>
                    </div>
                    <div className="font-sf--reg progress-date text-blue-md">
                      <p>{getDate(log.created).date}</p>
                      <p>{getDate(log.created).time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-xs"></div>
          </main>
        </div>
      </Layout>
    </>
  )
}

export default OrderStatus
