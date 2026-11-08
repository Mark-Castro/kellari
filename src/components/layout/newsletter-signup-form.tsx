type MailchimpFormConfig = {
  action: string;
  audienceId: string;
  userId: string;
};

function getMailchimpFormConfig(): MailchimpFormConfig | null {
  const configuredUrl = process.env.NEXT_PUBLIC_MAILCHIMP_SIGNUP_FORM_URL?.trim();
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    if (
      url.protocol !== 'https:' ||
      !/^[a-z0-9-]+\.list-manage\.com$/i.test(url.hostname)
    ) {
      return null;
    }

    const userId = url.searchParams.get('u');
    const audienceId = url.searchParams.get('id');
    if (
      !userId ||
      !audienceId ||
      !/^[a-z0-9]+$/i.test(userId) ||
      !/^[a-z0-9]+$/i.test(audienceId)
    ) {
      return null;
    }

    const action = new URL('/subscribe/post', `https://gmail.${url.hostname}`);
    action.searchParams.set('u', userId);
    action.searchParams.set('id', audienceId);

    return { action: action.toString(), audienceId, userId };
  } catch {
    return null;
  }
}

export default function NewsletterSignupForm() {
  const formConfig = getMailchimpFormConfig();

  if (!formConfig) {
    return (
      <p className="footer-newsletter-error" role="status">
        Newsletter signup is temporarily unavailable. Please try again later.
      </p>
    );
  }

  return (
    <form
      className="footer-newsletter"
      action={formConfig.action}
      method="post"
      target="_blank"
      rel="noopener"
      aria-label="Subscribe to Kelari Group LLC insights"
    >
      <label className="visually-hidden" htmlFor="footer-newsletter-email">
        Email address
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        name="MERGE0"
        autoComplete="email"
        placeholder="Your email address"
        maxLength={254}
        required
      />
      <div className="mailchimp-honeypot" aria-hidden="true">
        <label htmlFor="footer-newsletter-name">Leave this field empty</label>
        <input
          id="footer-newsletter-name"
          type="text"
          name="b_name"
          tabIndex={-1}
          autoComplete="off"
        />
        <label htmlFor="footer-newsletter-email-check">
          Leave this field empty
        </label>
        <input
          id="footer-newsletter-email-check"
          type="email"
          name="b_email"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="u" value={formConfig.userId} />
      <input type="hidden" name="id" value={formConfig.audienceId} />
      <input type="hidden" name="mc_signupsource" value="hosted" />
      <button
        className="footer-newsletter-submit"
        type="submit"
        name="submit"
        value="Subscribe"
      >
        Subscribe
      </button>
      <p className="footer-newsletter-note">
        By subscribing, you agree to receive Kelari Group LLC email updates.
        Mailchimp will open in a new tab and send a confirmation email. You can
        unsubscribe at any time. See our{' '}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
    </form>
  );
}
