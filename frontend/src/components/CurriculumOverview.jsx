import { motion } from 'framer-motion';

const curriculum = [
  {
    title: 'Глава 1. Основы Python',
    description: 'Синтаксис, работа с переменными, условиями и циклами',
    sections: ['Переменные и типы данных', 'Условные операторы', 'Циклы и коллекции']
  },
  {
    title: 'Глава 2. Встроенные библиотеки',
    description: 'Практика с os, sys, datetime, collections и itertools',
    sections: ['Работа с os и sys', 'Обработка дат и времени', 'Шаблоны итераций']
  },
  {
    title: 'Глава 3. Практика и проекты',
    description: 'Реализация веб-приложения, автоматизация и data pipelines',
    sections: ['Flask + React', 'SQLAlchemy и PostgreSQL', 'CI/CD и деплой']
  }
];

function CurriculumOverview() {
  return (
    <section id="curriculum" className="bg-slate-50 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Программа курса</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Структурированный путь от основ до уверенного владения Python и популярными библиотеками.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {curriculum.map((chapter, index) => (
            <motion.div
              key={chapter.title}
              className="glass-panel card-hover flex h-full flex-col rounded-3xl p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{chapter.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{chapter.description}</p>
                </div>
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-slate-600 dark:text-slate-300">
                {chapter.sections.map((section) => (
                  <li key={section} className="rounded-2xl bg-white/80 px-4 py-3 dark:bg-slate-800/60">
                    {section}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CurriculumOverview;
