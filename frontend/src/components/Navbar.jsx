import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Главная', exact: true },
  { to: '/#curriculum', label: 'Программа' },
  { to: '/#pricing', label: 'Подписки' },
  { to: '/#reviews', label: 'Отзывы' }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
            Py
          </span>
          Python Mastery
        </Link>
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-primary ${isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to={user.is_admin ? '/admin' : '/dashboard'}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
              >
                Кабинет
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-slate-600 transition hover:text-primary dark:text-slate-200">
                Вход
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
              >
                Начать обучение
              </Link>
            </div>
          )}
        </div>
      </nav>
      {open && (
        <div className="lg:hidden">
          <div className="glass-panel mx-4 mb-4 space-y-3 p-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={user.is_admin ? '/admin' : '/dashboard'}
                  className="flex-1 rounded-xl bg-primary px-3 py-2 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Кабинет
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex-1 rounded-xl bg-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100"
                  onClick={() => setOpen(false)}
                >
                  Вход
                </Link>
                <Link
                  to="/register"
                  className="flex-1 rounded-xl bg-primary px-3 py-2 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
