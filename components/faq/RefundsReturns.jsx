import { useCallback, useState } from 'react'

const RefundsReturnsFAQ = () => {
  const [questions, setQuestions] = useState([
    {
      question: 'What is your refund policy?',
      answer:
        'We offer a standard 7 day return policy for eligible print items in case you need to make a return and request a reprint. To return any items printed on Printivo.com, ensure the item is in line with the conditions in the Return Policy. All items have free insurance coverage against theft and damage during transit.',
      active: false,
    },
    {
      question: 'When do I receive my refund?',
      answer: `Refunds are made within 5 working days of resolution decisions. We either send you a coupon code with the value of your last order which means you can easily use it to place another order or we credit your bank account directly`,
      active: false,
    },
    {
      question: `Can I get a refund if I don't like my order?`,
      answer: `Refunds we believe are the last solution, our team is comminted to giving you a reprint of your order, however. If a resolution was not reached, Printivo will surely initiate the refund process`,
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

export default RefundsReturnsFAQ
