import { NavLink, Route, Routes } from 'react-router-dom';
import UserManagement from './UserManagement';
import CourseManagement from './CourseManagement';

function AdminDashboard() {
  return (
    <div className="bg-slate-50 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="glass-panel rounded-3xl p-8">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Управляйте пользователями, контентом и аналитикой курса.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <NavLink
              to="users"
              className={({ isActive }) =>
                `rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-primary text-white shadow-lg' : 'bg-white/70 text-slate-700 dark:bg-slate-800/70 dark:text-slate-200'
                }`
              }
            >
              Пользователи
            </NavLink>
            <NavLink
              to="courses"
              className={({ isActive }) =>
                `rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-primary text-white shadow-lg' : 'bg-white/70 text-slate-700 dark:bg-slate-800/70 dark:text-slate-200'
                }`
              }
            >
              Курсы
            </NavLink>
          </div>
          <div className="mt-8">
            <Routes>
              <Route path="users" element={<UserManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="*" element={<UserManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
