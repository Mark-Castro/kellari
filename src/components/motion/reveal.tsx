'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export type RevealVariant = 'default' | 'homepage';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'li' | 'section';
  id?: string;
  interactive?: boolean;
  'aria-labelledby'?: string;
  duration?: number;
  staggerIndex?: number;
  variant?: RevealVariant;
};

const motionElements = {
  article: motion.article,
  div: motion.div,
  li: motion.li,
  section: motion.section,
};

export default function Reveal({
  children,
  className,
  as = 'div',
  id,
  interactive = false,
  'aria-labelledby': labelledBy,
  duration = 0.42,
  staggerIndex = 0,
  variant = 'default',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const updateViewport = () => setMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  const isHomepage = variant === 'homepage';
  const delay = isHomepage
    ? staggerIndex * 0.1
    : mobile
      ? staggerIndex * 0.04
      : staggerIndex * 0.07;
  const MotionElement = motionElements[as];

  return (
    <MotionElement
      className={className}
      data-motion-reveal
      id={id}
      aria-labelledby={labelledBy}
      initial={reduceMotion ? false : { opacity: 0, y: isHomepage ? 40 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={
        interactive && !reduceMotion
          ? {
              y: isHomepage ? -6 : -3,
              ...(isHomepage ? {} : { scale: 1.01 }),
              transition: {
                duration: isHomepage ? 0.2 : 0.18,
                ease: isHomepage
                  ? [0.16, 1, 0.3, 1]
                  : [0.2, 0.8, 0.2, 1],
              },
            }
          : undefined
      }
      whileTap={
        interactive && !reduceMotion
          ? { scale: 0.995, transition: { duration: 0.1 } }
          : undefined
      }
      viewport={{
        once: false,
        amount: 0.2,
        margin: '-50px',
      }}
      transition={{
        duration: reduceMotion ? 0.1 : isHomepage ? 0.6 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionElement>
  );
}
