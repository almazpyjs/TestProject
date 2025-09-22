import { useState } from 'react';
import api from '../../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Не удалось отправить письмо.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-100 px-4 py-16 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="glass-panel w-full max-w-md p-8">
        <h1 className="text-2xl font-bold">Восстановление пароля</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Введите email, и мы отправим инструкции по восстановлению доступа.
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
          >
            Отправить письмо
          </button>
        </form>
        {submitted && (
          <p className="mt-6 rounded-2xl bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400">
            Если такой аккаунт существует, мы отправили письмо с инструкциями.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
