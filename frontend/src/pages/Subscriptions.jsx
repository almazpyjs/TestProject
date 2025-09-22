import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SubscriptionPlans from '../components/SubscriptionPlans';
import LoadingOverlay from '../components/LoadingOverlay';
import { fetchCourse, fetchCourses, purchaseCourse } from '../services/courseService';
import { useAuth } from '../context/AuthContext';

function Subscriptions() {
  const [courses, setCourses] = useState([]);
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses().then(({ data }) => setCourses(data.courses));
    fetchCourse('python-mastery').then(({ data }) => setFeaturedCourse(data.course));
  }, []);

  const premiumCourses = useMemo(() => courses.filter((course) => course.tier !== 'basic'), [courses]);

  const handleSelectPlan = async (plan) => {
    if (!user) {
      navigate('/register');
      return;
    }
    if (!featuredCourse) return;
    setIsPurchasing(true);
    try {
      await purchaseCourse(featuredCourse.slug, { tier: plan.tier });
      navigate(`/course/${featuredCourse.slug}`);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 lg:px-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold sm:text-5xl">Гибкая подписка на обучение</h1>
            <p className="text-lg text-slate-200">
              Оплачивайте только нужный тариф и получайте полный доступ к материалам, проектам и поддержке наставников. Вы
              можете перейти на другой план в любой момент.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-primary/80"
              >
                Начать бесплатно
              </Link>
              <Link
                to="/program"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary hover:text-primary"
              >
                Изучить программу
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="glass-panel rounded-3xl bg-white/10 p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold">Что входит в подписку</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li>✔ Доступ ко всем урокам и обновлениям курса</li>
              <li>✔ Практические задания и проверка кода наставником</li>
              <li>✔ Сертификат и карьерные консультации</li>
              <li>✔ Еженедельные вебинары и комьюнити разработчиков</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <SubscriptionPlans onSelect={handleSelectPlan} />

      <section className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="glass-panel rounded-3xl p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Все курсы, доступные по подписке</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Получайте новые главы и уроки сразу после выхода. Обновления автоматически входят в стоимость.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
            >
              Перейти в кабинет
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {premiumCourses.map((course) => (
              <div key={course.id} className="rounded-3xl bg-slate-100/80 p-6 dark:bg-slate-800/60">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{course.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <span>Уровень: {course.level}</span>
                  <span>Формат: {course.format || 'Онлайн'}</span>
                </div>
              </div>
            ))}
            {premiumCourses.length === 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-300">Мы скоро добавим дополнительные курсы по подписке.</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <div className="glass-panel rounded-3xl p-8">
            <h2 className="text-3xl font-bold">Как проходит покупка</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {["Выберите тариф", "Подтвердите оплату", "Учитесь без ограничений"].map((step, index) => (
                <motion.div
                  key={step}
                  className="rounded-3xl bg-slate-100 px-5 py-6 text-sm font-semibold text-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="mb-3 block text-xs uppercase tracking-wide text-primary">Шаг {index + 1}</span>
                  {step}
                </motion.div>
              ))}
            </div>
            {isPurchasing && <LoadingOverlay message="Обрабатываем оплату..." />}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Subscriptions;
