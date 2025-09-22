import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FAQAccordion from '../components/FAQAccordion';
import SubscriptionPlans from '../components/SubscriptionPlans';

const perks = [
  {
    title: 'Наставники и код-ревью',
    description: 'Каждый модуль сопровождается проверкой заданий и обратной связью от опытных разработчиков.'
  },
  {
    title: 'Гибкий график',
    description: 'Учитесь в удобное время, проходите модули в собственном темпе и получайте поддержку комьюнити 24/7.'
  },
  {
    title: 'Карьерная поддержка',
    description: 'Помощь в подготовке резюме, сбор портфолио и подготовка к техническим собеседованиям.'
  }
];

function SubscriptionsPage() {
  return (
    <div className="bg-slate-100 pb-20 dark:bg-slate-900">
      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Подписки</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Доступ к знаниям и сообществу</h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              Выбирайте формат, подходящий для вашего темпа. Все тарифы включают практические проекты и живые сессии с экспертами.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/register"
                className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80 sm:w-auto"
              >
                Присоединиться к курсу
              </Link>
              <Link
                to="/program"
                className="w-full rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200 sm:w-auto"
              >
                Посмотреть программу
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="glass-panel rounded-3xl p-6">
              <h2 className="text-lg font-semibold">В тариф входит</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li>✔ 120+ уроков и практик по Python и смежным технологиям.</li>
                <li>✔ Доступ к библиотеке записей лайв-сессий и вебинаров.</li>
                <li>✔ Закрытый чат студентов и карьерные консультации.</li>
                <li>✔ Сертификат об окончании и сопровождение при трудоустройстве.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SubscriptionPlans />

      <section className="mx-auto mt-16 max-w-6xl px-4 lg:px-8">
        <h2 className="text-3xl font-bold">Почему выпускники выбирают нас</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {perks.map((perk) => (
            <motion.div
              key={perk.title}
              className="glass-panel card-hover h-full rounded-3xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">{perk.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{perk.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <FAQAccordion />
    </div>
  );
}

export default SubscriptionsPage;
