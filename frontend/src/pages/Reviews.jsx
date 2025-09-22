import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/TestimonialCarousel';

const stats = [
  { label: 'Среднее время до трудоустройства', value: '4.5 месяца' },
  { label: 'Выпускников на позициях Middle', value: '780+' },
  { label: 'Партнерских компаний', value: '60+' }
];

const stories = [
  {
    title: 'От аналитика к Python-разработчику',
    description:
      'Александр пришел из аналитики. После прохождения модулей по collections и itertools он собрал портфолио из 3 проектов и получил оффер в финтех-компанию.',
    result: 'Оффер Python developer в финтехе'
  },
  {
    title: 'Карьерный рост в продуктовой компании',
    description:
      'Екатерина работала junior-разработчиком. Она углубила знания во встроенных библиотеках и автоматизации с os/sys и получила повышение до Middle уровня.',
    result: 'Повышение до Middle в течение 3 месяцев'
  },
  {
    title: 'Переквалификация из QA',
    description:
      'Игорь делал автоматизацию тестов. Курс помог написать собственный backend на Flask, интегрировать React и перейти в команду разработки.',
    result: 'Перевод в Python-команду'
  }
];

function Reviews() {
  return (
    <div className="bg-slate-50 pb-24 dark:bg-slate-950">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="rounded-full bg-white/10 px-4 py-1 text-sm uppercase tracking-wide text-slate-200">
              Отзывы студентов
            </span>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Истории успеха выпускников Python Mastery</h1>
            <p className="mt-6 text-lg text-slate-300">
              Наши студенты переходят с нуля и junior-уровня на уверенные позиции Middle-разработчиков. Читайте реальные истории,
              вдохновляйтесь и станьте следующим.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/program"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-primary/80"
              >
                Посмотреть программу
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Присоединиться к курсу
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="glass-panel rounded-3xl bg-white/5 p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white">Цифры, которыми мы гордимся</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-white/10 p-5">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-slate-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <TestimonialCarousel />

      <section className="-mt-16 px-4 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Истории студентов</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Курс сопровождает вас от первых заданий до готового портфолио. Менторы помогают адаптировать знания под реальные проекты и собеседования.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {stories.map((story) => (
              <div key={story.title} className="glass-panel card-hover h-full rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{story.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{story.description}</p>
                <p className="mt-4 text-sm font-semibold text-primary">{story.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <div className="glass-panel rounded-3xl p-10">
            <h2 className="text-3xl font-bold">Присоединяйтесь к профессиональному сообществу</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-6">
                <h3 className="text-lg font-semibold">Поддержка менторов</h3>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                  Наставники отвечают на вопросы, проводят код-ревью и помогают подготовиться к техническим интервью.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-100 p-6 dark:bg-slate-800">
                <h3 className="text-lg font-semibold">Карьерные консультации</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Карьерный центр помогает обновить резюме, подготовить профиль на GitHub и LinkedIn и подобрать релевантные вакансии.
                </p>
                <Link
                  to="/subscriptions"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  Узнать о тарифах
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reviews;
