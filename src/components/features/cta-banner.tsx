type CTABannerProps = {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  variant?: 'default' | 'industries' | 'services';
};

export default function CTABanner({
  title,
  description,
  buttonLabel = 'Get Started',
  buttonHref = '/contact',
  variant = 'default',
}: CTABannerProps) {
  return (
    <section
      className={
        variant === 'default'
          ? 'cta-banner'
          : `cta-banner cta-banner--${variant}`
      }
    >
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <a href={buttonHref}>{buttonLabel}</a>
    </section>
  );
}
