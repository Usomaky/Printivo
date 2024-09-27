import { useCallback, useState } from 'react'

const ShippingDeliveryFaq = () => {
  const [questions, setQuestions] = useState([
    {
      question: 'What locations do you delivery to?',
      answer: 'Printivo ships nationwide across every state in Nigeria',
      active: false,
    },
    {
      question: 'Can I order express delivery?',
      answer: `Currently, we do not offer express delivery.`,
      active: false,
    },
    {
      question: 'What is the shipping price to my location?',
      answer:
        'Shipping rates vary by locations, please see list below for prices',
      active: false,
    },
    {
      question: 'Do you deliver outside Nigeria and what is the fee',
      answer: 'We currently do not ship beyond Nigeria',
      active: false,
    },
    {
      question: 'Does the 5 working days includes designing and printing?',
      answer:
        'For orders that require design by our team, delivery days starts counting from when the customer approve the design',
      active: false,
    },
    {
      question: 'Do you deliver on weekends',
      answer:
        'Depending on the location, our delivery team deliver on Saturdays. We do not makde deliveries on Sundays',
      active: false,
    },
    {
      question: 'How do I track my order',
      answer:
        'You can easily track your order status by entering your order number here.  visit https://printivo.com/track to track your order',
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

export default ShippingDeliveryFaq
