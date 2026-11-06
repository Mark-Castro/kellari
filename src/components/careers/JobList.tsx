'use client';

import { useMemo, useState } from 'react';
import type { StrapiCareer } from '../../lib/strapi';
import JobCard from './JobCard';

const departmentFilters = [
  'All',
  'Financial & Tax',
  'Strategy & Digital',
  'Creative & Marketing',
] as const;

type DepartmentFilter = (typeof departmentFilters)[number];

function matchesDepartment(department: string, filter: DepartmentFilter) {
  if (filter === 'All') return true;

  const value = department.toLowerCase();
  switch (filter) {
    case 'Financial & Tax':
      return value.includes('financial') || value.includes('tax');
    case 'Strategy & Digital':
      return value.includes('strategy') || value.includes('digital');
    case 'Creative & Marketing':
      return (
        value.includes('creative') ||
        value.includes('marketing') ||
        value.includes('communication') ||
        value.includes('comms')
      );
  }
}

export default function JobList({ careers }: { careers: StrapiCareer[] }) {
  const [departmentFilter, setDepartmentFilter] =
    useState<DepartmentFilter>('All');
  const [employmentFilter, setEmploymentFilter] = useState('All');

  const employmentTypes = useMemo(
    () =>
      [...new Set(careers.map((career) => career.employmentType).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b)),
    [careers],
  );
  const filteredCareers = careers.filter(
    (career) =>
      matchesDepartment(career.department, departmentFilter) &&
      (employmentFilter === 'All' ||
        career.employmentType === employmentFilter),
  );

  return (
    <>
      <div
        className="job-filters"
        role="group"
        aria-label="Filter open roles"
      >
        <div
          className="job-department-filters"
          role="group"
          aria-label="Filter by department"
        >
          {departmentFilters.map((filter) => (
            <button
              key={filter}
              className="job-filter-pill"
              type="button"
              aria-pressed={departmentFilter === filter}
              onClick={() => setDepartmentFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className="job-employment-filter">
          <span>Work type</span>
          <select
            value={employmentFilter}
            onChange={(event) => setEmploymentFilter(event.target.value)}
          >
            <option value="All">All work types</option>
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredCareers.length > 0 ? (
        <div className="job-list" aria-live="polite">
          {filteredCareers.map((career) => (
            <JobCard key={career.documentId ?? career.id} career={career} />
          ))}
        </div>
      ) : (
        <p className="job-filter-empty" role="status">
          No roles match these filters. Try another department or work type.
        </p>
      )}
    </>
  );
}
