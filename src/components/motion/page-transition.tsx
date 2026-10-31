'use client';

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { MutableRefObject, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type PageTransitionProps = {
  children: ReactNode;
};

type RouteFocusProps = {
  pathname: string;
  previousPathname: MutableRefObject<string>;
};

function RouteFocus({ pathname, previousPathname }: RouteFocusProps) {
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const frame = requestAnimationFrame(() => {
      const main = document.querySelector<HTMLElement>('main');
      if (!main) return;
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, previousPathname]);

  return null;
}

function TransitionContent({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const previousPathname = useRef(pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0.1 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={
          reduceMotion
            ? undefined
            : { opacity: 0, transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } }
        }
      >
        <RouteFocus pathname={pathname} previousPathname={previousPathname} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <TransitionContent>{children}</TransitionContent>
    </MotionConfig>
  );
}
