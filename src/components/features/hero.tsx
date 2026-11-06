import Link from 'next/link';
import PageBreadcrumbs from './page-breadcrumbs';
import Button from '../ui/button';

type HeroAction = {
  label: string;
  href: string;
};

type Breadcrumb = {
  label: string;
  href?: string;
};

type HeroProps = {
  breadcrumbs?: readonly Breadcrumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
};

export default function Hero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: HeroProps) {
  return (
    <section className="hero">
      {breadcrumbs?.length ? (
        <nav className="hero-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            {breadcrumbs.map((breadcrumb, index) => {
              const isCurrentPage = index === breadcrumbs.length - 1;

              return (
                <li key={`${breadcrumb.label}-${index}`}>
                  {breadcrumb.href && !isCurrentPage ? (
                    <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                  ) : (
                    <span aria-current="page">{breadcrumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : (
        <PageBreadcrumbs />
      )}
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
      <div>
        {primaryAction ? (
          <Button href={primaryAction.href}>{primaryAction.label}</Button>
        ) : null}
        {secondaryAction ? (
          <Button href={secondaryAction.href} variant="secondary">
            {secondaryAction.label}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
