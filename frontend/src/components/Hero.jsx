import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
      <div className="absolute inset-0 opacity-50">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1400&q=80"
        >
          <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80"></div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 lg:flex-row lg:items-center lg:px-8">
        <motion.div
          className="glass-panel w-full max-w-2xl rounded-3xl bg-white/10 p-10 text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Python Middle за 6 месяцев</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Пройди путь от нуля до уверенного уровня Middle-разработчика
          </h1>
          <p className="mt-6 text-lg text-slate-200">
            Глубокое изучение Python, автоматизации, веб-разработки, встроенных библиотек и 5 практических проектов с менторской поддержкой.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-primary/80"
            >
              Начать обучение
            </Link>
            <Link
              to="/program"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary hover:text-primary"
            >
              Смотреть программу
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {["120+ уроков", "5 pet-проектов", "Карьерный трек"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="glass-panel w-full rounded-3xl bg-white/10 p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe
            className="aspect-video w-full rounded-2xl"
            src="https://www.youtube.com/embed/rfscVS0vtbw"
            title="Python Course Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="mt-4 text-sm text-slate-200">
            Посмотри вводный урок и узнай, как устроена платформа обучения.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
