import { motion } from 'framer-motion';

function LoadingOverlay({ message = 'Загрузка...' }) {
  return (
    <div className="flex h-full w-full items-center justify-center py-20">
      <motion.div
        className="flex flex-col items-center gap-4"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{message}</p>
      </motion.div>
    </div>
  );
}

export default LoadingOverlay;
