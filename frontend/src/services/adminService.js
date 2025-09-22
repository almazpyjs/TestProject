import api from './api';

export function fetchUsers() {
  return api.get('/admin/users');
}

export function updateUser(userId, payload) {
  return api.patch(`/admin/users/${userId}`, payload);
}

export function deleteUser(userId) {
  return api.delete(`/admin/users/${userId}`);
}

export function notifyUser(userId, payload) {
  return api.post(`/admin/users/${userId}/notify`, payload);
}

export function createCourse(payload) {
  return api.post('/admin/courses', payload);
}

export function updateCourse(courseId, payload) {
  return api.put(`/admin/courses/${courseId}`, payload);
}

export function deleteCourse(courseId) {
  return api.delete(`/admin/courses/${courseId}`);
}

export function createChapter(courseId, payload) {
  return api.post(`/admin/courses/${courseId}/chapters`, payload);
}

export function createSection(chapterId, payload) {
  return api.post(`/admin/chapters/${chapterId}/sections`, payload);
}

export function createLesson(sectionId, payload) {
  return api.post(`/admin/sections/${sectionId}/lessons`, payload);
}

export function updateLesson(lessonId, payload) {
  return api.put(`/admin/lessons/${lessonId}`, payload);
}

export function previewContent(payload) {
  return api.post('/admin/preview', payload);
}

