'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useId, useState } from 'react';
import type { StrapiCareer } from '../../lib/strapi';
import ApplicationModal from './ApplicationModal';
import CareerDescription from './career-description';

const detailsTransition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1] as const,
};

function hasResponsibilitiesHeading(career: StrapiCareer) {
  return career.description.slice(0, 3).some((block) => {
    if (block.type === 'list') return false;

    const text = block.children
      .map((child) =>
        child.type === 'link'
          ? child.children.map((inline) => inline.text).join('')
          : child.text,
      )
      .join('')
      .trim()
      .replace(/:$/, '')
      .toLowerCase();

    return text === 'key responsibilities';
  });
}

export default function JobCard({ career }: { career: StrapiCareer }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const reduceMotion = useReducedMotion();
  const detailsId = useId();
  const jobPositionId = career.documentId;
  const showResponsibilitiesHeading = !hasResponsibilitiesHeading(career);

  return (
    <article className="job-card">
      <div className="job-card-main">
        <div className="job-card-copy">
          <div className="job-card-tags" aria-label="Role details">
            <span className="job-card-tag job-card-department">
              {career.department}
            </span>
            <span className="job-card-tag job-card-employment">
              {career.employmentType}
            </span>
          </div>
          <h3 className="job-card-title">{career.title}</h3>
          <p className="job-card-location">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              focusable="false"
            >
              <path
                d="M19 10.1c0 5-7 11-7 11s-7-6-7-11a7 7 0 1 1 14 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
              <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            <span>{career.location}</span>
          </p>
        </div>

        <div className="job-card-actions">
          <button
            className="job-card-details-toggle"
            type="button"
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            onClick={() => setIsExpanded((expanded) => !expanded)}
          >
            {isExpanded ? 'Hide role details' : 'View role details'}
            <motion.span
              aria-hidden="true"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={reduceMotion ? { duration: 0 } : detailsTransition}
            >
              ▾
            </motion.span>
          </button>
          {jobPositionId ? (
            <ApplicationModal
              jobPositionId={jobPositionId}
              jobTitle={career.title}
              targetDepartment={career.department}
            />
          ) : null}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id={detailsId}
            className="job-card-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : detailsTransition}
          >
            <div className="job-card-details-content">
              {showResponsibilitiesHeading ? (
                <h4>Key Responsibilities</h4>
              ) : null}
              <CareerDescription career={career} />
              {jobPositionId ? (
                <Link
                  className="job-card-full-description"
                  href={`/careers/${jobPositionId}`}
                >
                  View full role description <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
