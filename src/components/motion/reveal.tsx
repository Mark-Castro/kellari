'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'li' | 'section';
  id?: string;
  interactive?: boolean;
  'aria-labelledby'?: string;
  duration?: number;
  staggerIndex?: number;
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

  const delay = mobile ? staggerIndex * 0.04 : staggerIndex * 0.07;
  const MotionElement = motionElements[as];

  return (
    <MotionElement
      className={className}
      data-motion-reveal
      id={id}
      aria-labelledby={labelledBy}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={
        interactive && !reduceMotion
          ? { y: -3, scale: 1.01, transition: { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] } }
          : undefined
      }
      whileTap={
        interactive && !reduceMotion
          ? { scale: 0.995, transition: { duration: 0.1 } }
          : undefined
      }
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      transition={{
        duration: reduceMotion ? 0.1 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionElement>
  );
}
