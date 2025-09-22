import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createChapter, createCourse, createLesson, createSection, previewContent } from '../../services/adminService';
import { fetchCourse } from '../../services/courseService';

function CourseManagement() {
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState('<p>Новый урок</p>');
  const [preview, setPreview] = useState('');
  const [newLesson, setNewLesson] = useState({ title: '', video_url: '', estimated_minutes: 15 });
  const [selectedSection, setSelectedSection] = useState(null);
  const [status, setStatus] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');

  const loadCourse = () => {
    fetchCourse('python-mastery').then(({ data }) => {
      setCourse(data.course);
      if (data.course?.chapters?.[0]?.sections?.[0]) {
        setSelectedSection(data.course.chapters[0].sections[0]);
      }
    });
  };

  useEffect(() => {
    loadCourse();
  }, []);

  const handleCreateLesson = async () => {
    if (!selectedSection) return;
    await createLesson(selectedSection.id, { ...newLesson, content });
    setStatus('Урок добавлен!');
    setNewLesson({ title: '', video_url: '', estimated_minutes: 15 });
    loadCourse();
  };

  const handlePreview = async () => {
    const { data } = await previewContent({ content });
    setPreview(data.preview);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
      <div className="space-y-6">
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-xl font-semibold">Структура курса</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => createCourse({ title: 'Новый курс', slug: `course-${Date.now()}` }).then(() => loadCourse())}
              className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Создать курс
            </button>
            <div className="flex items-center gap-2">
              <input
                value={chapterTitle}
                onChange={(event) => setChapterTitle(event.target.value)}
                placeholder="Новая глава"
                className="w-40 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900"
              />
              <button
                onClick={() =>
                  course &&
                  createChapter(course.id, { title: chapterTitle || 'Новая глава' }).then(() => {
                    setStatus('Глава добавлена!');
                    setChapterTitle('');
                    loadCourse();
                  })
                }
                disabled={!course}
                className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-200"
              >
                + Глава
              </button>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {course?.chapters?.map((chapter) => (
              <div key={chapter.id} className="rounded-3xl bg-slate-100/80 p-4 dark:bg-slate-800/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">{chapter.title}</h3>
                  <button
                    onClick={() =>
                      createSection(chapter.id, { title: 'Новый раздел' }).then(() => {
                        setStatus('Раздел добавлен!');
                        loadCourse();
                      })
                    }
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                  >
                    + Раздел
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {chapter.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section)}
                      className={`block w-full rounded-2xl px-3 py-2 text-left text-sm transition ${
                        selectedSection?.id === section.id
                          ? 'bg-primary/10 text-primary'
                          : 'bg-white/80 text-slate-700 dark:bg-slate-900/40 dark:text-slate-200'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {status && <p className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">{status}</p>}
      </div>
      <div className="space-y-6">
        <div className="glass-panel rounded-3xl p-6">
          <h2 className="text-xl font-semibold">Редактор уроков</h2>
          <input
            value={newLesson.title}
            onChange={(event) => setNewLesson((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Название урока"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900"
          />
          <input
            value={newLesson.video_url}
            onChange={(event) => setNewLesson((prev) => ({ ...prev, video_url: event.target.value }))}
            placeholder="Ссылка на видео (YouTube)"
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900"
          />
          <CKEditor editor={ClassicEditor} data={content} onChange={(_, editor) => setContent(editor.getData())} />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handlePreview}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
            >
              Предпросмотр
            </button>
            <button
              onClick={handleCreateLesson}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
            >
              Сохранить урок
            </button>
          </div>
        </div>
        {preview && (
          <div className="glass-panel rounded-3xl p-6">
            <h2 className="text-xl font-semibold">Предпросмотр</h2>
            <article className="prose prose-slate mt-4 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: preview }}></article>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseManagement;
