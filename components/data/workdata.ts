export interface WorkStat {
  num: string;
  label: string;
}

export interface WorkBar {
  key: string;
  val: number;
}

export interface WorkRing {
  label: string;
  pct: number;
  color: string;
}

export interface WorkTimelineItem {
  active: boolean;
  text: string; // may contain <strong> tags
}

export interface WorkEntry {
  id: string;
  num: string;
  icon: 'monitor' | 'users' | 'layers' | 'sun' | 'dollar' | 'shield' | 'heart';
  title: string;
  sub: string;
  desc: string;
  badge: string;
  modal: {
    sub: string;
    stats: WorkStat[];
    ringLabel: string;
    rings: WorkRing[];
    timelineLabel: string;
    timeline: WorkTimelineItem[];
    tags: string[];
  };
}

/* ─────────────────────────────────────────────────────────
   WORK  — professional experience (employers / key clients)
   ───────────────────────────────────────────────────────── */
export const WORK_DATA: WorkEntry[] = [
  {
    id: 'ads',
    num: '01',
    icon: 'monitor',
    title: 'Applied Dynamic Solutions',
    sub: 'Full Stack Developer · 2022 – Present',
    desc: 'Developed 15+ production web & mobile apps across ASP.NET Core, Node.js, Python, React, and Next.js. Established reusable frontend templates cutting new project setup by 70%. Implemented CI/CD pipelines in Azure DevOps with Docker & Kubernetes, reducing release cycles by 60%.',
    badge: 'Monroe Township, NJ',
    modal: {
      sub: 'Full Stack Developer · Monroe Township, NJ · 2022 – Present',
      stats: [
        { num: '15+', label: 'Production Apps' },
        { num: '70%', label: 'Faster Setup' },
        { num: '60%', label: 'Faster Releases' },
      ],
      ringLabel: 'Project Type Breakdown',
      rings: [
        { label: 'Web Apps', pct: 54, color: '#C9A84C' },
        { label: 'Mobile Apps', pct: 26, color: '#8B6914' },
        { label: 'APIs & Infra', pct: 20, color: '#2a2010' },
      ],
      timelineLabel: 'Journey',
      timeline: [
        { active: true,  text: '<strong>2022</strong> — Joined ADS, began delivering full-stack production systems.' },
        { active: true,  text: '<strong>2023</strong> — Established reusable frontend templates; 70% faster project setup.' },
        { active: true,  text: '<strong>2024</strong> — Implemented CI/CD in Azure DevOps with Docker & Kubernetes.' },
        { active: true, text: '<strong>2025</strong> — Designed reusable SDKs for OpenAl, AWS, SignatureAPI and Azure integrations ' },
        { active: false, text: '<strong>2026</strong> — Working on AI-integrated product streams and cloud architecture.' },
      ],
      tags: ['.NET Core', 'React', 'Next.js', 'EFCore', 'Cypress', 'Azure', 'Docker', 'Kubernetes', 'TypeScript'],
    },
  },
  {
    id: 'wtg',
    num: '02',
    icon: 'users',
    title: 'Where Trades Go',
    sub: 'Key Client · East Hanover, NJ',
    desc: ' Worked on 0-to-1 launch of a full-stack jobs marketplace for tradespeople, growing to 10,000+ users including 2,000+ paid contractors. Designed weighted scoring algorithms achieving 95% user satisfaction.',
    badge: '10K+ Users',
    modal: {
      sub: 'Key Client · East Hanover, NJ · Full Stack Developer',
      stats: [
        { num: '10K+', label: 'Total Users' },
        { num: '2K+', label: 'Paid Contractors' },
        { num: '95%', label: 'Satisfaction Score' },
      ],
      ringLabel: 'User Distribution',
      rings: [
        { label: 'Contractors (paid)', pct: 18, color: '#C9A84C' },
        { label: 'Free Contractors',   pct: 23, color: '#8B6914' },
        { label: 'Tradespeople',          pct: 49, color: '#2a2010' },
      ],
      timelineLabel: 'Journey',
      timeline: [
        { active: true,  text: '<strong>0 to 1</strong> — Architected the marketplace from a blank canvas.' },
        { active: true,  text: '<strong>Scoring</strong> — Designed weighted matching algorithm; 95% satisfaction.' },
        { active: true,  text: '<strong>Scale</strong> — Onboarded 10,000+ users, 2,000+ paying contractors.' },
        { active: false, text: '<strong>Ongoing</strong> — Iterating on search, discovery & monetization.' },
      ],
      tags: ['Full Stack', 'Marketplace', 'Weighted Scoring', 'React', '.NET Core', 'SQL', 'Stripe', 'EFCore'],
    },
  },
  {
    id: 'afm',
    num: '03',
    icon: 'layers',
    title: 'AFM & SAG-AFTRA',
    sub: 'Key Client · Valley Village, CA',
    desc: 'Deployed automated e-forms workflow replacing paper processes, delivering a 7× increase in signed form return rates. Optimized a royalty distribution platform for financial workflows processing over $75M annually.',
    badge: '$75M+ Processed',
    modal: {
      sub: 'Key Client · Valley Village, CA · Workflow & Platform Engineering',
      stats: [
        { num: '7×',   label: 'Form Return Rate' },
        { num: '75M+', label: 'Processed / yr' },
        { num: '100%', label: 'Paperless' },
      ],
      ringLabel: 'Workflow Coverage',
      rings: [
        { label: 'E-forms & Signing',   pct: 65, color: '#C9A84C' },
        { label: 'Platform Optimization', pct: 18, color: '#8B6914' },
        { label: 'Maintainece',   pct: 17, color: '#2a2010' },
      ],
      timelineLabel: 'Journey',
      timeline: [
        { active: true,  text: '<strong>Phase 1</strong> — Optimised and maintained royalty platform for $75M+ annual volume.' },
        { active: true,  text: '<strong>Phase 2</strong> — Pinpointed flaws of paper-based processes; designed digital workflow.' },
        { active: true,  text: '<strong>Phase 3</strong> — Deployed automated e-forms; 7× return rate increase.' },
        { active: false, text: '<strong>Ongoing</strong> — Continuous performance optimisation & compliance.' },
      ],
      tags: ['E-forms', 'Workflow Automation', 'Royalty Platform', '.NET Core', 'Financial Systems', 'SignatureAPI'],
    },
  },
{
  id: 'amex',
  num: '04',
  icon: 'shield',
  title: 'American Express',
  sub: 'Software Engineering Intern · July 2021 – April 2022',
  desc: 'Developed and maintained 10+ ASP.NET Core REST APIs, built 20+ reusable React.js components for 5,000+ internal users, resolved 30+ bugs, and contributed to Agile development, testing, and CI/CD workflows.',
  badge: 'New York, NY',
  modal: {
    sub: 'Software Engineering Intern · New York, NY · July 2021 – April 2022',
    stats: [
      { num: '10+', label: 'REST APIs Built' },
      { num: '20+', label: 'React Components' },
      { num: '5,000+', label: 'Internal Users' },
    ],
    ringLabel: 'Engineering Focus',
    rings: [
      { label: 'Backend APIs', pct: 40, color: '#C9A84C' },
      { label: 'Frontend UI', pct: 35, color: '#8B6914' },
      { label: 'Testing & Agile', pct: 25, color: '#2a2010' },
    ],
    timelineLabel: 'Journey',
    timeline: [
      {
        active: true,
        text: '<strong>Backend</strong> — Assisted in developing and maintaining 10+ secure REST API endpoints using ASP.NET Core.'
      },
      {
        active: true,
        text: '<strong>Frontend</strong> — Built and enhanced 20+ reusable React.js components powering applications used by 5,000+ internal users.'
      },
      {
        active: true,
        text: '<strong>Collaboration</strong> — Worked with senior engineers to implement features, resolve 30+ bugs, and improve application stability.'
      },
      {
        active: true,
        text: '<strong>Quality</strong> — Wrote 50+ unit tests and participated in code reviews to improve code quality and reduce regressions.'
      },
      {
        active: true,
        text: '<strong>Agile</strong> — Collaborated with a team of 8+ engineers across 15+ sprint cycles while gaining experience with Git workflows and CI/CD practices.'
      },
    ],
    tags: [
      'ASP.NET Core',
      'React.js',
      'REST APIs',
      'C#',
      'Unit Testing',
      'Git',
      'CI/CD',
      'Agile',
      'Code Reviews',
    ],
  },
},
  {
    id: 'cedargate',
    num: '05',
    icon: 'heart',
    title: 'Cedar Gate Technologies',
    sub: 'Web Developer · 2019 – 2020',
    desc: 'Designed 15+ REST APIs and React UIs for healthcare data integration, serving 5,000+ provider users and processing 1M+ patient records monthly. Built Kafka-driven batch ingestion pipelines handling 200K+ records daily with HIPAA-aligned data handling.',
    badge: 'New York, NY',
    modal: {
      sub: 'Web Developer · New York, NY · 2019 – 2020',
      stats: [
        { num: '15+', label: 'REST APIs Shipped' },
        { num: '5K+', label: 'Provider Users' },
        { num: '1M+', label: 'Records / Month' },
      ],
      ringLabel: 'Platform Focus',
      rings: [
        { label: 'API & UI Development', pct: 45, color: '#C9A84C' },
        { label: 'Data Pipelines',       pct: 35, color: '#8B6914' },
        { label: 'Testing & Docs',        pct: 20, color: '#2a2010' },
      ],
      timelineLabel: 'Journey',
      timeline: [
        { active: true, text: '<strong>APIs</strong> — Designed 15+ REST APIs & React UIs for healthcare data integration.' },
        { active: true, text: '<strong>Pipelines</strong> — Built Kafka batch ingestion handling 200K+ records daily.' },
        { active: true, text: '<strong>Compliance</strong> — Ensured HIPAA-aligned handling of sensitive patient data.' },
        { active: true, text: '<strong>Quality</strong> — Wrote unit/integration tests, reduced defects before deployment.' },
      ],
      tags: ['React', 'REST APIs', 'Kafka', 'MySQL', 'PostgreSQL', 'HIPAA', 'Healthcare Data'],
    },
  },
];

