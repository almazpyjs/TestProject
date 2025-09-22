import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-transparent bg-white/60 p-2 text-slate-600 shadow-lg transition hover:border-primary hover:text-primary dark:bg-slate-800/60 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}

export default ThemeToggle;
