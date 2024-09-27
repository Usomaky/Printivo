import { useCallback, useState } from 'react'

const FaqAccordion = () => {
  const [questions, setQuestions] = useState([
    {
      question: 'When will i receive my order?',
      answer:
        'Printivo products are shipped to customers within 3 to 5 working days for most products and 5 - 7 working days for others. Please see the product pages for delivery days that are peculiar to your product interest.',
      active: false,
    },
    {
      question: 'What is the minimum quantity of prints I can order?',
      answer:
        'The minimum quantities varies from products to products, please see the product pages for minimum quantity that are relevant to your product of interest.',
      active: false,
    },
    {
      question: 'How do I place an order on your website',
      answer: `You can place an order on Printivo.com by simply selecting any product of your choice, customizing them (if required), or adding straight to cart and checking out by making your payment. Alternatively, you can send an email containing the details about your order to orders@printivo.com or call our customer happness team on +2348099561000`,
      active: false,
    },
    {
      question: 'How can I see a physical sample',
      answer:
        'If you would love to send your own sample especially if you are printing a unique/special project, please get in touch with our sales team.',
      active: false,
    },
    {
      question:
        'If I request that you design for me, do I get my sample before delivery',
      answer:
        'A soft copy PDF file of the design is usually sent to your for approval. You then get to give feedback for final design to be made.',
      active: false,
    },

    {
      question: 'What is the difference between a magic and a simple mug',
      answer:
        'Simple mugs are plain white mugs that can be useful for all colourful printing, Magic mugs are thermo sentive mugs which are black in colour but turns white to diplay the prints on them when you pour hot liquid into them. Please see this video to learn more (Insert link)',
      active: false,
    },
    {
      question: 'What type of paper lamination do you guys offer',
      answer:
        'We offer matte and gloss lamination for all our paper and card products',
      active: false,
    },
    {
      question: 'What is the difference between matte and gloss lamination',
      answer:
        'Glossy definitely offers a shiny colorful finish, but it also generates a glare, making it difficult to observe from certain angles. With matte finish prints the glare gets reduced to a significant level and had a calm luxurious feel to the printed card/paper',
      active: false,
    },
    {
      question: 'What paper thickness do you offer',
      answer:
        'We offer various paper tickets for our products, please see the product of interest for available paper thickness options relevant to that product',
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

export default FaqAccordion
