const publicProjects = [
  {
    id: "csr-001",
    title: "Tata Power Club Enerji",
    category: "Education",
    budget: 5200000,
    location: "Pan-India",
    timeline: "2007-ongoing",
    status: "active",
    companySponsor: "Tata Power",
    implementingPartner: "Schools and local education partners",
    beneficiaries: 500000,
    districts: ["Mumbai", "Delhi", "Bengaluru"],
    progressPercent: 82,
    officialWebsite: "https://www.tatapower.com/sustainability/club-enerji.aspx",
    sourceWebsite: "https://www.tatapower.com/sustainability.aspx",
    description:
      "Club Enerji is Tata Power's long-running school program focused on energy conservation and climate awareness among students.",
    impactIdea:
      "Build early climate literacy and student-led household energy conservation habits.",
    sdgFocus: ["SDG 4", "SDG 7", "SDG 13"],
    expectedOutcomes: [
      "Student energy clubs run climate campaigns in participating schools",
      "Improved awareness of efficient electricity usage",
    ],
  },
  {
    id: "csr-002",
    title: "ITC Mission Sunehra Kal",
    category: "Livelihood",
    budget: 7800000,
    location: "Multiple States",
    timeline: "2001-ongoing",
    status: "active",
    companySponsor: "ITC Limited",
    implementingPartner: "Community institutions and FPO networks",
    beneficiaries: 300000,
    districts: ["Khammam", "Mandsaur", "Guntur"],
    progressPercent: 79,
    officialWebsite: "https://www.itcportal.com/sustainability/mission-sunehra-kal.aspx",
    sourceWebsite: "https://www.itcportal.com/",
    description:
      "Mission Sunehra Kal focuses on sustainable livelihoods, watershed development, agriculture support, and women empowerment in rural India.",
    impactIdea:
      "Strengthen rural incomes through climate-smart agriculture and community institutions.",
    sdgFocus: ["SDG 5", "SDG 8", "SDG 10"],
    expectedOutcomes: [
      "Improved farm and non-farm livelihood opportunities",
      "Higher local resilience through water and natural resource management",
    ],
  },
  {
    id: "csr-003",
    title: "Reliance Foundation Rural Transformation",
    category: "Healthcare",
    budget: 8500000,
    location: "Pan-India",
    timeline: "2010-ongoing",
    status: "active",
    companySponsor: "Reliance Foundation",
    implementingPartner: "Village institutions and local governments",
    beneficiaries: 1200000,
    districts: ["Nandurbar", "Barabanki", "Jamnagar"],
    progressPercent: 76,
    officialWebsite: "https://www.reliancefoundation.org/rural-transformation",
    sourceWebsite: "https://www.reliancefoundation.org/",
    description:
      "Reliance Foundation's rural programs combine agriculture, water, healthcare, and community institutions to improve quality of life.",
    impactIdea:
      "Enable integrated village development through multi-sector partnerships.",
    sdgFocus: ["SDG 3", "SDG 10"],
    expectedOutcomes: [
      "Improved rural services access and household incomes",
      "Stronger community institutions and women participation",
    ],
  },
  {
    id: "csr-004",
    title: "Infosys Foundation Education Programs",
    category: "Education",
    budget: 6400000,
    location: "India",
    timeline: "1996-ongoing",
    status: "active",
    companySponsor: "Infosys Foundation",
    implementingPartner: "Government schools and social organizations",
    beneficiaries: 450000,
    districts: ["Bengaluru Urban", "Mysuru", "Bhubaneswar"],
    progressPercent: 84,
    officialWebsite: "https://www.infosys.com/infosys-foundation/areas-of-work/education.html",
    sourceWebsite: "https://www.infosys.com/infosys-foundation/",
    description:
      "Infosys Foundation supports school infrastructure, teacher support, scholarships, and learning opportunities for underserved students.",
    impactIdea:
      "Expand equitable access to quality education infrastructure and support systems.",
    sdgFocus: ["SDG 4", "SDG 10"],
    expectedOutcomes: [
      "Better school learning environments",
      "Higher support for first-generation learners",
    ],
  },
  {
    id: "csr-005",
    title: "HCL Foundation Samuday",
    category: "Education",
    budget: 4300000,
    location: "Uttar Pradesh",
    timeline: "2012-ongoing",
    status: "active",
    companySponsor: "HCL Foundation",
    implementingPartner: "District administration and NGO partners",
    beneficiaries: 250000,
    districts: ["Hardoi", "Sitapur"],
    progressPercent: 73,
    officialWebsite: "https://www.hclfoundation.org/samuday/",
    sourceWebsite: "https://www.hclfoundation.org/",
    description:
      "Samuday is HCL Foundation's integrated rural development initiative covering education, health, livelihood, and environment.",
    impactIdea:
      "Deliver convergence-based development outcomes across aspirational rural blocks.",
    sdgFocus: ["SDG 3", "SDG 4", "SDG 8"],
    expectedOutcomes: [
      "Improved school retention and community services",
      "Multi-sector improvement through block-level planning",
    ],
  },
  {
    id: "csr-006",
    title: "Project Nanhi Kali",
    category: "Education",
    budget: 4700000,
    location: "India",
    timeline: "1996-ongoing",
    status: "active",
    companySponsor: "Mahindra Group (K.C. Mahindra Education Trust)",
    implementingPartner: "Naandi Foundation and implementation partners",
    beneficiaries: 650000,
    districts: ["Mumbai", "Pune", "Hyderabad"],
    progressPercent: 88,
    officialWebsite: "https://www.nanhikali.org/",
    sourceWebsite: "https://www.mahindra.com/rise/sustainability",
    description:
      "Project Nanhi Kali supports girls' education through academic support, school material kits, and mentoring.",
    impactIdea:
      "Reduce school dropout among girls and improve learning continuity.",
    sdgFocus: ["SDG 4", "SDG 5", "SDG 10"],
    expectedOutcomes: [
      "Higher enrollment and retention of girls in school",
      "Improved confidence and transition to higher grades",
    ],
  },
  {
    id: "csr-007",
    title: "Adani Foundation Suposhan Sanginis",
    category: "Healthcare",
    budget: 3900000,
    location: "Gujarat and Rajasthan",
    timeline: "2018-ongoing",
    status: "active",
    companySponsor: "Adani Foundation",
    implementingPartner: "Local health workers and district health systems",
    beneficiaries: 90000,
    districts: ["Kutch", "Mundra", "Udaipur"],
    progressPercent: 69,
    officialWebsite: "https://www.adanifoundation.org/",
    sourceWebsite: "https://www.adani.com/sustainability",
    description:
      "Suposhan programs under Adani Foundation focus on maternal and child nutrition, community behavior change, and frontline worker support.",
    impactIdea:
      "Reduce malnutrition through community-led nutrition interventions.",
    sdgFocus: ["SDG 2", "SDG 3", "SDG 5"],
    expectedOutcomes: [
      "Improved maternal and child nutrition indicators",
      "Stronger local capacity for preventive health outreach",
    ],
  },
  {
    id: "csr-008",
    title: "Wipro Education and School Quality Initiatives",
    category: "Digital Inclusion",
    budget: 3600000,
    location: "India",
    timeline: "2001-ongoing",
    status: "active",
    companySponsor: "Wipro",
    implementingPartner: "State governments and education nonprofits",
    beneficiaries: 220000,
    districts: ["Bengaluru Urban", "Jaipur", "Lucknow"],
    progressPercent: 74,
    officialWebsite: "https://www.wipro.com/sustainability/",
    sourceWebsite: "https://www.wipro.com/sustainability/",
    description:
      "Wipro's education initiatives support systemic school quality improvements, teacher development, and digital learning access.",
    impactIdea:
      "Improve classroom quality and access to meaningful learning opportunities.",
    sdgFocus: ["SDG 4", "SDG 9", "SDG 10"],
    expectedOutcomes: [
      "Improved teacher support and school learning processes",
      "Greater digital and pedagogic access in public schooling",
    ],
  },
  {
    id: "csr-009",
    title: "Anandana - Coca-Cola India Foundation",
    category: "WASH",
    budget: 5000000,
    location: "India",
    timeline: "2007-ongoing",
    status: "active",
    companySponsor: "Coca-Cola India Foundation",
    implementingPartner: "Water and sanitation implementation partners",
    beneficiaries: 300000,
    districts: ["Jaipur", "Aurangabad", "Tirupati"],
    progressPercent: 77,
    officialWebsite: "https://www.coca-cola.com/in/en/sustainability",
    sourceWebsite: "https://www.coca-colacompany.com/sustainability",
    description:
      "Anandana supports water stewardship, recharge structures, watershed work, and community water access projects.",
    impactIdea:
      "Improve local water security and long-term recharge outcomes.",
    sdgFocus: ["SDG 3", "SDG 6", "SDG 11"],
    expectedOutcomes: [
      "Higher access to safe and sustainable water sources",
      "Strengthened local water conservation participation",
    ],
  },
  {
    id: "csr-010",
    title: "HUL Project Prabhat",
    category: "Livelihood",
    budget: 3300000,
    location: "India",
    timeline: "2013-ongoing",
    status: "active",
    companySponsor: "Hindustan Unilever",
    implementingPartner: "NGOs and local government stakeholders",
    beneficiaries: 180000,
    districts: ["Haridwar", "Doom Dooma", "Silvassa"],
    progressPercent: 70,
    officialWebsite: "https://www.hul.co.in/",
    sourceWebsite: "https://www.hul.co.in/",
    description:
      "Project Prabhat covers livelihoods, water, health, and sanitation interventions around HUL operational communities.",
    impactIdea:
      "Strengthen socio-economic outcomes in communities near company operations.",
    sdgFocus: ["SDG 3", "SDG 6", "SDG 8"],
    expectedOutcomes: [
      "Improved household access to livelihoods and WASH services",
      "Higher community participation in local development planning",
    ],
  },
  {
    id: "csr-011",
    title: "JSW Foundation Community Development",
    category: "Digital Inclusion",
    budget: 2800000,
    location: "Maharashtra and Karnataka",
    timeline: "ongoing",
    status: "active",
    companySponsor: "JSW Foundation",
    implementingPartner: "Community organizations and local institutions",
    beneficiaries: 210000,
    districts: ["Vijayanagar", "Raigad", "Dolvi"],
    progressPercent: 66,
    officialWebsite: "https://www.jsw.in/sustainability",
    sourceWebsite: "https://www.jsw.in/sustainability",
    description:
      "JSW Foundation works across education, health, skill development, and environment in communities around JSW sites.",
    impactIdea:
      "Build long-term social infrastructure and improve local livelihood opportunities.",
    sdgFocus: ["SDG 4", "SDG 8", "SDG 9"],
    expectedOutcomes: [
      "Higher access to quality community services",
      "Improved local employability and youth participation",
    ],
  },
  {
    id: "csr-012",
    title: "Tata Steel Foundation MANSI",
    category: "Healthcare",
    budget: 4600000,
    location: "Odisha and Jharkhand",
    timeline: "2015-ongoing",
    status: "active",
    companySponsor: "Tata Steel Foundation",
    implementingPartner: "District health departments and village volunteers",
    beneficiaries: 80000,
    districts: ["Keonjhar", "West Singhbhum", "Sukinda"],
    progressPercent: 72,
    officialWebsite: "https://www.tatasteelfoundation.org/",
    sourceWebsite: "https://www.tatasteelfoundation.org/",
    description:
      "MANSI focuses on maternal and neonatal survival through community health workers and institutional linkages.",
    impactIdea:
      "Reduce preventable maternal and newborn mortality in remote tribal areas.",
    sdgFocus: ["SDG 3", "SDG 5", "SDG 10"],
    expectedOutcomes: [
      "Improved maternal care-seeking behavior",
      "Higher institutional delivery and newborn follow-up rates",
    ],
  },
  {
    id: "csr-013",
    title: "Vedanta Nand Ghar",
    category: "Healthcare",
    budget: 1900000,
    location: "Multiple States",
    timeline: "2015-ongoing",
    status: "active",
    companySponsor: "Vedanta",
    implementingPartner: "Ministry of Women and Child Development and local partners",
    beneficiaries: 700000,
    districts: ["Sonbhadra", "Khordha", "Jharsuguda"],
    progressPercent: 78,
    officialWebsite: "https://www.nandghar.org/",
    sourceWebsite: "https://www.vedantaresources.com/",
    description:
      "Nand Ghar modernizes Anganwadis to support early childhood care, nutrition, and women empowerment services.",
    impactIdea:
      "Improve maternal-child nutrition and early childhood development outcomes.",
    sdgFocus: ["SDG 2", "SDG 3", "SDG 5"],
    expectedOutcomes: [
      "Expanded functional Anganwadi infrastructure",
      "Better nutrition and preschool support in target areas",
    ],
  },
  {
    id: "csr-014",
    title: "SBI Foundation Gram Seva",
    category: "Livelihood",
    budget: 3900000,
    location: "India",
    timeline: "2017-ongoing",
    status: "active",
    companySponsor: "SBI Foundation",
    implementingPartner: "Rural implementation NGOs",
    beneficiaries: 160000,
    districts: ["Wardha", "Nashik", "Varanasi"],
    progressPercent: 68,
    officialWebsite: "https://www.sbifoundation.in/gramseva",
    sourceWebsite: "https://www.sbifoundation.in/",
    description:
      "Gram Seva is SBI Foundation's flagship rural development program across village clusters in multiple states.",
    impactIdea:
      "Drive inclusive village development through livelihood and social infrastructure interventions.",
    sdgFocus: ["SDG 1", "SDG 5", "SDG 8"],
    expectedOutcomes: [
      "Improved household income opportunities",
      "Stronger local governance and access to basic services",
    ],
  },
  {
    id: "csr-015",
    title: "L&T Public Charitable Trust Water and Sanitation",
    category: "WASH",
    budget: 2400000,
    location: "India",
    timeline: "ongoing",
    status: "active",
    companySponsor: "Larsen and Toubro",
    implementingPartner: "L&T Public Charitable Trust and NGO partners",
    beneficiaries: 120000,
    districts: ["Kanchipuram", "Vadodara", "Rourkela"],
    progressPercent: 64,
    officialWebsite: "https://www.larsentoubro.com/corporate/sustainability/community-development/",
    sourceWebsite: "https://www.larsentoubro.com/corporate/sustainability/",
    description:
      "L&T community programs include water, sanitation, health, and skill interventions through trust-led implementation.",
    impactIdea:
      "Improve community-level access to WASH and related social infrastructure.",
    sdgFocus: ["SDG 4", "SDG 5", "SDG 6"],
    expectedOutcomes: [
      "Expanded water and sanitation infrastructure access",
      "Improved public health behavior in participating communities",
    ],
  },
];

