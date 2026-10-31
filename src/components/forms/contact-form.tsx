'use client';

import { useState, type FormEvent } from 'react';
import { industryClusters, serviceCategories } from '../../lib/navigation';

const formspreeEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
  'https://formspree.io/f/xljjlvzv';

export default function ContactForm() {
  const [serviceCategoryId, setServiceCategoryId] = useState('');
  const [serviceTitle, setServiceTitle] = useState('');
  const [industryClusterId, setIndustryClusterId] = useState('');
  const [industryId, setIndustryId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [submissionSucceeded, setSubmissionSucceeded] = useState(false);

  const serviceCategory = serviceCategories.find(
    (category) => category.href === serviceCategoryId,
  );
  const industryCluster = industryClusters.find(
    (cluster) => cluster.id === industryClusterId,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    setSubmitting(true);
    setStatusMessage('');
    setSubmissionSucceeded(false);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        setStatusMessage(
          'Your inquiry could not be sent. Please try again or contact us directly.',
        );
        return;
      }

      form.reset();
      setServiceCategoryId('');
      setServiceTitle('');
      setIndustryClusterId('');
      setIndustryId('');
      setSubmissionSucceeded(true);
      setStatusMessage('Thank you. Your inquiry has been sent to the Kellari team.');
    } catch {
      setStatusMessage(
        'We could not connect to the form service. Please check your connection and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="contact-form"
      action={formspreeEndpoint}
      method="POST"
      onSubmit={handleSubmit}
    >
      <fieldset disabled={submitting}>
        <legend>Contact form</legend>
        <label>
          Name
          <input
            autoComplete="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          Service category
          <select
            name="service_category"
            value={serviceCategoryId}
            onChange={(event) => {
              setServiceCategoryId(event.target.value);
              setServiceTitle('');
            }}
            required
          >
            <option value="">Select a service category</option>
            {serviceCategories.map((category) => (
              <option key={category.href} value={category.href}>
                {category.shortTitle}
              </option>
            ))}
          </select>
        </label>
        <label>
          Service
          <select
            name="service"
            value={serviceTitle}
            onChange={(event) => setServiceTitle(event.target.value)}
            disabled={!serviceCategory}
            required
          >
            <option value="">
              {serviceCategory ? 'Select a service' : 'Select a category first'}
            </option>
            {serviceCategory?.services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sector group
          <select
            name="sector_group"
            value={industryClusterId}
            onChange={(event) => {
              setIndustryClusterId(event.target.value);
              setIndustryId('');
            }}
            required
          >
            <option value="">Select a sector group</option>
            {industryClusters.map((cluster) => (
              <option key={cluster.id} value={cluster.id}>
                {cluster.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Industry
          <select
            name="industry"
            value={industryId}
            onChange={(event) => setIndustryId(event.target.value)}
            disabled={!industryCluster}
            required
          >
            <option value="">
              {industryCluster ? 'Select an industry' : 'Select a sector group first'}
            </option>
            {industryCluster?.industries.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Message
          <textarea
            name="message"
            placeholder="Tell us about your project"
            required
          />
        </label>
        <input
          type="hidden"
          name="department"
          value={serviceCategory?.href.replace('/services/', '') ?? ''}
        />
        <input
          type="hidden"
          name="_subject"
          value={`Kellari inquiry${serviceCategory ? `: ${serviceCategory.shortTitle}` : ''}`}
        />
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="contact-form-honeypot"
        />
        <button type="submit">
          {submitting ? 'Sending inquiry…' : 'Send inquiry'}
        </button>
        <p
          className={`contact-form-status${statusMessage ? (submissionSucceeded ? ' is-success' : ' is-error') : ''}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      </fieldset>
    </form>
  );
}
