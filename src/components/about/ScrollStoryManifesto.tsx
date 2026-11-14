'use client';

import { Fragment, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

const story =
  'Kelari Group was created to help organizations make confident decisions through change. We bring strategy, people, finance, sustainability, and communications into one connected conversation. Our work begins by listening closely, understanding what matters to the people involved, and shaping a practical path from ambition to action. We stay alongside our clients as plans become progress, learning and adapting together to deliver meaningful outcomes.';
const words = story.split(/\s+/);

function HighlightWord({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const count = words.length;
  const start = 0.08 + (index / count) * 0.84;
  const end = Math.min(start + Math.max(0.16, 5 / count), 1);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);

  return (
    <motion.span
      aria-hidden="true"
      className="inline"
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

const pillars = [
  'Integrated Strategy',
  'Human-Centered Execution',
  'Measurable Outcomes',
] as const;

export default function ScrollStoryManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.82', 'end 0.25'],
  });

  return (
    <section
      aria-labelledby="our-story-heading"
      className="w-full overflow-x-clip bg-white px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-32"
      ref={sectionRef}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="h-fit lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-emerald-800 dark:text-lime-400">
            OUR STORY
          </p>
          <h2
            className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl"
            id="our-story-heading"
          >
            Built around meaningful progress.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {pillars.map((pillar) => (
              <span
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
                key={pillar}
              >
                {pillar}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <p
            aria-label={story}
            className="text-3xl font-medium leading-[1.55] tracking-tight text-slate-900 dark:text-white sm:text-4xl sm:leading-[1.48] lg:text-[2.65rem]"
            role="text"
          >
            {reduceMotion
              ? story
              : words.map((word, index) => (
                  <Fragment key={`${index}-${word}`}>
                    <HighlightWord
                      index={index}
                      progress={scrollYProgress}
                      word={word}
                    />
                    {index < words.length - 1 ? ' ' : null}
                  </Fragment>
                ))}
          </p>
          <div className="mt-12 h-px w-full bg-slate-200 dark:bg-zinc-800">
            <motion.div
              aria-hidden="true"
              className="h-px origin-left bg-emerald-800 dark:bg-lime-400"
              style={
                reduceMotion
                  ? { scaleX: 1 }
                  : { scaleX: scrollYProgress }
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