const blogs = [
  {
    id: "blog-001",
    title: "How CSR Discovery Platforms Build Public Trust",
    summary:
      "Why visibility, consistency, and narrative clarity matter for corporate CSR credibility in 2026.",
    category: "Strategy",
    author: "Impactly Editorial",
    publishedAt: "2026-01-21",
    heroImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    content:
      "Public trust in CSR no longer comes from annual PDFs alone. It comes from discoverable, transparent, and continuously updated public narratives. Companies that publish clear project outcomes, focus areas, and regional relevance earn greater confidence from communities, employees, and investors. A modern public CSR platform should therefore operate as a living layer that translates project data into understandable stories. This is where discovery pages, project detail pages, and educational editorial content work together to build legitimacy over time.",
  },
  {
    id: "blog-002",
    title: "Designing CSR Programs Around Local Context",
    summary:
      "A practical framework for aligning interventions with regional realities and ecosystem capacity.",
    category: "Field Execution",
    author: "Impactly Research Desk",
    publishedAt: "2026-02-14",
    heroImage:
      "https://images.unsplash.com/photo-1469571486292-b53601020f90?auto=format&fit=crop&w=1200&q=80",
    content:
      "High-performing CSR programs begin with local diagnosis, not generic templates. Organizations should combine district-level indicators, local stakeholder interviews, and capacity mapping before defining intervention logic. This prevents duplication, reduces implementation friction, and improves outcomes. When this context is transparently reflected on public pages, audiences understand that a company is not just funding projects but investing in meaningful social infrastructure.",
  },
  {
    id: "blog-003",
    title: "From Compliance to Ecosystem Thinking in CSR",
    summary:
      "Why companies are moving from one-off projects to portfolio-based CSR ecosystems.",
    category: "Leadership",
    author: "Impactly Editorial",
    publishedAt: "2026-03-05",
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    content:
      "Compliance remains essential, but market leaders increasingly treat CSR as an ecosystem strategy. This means balancing education, healthcare, livelihoods, and environmental resilience over multiple years while learning from data. Public discovery and information pages are central to this approach because they attract attention, create accountability, and improve cross-sector understanding. The future of CSR communication is less about promotion and more about coherent social evidence.",
  },
];

