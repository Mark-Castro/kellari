'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useLenis } from 'lenis/react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

export default function EditorialAboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const orbOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0.15]);

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    if (reduceMotion) {
      target.scrollIntoView();
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.1 });
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section
      className="relative flex min-h-[72vh] w-full items-center overflow-hidden border-b border-slate-200 bg-gradient-to-br from-emerald-50/70 via-white to-white px-4 py-20 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 sm:px-6 lg:min-h-[78vh] lg:px-8"
      ref={heroRef}
      aria-labelledby="about-hero-heading"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-8 h-[24rem] w-[24rem] rounded-full bg-emerald-200/50 blur-3xl dark:bg-lime-400/10"
        style={
          reduceMotion
            ? undefined
            : { y: orbY, scale: orbScale, opacity: orbOpacity }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 left-[12%] h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl dark:bg-lime-400/5"
        style={reduceMotion ? undefined : { y: orbY, opacity: orbOpacity }}
      />
      <motion.div
        className="relative mx-auto w-full max-w-7xl"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <nav aria-label="Breadcrumb" className="mb-12 text-sm">
          <ol className="flex items-center gap-2 text-slate-500 dark:text-zinc-500">
            <li>
              <Link
                className="transition-colors hover:text-emerald-800 dark:hover:text-lime-400"
                href="/"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-700 dark:text-zinc-300">
              About
            </li>
          </ol>
        </nav>

        <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-emerald-800 dark:text-lime-400">
          ABOUT KELARI GROUP
        </p>
        <h1
          className="max-w-5xl text-5xl font-semibold leading-[1.04] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl"
          id="about-hero-heading"
        >
          Progress starts with understanding.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300 sm:text-xl">
          We bring thoughtful advice and practical partnership to the
          organizations shaping a better future.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:bg-lime-400 dark:text-zinc-950 dark:hover:bg-lime-300 dark:focus-visible:outline-lime-400"
            onClick={() => scrollToSection('how-we-work')}
            type="button"
          >
            How we work
          </button>
          <button
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900 dark:focus-visible:outline-lime-400"
            onClick={() => scrollToSection('leadership')}
            type="button"
          >
            Meet our leaders
          </button>
        </div>
      </motion.div>
    </section>
  );
}
