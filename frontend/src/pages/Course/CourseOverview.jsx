import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchCourse, fetchProgress, purchaseCourse } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import LoadingOverlay from '../../components/LoadingOverlay';

function CourseOverview() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    fetchCourse(slug).then(({ data }) => setCourse(data.course));
    if (user) {
      fetchProgress(slug).then(({ data }) => setProgress(data.progress));
    }
  }, [slug, user]);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsPurchasing(true);
    try {
      await purchaseCourse(slug, { tier: 'premium' });
      await fetchProgress(slug).then(({ data }) => setProgress(data.progress));
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!course) {
    return <LoadingOverlay message="Загружаем курс..." />;
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-16 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="glass-panel rounded-3xl p-10">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{course.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-300">
            <span>Уровень: {course.level}</span>
            <span>Стоимость: {course.price}₽</span>
            <span>Прогресс: {progress}%</span>
          </div>
          <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80 disabled:opacity-60"
            >
              {isPurchasing ? 'Оформляем доступ...' : 'Получить полный доступ'}
            </button>
            {course.hero_video_url && (
              <a
                href={course.hero_video_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
              >
                Смотреть превью
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {course.chapters.map((chapter) => (
            <div key={chapter.id} className="glass-panel rounded-3xl p-6">
              <h2 className="text-2xl font-semibold">{chapter.title}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {chapter.sections.map((section) => (
                  <div key={section.id} className="rounded-3xl bg-white/80 p-5 dark:bg-slate-800/60">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold">{section.title}</h3>
                      <span className="text-xs uppercase tracking-widest text-primary">{section.lessons.length} уроков</span>
                    </div>
                    <ul className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      {section.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-100/80 px-3 py-2 dark:bg-slate-900/40">
                          <span>{lesson.title}</span>
                          <Link
                            to={`/course/${course.slug}/lesson/${lesson.id}`}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Открыть
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseOverview;
