'use client';

import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { useRef } from 'react';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

const practices = [
  'Strategy & digital',
  'Financial & tax',
  'Sustainability & public impact',
  'Creative & communications',
];

const proofPoints = [
  { value: '4', label: 'Integrated practice areas' },
  { value: '19', label: 'Specialist services' },
  { value: '1', label: 'Coordinated advisory team' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div
      ref={containerRef}
      className="relative isolate overflow-hidden border-b border-slate-200/60 bg-slate-50/60 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 -top-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-emerald-300/25 blur-3xl will-change-transform dark:bg-lime-500/10 sm:left-[8%]"
        animate={reduceMotion ? undefined : { y: [0, -12, 0], x: [0, 10, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 12, ease: 'easeInOut', repeat: Infinity }
        }
        style={{ scale: reduceMotion ? 1 : glowScale }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-200/25 blur-3xl dark:bg-emerald-800/10"
      />

      <section className="mx-auto grid min-h-[42rem] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-24">
        <motion.div
          className="will-change-transform lg:col-span-7"
          variants={contentVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          style={{
            y: reduceMotion ? 0 : textY,
            opacity: reduceMotion ? 1 : textOpacity,
          }}
        >
          <motion.p
            variants={revealVariants}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-[0.7rem] font-bold tracking-[0.16em] text-emerald-900 shadow-sm dark:border-lime-300/20 dark:bg-zinc-900/70 dark:text-lime-300"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-lime-300"
            />
            INTEGRATED ADVISORY
          </motion.p>

          <motion.h1
            variants={revealVariants}
            className="max-w-3xl text-[clamp(2.8rem,6.1vw,5.25rem)] font-semibold leading-[1.03] tracking-[-0.055em] text-slate-950 dark:text-white"
          >
            Insight that moves you forward.
          </motion.h1>

          <motion.p
            variants={revealVariants}
            className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-zinc-300 sm:text-lg sm:leading-8"
          >
            KELARI GROUP LLC helps organizations navigate complexity, unlock
            growth and build lasting value across strategy, finance,
            sustainability and communications.
          </motion.p>

          <motion.div
            variants={revealVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-black dark:hover:bg-lime-300 dark:focus-visible:outline-lime-300"
            >
              Speak with an advisor
              <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white/40 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:outline-lime-300"
            >
              Explore our services
            </Link>
          </motion.div>

          <motion.dl
            variants={revealVariants}
            className="mt-12 grid max-w-2xl grid-cols-1 gap-5 border-t border-slate-200/80 pt-6 dark:border-zinc-800 sm:grid-cols-3 sm:gap-4"
          >
            {proofPoints.map((point) => (
              <div key={point.label} className="flex items-baseline gap-2 sm:block">
                <dt className="order-1 mt-1 text-xs leading-5 text-slate-500 dark:text-zinc-400 sm:order-2">
                  {point.label}
                </dt>
                <dd className="m-0 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:order-1">
                  {point.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="will-change-transform lg:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            rotateX: reduceMotion ? 0 : cardRotateX,
            scale: reduceMotion ? 1 : cardScale,
            transformPerspective: 1200,
            transformOrigin: 'center top',
          }}
        >
          <div className="relative mx-auto max-w-xl rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-zinc-700/80 dark:bg-zinc-900/85 dark:shadow-[0_28px_90px_-40px_rgba(0,0,0,0.8)] sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-5 dark:border-zinc-700/80">
              <div>
                <p className="m-0 text-[0.65rem] font-bold tracking-[0.16em] text-emerald-800 dark:text-lime-300">
                  ADVISORY OVERVIEW
                </p>
                <h2 className="mb-0 mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                  One team. Connected expertise.
                </h2>
              </div>
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 dark:bg-lime-300/10 dark:text-lime-300"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M4 17.5 9 12l3.5 3.5L20 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 7H20v4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <ul className="m-0 mt-2 list-none p-0">
              {practices.map((practice, index) => (
                <li
                  key={practice}
                  className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0 dark:border-zinc-800"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold tabular-nums text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                    0{index + 1}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium text-slate-800 dark:text-zinc-100 sm:text-base">
                    {practice}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-emerald-600 dark:bg-lime-300"
                  />
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-zinc-950">
              <span className="text-xs font-medium text-slate-600 dark:text-zinc-300">
                Coordinated around your priorities
              </span>
              <span
                aria-hidden="true"
                className="text-emerald-800 dark:text-lime-300"
              >
                →
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
