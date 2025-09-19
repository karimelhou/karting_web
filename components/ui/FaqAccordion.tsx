'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black/40"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span
                className="text-primary transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                aria-hidden
              >
                ›
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeOut' }}
              className="px-5 pb-5 text-sm text-muted-foreground"
              aria-hidden={!isOpen}
            >
              {item.answer}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
