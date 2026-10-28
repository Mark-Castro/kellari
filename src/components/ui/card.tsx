import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  children?: ReactNode;
};

export default function Card({
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: CardProps) {
  return (
    <article>
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
      {actionHref && actionLabel ? <a href={actionHref}>{actionLabel}</a> : null}
    </article>
  );
}
