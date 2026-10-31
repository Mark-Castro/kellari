export const serviceCategories = [
  {
    title: 'Strategy, People & Digital Transformation',
    shortTitle: 'Strategy, People & Digital',
    description:
      'Align strategy, organization, and technology to build resilient growth.',
    href: '/services/strategy-people-digital',
    services: [
      {
        title: 'Corporate & Business Strategy',
        description:
          'Set direction and build growth plans for organizations navigating change.',
      },
      {
        title: 'SME & Growth Advisory',
        description:
          'Practical guidance for smaller businesses building their next stage of growth.',
      },
      {
        title: 'People & Organization Consulting',
        description:
          'Connect talent strategy, organization design, and workforce planning.',
      },
      {
        title: 'Digital & AI Transformation',
        description:
          'Shape technology adoption and responsible AI integration around business goals.',
      },
      {
        title: 'Data Analytics & Business Intelligence',
        description:
          'Turn organizational data into clearer insight for decisions and performance.',
      },
      {
        title: 'Cybersecurity Advisory',
        description:
          'Understand cyber risks and strengthen governance, readiness, and resilience.',
      },
    ],
  },
  {
    title: 'Financial & Tax Advisory',
    shortTitle: 'Financial & Tax',
    description:
      'Make informed financial decisions with connected tax, planning, and reporting support.',
    href: '/services/financial-tax',
    services: [
      {
        title: 'Tax Advisory & Compliance',
        description:
          'Navigate tax planning and compliance obligations with informed support.',
      },
      {
        title: 'Asset & Wealth Management Advisory',
        description:
          'Clarify asset and wealth management priorities with a considered advisory approach.',
      },
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Assess financial priorities, planning needs, and key areas of risk.',
      },
      {
        title: 'Bookkeeping & Financial Reporting Support',
        description:
          'Improve the consistency and clarity of routine bookkeeping and financial reporting.',
      },
    ],
  },
  {
    title: 'Sustainability & Public Impact',
    shortTitle: 'Sustainability & Public Impact',
    description:
      'Advance sustainable operations and public services with practical, measurable action.',
    href: '/services/sustainability-public-impact',
    services: [
      {
        title: 'Sustainability & ESG Consulting',
        description:
          'Address climate risk, ESG reporting, and sustainable operating models.',
      },
      {
        title: 'Public Sector & Government Advisory',
        description:
          'Support service-delivery improvement and governance modernization.',
      },
    ],
  },
  {
    title: 'Creative, Marketing & Communications',
    shortTitle: 'Creative & Communications',
    description:
      'Build clear brands and communications that connect your work with its audience.',
    href: '/services/creative-marketing-communications',
    services: [
      {
        title: 'Graphic Design & Brand Identity',
        description:
          'Create visual identities and design systems that express your organization clearly.',
      },
      {
        title: 'Website Development & UX/UI Design',
        description:
          'Plan and build useful digital experiences, from user journeys to website delivery.',
      },
      {
        title: 'Public Relations',
        description:
          'Strengthen stakeholder relationships and communicate with clarity and care.',
      },
      {
        title: 'Digital Marketing & Campaign Management',
        description:
          'Plan and coordinate digital campaigns around audience and business objectives.',
      },
      {
        title: 'SEO Content Writing',
        description:
          'Produce useful, search-aware content grounded in the needs of your audience.',
      },
      {
        title: 'Social Media & Digital Communication Consulting',
        description:
          'Build a considered approach to social channels and ongoing digital communication.',
      },
      {
        title: 'Market Research & Consumer Insights',
        description:
          'Understand customer needs, market context, and opportunities for growth.',
      },
    ],
  },
] as const;

export const industryClusters = [
  {
    id: 'financial-systems',
    title: 'Financial Systems',
    description: 'Organizations shaping and supporting financial services.',
    industries: [
      {
        id: 'financial-services',
        title: 'Financial Services',
        description: 'Financial institutions and the systems that support them.',
      },
    ],
  },
  {
    id: 'health-public-social-impact',
    title: 'Health, Public & Social Impact',
    description: 'Services that support healthier, stronger communities.',
    industries: [
      {
        id: 'healthcare-life-sciences',
        title: 'Healthcare & Life Sciences',
        description: 'Healthcare providers, life sciences, and related organizations.',
      },
      {
        id: 'public-sector-government',
        title: 'Public Sector & Government',
        description: 'Government bodies and public service organizations.',
      },
      {
        id: 'education-social-support',
        title: 'Education & Social Support',
        description: 'Education providers and organizations delivering social support.',
      },
    ],
  },
  {
    id: 'infrastructure-resources',
    title: 'Infrastructure & Resources',
    description: 'The assets, networks, and resources communities rely on.',
    industries: [
      {
        id: 'energy-utilities-natural-resources',
        title: 'Energy, Utilities & Natural Resources',
        description: 'Organizations providing essential energy, utilities, and resources.',
      },
      {
        id: 'real-estate-infrastructure',
        title: 'Real Estate & Infrastructure',
        description: 'Organizations developing and managing places and infrastructure.',
      },
      {
        id: 'transportation-logistics-travel-hospitality',
        title: 'Transportation, Logistics, Travel & Hospitality',
        description: 'Organizations moving people and goods and welcoming travelers.',
      },
    ],
  },
  {
    id: 'consumer-technology',
    title: 'Consumer & Technology',
    description: 'Businesses serving consumers and connecting a digital world.',
    industries: [
      {
        id: 'consumer-retail-personal-consumer-goods',
        title: 'Consumer, Retail & Personal/Consumer Goods',
        description: 'Consumer-facing brands, retailers, and product businesses.',
      },
      {
        id: 'technology-media-telecommunications',
        title: 'Technology, Media & Telecommunications',
        description: 'Organizations building technology and delivering media and connectivity.',
      },
    ],
  },
  {
    id: 'growth-stage-professional',
    title: 'Growth-Stage & Professional',
    description: 'Ambitious smaller businesses and professional organizations.',
    industries: [
      {
        id: 'smes-startups-professional-services',
        title: 'SMEs, Startups & Professional Services',
        description: 'Growing businesses, startups, and professional service firms.',
      },
    ],
  },
] as const;