const csrArticles = [
  {
    _id: "69ff363e26b5df893972e3ba",
    title: "Disaster Relief and Corporate Response",
    description:
      "Best practices for how corporations can rapidly deploy resources and fund relief operations during emergencies.",
    category: "Disaster Relief",
    image: "https://images.unsplash.com/photo-1469571486292-b53601020f90",
    link: "https://www.fema.gov/business-industry/private-sector",
    author: "FEMA",
    readTime: "6 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.508Z",
    updatedAt: "2026-05-09T13:27:26.508Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3bb",
    title: "The Future of CSR in an AI-Driven World",
    description:
      "How artificial intelligence and data analytics will revolutionize impact measurement and CSR decision-making.",
    category: "Innovation & Technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    link: "https://sloanreview.mit.edu/article/the-future-of-corporate-responsibility",
    author: "MIT Sloan Management Review",
    readTime: "10 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.508Z",
    updatedAt: "2026-05-09T13:27:26.508Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3bc",
    title: "Women Empowerment and Livelihood Generation",
    description:
      "Case studies on corporate programs that successfully upskill and empower women in rural communities.",
    category: "Livelihood & Poverty",
    image: "https://images.unsplash.com/photo-1596496181848-3091d4878b24",
    link: "https://www.unwomen.org/en/partnerships/businesses-and-foundations",
    author: "UN Women",
    readTime: "9 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.508Z",
    updatedAt: "2026-05-09T13:27:26.508Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3bd",
    title: "Corporate Governance and ESG Compliance",
    description:
      "The integration of Environmental, Social, and Governance criteria into corporate decision-making and compliance.",
    category: "Legal Compliance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    link: "https://corpgov.law.harvard.edu/2020/08/01/esg-and-corporate-governance",
    author: "Harvard Law School",
    readTime: "13 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.509Z",
    updatedAt: "2026-05-09T13:27:26.509Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3be",
    title: "Building Effective CSR Monitoring and Evaluation",
    description:
      "A practical guide to defining KPIs, baselines, and outcome metrics for CSR programs and partner reporting.",
    category: "Impact Measurement",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    link: "https://www.oecd.org/development/evaluation/",
    author: "OECD Development Evaluation",
    readTime: "8 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.510Z",
    updatedAt: "2026-05-09T13:27:26.510Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3bf",
    title: "CSR Basics: Aligning with SDG Priorities",
    description:
      "How to map corporate CSR initiatives to SDGs and build a focused, multi-year portfolio.",
    category: "CSR Basics",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    link: "https://sdgs.un.org/goals",
    author: "UN SDGs",
    readTime: "7 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.510Z",
    updatedAt: "2026-05-09T13:27:26.510Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3c0",
    title: "WASH Programs That Scale",
    description:
      "Designing water, sanitation, and hygiene interventions that sustain behavior change and local ownership.",
    category: "WASH",
    image: "https://images.unsplash.com/photo-1500522144261-ea64433bbe27",
    link: "https://www.unicef.org/wash",
    author: "UNICEF",
    readTime: "9 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.511Z",
    updatedAt: "2026-05-09T13:27:26.511Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3c1",
    title: "Climate Resilience and Community Adaptation",
    description:
      "A framework for CSR programs that strengthen climate resilience through local infrastructure and livelihoods.",
    category: "Climate Action",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    link: "https://www.unep.org/explore-topics/climate-action",
    author: "UNEP",
    readTime: "11 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.511Z",
    updatedAt: "2026-05-09T13:27:26.511Z",
    __v: 0,
  },
  {
    _id: "69ff363e26b5df893972e3c2",
    title: "Health Equity and Preventive Care Initiatives",
    description:
      "Evidence-based approaches for corporate health programs that improve primary care access and outcomes.",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    link: "https://www.who.int/health-topics/primary-health-care",
    author: "World Health Organization",
    readTime: "10 min",
    featured: false,
    views: 0,
    clicks: 0,
    source: "External",
    createdAt: "2026-05-09T13:27:26.512Z",
    updatedAt: "2026-05-09T13:27:26.512Z",
    __v: 0,
  },
];

