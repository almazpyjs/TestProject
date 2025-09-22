import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchCourse, fetchLesson } from '../../services/courseService';
import { updateProgress } from '../../services/userService';
import LoadingOverlay from '../../components/LoadingOverlay';

function LessonView() {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourse(slug).then(({ data }) => setCourse(data.course));
  }, [slug]);

  useEffect(() => {
    fetchLesson(slug, lessonId)
      .then(({ data }) => {
        setLesson(data.lesson);
        setIsCompleted(Boolean(data.lesson.completed));
      })
      .catch(() => navigate(`/course/${slug}`));
  }, [slug, lessonId, navigate]);

  const lessonOrder = useMemo(() => {
    if (!course) return [];
    const order = [];
    course.chapters.forEach((chapter) => {
      chapter.sections.forEach((section) => {
        section.lessons.forEach((l) => {
          order.push({
            chapter: chapter.title,
            section: section.title,
            ...l
          });
        });
      });
    });
    return order;
  }, [course]);

  const currentIndex = lessonOrder.findIndex((item) => String(item.id) === String(lessonId));
  const previousLesson = currentIndex > 0 ? lessonOrder[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessonOrder.length - 1 ? lessonOrder[currentIndex + 1] : null;

  const handleComplete = async () => {
    try {
      await updateProgress({ lesson_id: Number(lessonId), completed: !isCompleted });
      setIsCompleted((prev) => !prev);
      setMessage(!isCompleted ? 'Урок отмечен как пройденный!' : 'Прогресс обновлен.');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Не удалось обновить прогресс.');
    }
  };

  if (!lesson) {
    return <LoadingOverlay message="Открываем урок..." />;
  }

  const attachments = (() => {
    try {
      return lesson.attachments ? JSON.parse(lesson.attachments) : [];
    } catch (error) {
      return [];
    }
  })();

  return (
    <div className="bg-white py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 lg:px-0">
        <div className="glass-panel rounded-3xl p-8">
          <div className="flex flex-col gap-2">
            <Link to={`/course/${slug}`} className="text-xs font-semibold uppercase tracking-widest text-primary">
              ← Назад к курсу
            </Link>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            {lessonOrder[currentIndex] && (
              <p className="text-sm text-slate-500 dark:text-slate-300">
                {lessonOrder[currentIndex].chapter} • {lessonOrder[currentIndex].section}
              </p>
            )}
          </div>
          {lesson.video_url && (
            <iframe
              className="mt-6 aspect-video w-full rounded-3xl"
              src={lesson.video_url}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <article
            className="prose prose-slate mt-8 max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          ></article>
          {attachments.length > 0 && (
            <div className="mt-8 rounded-3xl bg-slate-100/80 p-6 dark:bg-slate-800/60">
              <h2 className="text-lg font-semibold">Материалы для скачивания</h2>
              <ul className="mt-3 space-y-2 text-sm text-primary">
                {attachments.map((file) => (
                  <li key={file}>
                    <a href={`/${file}`} download className="hover:underline">
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={handleComplete}
              className={`rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition ${
                isCompleted ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/80'
              }`}
            >
              {isCompleted ? 'Отметить как непройденный' : 'Отметить как пройденный'}
            </button>
            {previousLesson && (
              <Link
                to={`/course/${slug}/lesson/${previousLesson.id}`}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
              >
                ← Предыдущий урок
              </Link>
            )}
            {nextLesson && (
              <Link
                to={`/course/${slug}/lesson/${nextLesson.id}`}
                className="rounded-full border border-primary bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                Следующий урок →
              </Link>
            )}
          </div>
          {message && <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default LessonView;
