import api from './api';

export function fetchCourses(params = {}) {
  return api.get('/courses/', { params });
}

export function fetchCourse(slug) {
  return api.get(`/courses/${slug}`);
}

export function purchaseCourse(slug, payload) {
  return api.post(`/courses/${slug}/purchase`, payload);
}

export function fetchLesson(slug, lessonId) {
  return api.get(`/courses/${slug}/lessons/${lessonId}`);
}

export function fetchProgress(slug) {
  return api.get(`/courses/${slug}/progress`);
}

