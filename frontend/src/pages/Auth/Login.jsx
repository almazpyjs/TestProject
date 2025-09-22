import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingOverlay from '../../components/LoadingOverlay';

function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      const redirect = location.state?.from?.pathname || '/dashboard';
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка авторизации. Проверьте данные.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100 px-4 py-16 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="glass-panel w-full max-w-md p-8">
        <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Войдите в аккаунт, чтобы продолжить обучение и отслеживать прогресс.
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80 disabled:opacity-60"
          >
            Войти
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Забыли пароль?
          </Link>
          <Link to="/register" className="text-primary hover:underline">
            Нет аккаунта?
          </Link>
        </div>
        {isLoading && <LoadingOverlay message="Проверяем учетные данные..." />}
      </div>
    </div>
  );
}

export default Login;
