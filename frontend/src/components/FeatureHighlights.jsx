import { motion } from 'framer-motion';
import { CommandLineIcon, CubeIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Практика на реальных проектах',
    description: 'От автоматизации с os и sys до построения REST API на Flask с SQLAlchemy.',
    icon: CommandLineIcon
  },
  {
    title: 'Встроенные библиотеки Python',
    description: 'Детальные модули по datetime, collections, itertools с практическими кейсами.',
    icon: CubeIcon
  },
  {
    title: 'Карьерное сопровождение',
    description: 'Подготовка к собеседованиям, ревью резюме и доступ к закрытым вакансиям.',
    icon: AcademicCapIcon
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
