import Button from '../ui/button';

type HeroAction = {
  label: string;
  href: string;
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
};

export default function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
}: HeroProps) {
  return (
    <section className="hero">
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
