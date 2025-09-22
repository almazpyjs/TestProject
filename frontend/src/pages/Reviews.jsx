import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TestimonialCarousel from '../components/TestimonialCarousel';

const metrics = [
  { value: '4.9/5', label: 'Средняя оценка курса' },
  { value: '2 300+', label: 'Выпускников за последние 2 года' },
  { value: '87%', label: 'Получили оффер после обучения' }
];

const companies = ['Yandex', 'VK', 'Tinkoff', 'Sber', 'Avito', 'Ozon'];

function Reviews() {
  return (
    <div className="space-y-20 pb-20">
      <section className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold sm:text-5xl">Отзывы студентов и выпускников</h1>
              <p className="text-lg text-slate-600">
                Мы собрали реальные истории студентов, которые прошли программу Python Mastery и успешно перешли на уровень
                Middle. Присоединяйтесь к сообществу и достигайте карьерных целей быстрее.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
                >
                  Присоединиться к курсу
                </Link>
                <Link
                  to="/subscriptions"
                  className="inline-flex items-center justify-center rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
                >
                  Узнать о тарифах
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="grid gap-6 rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Что говорят студенты</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Каждый отзыв проходит модерацию: мы показываем только проверенные истории о прохождении курса.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-slate-100 px-4 py-5 text-center dark:bg-slate-800/60">
                    <p className="text-2xl font-bold text-primary">{metric.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="glass-panel rounded-3xl p-8">
          <h2 className="text-2xl font-bold">Где работают наши выпускники</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Студенты продолжают карьеру в технологических компаниях и продуктовых командах по всему миру.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-6">
            {companies.map((company) => (
              <div
                key={company}
                className="flex h-16 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-300"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 lg:px-0">
          <div className="glass-panel rounded-3xl p-8">
            <h2 className="text-2xl font-bold">Поделитесь своей историей</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Уже проходили курс? Напишите нам, и мы разместим ваш отзыв на платформе. Лучшие истории попадают в рассылку и на
              главную страницу.
            </p>
            <Link
              to="mailto:alumni@pythonmastery.com"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
            >
              Отправить отзыв
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reviews;
