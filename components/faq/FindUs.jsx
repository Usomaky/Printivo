import { useCallback, useState } from 'react'

const FindUsFaq = () => {
  const [questions, setQuestions] = useState([
    {
      question: 'Where is your company located?',
      answer:
        'Printivo HQ, Moyosore House, 180/182 Ikorodu Road., Onipan B.Stop, Lagos',
      active: false,
    },
    {
      question: 'How can I reach Printivo?',
      answer: `You can reach us via the following channels:

        email: orders@printivo.com
        Call centre: +2348099561333, +2348099561000
        Social media: Instagram: @printivong, Twitter: @printivo, Facebook:facebook.com/printivo`,
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

export default FindUsFaq
