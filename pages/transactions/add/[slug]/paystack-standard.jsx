import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { handleTransaction } from '@/services/paystack-payment'
import Head from 'next/head'
import api from '@/services/api'
import Toastr from 'toastr'
import Layout from '@/components/layout/layout'

export default function PaystackStandard({}) {
  const { query } = useRouter()
  let slug = query.slug
  let values = {
    is_pickup: false,
    use_new_address: true,
    payment_option: '',
    checkout_step: 'payment',
    bank: '',
    coupon_id: '',
    referral_code: '',
    reseller_id: '',
    member_id: '',
    address_id: '',
  }

  useEffect(() => {
    if (slug) {
      getOrderDetails()
    }
  }, [query.slug])

  const getOrderDetails = () => {
    api
      .get(`/orders/${slug}.json?include=customer`)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res
          handlePayment(data)
        }
      })
      .catch((err) => {
        Toastr.error(err.message)
        console.log(err)
      })
  }

  const handlePayment = (data) => {
    values.payment_option = 'paystack'
    const callback = (response) => {
    }
    handleTransaction(data, values, callback)
  }

  return (
    <Layout>
      <main className="w-screen h-screen bg-gray-50 p-3"></main>
    </Layout>
  )
}
