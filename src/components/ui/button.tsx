import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({
  children,
  href,
  variant = 'primary',
}: ButtonProps) {
  const classes = `button button--${variant}`;

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}
