import { motion } from 'framer-motion';

function TerminalIcon({ className = 'h-10 w-10' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
      <path d="m7 9 3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

function LibraryIcon({ className = 'h-10 w-10' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 4h4v16H5z" />
      <path d="M15 4h4v16h-4z" />
      <path d="M9 4h6v16H9z" />
    </svg>
  );
}

function CareerIcon({ className = 'h-10 w-10' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 7h18v10H3z" />
      <path d="M9 7V5a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2" />
      <path d="M12 12v5" />
      <path d="m9 17 3 3 3-3" />
    </svg>
  );
}

const features = [
  {
    title: 'Практика на реальных проектах',
    description: 'От автоматизации с os и sys до построения REST API на Flask с SQLAlchemy.',
    icon: TerminalIcon
  },
  {
    title: 'Встроенные библиотеки Python',
    description: 'Детальные модули по datetime, collections, itertools с практическими кейсами.',
    icon: LibraryIcon
  },
  {
    title: 'Карьерное сопровождение',
    description: 'Подготовка к собеседованиям, ревью резюме и доступ к закрытым вакансиям.',
    icon: CareerIcon
  }
];

function FeatureHighlights() {
  return (
    <section className="bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-panel card-hover rounded-3xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <feature.icon className="h-10 w-10 text-primary" />
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlights;
