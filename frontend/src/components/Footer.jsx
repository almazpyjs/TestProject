import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 py-10 dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold">Python Mastery</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Современная платформа обучения Python с проектами, наставниками и комьюнити.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase text-slate-500">Навигация</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/#curriculum">Программа курса</Link></li>
            <li><Link to="/#pricing">Тарифы</Link></li>
            <li><Link to="/#faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase text-slate-500">Контакты</h4>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">support@pythonmastery.com</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">+7 (900) 123-45-67</p>
        </div>
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold">Готовы стать Middle разработчиком?</h4>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Получите доступ к более чем 120 урокам, лайв-сессиям и карьерному сопровождению.
          </p>
          <Link
            to="/register"
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary/80"
          >
            Присоединиться
          </Link>
        </motion.div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Python Mastery. Все права защищены.
      </p>
    </footer>
  );
}

export default Footer;
