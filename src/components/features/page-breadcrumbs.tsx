'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  getServiceBySlug,
  industryClusters,
  serviceCategories,
} from '../../lib/navigation';

const routeLabels: Record<string, string> = {
  about: 'About',
  careers: 'Careers',
  contact: 'Contact',
  industries: 'Industries',
  insights: 'Insights',
  services: 'Services',
  'terms-of-service': 'Terms of Service',
  'privacy-policy': 'Privacy Policy',
  'strategy-people-digital': serviceCategories[0].shortTitle,
  'financial-tax': serviceCategories[1].shortTitle,
  'sustainability-public-impact': serviceCategories[2].shortTitle,
  'creative-marketing-communications': serviceCategories[3].shortTitle,
};

function humanizeSegment(segment: string) {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getIndustryLabel(segment: string) {
  for (const cluster of industryClusters) {
    const industry = cluster.industries.find(
      (item) => item.id === segment,
    );
    if (industry) return industry.title;
    if (cluster.id === segment) return cluster.title;
  }
  return undefined;
}

function getSegmentLabel(segments: string[], index: number) {
  const segment = segments[index];
  if (!segment) return 'Home';

  if (segments[0] === 'careers' && index === 1) return 'Role details';
  if (segments[0] === 'careers' && index === 2) return 'Apply';

  if (segments[0] === 'services') {
    const service = getServiceBySlug(segment);
    if (service) return service.service.title;
  }

  if (segments[0] === 'industries' && index === 1) {
    return getIndustryLabel(segment) ?? humanizeSegment(segment);
  }

  return routeLabels[segment] ?? humanizeSegment(segment);
}

export default function PageBreadcrumbs() {
  const pathname = usePathname();
  const segments = (pathname ?? '/').split('/').filter(Boolean);

  return (
    <nav className="hero-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          {segments.length ? (
            <Link href="/">Home</Link>
          ) : (
            <span aria-current="page">Home</span>
          )}
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isCurrentPage = index === segments.length - 1;
          const label = getSegmentLabel(segments, index);

          return (
            <li key={href}>
              {isCurrentPage ? (
                <span aria-current="page">{label}</span>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
