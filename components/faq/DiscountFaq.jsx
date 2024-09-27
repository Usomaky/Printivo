import { useCallback, useState } from 'react'

const DiscountFaq = () => {
  const [questions, setQuestions] = useState([
    {
      question: 'How do I redeem my coupon ',
      answer:
        'Printivo coupon codes can easily be redeemed at the checkout point when you are placing your order. Printivo coupons can only be used for orders placed via the Printivo website',
      active: false,
    },
    {
      question: 'Where and when can I get discount coupons',
      answer: `Coupon codes are released when we have promos and special events. To ensure you receive our coupon codes, please sign up for our mailing list and also follow us on social media`,
      active: false,
    },
  ])

  const setActive = (id) => {
    const newQuestions = questions.map((question, qid) => {
      return qid === id
        ? {
            ...question,
            active: !question.active,
          }
        : {
            ...question,
            active: false,
          }
    })

    setQuestions(newQuestions)
  }
  return (
    <>
      {questions.map(({ question, answer, active }, i) => (
        <div
          key={i}
          className={`${
            active ? 'active' : ''
          } c-accordion c-accordion--faq w-full mb-4`}
        >
          <div
            className="accordion-title flex justify-between items-center font-sf text-blue-dark font-15 p-4 sm:pr-16 bg-cream-md"
            onClick={() => setActive(i)}
          >
            <div className="max-w-2xs mr-3">{question}</div>
            <div className="flex-shrink-0">
              {active ? 'Hide' : 'Show'} Answer
            </div>
          </div>
          <div className="accordion-items">
            <div className="py-7 font-sf--reg text-blue-md font-15 max-w-2lg px-4">
              {answer}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default DiscountFaq