const companies = [
  {
    id: "comp-001",
    name: "Tata Consultancy Services",
    csrFocusAreas: ["Education", "Digital Inclusion", "Skill Development"],
    regions: ["Maharashtra", "Karnataka", "West Bengal"],
    profile:
      "Known for large-scale education and employability initiatives, with technology-enabled learning programs in multiple states.",
  },
  {
    id: "comp-002",
    name: "Infosys Foundation",
    csrFocusAreas: ["Education", "Healthcare", "Arts and Culture"],
    regions: ["Karnataka", "Odisha", "Tamil Nadu"],
    profile:
      "Supports institution building, healthcare access, and educational infrastructure in underserved geographies.",
  },
  {
    id: "comp-003",
    name: "Mahindra Group",
    csrFocusAreas: ["Girls Education", "Rural Livelihood", "Environment"],
    regions: ["Maharashtra", "Rajasthan", "Uttar Pradesh"],
    profile:
      "Active in women and girls development programs, rural enterprise, and sustainability-oriented interventions.",
  },
  {
    id: "comp-004",
    name: "ITC Limited",
    csrFocusAreas: ["Watershed Development", "Sustainable Agriculture", "Livelihood"],
    regions: ["Andhra Pradesh", "Madhya Pradesh", "Rajasthan"],
    profile:
      "Widely recognized for integrated watershed and agriculture-centered rural development programs.",
  },
  {
    id: "comp-005",
    name: "Reliance Foundation",
    csrFocusAreas: ["Rural Transformation", "Health", "Sports for Development"],
    regions: ["Gujarat", "Maharashtra", "Assam"],
    profile:
      "Runs broad-based rural and health initiatives with state-level implementation depth.",
  },
];

