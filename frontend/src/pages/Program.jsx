import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CurriculumOverview from '../components/CurriculumOverview';
import FeatureHighlights from '../components/FeatureHighlights';
import FAQAccordion from '../components/FAQAccordion';

const learningTracks = [
  {
    title: 'Junior Start',
    description: 'Погружение в синтаксис Python и базовые алгоритмы с практикой на задачах и мини-проектах.',
    items: ['PEP 8 и лучший стиль кода', 'Алгоритмическое мышление', 'CLI-инструменты и скрипты']
  },
  {
    title: 'Middle Boost',
    description: 'Работа с системными библиотеками, профилирование, оптимизация и интеграция сторонних сервисов.',
    items: ['os, sys, pathlib', 'collections, itertools', 'Асинхронность и тестирование']
  },
  {
    title: 'Career Launch',
    description: 'Командные проекты, ревью кода и сопровождение на пути к трудоустройству.',
    items: ['Проект с Flask + React', 'CI/CD пайплайны', 'Подготовка к собеседованиям']
  }
];

function Program() {
  return (
    <div className="bg-slate-50 pb-24 dark:bg-slate-950">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="rounded-full bg-white/10 px-4 py-1 text-sm uppercase tracking-wide text-slate-200">
              Программа обучения
            </span>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
              Пошаговый путь от первых строк кода до уровня Middle-разработчика
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Курс построен вокруг реальных проектов, встроенных библиотек и практических кейсов. Каждая глава завершается
              контролем знаний и менторской обратной связью.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-primary/80"
              >
                Начать обучение
              </Link>
              <Link
                to="/subscriptions"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Посмотреть тарифы
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="glass-panel rounded-3xl bg-white/5 p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white">Что входит в программу</h2>
            <ul className="mt-5 space-y-4 text-sm text-slate-200">
              <li>✔ 120+ уроков с практическими задачами и код-ревью</li>
              <li>✔ Подробные модули по os, sys, datetime, collections, itertools</li>
              <li>✔ Проекты: автоматизация, backend на Flask и интеграция с React</li>
              <li>✔ Наставники, вебинары и карьерное сопровождение до оффера</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="-mt-16 px-4 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Индивидуальные траектории обучения</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Мы предлагаем гибкие треки, которые подстраиваются под ваш опыт: от первых шагов до профессиональной специализации.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {learningTracks.map((track) => (
              <div key={track.title} className="glass-panel card-hover h-full rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{track.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{track.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {track.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CurriculumOverview />
      <FeatureHighlights />

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <div className="glass-panel rounded-3xl p-10">
            <h2 className="text-3xl font-bold">Практика и поддержка на каждом этапе</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Каждая глава завершается проверкой знаний, индивидуальной обратной связью и рекомендациями по портфолио. После
              завершения программы вы получите сертификат и помощь карьерного центра.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-6">
                <h3 className="text-lg font-semibold">Чек-листы и материалы</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  <li>✔ PDF-конспекты и шпаргалки по каждому блоку</li>
                  <li>✔ Готовые шаблоны проектов и best practices</li>
                  <li>✔ Записи вебинаров и дополнительные воркшопы</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-slate-100 p-6 dark:bg-slate-800">
                <h3 className="text-lg font-semibold">Наставники и комьюнити</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Вы будете в закрытом чате с наставниками и студентами. Регулярные код-ревью и карьерные консультации помогут
                  быстрее выйти на уровень Middle.
                </p>
                <Link
                  to="/reviews"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  Посмотреть истории студентов
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion />
    </div>
  );
}

export default Program;
