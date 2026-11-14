'use client';

import { motion, useReducedMotion } from 'framer-motion';

type PracticeDiagnosticMatrixProps = {
  fit: readonly string[];
  capabilities: readonly string[];
  whyItMatters: readonly string[];
};

export default function PracticeDiagnosticMatrix({
  fit,
  capabilities,
  whyItMatters,
}: PracticeDiagnosticMatrixProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="w-full overflow-x-clip bg-emerald-50/50 px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="practice-diagnostic-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
            PRACTICAL SUPPORT
          </p>
          <h2
            className="mb-7 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
            id="practice-diagnostic-heading"
          >
            When this practice area can help
          </h2>
          <ul className="space-y-3">
            {fit.map((item, index) => (
              <motion.li
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm font-medium leading-6 text-slate-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200"
                initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                key={item}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.45,
                  delay: reduceMotion ? 0 : index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: false, amount: 0.2 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-800 ring-4 ring-emerald-100 dark:bg-lime-400 dark:ring-lime-400/10"
                />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-emerald-200/80 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              How we help
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <li
                  className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium leading-5 text-emerald-950 dark:bg-lime-400/10 dark:text-zinc-200"
                  key={capability}
                >
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mb-7 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Why it matters now
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {whyItMatters.map((item, index) => {
              const [title, ...descriptionParts] = item.split('. ');
              const description = descriptionParts.join('. ');

              return (
                <motion.article
                  className="min-h-44 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90"
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 22, scale: 0.98 }
                  }
                  key={item}
                  transition={{
                    duration: reduceMotion ? 0.1 : 0.5,
                    delay: reduceMotion ? 0 : index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-emerald-800 dark:text-lime-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">
                    {title.replace(/\.$/, '')}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                    {description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
