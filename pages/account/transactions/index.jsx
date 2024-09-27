import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import MyTransactions from '@/components/account/transactions/my-transaction'
import Payout from '@/components/account/transactions/payout'
import DesignSales from '@/components/account/transactions/design-and-sales'
import PaymentInformation from '@/components/account/transactions/payment-information'
import { useUser } from '@/hooks/useUser'

export default function Account() {
  const [tab, setTab] = useState('my-transactions')
  const { user } = useUser()

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTab('payment-information')
  //   }, 5000)
  // }, [])

  return (
    <>
      <Layout>
        <div className="mt-44 md:mt-20">
          <main className="c-cart content-container mx-auto">
            <h1 className="my-10 font-dm text-blue-dark md:text-3xl text-2xl mb-2">
              Transactions
            </h1>
            <section className="pt-5 pb-5 md:flex justify-between">
              {/* tab */}
              <div className="tab flex-col lg:flex-row">
                <div
                  className={`tab__child ${
                    tab === 'my-transactions' ? 'tab__active' : ''
                  }`}
                  onClick={() => setTab('my-transactions')}
                >
                  <span
                    className={`font-sf ${
                      tab === 'my-transactions'
                        ? ' text-blue-dark'
                        : 'text-gray-md'
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    My Transactions
                  </span>
                </div>

                <div
                  className={`tab__child ${
                    tab === 'payout' ? 'tab__active' : ''
                  }`}
                  onClick={() => setTab('payout')}
                >
                  <span
                    className={`font-sf ${
                      tab === 'payout' ? ' text-blue-dark' : 'text-gray-md'
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    Payout
                  </span>
                </div>

                <div
                  className={`tab__child ${
                    tab === 'design-and-sales' ? 'tab__active' : ''
                  }`}
                  onClick={() => setTab('design-and-sales')}
                >
                  <span
                    className={`font-sf ${
                      tab === 'design-and-sales'
                        ? ' text-blue-dark'
                        : 'text-gray-md'
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    Designs And Sales
                  </span>
                </div>

                <div
                  className={`tab__child ${
                    tab === 'payment-information' ? 'tab__active' : ''
                  }`}
                  onClick={() => setTab('payment-information')}
                >
                  <span
                    className={`font-sf ${
                      tab === 'payment-information'
                        ? ' text-blue-dark'
                        : 'text-gray-md'
                    } text-sm mb-3 max-w-tiny cursor`}
                  >
                    Payment Information
                  </span>
                </div>
              </div>
              {/* tab */}
            </section>

            {tab === 'my-transactions' && <MyTransactions user={user.user} />}
            {tab === 'payout' && <Payout user={user.user} />}
            {tab === 'design-and-sales' && <DesignSales user={user.user} />}
            {tab === 'payment-information' && (
              <PaymentInformation user={user.user} />
            )}
            {/*  */}
          </main>
        </div>
        {/* <Services /> */}
      </Layout>
    </>
  )
}
