'use client';

import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

export default function IndustryHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.15]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="industries-page-heading"
      className="industries-motion-section relative isolate overflow-hidden border-b border-slate-200/60 bg-slate-50/60 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[26rem] w-[26rem] rounded-full bg-emerald-900/10 blur-3xl will-change-transform dark:bg-lime-400/5 sm:h-[32rem] sm:w-[32rem]"
        style={{
          scale: reduceMotion ? 1 : glowScale,
          opacity: reduceMotion ? 0.5 : glowOpacity,
        }}
      />
      <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center px-4 py-14 sm:px-6 sm:py-20 lg:min-h-[68vh] lg:px-8 lg:py-24">
        <motion.div
          className="w-full min-w-0 will-change-transform"
          style={{
            y: reduceMotion ? 0 : contentY,
            opacity: reduceMotion ? 1 : contentOpacity,
          }}
        >
          <p className="eyebrow">Who we work with</p>
          <h1
            id="industries-page-heading"
            className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Industry insight. Practical results.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
            We combine sector knowledge with integrated advisory to help
            organizations respond to the pressures and opportunities unique to
            their market.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300 dark:focus-visible:outline-lime-300"
          >
            Speak with an advisor <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
