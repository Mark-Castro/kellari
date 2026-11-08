'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    title: 'Understand',
    description: 'We start with your objectives, context, and constraints.',
  },
  {
    title: 'Assess',
    description:
      'We analyze where you are today and identify the opportunities and risks.',
  },
  {
    title: 'Recommend',
    description:
      'We set out clear, practical options, with the reasoning behind each.',
  },
  {
    title: 'Deliver',
    description:
      'We support implementation and measure results against agreed goals.',
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const stepRef = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ['start 0.85', 'center 0.5'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.58, 1, 0.68]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [
      '0 0 0 0 rgba(6, 95, 70, 0)',
      '0 0 0 1px rgba(6, 95, 70, 0.24), 0 20px 55px -35px rgba(6, 95, 70, 0.36)',
      '0 0 0 0 rgba(6, 95, 70, 0)',
    ],
  );

  return (
    <motion.li
      ref={stepRef}
      className="flex min-h-[58vh] items-center py-7 will-change-transform"
      style={
        reduceMotion
          ? undefined
          : {
              opacity,
              scale,
              boxShadow,
            }
      }
    >
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <p className="m-0 text-xs font-bold tracking-[0.16em] text-emerald-800 dark:text-lime-300">
          STEP {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mb-0 mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          {step.title}
        </h3>
        <p className="mb-0 mt-3 max-w-xl leading-7 text-slate-600 dark:text-zinc-300">
          {step.description}
        </p>
      </div>
    </motion.li>
  );
}

export default function ProcessSection() {
  return (
    <section
      aria-labelledby="services-approach-heading"
      className="bg-slate-50 px-5 py-16 dark:bg-zinc-950 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">How we work</p>
            <h2
              id="services-approach-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl"
            >
              A clear, collaborative approach
            </h2>
            <p className="mt-4 max-w-md leading-7 text-slate-600 dark:text-zinc-300">
              A practical process keeps every engagement grounded in your
              priorities and focused on meaningful outcomes.
            </p>
          </div>
        </div>
        <ol className="m-0 list-none p-0 lg:col-span-8">
          {steps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
