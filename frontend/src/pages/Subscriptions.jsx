import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SubscriptionPlans from '../components/SubscriptionPlans';
import FAQAccordion from '../components/FAQAccordion';
import LoadingOverlay from '../components/LoadingOverlay';
import { fetchCourse, purchaseCourse } from '../services/courseService';
import { useAuth } from '../context/AuthContext';

const benefits = [
  'Доступ к новым урокам и обновлениям программы сразу после релиза',
  'Экосистема: живые сессии с менторами, чат и закрытые вебинары',
  'Сертификаты об окончании и помощь с подготовкой портфолио'
];

function Subscriptions() {
  const [course, setCourse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse('python-mastery').then(({ data }) => setCourse(data.course));
  }, []);

  const handleSelectPlan = async (plan) => {
    if (!user) {
      navigate('/register');
      return;
    }
    if (!course) return;
    setIsProcessing(true);
    try {
      await purchaseCourse(course.slug, { tier: plan.tier });
      navigate(`/course/${course.slug}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white pb-24 dark:bg-slate-900">
      <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
              Подписки
            </span>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl text-slate-900 dark:text-white">
              Выбери формат обучения под свои цели
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
              Гибкие тарифы позволяют начать учиться уже сегодня. Платформа автоматически открывает доступ ко всем материалам и
              проектам после подтверждения подписки.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="glass-panel rounded-3xl p-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Что входит в Premium</h2>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Полный доступ к урокам, дополнительным модулям по встроенным библиотекам Python, пет-проектам, вебинарам и карьерным
              консультациям.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span>• 5 практических проектов и проверка кода наставниками</span>
              <span>• Личный трекер прогресса и индивидуальные рекомендации</span>
              <span>• Подготовка к собеседованиям и помощь с резюме</span>
            </div>
            <Link
              to="/program"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Посмотреть программу целиком
            </Link>
          </motion.div>
        </div>
      </section>

      {isProcessing && <LoadingOverlay message="Обрабатываем подписку..." />}

      <SubscriptionPlans onSelect={handleSelectPlan} />

      <section className="bg-slate-50 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <div className="glass-panel rounded-3xl p-10">
            <h2 className="text-3xl font-bold">Как работает оплата</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((step) => (
                <div key={step} className="rounded-3xl bg-white/70 p-6 text-sm text-slate-600 shadow-inner dark:bg-slate-800/70 dark:text-slate-200">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {step}
                  </span>
                  {step === 1 && <p className="mt-4">Выберите подходящий тариф и авторизуйтесь на платформе.</p>}
                  {step === 2 && <p className="mt-4">Подтвердите покупку — система мгновенно активирует подписку.</p>}
                  {step === 3 && <p className="mt-4">Получите доступ ко всем материалам и начните учиться без задержек.</p>}
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-slate-600 dark:text-slate-300">
              Оплата сейчас работает в режиме демо: после клика по кнопке «Выбрать план» доступ активируется автоматически. Реальная интеграция со Stripe добавляется на следующем этапе разработки.
            </p>
          </div>
        </div>
      </section>

      <FAQAccordion />
    </div>
  );
}

export default Subscriptions;
