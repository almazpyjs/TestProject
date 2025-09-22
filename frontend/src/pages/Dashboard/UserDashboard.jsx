import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchNotifications, fetchPurchases, updateProfile } from '../../services/userService';
import { fetchCourses } from '../../services/courseService';

function UserDashboard() {
  const { user, refreshProfile } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPurchases().then(({ data }) => setPurchases(data.purchases));
    fetchNotifications().then(({ data }) => setNotifications(data.notifications));
    fetchCourses().then(({ data }) => setCourses(data.courses));
  }, []);

  const handleSaveProfile = async () => {
    await updateProfile({ full_name: fullName });
    await refreshProfile();
    setMessage('Профиль обновлен!');
  };

  return (
    <div className="bg-slate-50 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-8">
              <h1 className="text-3xl font-bold">Привет, {user?.full_name || 'студент'} 👋</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Отслеживайте прогресс, скачивайте материалы и продолжайте обучение.
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl bg-white/80 p-6 dark:bg-slate-800/60">
                  <h2 className="text-lg font-semibold">Профиль</h2>
                  <label className="mt-4 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Имя и фамилия
                  </label>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
                  >
                    Сохранить
                  </button>
                  {message && <p className="mt-2 text-xs text-emerald-500">{message}</p>}
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-6">
                  <h2 className="text-lg font-semibold">Сертификат</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
                    Завершите все уроки и получите именной сертификат с уникальным номером.
                  </p>
                  <button className="mt-4 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10">
                    Скачать сертификат
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-semibold">Мои покупки</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="rounded-3xl bg-white/80 p-5 dark:bg-slate-800/60">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Курс ID: {purchase.course_id}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Статус: {purchase.status}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-300">Тариф: {purchase.tier}</p>
                    <p className="text-xs text-slate-400">Дата: {new Date(purchase.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                {purchases.length === 0 && <p className="text-sm text-slate-600 dark:text-slate-300">Покупок пока нет.</p>}
              </div>
            </div>
          </div>
          <aside className="space-y-8">
            <div className="glass-panel rounded-3xl p-6">
              <h2 className="text-lg font-semibold">Уведомления</h2>
              <ul className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                {notifications.map((notification) => (
                  <li key={notification.id} className="rounded-2xl bg-white/80 p-4 dark:bg-slate-800/60">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{notification.message}</p>
                  </li>
                ))}
                {notifications.length === 0 && <p className="text-sm text-slate-600 dark:text-slate-300">Новых уведомлений нет.</p>}
              </ul>
            </div>
            <div className="glass-panel rounded-3xl p-6">
              <h2 className="text-lg font-semibold">Рекомендованные курсы</h2>
              <ul className="mt-4 space-y-3 text-sm text-primary">
                {courses.slice(0, 3).map((course) => (
                  <li key={course.id}>{course.title}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
