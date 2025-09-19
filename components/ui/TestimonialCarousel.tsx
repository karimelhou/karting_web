'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { testimonials } from '@/lib/testimonials';

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const activeTestimonial = testimonials[index];
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion, isPaused]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTestimonial.name}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="space-y-4"
        >
          <p className="text-lg text-foreground">“{activeTestimonial.message}”</p>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            {activeTestimonial.name}
          </p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <span key={starIndex} aria-hidden="true">
                {starIndex < activeTestimonial.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex items-center gap-2">
        {testimonials.map((testimonial, idx) => (
          <button
            key={testimonial.name}
            type="button"
            className={`h-2 w-8 rounded-full transition ${idx === index ? 'bg-primary' : 'bg-white/20'}`}
            onClick={() => setIndex(idx)}
            aria-label={`Afficher le témoignage ${testimonial.name}`}
          />
        ))}
      </div>
    </div>
  );
}
