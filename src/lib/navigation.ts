export const serviceCategories = [
  {
    title: 'Strategy, People & Digital Transformation',
    shortTitle: 'Strategy, People & Digital',
    href: '/services/strategy-people-digital',
    services: [
      'Corporate & Business Strategy',
      'SME & Growth Advisory',
      'People & Organization Consulting',
      'Digital & AI Transformation',
      'Data Analytics & Business Intelligence',
      'Cybersecurity Advisory',
    ],
  },
  {
    title: 'Financial & Tax Advisory',
    shortTitle: 'Financial & Tax',
    href: '/services/financial-tax',
    services: [
      'Tax Advisory & Compliance',
      'Asset & Wealth Management Advisory',
      'Financial Planning & Risk Advisory',
      'Bookkeeping & Financial Reporting Support',
    ],
  },
  {
    title: 'Sustainability & Public Impact',
    shortTitle: 'Sustainability & Public Impact',
    href: '/services/sustainability-public-impact',
    services: [
      'Sustainability & ESG Consulting',
      'Public Sector & Government Advisory',
    ],
  },
  {
    title: 'Creative, Marketing & Communications',
    shortTitle: 'Creative & Communications',
    href: '/services/creative-marketing-communications',
    services: [
      'Graphic Design & Brand Identity',
      'Website Development & UX/UI Design',
      'Public Relations',
      'Digital Marketing & Campaign Management',
      'SEO Content Writing',
      'Social Media & Digital Communication Consulting',
      'Market Research & Consumer Insights',
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
