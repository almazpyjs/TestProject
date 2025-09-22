import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CurriculumOverview from '../components/CurriculumOverview';
import FeatureHighlights from '../components/FeatureHighlights';

const milestones = [
  {
    title: 'Месяц 1–2: База',
    description: 'Погружаемся в синтаксис Python, пишем первые утилиты и учимся работать с данными.',
    items: ['Скрипты автоматизации', 'Решение алгоритмических задач', 'Практика в Jupyter и VS Code']
  },
  {
    title: 'Месяц 3–4: Встроенные библиотеки',
    description:
      'Знакомимся с os, sys, pathlib, datetime, collections, itertools и другими инструментами, применяя их в мини-проектах.',
    items: ['CLI-утилиты и менеджеры файлов', 'Планировщики задач', 'Работа с датами, временными зонами и локализацией']
  },
  {
    title: 'Месяц 5–6: Проекты и карьера',
    description: 'Создаём полнофункциональные сервисы, подготавливаем портфолио и собеседуемся с наставником.',
    items: ['Flask + React приложение', 'ETL-пайплайн и обработка данных', 'Подготовка к техническому интервью']
  }
];

const techStack = ['Python 3.11', 'Flask & FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'React', 'Tailwind CSS', 'CI/CD'];

function Program() {
  return (
    <div className="space-y-20 pb-20">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 lg:px-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Полная программа
            </span>
            <h1 className="text-4xl font-bold sm:text-5xl">Поэтапное обучение Python до уровня Middle</h1>
            <p className="text-lg text-slate-200">
              Стартуем с нуля и шаг за шагом проходим все ключевые темы: от основ и встроенных библиотек до создания веб-сервисов,
              автоматизации и командной работы над проектами.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/subscriptions"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-primary/80"
              >
                Выбрать подписку
              </Link>
              <Link
                to="/course/python-mastery"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary hover:text-primary"
              >
                Смотреть программу курса
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="glass-panel rounded-3xl bg-white/10 p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold">Чему вы научитесь</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li>✔ Писать надёжный и тестируемый код на Python</li>
              <li>✔ Использовать встроенные библиотеки для решения реальных задач</li>
              <li>✔ Строить backend c Flask/Django и подключать React-фронтенд</li>
              <li>✔ Работать с БД, очередями задач, деплоем и CI/CD</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Учебный маршрут по месяцам</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Каждый этап завершается практикой и обратной связью от наставника, чтобы вы уверенно двигались к цели.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              className="glass-panel card-hover flex h-full flex-col rounded-3xl p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold">{milestone.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{milestone.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {milestone.items.map((item) => (
                  <li key={item} className="rounded-2xl bg-slate-100 px-4 py-2 dark:bg-slate-800/60">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <CurriculumOverview />
      <FeatureHighlights />

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <div className="glass-panel rounded-3xl p-8">
            <h2 className="text-3xl font-bold">Технологический стек и проекты</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Мы разбираем современные инструменты и практикуем их в командных проектах, чтобы портфолио выглядело уверенно на
              собеседованиях.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">Стек обучения</h3>
                <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
                  {techStack.map((tech) => (
                    <li key={tech} className="rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800/60">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Финальные проекты</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li>• Командная разработка веб-платформы с авторизацией, оплатой и админкой</li>
                  <li>• ETL-пайплайн с обработкой данных и аналитическим дашбордом</li>
                  <li>• Автоматизация DevOps-процессов с тестами и CI/CD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Program;
