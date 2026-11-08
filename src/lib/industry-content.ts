export type IndustryExpertise = {
  title: string;
  description: string;
};

export type IndustryContent = {
  id: string;
  clusterId: string;
  title: string;
  description: string;
  marketToday: readonly string[];
  support: readonly string[];
  clients: string;
  expertise: readonly IndustryExpertise[];
};

export const industryContent: readonly IndustryContent[] = [
  {
    id: 'financial-services',
    clusterId: 'financial-systems',
    title: 'Financial Services',
    description:
      'Strategy, risk, compliance, digital and communications advisory for banks, insurers, microfinance institutions, SACCOs, investment firms and fintechs.',
    marketToday: [
      'Mobile money, digital banking and online lending have made convenience the new standard. Customers expect to open accounts, borrow and pay in minutes from their phones, at any hour.',
      'Fintechs, telecom-led payment platforms and digital lenders compete with established institutions through speed, focused services and lower costs. Banks and insurers are modernizing legacy systems, partnering with technology firms and rethinking customer service.',
      'Regulation is tightening around governance, capital adequacy, anti-money laundering, consumer protection and data privacy. Cyberattacks, fraud and digital identity theft are growing, while economic uncertainty affects credit quality and liquidity.',
      'Investors and regulators increasingly expect climate and ESG risk to be reflected in lending and investment decisions. Leaders must grow customer relationships, modernize operations, stay ahead of regulation and protect trust.',
    ],
    support: [
      'Develop growth and digital strategies that keep institutions competitive.',
      'Strengthen financial planning, risk management and regulatory compliance.',
      'Use data analytics to understand customers and manage risk.',
      'Assess and reduce cyber risk across digital channels.',
      'Build trusted brands and communicate clearly with customers and regulators.',
    ],
    clients:
      'Commercial banks, microfinance institutions, SACCOs, insurers, investment and asset managers, and fintech companies.',
    expertise: [
      {
        title: 'Corporate & Business Strategy',
        description:
          'Growth plans, market positioning and partnerships to compete with fintechs and new entrants.',
      },
      {
        title: 'Digital & AI Transformation',
        description:
          'Modernize legacy systems, digital channels and AI-enabled services such as credit scoring and customer support.',
      },
      {
        title: 'Cybersecurity Advisory',
        description:
          'Assess cyber and fraud risks across digital channels and build practical security strategies.',
      },
      {
        title: 'Data Analytics & Business Intelligence',
        description:
          'Turn customer and transaction data into insight on risk, profitability and customer behavior.',
      },
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Strengthen risk frameworks, forecasting and internal controls to meet regulatory expectations.',
      },
      {
        title: 'Sustainability & ESG Consulting',
        description:
          'Integrate climate and ESG risk into lending, investment and reporting.',
      },
      {
        title: 'Public Relations',
        description:
          'Build trust with customers, regulators and the public, and manage sensitive communications.',
      },
    ],
  },
  {
    id: 'healthcare-life-sciences',
    clusterId: 'health-public-social-impact',
    title: 'Healthcare & Life Sciences',
    description:
      'Strategy, operations, digital, financial and communications support for healthcare providers and life-sciences organizations.',
    marketToday: [
      'Healthcare organizations are being asked to expand access, improve quality and patient outcomes, and keep services affordable while staff, equipment and medicine costs rise.',
      'Telemedicine, electronic health records, digital diagnostics and health apps are moving into everyday practice. They can improve efficiency and patient experience, but require thoughtful adoption, investment and data security.',
      'Staff shortages, burnout and migration of skilled professionals make workforce planning and retention strategic priorities. Patients are better informed and expect clear communication, transparent pricing and respectful service.',
      'Providers and life-sciences companies must meet licensing, quality and patient-data protection standards and demonstrate value to insurers, funders and government partners.',
    ],
    support: [
      'Develop strategies for growth, partnerships and service expansion.',
      'Improve organizational design and workforce planning.',
      'Guide digital health adoption and patient-data protection.',
      'Strengthen financial planning, reporting and cost control.',
      'Communicate clearly with patients, partners and the public.',
    ],
    clients:
      'Hospitals and clinics, diagnostic centres, pharmaceutical and medical-supply companies, health NGOs and health-technology firms.',
    expertise: [
      {
        title: 'Corporate & Business Strategy',
        description:
          'Create service-expansion, partnership and growth strategies for providers and life-sciences companies.',
      },
      {
        title: 'People & Organization Consulting',
        description:
          'Plan the workforce, organizational design and retention strategies for clinical and support staff.',
      },
      {
        title: 'Digital & AI Transformation',
        description:
          'Plan telemedicine, electronic records and digital-health adoption.',
      },
      {
        title: 'Cybersecurity Advisory',
        description:
          'Protect sensitive patient data and support data-protection requirements.',
      },
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Strengthen budgeting, cost control and financial planning for sustainable operations.',
      },
      {
        title: 'Public Relations',
        description:
          'Communicate clearly with patients, partners and the public, including during sensitive situations.',
      },
    ],
  },
  {
    id: 'public-sector-government',
    clusterId: 'health-public-social-impact',
    title: 'Public Sector & Government',
    description:
      'Governance, service-delivery, digital and communications advisory for government bodies and public institutions.',
    marketToday: [
      'Citizens increasingly expect public services to be as fast, transparent and accessible as private services. Long queues, paper-based processes and slow responses are no longer accepted, and public trust depends on visible improvement.',
      'Online service portals, digital payments, e-procurement and data-driven planning are changing how institutions operate. Successful digital government also requires redesigned processes, skilled staff and strong data governance.',
      'Public institutions must balance rising demand with limited revenue and pressure to reduce debt. Programs are expected to show value for money and measurable results.',
      'Oversight bodies, media, development partners and citizens scrutinize spending, procurement and performance. Strong governance and clear communication support legitimacy, while public bodies also address climate resilience, job creation and inclusive growth.',
    ],
    support: [
      'Review and redesign service delivery around citizens’ needs.',
      'Strengthen governance, accountability and institutional capacity.',
      'Plan and support public-sector digital modernization.',
      'Use data to improve planning and measure impact.',
      'Communicate policies and programs clearly to the public.',
    ],
    clients:
      'Government departments, regulatory agencies, state-owned enterprises and development partners.',
    expertise: [
      {
        title: 'Public Sector & Government Advisory',
        description:
          'Redesign service delivery, strengthen governance and build institutional capacity.',
      },
      {
        title: 'Digital & AI Transformation',
        description:
          'Plan digital government services and process modernization.',
      },
      {
        title: 'Data Analytics & Business Intelligence',
        description:
          'Use data to plan programs, allocate resources and measure impact.',
      },
      {
        title: 'People & Organization Consulting',
        description:
          'Support restructuring, capacity building and workforce planning.',
      },
      {
        title: 'Public Relations',
        description:
          'Communicate policies, programs and results clearly to citizens and stakeholders.',
      },
    ],
  },
  {
    id: 'education-social-support',
    clusterId: 'health-public-social-impact',
    title: 'Education & Social Support',
    description:
      'Strategy, operations, funding-readiness and communications support for education providers and social-impact organizations.',
    marketToday: [
      'Demand for education and skills training continues to grow with young populations, changing labor markets and lifelong learning needs. Institutions must expand capacity while maintaining quality and relevance.',
      'Digital and blended learning are now permanent features of education. Learners expect flexible access, online resources and modern facilities, while institutions must invest in technology, train staff and manage data-privacy responsibilities.',
      'Schools and universities face rising costs and competition for students. Non-profits and social organizations compete for limited donor funding, and funders expect evidence of impact, transparent reporting and sound financial management.',
      'Students, parents, donors and partners research organizations online. A clear brand, consistent communication and visible results help build long-term support.',
    ],
    support: [
      'Develop strategic plans for growth and sustainability.',
      'Support digital learning and technology adoption.',
      'Strengthen financial management and donor reporting.',
      'Design impact measurement and ESG reporting.',
      'Build brands and campaigns that attract students, donors and partners.',
    ],
    clients:
      'Schools, universities, colleges and training institutes, NGOs, foundations, faith-based and community organizations.',
    expertise: [
      {
        title: 'Corporate & Business Strategy',
        description:
          'Set direction for growth, quality and long-term sustainability.',
      },
      {
        title: 'Digital & AI Transformation',
        description:
          'Adopt learning platforms and digital tools that support students and staff.',
      },
      {
        title: 'Bookkeeping & Financial Reporting Support',
        description:
          'Maintain accurate accounts and donor-ready financial reporting.',
      },
      {
        title: 'Sustainability & ESG Consulting',
        description:
          'Develop impact measurement and ESG reporting for funders and boards.',
      },
      {
        title: 'Digital Marketing & Campaign Management',
        description:
          'Attract students, donors, volunteers and partners through focused campaigns.',
      },
      {
        title: 'Graphic Design & Brand Identity',
        description:
          'Build a clear, credible brand that reflects the organization’s mission.',
      },
    ],
  },
  {
    id: 'energy-utilities-natural-resources',
    clusterId: 'infrastructure-resources',
    title: 'Energy, Utilities & Natural Resources',
    description:
      'Strategy, financial, ESG and stakeholder-communications advisory for energy, utilities and natural-resource organizations.',
    marketToday: [
      'The energy sector is in a major transition. Investment in solar, wind, geothermal and other renewable sources is growing alongside off-grid and mini-grid solutions that bring power to underserved communities.',
      'Traditional energy, utilities and extractive businesses remain essential, but face pressure to reduce emissions, improve efficiency and demonstrate responsible practices. Investors, lenders and regulators increasingly link financing to environmental and social performance.',
      'Large, long-term, capital-intensive projects must manage complex financing, regulatory approvals, construction risk and price volatility. Smart meters, digital monitoring, analytics and automation can improve operations and customer service.',
      'Land use, environmental impact and benefit-sharing are sensitive community issues. Open engagement and clear communication with communities and governments can be critical to project success.',
    ],
    support: [
      'Shape strategies for the energy transition and new markets.',
      'Model investments and manage financial and operational risk.',
      'Develop ESG strategies and climate-risk reporting.',
      'Use data and digital tools to improve operational efficiency.',
      'Manage stakeholder and community communications.',
    ],
    clients:
      'Power producers, renewable-energy developers, utilities, oil, gas and mining companies, and water and environmental-services providers.',
    expertise: [
      {
        title: 'Sustainability & ESG Consulting',
        description:
          'Plan energy transitions, assess climate risk and report ESG performance for investors and lenders.',
      },
      {
        title: 'Corporate & Business Strategy',
        description:
          'Develop market-entry, diversification and long-term growth strategies.',
      },
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Model finances, assess project risk and plan long-term investments.',
      },
      {
        title: 'Data Analytics & Business Intelligence',
        description:
          'Use operational data to reduce losses, plan maintenance and improve efficiency.',
      },
      {
        title: 'Public Relations',
        description:
          'Support stakeholder and community engagement and communications on sensitive projects.',
      },
    ],
  },
  {
    id: 'real-estate-infrastructure',
    clusterId: 'infrastructure-resources',
    title: 'Real Estate & Infrastructure',
    description:
      'Investment, financial, sustainability and marketing advisory for real-estate and infrastructure organizations.',
    marketToday: [
      'Rapid urbanization and population growth are driving demand for housing, offices, retail space, industrial parks and public infrastructure such as roads, water and transport systems.',
      'High construction costs, interest-rate changes and long project timelines challenge developers, while investors expect clear returns and managed risk. Public-private partnerships and real-estate investment trusts are among the funding models in use.',
      'Buyers and tenants expect quality design, reliable amenities, security and increasingly energy-efficient, sustainable buildings. Land, planning approvals, building codes and property taxation add complexity.',
      'Online listings, virtual tours and social media have changed property marketing. Developers compete on brand and reputation as well as location and price.',
    ],
    support: [
      'Assess market opportunities and plan developments.',
      'Build financial models, forecasts and risk assessments.',
      'Integrate sustainability and ESG into projects.',
      'Plan tax-efficient structures for property and assets.',
      'Market developments with strong brands and campaigns.',
    ],
    clients:
      'Property developers, real-estate investors and funds, construction firms, facility managers and infrastructure project sponsors.',
    expertise: [
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Prepare feasibility studies, financial models and risk assessments for developments.',
      },
      {
        title: 'Tax Advisory & Compliance',
        description:
          'Plan tax-efficient structures for property, projects and investment vehicles.',
      },
      {
        title: 'Asset & Wealth Management Advisory',
        description:
          'Support long-term planning for property portfolios and real-estate investments.',
      },
      {
        title: 'Sustainability & ESG Consulting',
        description:
          'Integrate green-building and sustainability standards into projects.',
      },
      {
        title: 'Market Research & Consumer Insights',
        description:
          'Analyze demand, pricing and buyer needs before and during development.',
      },
      {
        title: 'Digital Marketing & Campaign Management',
        description:
          'Market and lease property through effective digital channels.',
      },
    ],
  },
  {
    id: 'transportation-logistics-travel-hospitality',
    clusterId: 'infrastructure-resources',
    title: 'Transportation, Logistics, Travel & Hospitality',
    description:
      'Strategy, digital, financial and marketing advisory for organizations that move people and goods and welcome guests.',
    marketToday: [
      'E-commerce and regional trade have made fast, reliable logistics a competitive advantage. Real-time tracking, predictable delivery and flexible options put pressure on transport and logistics firms to modernize.',
      'Fuel, vehicles, equipment, infrastructure constraints and currency movements affect margins, making efficient operations and careful financial planning essential.',
      'Travel and hospitality businesses compete on customer experience. Booking platforms, reviews and social media mean poor experiences can quickly spread, while great service builds loyalty.',
      'Demand is seasonal and sensitive to economic conditions, security and global events. Data can improve forecasting, pricing and cost control. Sustainability is increasingly important to travelers and corporate clients.',
    ],
    support: [
      'Develop growth strategies and optimize operations.',
      'Adopt digital tools for tracking, bookings and customer service.',
      'Use data to forecast demand and improve efficiency.',
      'Strengthen cost control and financial planning.',
      'Build brands and campaigns that win customers and protect reputation.',
    ],
    clients:
      'Logistics and freight companies, transport operators, airlines and tour operators, hotels, resorts and restaurant groups.',
    expertise: [
      {
        title: 'Corporate & Business Strategy',
        description:
          'Develop growth, expansion and operational-efficiency strategies.',
      },
      {
        title: 'Digital & AI Transformation',
        description:
          'Adopt digital tools for tracking, booking, scheduling and customer service.',
      },
      {
        title: 'Data Analytics & Business Intelligence',
        description:
          'Improve demand forecasting, route and capacity planning, and performance reporting.',
      },
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Support cost control, pricing and financial planning in a volatile market.',
      },
      {
        title: 'Digital Marketing & Campaign Management',
        description:
          'Build campaigns that fill seats, rooms and capacity across seasons.',
      },
      {
        title: 'Social Media & Digital Communication Consulting',
        description:
          'Manage online reputation, reviews and customer engagement.',
      },
    ],
  },
  {
    id: 'consumer-retail-personal-consumer-goods',
    clusterId: 'consumer-technology',
    title: 'Consumer, Retail & Personal/Consumer Goods',
    description:
      'Market insight, brand, digital and financial advisory for retailers and consumer-goods companies.',
    marketToday: [
      'Consumers move between physical shops, websites, social media and mobile apps and expect a consistent experience. Social commerce, influencer marketing and mobile payments have changed how people discover and buy products.',
      'Local and international brands, marketplaces and direct-to-consumer businesses compete for the same customers, often on price. Standing out requires a clear brand, strong value and a deep understanding of customers.',
      'Rising raw material, transport and labor costs squeeze margins, while customers resist price increases. Supply chains, pricing and stock management are critical.',
      'Preferences shift quickly, and consumers increasingly consider quality, health, ethical sourcing and sustainability. Customer data helps brands personalize offers, improve loyalty and make better product decisions.',
    ],
    support: [
      'Research customer needs, trends and competitors.',
      'Build and refresh brands that stand out.',
      'Plan and run digital and social campaigns.',
      'Use data to improve pricing, stock and customer retention.',
      'Strengthen financial planning and growth strategy.',
    ],
    clients:
      'Retailers, e-commerce businesses, fast-moving consumer-goods manufacturers and distributors, and beauty, fashion and lifestyle brands.',
    expertise: [
      {
        title: 'Market Research & Consumer Insights',
        description:
          'Understand customers, trends and competitors to guide product and pricing decisions.',
      },
      {
        title: 'Graphic Design & Brand Identity',
        description:
          'Create distinctive brands and packaging that stand out on shelves and screens.',
      },
      {
        title: 'Digital Marketing & Campaign Management',
        description:
          'Drive sales across online and offline channels.',
      },
      {
        title: 'Social Media & Digital Communication Consulting',
        description:
          'Build social strategies, influencer partnerships and engaged communities.',
      },
      {
        title: 'Data Analytics & Business Intelligence',
        description:
          'Develop insight on sales, stock and customer loyalty.',
      },
      {
        title: 'Corporate & Business Strategy',
        description:
          'Plan growth, expansion and channel strategies.',
      },
    ],
  },
  {
    id: 'technology-media-telecommunications',
    clusterId: 'consumer-technology',
    title: 'Technology, Media & Telecommunications',
    description:
      'Growth, digital, security, financial and communications advisory for technology, media and telecoms companies.',
    marketToday: [
      'Technology, media and telecoms businesses operate in fast-moving markets. New products, platforms and competitors appear constantly, and customer behavior can change quickly.',
      'Artificial intelligence is transforming software, content creation and network management. Companies must decide where AI creates value and how to adopt it responsibly.',
      'These businesses hold large volumes of customer data and are frequent cyber targets. Data-protection laws are strengthening, and a breach can cause lasting reputational damage.',
      'Startups and established firms compete for skilled engineers and product specialists. Investors look for clear strategies, strong governance and a credible path to profitability, while media businesses adapt to streaming, social and on-demand audiences.',
    ],
    support: [
      'Shape growth, product and market-entry strategies.',
      'Integrate AI and strengthen data capabilities.',
      'Assess cyber risk and data-protection compliance.',
      'Prepare for investment with sound financial planning.',
      'Build brand visibility and thought leadership.',
    ],
    clients:
      'Software and technology companies, telecoms operators, digital-media and content businesses, and technology startups.',
    expertise: [
      {
        title: 'Digital & AI Transformation',
        description:
          'Identify where AI adds value and integrate it into products and operations.',
      },
      {
        title: 'Cybersecurity Advisory',
        description:
          'Assess cyber risk and support data-protection compliance.',
      },
      {
        title: 'Corporate & Business Strategy',
        description:
          'Plan products, market entry and business growth.',
      },
      {
        title: 'People & Organization Consulting',
        description:
          'Develop talent strategies and organizational design for fast-growing teams.',
      },
      {
        title: 'Financial Planning & Risk Advisory',
        description:
          'Build financial models and plans that prepare companies for investment.',
      },
      {
        title: 'Public Relations',
        description:
          'Strengthen brand visibility, launches and executive thought leadership.',
      },
      {
        title: 'SEO Content Writing',
        description:
          'Build authority and grow online audiences with search-focused content.',
      },
    ],
  },
  {
    id: 'smes-startups-professional-services',
    clusterId: 'growth-stage-professional',
    title: 'SMEs, Startups & Professional Services',
    description:
      'End-to-end support for growing businesses and professional firms, from strategy and finance to branding and marketing.',
    marketToday: [
      'Small and medium-sized enterprises and startups drive job creation and innovation, yet many struggle to grow beyond their early stages. Founders often wear many hats and lack specialist support.',
      'Access to finance is a persistent barrier. Lenders and investors want clear business plans, accurate financial records and evidence of good governance.',
      'Cash flow and compliance are everyday challenges. Late payments, tax obligations and regulatory requirements can quickly overwhelm a small team.',
      'Customers search online before buying, making a professional brand, working website and active digital presence essential. Professional firms face similar pressures as they compete for clients, run efficiently and invest in technology while maintaining trust and quality.',
    ],
    support: [
      'Build business plans, growth roadmaps and investor readiness.',
      'Keep books accurate and tax affairs compliant.',
      'Structure teams and processes for growth.',
      'Create brands, websites and marketing that win clients.',
      'Provide ongoing advisory support as the business scales.',
    ],
    clients:
      'Startups, SMEs, family businesses, and professional firms such as law, accounting, consulting and architecture practices.',
    expertise: [
      {
        title: 'SME & Growth Advisory',
        description:
          'Develop business plans, growth roadmaps and investor readiness.',
      },
      {
        title: 'Bookkeeping & Financial Reporting Support',
        description:
          'Maintain accurate books and reporting without a full in-house finance team.',
      },
      {
        title: 'Tax Advisory & Compliance',
        description:
          'Meet tax obligations on time and plan efficiently.',
      },
      {
        title: 'People & Organization Consulting',
        description:
          'Structure teams and roles as the business grows.',
      },
      {
        title: 'Website Development & UX/UI Design',
        description:
          'Build professional websites that establish credibility and win clients.',
      },
      {
        title: 'Graphic Design & Brand Identity',
        description:
          'Create a brand that looks established from day one.',
      },
      {
        title: 'Digital Marketing & Campaign Management',
        description:
          'Generate leads and grow the customer base through focused marketing.',
      },
    ],
  },
];

export const industryIntroduction =
  'Every industry has its own regulations, competitors, customers and pace of change. Advice that ignores that context rarely delivers. Our teams understand how your sector works and bring the right mix of strategy, financial, sustainability and communications expertise to your challenges.';

export const industryClosingCopy =
  'Our integrated approach applies across sectors. Tell us about your organization, and we will connect you with the right specialists.';

export function getIndustryContent(slug: string) {
  return industryContent.find((industry) => industry.id === slug);
}
