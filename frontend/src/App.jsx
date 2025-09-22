import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const CourseOverview = lazy(() => import('./pages/Course/CourseOverview'));
const LessonView = lazy(() => import('./pages/Course/LessonView'));
const UserDashboard = lazy(() => import('./pages/Dashboard/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const Program = lazy(() => import('./pages/Program'));
const Subscriptions = lazy(() => import('./pages/Subscriptions'));
const Reviews = lazy(() => import('./pages/Reviews'));

function App() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 transition-colors duration-500 dark:bg-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<LoadingOverlay message="Загрузка контента..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/program" element={<Program />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAllowed={Boolean(user)} redirectTo="/login">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/course/:slug" element={<CourseOverview />} />
            <Route
              path="/course/:slug/lesson/:lessonId"
              element={
                <ProtectedRoute isAllowed={Boolean(user)} redirectTo="/login">
                  <LessonView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute isAllowed={Boolean(user?.is_admin)} redirectTo="/login">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
