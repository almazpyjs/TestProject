import { useEffect, useState } from 'react';
import {
  deleteUser,
  fetchUsers,
  notifyUser,
  updateUser
} from '../../services/adminService';
import LoadingOverlay from '../../components/LoadingOverlay';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState('');
  const [toast, setToast] = useState('');

  const loadUsers = () => {
    setLoading(true);
    fetchUsers()
      .then(({ data }) => setUsers(data.users))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUpdate = async (userId, payload) => {
    await updateUser(userId, payload);
    loadUsers();
    setToast('Данные пользователя обновлены.');
  };

  const handleBlockToggle = (user) => {
    const nextStatus = user.status === 'active' ? 'blocked' : 'active';
    handleUpdate(user.id, { status: nextStatus });
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    loadUsers();
    setToast('Пользователь удален.');
  };

  const handleNotify = async (userId) => {
    if (!notification) return;
    await notifyUser(userId, { title: 'Сообщение от администратора', message: notification });
    setNotification('');
    setToast('Уведомление отправлено.');
  };

  if (loading) {
    return <LoadingOverlay message="Загружаем пользователей..." />;
  }

  return (
    <div className="space-y-6">
      {toast && <p className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">{toast}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr className="text-left">
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Имя</th>
              <th className="px-4 py-3 font-semibold">Статус</th>
              <th className="px-4 py-3 font-semibold">Роль</th>
              <th className="px-4 py-3 font-semibold">Дата</th>
              <th className="px-4 py-3 font-semibold">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  {editingId === user.id ? (
                    <input
                      defaultValue={user.full_name || ''}
                      onBlur={(event) => {
                        setEditingId(null);
                        handleUpdate(user.id, { full_name: event.target.value });
                      }}
                      className="w-full rounded-xl border border-slate-200 px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40 dark:border-slate-600 dark:bg-slate-900"
                    />
                  ) : (
                    <button
                      onClick={() => setEditingId(user.id)}
                      className="text-left text-slate-700 transition hover:text-primary dark:text-slate-200"
                    >
                      {user.full_name || '—'}
                    </button>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">{user.is_admin ? 'Админ' : 'Студент'}</td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleBlockToggle(user)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200"
                    >
                      {user.status === 'active' ? 'Блокировать' : 'Разблокировать'}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-500/10"
                    >
                      Удалить
                    </button>
                    <button
                      onClick={() => handleNotify(user.id)}
                      className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10"
                    >
                      Уведомить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-3xl bg-slate-100/80 p-6 dark:bg-slate-800/60">
        <h2 className="text-lg font-semibold">Отправить уведомление</h2>
        <textarea
          value={notification}
          onChange={(event) => setNotification(event.target.value)}
          placeholder="Введите сообщение для пользователя"
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900"
        ></textarea>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Выберите кнопку «Уведомить» в таблице, чтобы отправить сообщение выбранному пользователю.
        </p>
      </div>
    </div>
  );
}

export default UserManagement;
