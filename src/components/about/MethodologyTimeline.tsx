'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';

const steps = [
  {
    title: 'Listen & understand',
    description: 'We learn your context, priorities, and what success means to you.',
  },
  {
    title: 'Align on direction',
    description: 'We turn insight into a shared view of the challenge and opportunity.',
  },
  {
    title: 'Shape the approach',
    description: 'We build a practical plan around your people, needs, and resources.',
  },
  {
    title: 'Deliver & learn',
    description: 'We work alongside your team, track progress, and adapt as needed.',
  },
] as const;

export default function MethodologyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.78', 'end 0.28'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section
      aria-labelledby="how-we-work-heading"
      className="w-full overflow-x-hidden border-y border-slate-200 bg-emerald-50/50 px-4 py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-28"
      id="how-we-work"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-emerald-800 dark:text-lime-400">
            HOW WE WORK
          </p>
          <h2
            className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl"
            id="how-we-work-heading"
          >
            A clear path from question to action.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-zinc-400">
            The right process depends on the challenge. Our approach keeps the
            work collaborative, focused, and useful at every step.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-emerald-200 dark:bg-zinc-800 md:block"
          >
            <motion.div
              className="h-full origin-left bg-emerald-800 dark:bg-lime-400"
              style={{ scaleX: reduceMotion ? 1 : progress }}
            />
          </div>

          <ol className="grid gap-5 md:grid-cols-4 md:gap-4">
            {steps.map((step, index) => (
              <motion.li
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-7"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                key={step.title}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: false, amount: 0.25 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -6, transition: { duration: 0.2, ease: 'easeOut' } }
                }
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="relative z-10 mb-6 grid h-10 w-10 place-items-center rounded-full border border-emerald-800 bg-white text-xs font-bold tracking-wider text-emerald-900 shadow-[0_0_0_5px_rgba(236,253,245,0.9)] dark:border-lime-400 dark:bg-zinc-950 dark:text-lime-400 dark:shadow-[0_0_0_5px_rgba(9,9,11,0.95)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
