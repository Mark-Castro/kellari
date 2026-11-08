'use client';

import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return children;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