const ngos = [
  {
    id: "ngo-001",
    name: "Pratham",
    focusAreas: ["Foundational Learning", "Youth Skill Development"],
    experience: "20+ years",
    regions: ["Pan-India"],
    officialWebsite: "https://www.pratham.org/",
    profile:
      "Education-focused nonprofit with large-scale learning outcome interventions and community mobilization expertise.",
  },
  {
    id: "ngo-002",
    name: "Goonj",
    focusAreas: ["Rural Development", "Disaster Relief", "Community Participation"],
    experience: "20+ years",
    regions: ["North India", "East India"],
    officialWebsite: "https://goonj.org/",
    profile:
      "Works on dignity-centered development models through material circularity and community-led implementation.",
  },
  {
    id: "ngo-003",
    name: "Smile Foundation",
    focusAreas: ["Education", "Healthcare", "Women Empowerment"],
    experience: "20+ years",
    regions: ["Pan-India"],
    officialWebsite: "https://www.smilefoundationindia.org/",
    profile:
      "Operates integrated social development programs with strong urban and peri-urban outreach.",
  },
  {
    id: "ngo-004",
    name: "SEWA",
    focusAreas: ["Women Livelihood", "Financial Inclusion", "Labor Rights"],
    experience: "50+ years",
    regions: ["Gujarat", "Madhya Pradesh", "Delhi"],
    officialWebsite: "https://www.sewa.org/",
    profile:
      "Member-based organization known for empowering informal women workers through enterprise and social protection.",
  },
  {
    id: "ngo-005",
    name: "WaterAid India",
    focusAreas: ["Water", "Sanitation", "Hygiene"],
    experience: "35+ years",
    regions: ["Bihar", "Odisha", "Uttar Pradesh"],
    officialWebsite: "https://www.wateraid.org/in/",
    profile:
      "Specialized in WASH systems strengthening with community and institutional partnerships.",
  },
];

