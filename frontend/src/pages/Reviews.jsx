import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/TestimonialCarousel';

const stats = [
  { label: 'Выпускников трудоустроено', value: '87%' },
  { label: 'Средний срок обучения', value: '5 месяцев' },
  { label: 'Практических проектов', value: '12' }
];

const highlights = [
  {
    title: 'Комьюнити, которое поддерживает',
    description: 'Регулярные сессии вопросов и ответов, мероприятия с выпускниками и совместные хакатоны.'
  },
  {
    title: 'Осязаемый прогресс',
    description: 'Через два месяца у студентов уже есть pet-проекты и готовое портфолио на GitHub.'
  }
];

function ReviewsPage() {
  return (
    <div className="bg-slate-100 pb-20 dark:bg-slate-900">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Истории студентов</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Отзывы и результаты наших выпускников</h1>
            <p className="mt-4 text-base text-slate-200">
              Мы сопровождаем студентов от первых строк кода до оффера. Делимся честными историями и измеримыми результатами.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              <Link
                to="/register"
                className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80 sm:w-auto"
              >
                Присоединиться к потоку
              </Link>
              <Link
                to="/program"
                className="w-full rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-primary hover:text-primary sm:w-auto"
              >
                Изучить программу
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-3xl bg-white/10 p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-slate-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 lg:px-0">
        <div className="glass-panel rounded-3xl p-8">
          <h2 className="text-3xl font-bold">Как проходит путь от новичка до оффера</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {highlights.map((highlight) => (
              <motion.div
                key={highlight.title}
                className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold">{highlight.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-600 dark:text-slate-300">
            Каждый выпускник получает персональную обратную связь по проекту и рекомендации по развитию. Мы остаёмся на связи и после
            завершения обучения, помогая двигаться дальше.
          </p>
        </div>
      </section>

      <TestimonialCarousel />
    </div>
  );
}

export default ReviewsPage;
