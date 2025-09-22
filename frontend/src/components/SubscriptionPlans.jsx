import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const plans = [
  {
    name: 'Базовый',
    description: 'Доступ к основным урокам и практическим заданиям',
    price: '990₽ / мес',
    features: ['Основы синтаксиса', 'Практикум по алгоритмам', 'Чат студентов'],
    tier: 'basic'
  },
  {
    name: 'Премиум',
    description: 'Полный курс, проекты и карьерное сопровождение',
    price: '2 990₽ / мес',
    features: ['Встроенные библиотеки', '5 pet-проектов', 'Наставник и карьерный трек'],
    tier: 'premium',
    highlight: true
  }
];

function SubscriptionPlans({ onSelect }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelect = (plan) => {
    if (!user) {
      navigate('/register');
      return;
    }
    onSelect?.(plan);
  };

  return (
    <section id="pricing" className="bg-white py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Выбери оптимальную подписку</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Гибкие тарифы для разных целей — от изучения основ до подготовки к позиции Middle-разработчика.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`glass-panel card-hover relative flex flex-col rounded-3xl p-8 ${
                plan.highlight ? 'border-primary shadow-2xl' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {plan.highlight && (
                <span className="absolute right-6 top-6 rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold text-primary">
                  Популярно
                </span>
              )}
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
              <p className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</p>
              <ul className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelect(plan)}
                className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-primary/80"
              >
                {user ? 'Выбрать план' : 'Зарегистрироваться'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SubscriptionPlans;
