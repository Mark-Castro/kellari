'use client';

import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

export default function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <section
      ref={heroRef}
      aria-labelledby="services-heading"
      className="relative h-[150vh] border-b border-slate-200/60 bg-slate-50/60 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="sticky top-0 isolate flex min-h-[38rem] h-screen items-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-36 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-emerald-900/10 blur-3xl will-change-transform dark:bg-lime-400/5 sm:left-[8%]"
          style={{ scale: reduceMotion ? 1 : glowScale }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -right-36 -z-10 h-[26rem] w-[26rem] rounded-full bg-sky-200/20 blur-3xl dark:bg-emerald-800/10"
        />

        <motion.div
          className="mx-auto w-full max-w-7xl px-5 py-16 will-change-transform sm:px-8 lg:px-12"
          style={{
            y: reduceMotion ? 0 : contentY,
            opacity: reduceMotion ? 1 : contentOpacity,
          }}
        >
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-slate-500 dark:text-zinc-400">
            <ol className="m-0 flex list-none items-center gap-2 p-0">
              <li><Link href="/" className="hover:text-emerald-800 dark:hover:text-lime-300">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-700 dark:text-zinc-200">Services</li>
            </ol>
          </nav>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-[0.7rem] font-bold tracking-[0.16em] text-emerald-900 shadow-sm dark:border-lime-300/20 dark:bg-zinc-900/70 dark:text-lime-300">
            SERVICES
          </p>
          <h1
            id="services-heading"
            className="max-w-4xl text-[clamp(2.7rem,6vw,5rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-slate-950 dark:text-white"
          >
            Services built around your priorities
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-zinc-300 sm:text-xl">
            Nineteen specialist services across four practice areas, delivered
            independently or as one coordinated engagement.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300 dark:focus-visible:outline-lime-300"
          >
            Speak with an advisor <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
