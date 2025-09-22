import api from './api';

export function updateProfile(payload) {
  return api.put('/user/me', payload);
}

export function fetchPurchases() {
  return api.get('/user/purchases');
}

export function updateProgress(payload) {
  return api.post('/user/progress', payload);
}

export function fetchNotifications() {
  return api.get('/user/notifications');
}

export function markNotifications(ids) {
  return api.post('/user/notifications/read', { ids });
}

