'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from './button';

export type LightboxItem = {
  src: string;
  alt: string;
};

export function LightboxGallery({ items }: { items: LightboxItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    if (activeIndex == null) {
      if (lastFocusedElement.current instanceof HTMLElement) {
        lastFocusedElement.current.focus();
      }
      return;
    }

    lastFocusedElement.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveIndex(null);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((prev) => {
          if (prev == null) return 0;
          return (prev + 1) % items.length;
        });
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((prev) => {
          if (prev == null) return items.length - 1;
          return (prev - 1 + items.length) % items.length;
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, items.length]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            aria-label={`Agrandir ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={400}
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 text-sm font-semibold text-white drop-shadow-lg">
              {item.alt}
            </span>
          </button>
        ))}
      </div>
      {activeIndex != null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie, image ${activeIndex + 1} sur ${items.length}`}
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl">
            <Image
              src={items[activeIndex].src}
              alt={items[activeIndex].alt}
              width={1200}
              height={800}
              className="h-full w-full rounded-3xl object-cover"
            />
            <Button
              variant="secondary"
              className="absolute right-4 top-4"
              onClick={() => setActiveIndex(null)}
              ref={closeButtonRef}
            >
              Fermer
            </Button>
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-6 text-xs text-muted-foreground">
              <span>
                {activeIndex + 1} / {items.length}
              </span>
              <span>Utilisez ← → ou Échap</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
