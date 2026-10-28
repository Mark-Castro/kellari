type CTABannerProps = {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function CTABanner({
  title,
  description,
  buttonLabel = 'Get Started',
  buttonHref = '/contact',
}: CTABannerProps) {
  return (
    <section>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <a href={buttonHref}>{buttonLabel}</a>
    </section>
  );
}
