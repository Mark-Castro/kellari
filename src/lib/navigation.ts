export const serviceCategories = [
  {
    title: 'Strategy, People & Digital Transformation',
    shortTitle: 'Strategy, People & Digital',
    description:
      'Define direction, strengthen your organization and harness data, AI and secure technology.',
    href: '/services/strategy-people-digital',
    services: [
      {
        title: 'Corporate & Business Strategy',
        description:
          'Set clear direction and growth plans to navigate change with confidence.',
      },
      {
        title: 'SME & Growth Advisory',
        description:
          'Practical, growth-stage guidance to help smaller businesses scale sustainably.',
      },
      {
        title: 'People & Organization Consulting',
        description:
          'Talent strategy, organizational design, and workforce planning that align your people with your goals.',
      },
      {
        title: 'Digital & AI Transformation',
        description:
          'Technology adoption strategy and responsible AI integration that improve how you operate.',
      },
      {
        title: 'Data Analytics & Business Intelligence',
        description:
          'Turn your data into insight that supports faster, better-informed decisions.',
      },
      {
        title: 'Cybersecurity Advisory',
        description:
          'Risk assessments and security strategy to protect your organization as it digitizes.',
      },
    ],
  },
  {
    title: 'Financial & Tax Advisory',
    shortTitle: 'Financial & Tax',
    description:
      'Manage compliance, plan with confidence and protect long-term value.',
    href: '/services/financial-tax',
    services: [
      {
        title: 'Tax Advisory & Compliance',
        description:
          'Stay compliant and plan efficiently as tax requirements change.',
      },
      {
        title: 'Asset & Wealth Management Advisory',
        description:
          'Guidance to grow, protect and manage assets over the long term.',
      },
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Forecasting, budgeting and risk management for sound financial decisions.',
      },
      {
        title: 'Bookkeeping & Financial Reporting Support',
        description:
          'Accurate records and timely reporting that keep your finances in order.',
      },
    ],
  },
  {
    title: 'Sustainability & Public Impact',
    shortTitle: 'Sustainability & Public Impact',
    description:
      'Meet ESG expectations and modernize public service delivery.',
    href: '/services/sustainability-public-impact',
    services: [
      {
        title: 'Sustainability & ESG Consulting',
        description:
          'Climate risk, ESG reporting, and sustainable operating models.',
      },
      {
        title: 'Public Sector & Government Advisory',
        description:
          'Service delivery and governance modernization support.',
      },
    ],
  },
  {
    title: 'Creative, Marketing & Communications',
    shortTitle: 'Creative & Communications',
    description:
      'Build a credible brand and engage the audiences that matter.',
    href: '/services/creative-marketing-communications',
    services: [
      {
        title: 'Graphic Design & Brand Identity',
        description:
          'Distinctive visual identities and design that communicate who you are.',
      },
      {
        title: 'Website Development & UX/UI Design',
        description:
          'Websites that look professional, work seamlessly, and are easy to use.',
      },
      {
        title: 'Public Relations',
        description:
          'Strategic communications that build and protect your reputation.',
      },
      {
        title: 'Digital Marketing & Campaign Management',
        description:
          'Targeted campaigns that reach the right audiences and deliver measurable results.',
      },
      {
        title: 'SEO Content Writing',
        description:
          'Search-optimized content that improves visibility and engages readers.',
      },
      {
        title: 'Social Media & Digital Communication Consulting',
        description:
          'Social and digital strategies that grow engagement and strengthen your brand.',
      },
      {
        title: 'Market Research & Consumer Insights',
        description:
          'Research that reveals what your customers need and how your market is moving.',
      },
    ],
  },
] as const;

export function getServiceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getServiceHref(title: string) {
  return `/services/${getServiceSlug(title)}`;
}

export function getServiceBySlug(slug: string) {
  for (const category of serviceCategories) {
    const service = category.services.find(
      (item) => getServiceSlug(item.title) === slug,
    );
    if (service) return { category, service };
  }

  return undefined;
}

export const industryClusters = [
  {
    id: 'financial-systems',
    title: 'Financial Systems',
    description:
      'Supporting financial institutions as regulation, technology and client expectations reshape the sector.',
    industries: [
      {
        id: 'financial-services',
        title: 'Financial Services',
        description:
          'Strategy, risk, compliance, digital and communications advisory for financial institutions.',
      },
    ],
  },
  {
    id: 'health-public-social-impact',
    title: 'Health, Public & Social Impact',
    description:
      'Helping organizations that deliver essential services to communities operate effectively and sustainably.',
    industries: [
      {
        id: 'healthcare-life-sciences',
        title: 'Healthcare & Life Sciences',
        description:
          'Strategy, operations, digital, financial and communications support for healthcare and life-sciences organizations.',
      },
      {
        id: 'public-sector-government',
        title: 'Public Sector & Government',
        description:
          'Governance, service-delivery, digital and communications advisory for public institutions.',
      },
      {
        id: 'education-social-support',
        title: 'Education & Social Support',
        description:
          'Strategy, operations, funding-readiness and communications support for education and social-impact organizations.',
      },
    ],
  },
  {
    id: 'infrastructure-resources',
    title: 'Infrastructure & Resources',
    description:
      'Advising the organizations that build, power and move economies on long-term investment, resilience and sustainability.',
    industries: [
      {
        id: 'energy-utilities-natural-resources',
        title: 'Energy, Utilities & Natural Resources',
        description:
          'Strategy, financial, ESG and stakeholder-communications advisory for energy, utilities and natural-resource organizations.',
      },
      {
        id: 'real-estate-infrastructure',
        title: 'Real Estate & Infrastructure',
        description:
          'Investment, financial, sustainability and marketing advisory for real-estate and infrastructure organizations.',
      },
      {
        id: 'transportation-logistics-travel-hospitality',
        title: 'Transportation, Logistics, Travel & Hospitality',
        description:
          'Strategy, digital, financial and marketing advisory for organizations that move people and goods and welcome guests.',
      },
    ],
  },
  {
    id: 'consumer-technology',
    title: 'Consumer & Technology',
    description:
      'Guiding consumer and technology businesses through fast-moving markets where customer attention is hard won.',
    industries: [
      {
        id: 'consumer-retail-personal-consumer-goods',
        title: 'Consumer, Retail & Personal/Consumer Goods',
        description:
          'Market insight, brand, digital and financial advisory for retailers and consumer-goods companies.',
      },
      {
        id: 'technology-media-telecommunications',
        title: 'Technology, Media & Telecommunications',
        description:
          'Growth, digital, security, financial and communications advisory for technology, media and telecoms companies.',
      },
    ],
  },
  {
    id: 'growth-stage-professional',
    title: 'Growth-Stage & Professional',
    description:
      'Equipping growing businesses and professional firms with the structure, finance and visibility to scale.',
    industries: [
      {
        id: 'smes-startups-professional-services',
        title: 'SMEs, Startups & Professional Services',
        description:
          'End-to-end support for growing businesses and professional firms, from strategy and finance to branding and marketing.',
      },
    ],
  },
] as const;