const externalCsrBlogs = [
  {
    id: "ext-blog-001",
    title: "National Guidelines on Responsible Business Conduct",
    sourceName: "Ministry of Corporate Affairs, Government of India",
    publishedAt: "2019-03-13",
    summary:
      "India's framework for responsible business conduct, often referenced in CSR and sustainability discussions.",
    externalUrl: "https://www.mca.gov.in/",
  },
  {
    id: "ext-blog-002",
    title: "Business Responsibility and Sustainability Report (BRSR)",
    sourceName: "SEBI",
    publishedAt: "2021-05-10",
    summary:
      "SEBI's BRSR framework for listed entities, central to contemporary CSR and ESG disclosures in India.",
    externalUrl:
      "https://www.sebi.gov.in/legal/circulars/may-2021/business-responsibility-and-sustainability-reporting-by-listed-entities_50096.html",
  },
  {
    id: "ext-blog-003",
    title: "Voluntary National Review - SDG India Index Context",
    sourceName: "NITI Aayog",
    publishedAt: "2023-07-01",
    summary:
      "Policy context used by many CSR planners to map interventions against SDG priorities.",
    externalUrl: "https://www.niti.gov.in/",
  },
  {
    id: "ext-blog-004",
    title: "Global Sustainable Development Report",
    sourceName: "United Nations",
    publishedAt: "2023-09-01",
    summary:
      "Global SDG progress and systems-level insights relevant to CSR strategy and impact design.",
    externalUrl: "https://sdgs.un.org/gsdr",
  },
  {
    id: "ext-blog-005",
    title: "The Ten Principles of the UN Global Compact",
    sourceName: "UN Global Compact",
    publishedAt: "2024-01-01",
    summary:
      "A widely used voluntary corporate responsibility framework referenced by CSR teams globally.",
    externalUrl: "https://www.unglobalcompact.org/what-is-gc/mission/principles",
  },
  {
    id: "ext-blog-006",
    title: "Corporate Sustainability Reporting",
    sourceName: "Global Reporting Initiative (GRI)",
    publishedAt: "2024-01-01",
    summary:
      "Reporting standards and guidance that influence CSR transparency and stakeholder disclosures.",
    externalUrl: "https://www.globalreporting.org/",
  },
  {
    id: "ext-blog-007",
    title: "Investing in Sustainable Development",
    sourceName: "World Bank",
    publishedAt: "2024-01-01",
    summary:
      "Development finance perspectives used by many social impact and CSR ecosystem actors.",
    externalUrl: "https://www.worldbank.org/en/topic/sustainabledevelopment",
  },
  {
    id: "ext-blog-008",
    title: "ESG and Sustainability Insights",
    sourceName: "World Economic Forum",
    publishedAt: "2024-01-01",
    summary:
      "Global thought leadership and reports on sustainability, social impact, and business transition.",
    externalUrl: "https://www.weforum.org/",
  },
  {
    id: "ext-blog-009",
    title: "OECD Guidelines for Multinational Enterprises",
    sourceName: "OECD",
    publishedAt: "2023-06-08",
    summary:
      "International responsible business conduct benchmark often aligned with CSR policy thinking.",
    externalUrl: "https://www.oecd.org/",
  },
  {
    id: "ext-blog-010",
    title: "Environmental and Social Framework",
    sourceName: "Asian Development Bank",
    publishedAt: "2024-01-01",
    summary:
      "Social and environmental safeguards that inform development-linked CSR partnerships.",
    externalUrl: "https://www.adb.org/who-we-are/safeguards",
  },
];

