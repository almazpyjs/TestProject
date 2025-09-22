import { useEffect, useMemo, useState } from 'react';
import Hero from '../components/Hero';
import FeatureHighlights from '../components/FeatureHighlights';
import CurriculumOverview from '../components/CurriculumOverview';
import SubscriptionPlans from '../components/SubscriptionPlans';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQAccordion from '../components/FAQAccordion';
import { fetchCourse, fetchCourses, purchaseCourse } from '../services/courseService';
import { useAuth } from '../context/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourse('python-mastery').then(({ data }) => setFeaturedCourse(data.course));
    fetchCourses().then(({ data }) => setCourses(data.courses));
  }, []);

  const filteredCourses = useMemo(() => {
    if (!search) return courses;
    return courses.filter((course) => course.title.toLowerCase().includes(search.toLowerCase()));
  }, [courses, search]);

  const handlePurchase = async (plan) => {
    if (!user) {
      navigate('/login');
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
    <>
      <Hero />
      <FeatureHighlights />
      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Каталог курсов</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Актуальные направления Python: от автоматизации до backend и data.
              </p>
            </div>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Найти курс..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-800 md:w-80"
            />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {filteredCourses.map((course) => (
              <div key={course.id} className="glass-panel card-hover flex flex-col rounded-3xl p-6">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{course.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span>Уровень: {course.level}</span>
                  <span>Стоимость: {course.price}₽</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/course/${course.slug}`}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                  >
                    Смотреть программу
                  </Link>
                  <button
                    onClick={() => handlePurchase({ tier: 'premium' })}
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
                  >
                    Купить курс
                  </button>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <p className="text-sm text-slate-600 dark:text-slate-300">Курсы не найдены.</p>
            )}
          </div>
        </div>
      </section>
      <CurriculumOverview />
      <section className="bg-slate-50 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 lg:px-0">
          <div className="glass-panel rounded-3xl p-8">
            <h2 className="text-3xl font-bold">Превью курса</h2>
            {!featuredCourse && <LoadingOverlay message="Загружаем программу курса..." />}
            {featuredCourse && (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{featuredCourse.description}</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    {featuredCourse.chapters.map((chapter) => (
                      <li key={chapter.id} className="rounded-2xl bg-white/80 p-4 dark:bg-slate-800/60">
                        <h3 className="text-base font-semibold">{chapter.title}</h3>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {chapter.sections.map((section) => (
                            <li key={section.id}>{section.title}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-6">
                  <h3 className="text-lg font-semibold">Что вы получите</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                    <li>✔ Полный доступ к главам и проектам</li>
                    <li>✔ Практику по встроенным библиотекам</li>
                    <li>✔ Скачиваемые материалы и код</li>
                    <li>✔ Сертификат и карьерное сопровождение</li>
                  </ul>
                  <button
                    onClick={() => handlePurchase({ tier: 'premium' })}
                    disabled={isPurchasing}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80 disabled:opacity-60"
                  >
                    {isPurchasing ? 'Обработка оплаты...' : 'Получить полный доступ'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <SubscriptionPlans onSelect={handlePurchase} />
      <TestimonialCarousel />
      <FAQAccordion />
    </>
  );
}

export default Home;