/* ─────────────────────────────────────────────────────────
   PROJECTS — independent / side projects
   ───────────────────────────────────────────────────────── */
export const PROJECT_DATA: WorkEntry[] = [
  {
    id: 'consensus',
    num: '01',
    icon: 'sun',
    title: 'Consensus',
    sub: 'AI Boardroom Simulator · Oct–Dec 2025',
    desc: 'Co-developed a RAG-driven knowledge retrieval system and RL simulation framework, achieving 35% reduction in inference latency and 1.5× improvement in decision-making accuracy across multi-model workflows.',
    badge: 'RAG + RL Framework',
    modal: {
      sub: 'AI Boardroom Simulator · Oct – Dec 2025',
      stats: [
        { num: '35%',  label: 'Latency Reduced' },
        { num: '1.5×', label: 'Decision Accuracy' },
        { num: 'RAG+RL', label: 'Architecture' },
      ],
      ringLabel: 'Architecture Components',
      rings: [
        { label: 'RAG Retrieval',     pct: 40, color: '#C9A84C' },
        { label: 'RL Simulation',     pct: 35, color: '#8B6914' },
        { label: 'Multi-model Orch.', pct: 25, color: '#2a2010' },
      ],
      timelineLabel: 'Journey',
      timeline: [
        { active: true,  text: '<strong>Oct 2025</strong> — Co-developed RAG knowledge retrieval foundation.' },
        { active: true,  text: '<strong>Nov 2025</strong> — Built RL simulation framework for multi-model decisions.' },
        { active: true,  text: '<strong>Dec 2025</strong> — 35% latency cut; 1.5× accuracy improvement achieved.' },
        { active: false, text: '<strong>Future</strong> — Expanding to enterprise boardroom decision-support.' },
      ],
      tags: ['RAG', 'Reinforcement Learning', 'LLM', '.NET Core', 'Vector DB', 'Multi-model', 'AI Agents'],
    },
  },
  {
    id: 'nfc',
    num: '02',
    icon: 'dollar',
    title: 'Perfect Synergy',
    sub: 'NFC Card System · Jul–Aug 2025',
    desc: 'Architected and shipped a full-stack digital identity platform in under 8 weeks. NFC tap-to-share contact delivery, dynamic profile routing, Stripe payments, and real-time WebSockets analytics — 100+ profiles without app installs.',
    badge: 'Completely Digtal',
    modal: {
      sub: 'Digital Identity Platform · Jul – Aug 2025 · Digitalized',
      stats: [
        { num: '8wk',  label: ' Sprint' },
        { num: '100+', label: 'Profiles Live' },
        { num: '100%',    label: 'Digital' },
      ],
      ringLabel: 'Platform Capabilities',
      rings: [
        { label: 'NFC + Routing',       pct: 30, color: '#C9A84C' },
        { label: 'Profiles & Auth',      pct: 30, color: '#8B6914' },
        { label: 'Payments & Analytics', pct: 40, color: '#2a2010' },
      ],
      timelineLabel: 'Journey',
      timeline: [
        { active: true, text: '<strong>Week 1–2</strong> — NFC tap-to-share + dynamic profile routing architecture.' },
        { active: true, text: '<strong>Week 3–4</strong> — Full-stack profiles, auth & Stripe payment integration.' },
        { active: true, text: '<strong>Week 5–6</strong> — Real-time WebSockets analytics dashboard.' },
        { active: true, text: '<strong>Week 7–8</strong> — QA, 100+ profiles onboarded, shipped.' },
      ],
      tags: ['NFC', 'Next.js', 'WebSockets', 'Stripe', 'Real-time Analytics', '.NET Core'],
    },
  },
];