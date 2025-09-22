import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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

function FAQAccordion() {
  return (
    <section id="faq" className="bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Частые вопросы</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Ответы на популярные вопросы о программе и обучении.</p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <Disclosure key={faq.question}>
              {({ open }) => (
                <div className="glass-panel rounded-3xl">
                  <Disclosure.Button className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold">
                    {faq.question}
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${open ? 'rotate-180 text-primary' : 'text-slate-400'}`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQAccordion;
