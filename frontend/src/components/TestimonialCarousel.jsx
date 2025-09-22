import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Мария Иванова',
    role: 'Python Developer в FinTech',
    quote: 'Благодаря проектам по автоматизации и практическим задачам я получила оффер на позицию Middle уже через 5 месяцев обучения.'
  },
  {
    name: 'Илья Смирнов',
    role: 'Backend Engineer в стартапе',
    quote: 'Курс помог мне глубоко понять встроенные библиотеки Python. Особенно полезными оказались уроки по collections и itertools.'
  },
  {
    name: 'Алина Петрова',
    role: 'Data Engineer',
    quote: 'Понравились проекты с SQLAlchemy и автоматизацией. Поддержка наставников и комьюнити мотивирует двигаться вперед.'
  }
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % testimonials.length), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold">Отзывы выпускников</h2>
        <p className="mt-3 text-slate-300">
          Истории студентов, которые прошли путь до уровня Middle и устроились в компании мечты.
        </p>
        <div className="relative mt-10 overflow-hidden rounded-3xl bg-white/10 p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[index].name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg leading-relaxed text-slate-200">“{testimonials[index].quote}”</p>
              <div className="mt-6 text-sm font-semibold">
                {testimonials[index].name}
                <span className="ml-2 font-normal text-slate-400">— {testimonials[index].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                className={`h-2 w-8 rounded-full transition ${
                  dotIndex === index ? 'bg-primary' : 'bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Показать отзыв ${dotIndex + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
