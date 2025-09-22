import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingOverlay from '../../components/LoadingOverlay';

function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '', full_name: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Пароли должны совпадать.');
      return;
    }
    if (!/(?=.*\d)(?=.*[A-Za-z]).{8,}/.test(form.password)) {
      setError('Пароль должен содержать буквы и цифры и быть не короче 8 символов.');
      return;
    }
    try {
      await register({ email: form.email, password: form.password, full_name: form.full_name });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Не удалось зарегистрироваться.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100 px-4 py-16 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="glass-panel w-full max-w-xl p-10">
        <h1 className="text-2xl font-bold">Создайте аккаунт</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Получите моментальный доступ к урокам, проектам и комьюнити разработчиков.
        </p>
        <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold">Имя и фамилия</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Пароль</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Подтверждение пароля</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80 disabled:opacity-60"
          >
            Создать аккаунт
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
          Уже обучаетесь?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Войдите
          </Link>
        </p>
        {isLoading && <LoadingOverlay message="Создаем профиль..." />}
      </div>
    </div>
  );
}

export default Register;