const csrInformationOrganizations = [
  ["Tata Power", "https://www.tatapower.com/sustainability.aspx"],
  ["ITC Limited", "https://www.itcportal.com/"],
  ["Reliance Foundation", "https://www.reliancefoundation.org/"],
  ["Infosys Foundation", "https://www.infosys.com/infosys-foundation/"],
  ["HCL Foundation", "https://www.hclfoundation.org/"],
  ["Mahindra Group", "https://www.mahindra.com/rise/sustainability"],
  ["Adani Foundation", "https://www.adani.com/sustainability"],
  ["Wipro", "https://www.wipro.com/sustainability/"],
  ["Coca-Cola India Foundation", "https://www.coca-colacompany.com/sustainability"],
  ["Hindustan Unilever", "https://www.hul.co.in/"],
  ["JSW Foundation", "https://www.jsw.in/sustainability"],
  ["Tata Steel Foundation", "https://www.tatasteelfoundation.org/"],
  ["Vedanta", "https://www.vedantaresources.com/"],
  ["SBI Foundation", "https://www.sbifoundation.in/"],
  ["Larsen and Toubro", "https://www.larsentoubro.com/corporate/sustainability/"],
  ["NTPC", "https://www.ntpc.co.in/sustainability"],
  ["ONGC", "https://ongcindia.com/web/eng/sustainability"],
  ["Indian Oil Corporation", "https://iocl.com/pages/corporate-social-responsibility"],
  ["GAIL", "https://www.gailonline.com/"],
  ["Power Grid Corporation", "https://www.powergrid.in/csr"],
  ["Bharat Petroleum", "https://www.bharatpetroleum.in/"],
  ["Hindalco", "https://www.hindalco.com/sustainability"],
  ["UltraTech Cement", "https://www.ultratechcement.com/"],
  ["Tata Chemicals", "https://www.tatachemicals.com/Sustainability"],
  ["Godrej Industries", "https://www.godrejindustries.com/"],
];

const csrInformationThemes = [
  ["Education", "School and learning equity information view"],
  ["Healthcare", "Community health and nutrition information view"],
  ["Livelihood", "Skills and income development information view"],
  ["Environment", "Climate and natural resource information view"],
];

const csrInformationProjects = csrInformationOrganizations.flatMap((org, orgIndex) =>
  csrInformationThemes.map((theme, themeIndex) => {
    const [organization, officialWebsite] = org;
    const [category, descriptor] = theme;
    const serial = orgIndex * csrInformationThemes.length + themeIndex + 1;
    return {
      id: `csr-info-${String(serial).padStart(3, "0")}`,
      title: `${organization} - ${category} Program Information View`,
      organization,
      category,
      location: "India",
      timeline: "Ongoing",
      status: "information-view",
      description: `${descriptor}. Profile compiled for public information and discovery view.`,
      officialWebsite,
      sourceWebsite: officialWebsite,
      informationType: "public-information-view",
    };
  })
);

const companyInformationEntries = csrInformationOrganizations.flatMap((org, orgIndex) =>
  csrInformationThemes.map((theme, themeIndex) => {
    const [name, officialWebsite] = org;
    const [focusArea, descriptor] = theme;
    const serial = orgIndex * csrInformationThemes.length + themeIndex + 1;
    return {
      id: `company-info-${String(serial).padStart(3, "0")}`,
      name,
      focusArea,
      region: "India",
      profile: `${descriptor}. Listed as a public information-view company profile for ecosystem discovery.`,
      officialWebsite,
      informationType: "public-information-view",
      status: "information-view",
    };
  })
);

const ngoInformationOrganizations = [
  ["Pratham", "https://www.pratham.org/", "Pan-India"],
  ["Goonj", "https://goonj.org/", "North and East India"],
  ["Smile Foundation", "https://www.smilefoundationindia.org/", "Pan-India"],
  ["SEWA", "https://www.sewa.org/", "Gujarat and national chapters"],
  ["WaterAid India", "https://www.wateraid.org/in/", "Multiple states"],
  ["Akshaya Patra Foundation", "https://www.akshayapatra.org/", "Pan-India"],
  ["Teach For India", "https://www.teachforindia.org/", "Urban India"],
  ["CRY", "https://www.cry.org/", "Pan-India"],
  ["CARE India", "https://www.careindia.org/", "Pan-India"],
  ["Save the Children India", "https://www.savethechildren.in/", "Pan-India"],
  ["SOS Childrens Villages India", "https://www.soschildrensvillages.in/", "Pan-India"],
  ["HelpAge India", "https://www.helpageindia.org/", "Pan-India"],
  ["Magic Bus", "https://www.magicbus.org/", "Pan-India"],
  ["Digital Empowerment Foundation", "https://www.defindia.org/", "Pan-India"],
  ["TERI", "https://www.teriin.org/", "National"],
  ["WWF India", "https://www.wwfindia.org/", "Pan-India"],
  ["WWF", "https://www.worldwildlife.org/", "Global"],
  ["Oxfam India", "https://www.oxfamindia.org/", "India"],
  ["Habitat for Humanity India", "https://www.habitatindia.org/", "India"],
  ["India Sanitation Coalition", "https://www.indiasanitationcoalition.org/", "India"],
  ["NABARD Foundation", "https://www.nabfoundation.org/", "India"],
  ["BAIF Development Research Foundation", "https://www.baif.org.in/", "India"],
  ["Sightsavers India", "https://www.sightsaversindia.in/", "India"],
  ["Breakthrough India", "https://inbreakthrough.org/", "India"],
  ["GiveIndia", "https://www.giveindia.org/", "India"],
];

