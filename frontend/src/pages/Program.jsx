import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CurriculumOverview from '../components/CurriculumOverview';
import FeatureHighlights from '../components/FeatureHighlights';

const milestones = [
  {
    period: 'Недели 1-3',
    title: 'Основы и синтаксис',
    description:
      'Погружение в синтаксис Python, работу с типами данных, условиями, циклами и функциями через практику.'
  },
  {
    period: 'Недели 4-6',
    title: 'Проектное мышление',
    description:
      'Изучаем встроенные библиотеки, применяем их в мини-проектах и автоматизируем рабочие сценарии.'
  },
  {
    period: 'Недели 7-10',
    title: 'Backend и базы данных',
    description:
      'Строим REST API на Flask, работаем с SQLAlchemy, тестируем код и настраиваем CI/CD пайплайн.'
  },
  {
    period: 'Недели 11-12',
    title: 'Финальный проект',
    description:
      'Собираем полноценное приложение, презентуем его экспертам и готовимся к собеседованиям.'
  }
];

function ProgramPage() {
  return (
    <div className="bg-slate-100 pb-20 dark:bg-slate-900">
      <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 text-center lg:flex-row lg:items-center lg:text-left">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Программа обучения</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Пошаговый план выхода на уровень Middle</h1>
            <p className="mt-4 text-base text-slate-700 dark:text-slate-200">
              Курс построен так, чтобы вы набрали уверенность в языке, сделали реальный проект и смогли презентовать его на
              собеседовании. Каждая тема закрепляется практикой и ревью наставников.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80 sm:w-auto"
              >
                Записаться на поток
              </Link>
              <Link
                to="/subscriptions"
                className="w-full rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-200 sm:w-auto"
              >
                Выбрать тариф
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <div className="glass-panel rounded-3xl p-6 text-left">
              <h2 className="text-lg font-semibold">Что вы освоите</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li>✔ Уверенный синтаксис Python и лучшие практики оформления кода.</li>
                <li>✔ Работа с встроенными библиотеками и автоматизацией процессов.</li>
                <li>✔ Построение backend-приложения и интеграция с базами данных.</li>
                <li>✔ Подготовка к техническим интервью и ревью вашего проекта.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 lg:px-8">
        <h2 className="text-3xl font-bold">Дорожная карта обучения</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          Мы разбили путь на логичные этапы. Каждый модуль сопровождается практическим проектом и обязательным код-ревью.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.title}
              className="glass-panel card-hover rounded-3xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{milestone.period}</p>
              <h3 className="mt-2 text-xl font-semibold">{milestone.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <FeatureHighlights />
      <CurriculumOverview />

      <section className="mx-auto mt-16 max-w-5xl px-4 lg:px-0">
        <div className="glass-panel rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold">Готовы сделать шаг к новой роли?</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Зарегистрируйтесь сейчас и получите доступ к вводному модулю с чек-листами подготовки.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
            >
              Начать обучение
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
            >
              Уже учусь
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProgramPage;
