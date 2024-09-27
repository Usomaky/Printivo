import { useCallback, useState } from 'react'

const CustomerSatisfaction = () => {
  const [questions, setQuestions] = useState([
    {
      question:
        'What happens if I am dissatisfied with my order after delivery.',
      answer:
        'At Printivo, we ensure you get value for what you paid for, If for any reason you do not like your order, be rest assured that you will get a reprint shipped to you right away. ',
      active: false,
    },
    {
      question: 'What happens if a resolution was not reached?',
      answer: `Our customer's happiness is very important to us, we will surely refund exactly the amount you paid to you.`,
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

export default CustomerSatisfaction