const ngoInformationThemes = [
  ["Education", "Foundational learning and school support"],
  ["Healthcare", "Public health and preventive care"],
  ["Livelihood", "Skilling and income resilience"],
  ["Environment", "Climate, water, and sustainability"],
];

const ngoInformationEntries = ngoInformationOrganizations.flatMap((ngo, ngoIndex) =>
  ngoInformationThemes.map((theme, themeIndex) => {
    const [name, website, region] = ngo;
    const [focusArea, descriptor] = theme;
    const serial = ngoIndex * ngoInformationThemes.length + themeIndex + 1;
    return {
      id: `ngo-info-${String(serial).padStart(3, "0")}`,
      name,
      focusArea,
      region,
      profile: `${descriptor}. Listed as a public information-view NGO profile for ecosystem discovery.`,
      officialWebsite: website,
      informationType: "public-information-view",
      status: "information-view",
    };
  })
);

const containsText = (value, target) =>
  value.toLowerCase().includes(target.toLowerCase());

const paginate = (items, page = 1, limit = 10) => {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 10, 1);
  const start = (safePage - 1) * safeLimit;
  const end = start + safeLimit;

  return {
    items: items.slice(start, end),
    pagination: {
      total: items.length,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(items.length / safeLimit),
    },
  };
};

const filterPublicProjects = ({ category, location, search, page, limit }) => {
  const filtered = publicProjects.filter((project) => {
    const categoryPass = category
      ? containsText(project.category, category)
      : true;
    const locationPass = location
      ? containsText(project.location, location)
      : true;
    const searchPass = search
      ? containsText(
          `${project.title} ${project.description} ${project.impactIdea}`,
          search
        )
      : true;

    return categoryPass && locationPass && searchPass;
  });

  return paginate(filtered, page, limit);
};

const filterCompanies = ({ focus, region }) =>
  companies.filter((company) => {
    const focusPass = focus
      ? company.csrFocusAreas.some((item) => containsText(item, focus))
      : true;
    const regionPass = region
      ? company.regions.some((item) => containsText(item, region))
      : true;

    return focusPass && regionPass;
  });

const filterNgos = ({ focus, region }) =>
  ngos.filter((ngo) => {
    const focusPass = focus
      ? ngo.focusAreas.some((item) => containsText(item, focus))
      : true;
    const regionPass = region
      ? ngo.regions.some((item) => containsText(item, region))
      : true;

    return focusPass && regionPass;
  });

const filterCsrInformationProjects = ({
  category,
  organization,
  search,
  page,
  limit,
}) => {
  const filtered = csrInformationProjects.filter((item) => {
    const categoryPass = category ? containsText(item.category, category) : true;
    const organizationPass = organization
      ? containsText(item.organization, organization)
      : true;
    const searchPass = search
      ? containsText(
          `${item.title} ${item.description} ${item.organization} ${item.category}`,
          search
        )
      : true;

    return categoryPass && organizationPass && searchPass;
  });

  return paginate(filtered, page, limit);
};

const filterNgoInformationEntries = ({ focus, region, search, page, limit }) => {
  const filtered = ngoInformationEntries.filter((item) => {
    const focusPass = focus ? containsText(item.focusArea, focus) : true;
    const regionPass = region ? containsText(item.region, region) : true;
    const searchPass = search
      ? containsText(`${item.name} ${item.profile} ${item.focusArea}`, search)
      : true;

    return focusPass && regionPass && searchPass;
  });

  return paginate(filtered, page, limit);
};

const filterCompanyInformationEntries = ({ focus, region, search, page, limit }) => {
  const filtered = companyInformationEntries.filter((item) => {
    const focusPass = focus ? containsText(item.focusArea, focus) : true;
    const regionPass = region ? containsText(item.region, region) : true;
    const searchPass = search
      ? containsText(`${item.name} ${item.profile} ${item.focusArea}`, search)
      : true;

    return focusPass && regionPass && searchPass;
  });

  return paginate(filtered, page, limit);
};

module.exports = {
  publicProjects,
  blogs,
  csrArticles,
  externalCsrBlogs,
  csrInformationProjects,
  companies,
  ngos,
  companyInformationEntries,
  ngoInformationEntries,
  filterPublicProjects,
  filterCsrInformationProjects,
  filterCompanies,
  filterNgos,
  filterCompanyInformationEntries,
  filterNgoInformationEntries,
};