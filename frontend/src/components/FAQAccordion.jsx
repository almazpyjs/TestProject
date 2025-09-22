import { useState } from 'react';

const faqs = [
  {
    question: 'Нужен ли опыт программирования для старта?',
    answer: 'Нет, курс начинается с самых основ. Вы получите все необходимые материалы и поддержку менторов.'
  },
  {
    question: 'Как реализована практика?',
    answer: 'Каждый модуль завершается проектом. Вы будете работать с реальными кейсами и сдавать их на проверку наставникам.'
  },
  {
    question: 'Предусмотрены ли сертификаты?',
    answer: 'После прохождения курса и финального проекта вы получаете именной сертификат и карьерную консультацию.'
  }
];

function ChevronIcon({ expanded }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform ${expanded ? 'rotate-180 text-primary' : 'text-slate-400'}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Частые вопросы</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Ответы на популярные вопросы о программе и обучении.</p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="glass-panel rounded-3xl">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold"
                  onClick={() => setOpenIndex((prev) => (prev === index ? -1 : index))}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronIcon expanded={isOpen} />
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} px-6 pb-5 text-sm text-slate-600 dark:text-slate-300`}>
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQAccordion;
