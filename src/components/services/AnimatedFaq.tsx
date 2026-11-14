'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Faq = {
  question: string;
  answer: string;
};

export default function AnimatedFaq({ faqs }: { faqs: readonly Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="w-full overflow-x-hidden bg-white px-4 py-16 dark:bg-zinc-950 sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="practice-faq-heading"
    >
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-emerald-800 dark:text-lime-400">
          COMMON QUESTIONS
        </p>
        <h2
          className="mb-8 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
          id="practice-faq-heading"
        >
          Frequently asked questions
        </h2>

        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-zinc-800 dark:border-zinc-800">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `practice-faq-answer-${index + 1}`;

            return (
              <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                key={faq.question}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.4,
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
                viewport={{ once: false, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className="flex min-h-16 w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 dark:text-white dark:focus-visible:outline-lime-400 sm:text-lg"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    type="button"
                  >
                    {faq.question}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      aria-hidden="true"
                      className="shrink-0 text-2xl font-normal text-emerald-800 dark:text-lime-400"
                      transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    >
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      animate={{ height: 'auto', opacity: 1 }}
                      className="overflow-hidden"
                      exit={{ height: 0, opacity: 0 }}
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.1 : 0.28 }}
                    >
                      <p className="max-w-3xl pb-6 pr-10 text-sm leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
