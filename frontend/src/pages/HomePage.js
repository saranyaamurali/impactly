import { Link } from "react-router-dom";

function HomePage() {
  const legalAspects = [
    {
      title: "Applicability and CSR Threshold",
      detail:
        "Under Section 135 of the Companies Act, 2013, CSR obligations apply when a company crosses prescribed thresholds for net worth, turnover, or net profit in the relevant financial year.",
    },
    {
      title: "Mandatory CSR Spend",
      detail:
        "Eligible companies are expected to spend at least 2% of the average net profits of the previous three financial years on approved CSR activities.",
    },
    {
      title: "CSR Committee and Board Oversight",
      detail:
        "The Board and CSR Committee must approve policy, monitor implementation, and ensure disclosures are made in annual reports and statutory filings.",
    },
    {
      title: "Permitted Activities (Schedule VII)",
      detail:
        "CSR expenditure must align with Schedule VII themes such as education, healthcare, environment, gender equality, livelihoods, and rural development.",
    },
    {
      title: "Implementation Channels",
      detail:
        "Projects can be executed directly or through registered implementing agencies that satisfy CSR Rules, registration, and compliance requirements.",
    },
    {
      title: "Disallowed CSR Expenditure",
      detail:
        "Activities in the normal course of business, political contributions, and one-off sponsorships primarily for marketing are generally excluded.",
    },
    {
      title: "Ongoing Projects and Unspent Amounts",
      detail:
        "Unspent eligible CSR funds for ongoing projects must be transferred to a dedicated Unspent CSR Account within statutory timelines and used as prescribed.",
    },
    {
      title: "Transfer to Specified Funds",
      detail:
        "Amounts not related to ongoing projects must be transferred to notified funds listed in Schedule VII within the required period.",
    },
    {
      title: "Impact Assessment Requirements",
      detail:
        "Certain large CSR obligations trigger mandatory impact assessments by independent agencies for qualifying completed projects.",
    },
    {
      title: "Disclosure, Audit, and Penalties",
      detail:
        "Boards must provide transparent CSR reporting; non-compliance can attract penalties under the Companies Act and related CSR Rules.",
    },
  ];

  const knowledgeTopics = [
    {
      title: "Legal and Regulatory",
      detail:
        "Section 135, CSR Rules, Schedule VII, implementation norms, disclosures, and penalty framework.",
    },
    {
      title: "Governance and Policy",
      detail:
        "CSR charter drafting, board governance, committee charters, internal controls, and anti-corruption safeguards.",
    },
    {
      title: "Program Design",
      detail:
        "Need assessment, beneficiary mapping, theory of change, budget architecture, and execution roadmaps.",
    },
    {
      title: "Implementation and Partners",
      detail:
        "Implementing agency qualification, contracting standards, milestone governance, and field monitoring practices.",
    },
    {
      title: "Measurement and Impact",
      detail:
        "Outcome indicators, baseline and endline methods, impact studies, and independent evaluations.",
    },
    {
      title: "Reporting and Communication",
      detail:
        "Board reports, annual disclosures, statutory narratives, assurance-ready evidence, and public transparency.",
    },
  ];

  return (
    <section className="hero-wrap">
      <div className="container">
        <div className="hero-grid encyclopedia-hero-grid">
          <div className="hero-encyclopedia-main">
            <p className="eyebrow">CSR Knowledge Hub</p>
            <h1 className="hero-title">
              Complete CSR Guide: strategy, execution, legal compliance, and ecosystem intelligence.
            </h1>
            <p className="hero-subtitle">
              This first page is designed as a single-source CSR knowledge center.
              It covers legal obligations, governance structures, project design,
              implementation methods, impact measurement, and statutory disclosure
              practices.
            </p>
            <div className="cta-row">
              <Link className="btn btn-primary" to="/csr-projects">
                Explore Current SCR Projects
              </Link>
              <Link className="btn btn-secondary" to="/csr-projects/information">
                Explore 100+ CSR Information
              </Link>
              <Link className="btn btn-secondary" to="/ecosystem/ngos-information">
                Explore 100+ NGO Information
              </Link>
            </div>
          </div>

          <aside className="ad-column" aria-label="Advertising section">
            <article className="ad-slot-card ad-slot-primary">
              <p className="summary-kicker">Ad Space 970 x 250</p>
              <h3>Premium CSR Sponsorship Banner</h3>
              <p>
                Reserved for annual sustainability reports, ESG campaigns,
                grant announcements, and verified impact partnerships.
              </p>
              <Link className="text-link" to="/blog">
                See Sponsored CSR References
              </Link>
            </article>
            <article className="ad-slot-card ad-slot-secondary">
              <p className="summary-kicker">Ad Space 300 x 250</p>
              <h3>Sidebar Promotion Block</h3>
              <p>
                Slot for NGO collaboration drives, funder highlights, and
                public impact communication placements.
              </p>
            </article>
          </aside>
        </div>

        <div className="encyclopedia-grid">
          {knowledgeTopics.map((topic) => (
            <article className="summary-tile" key={topic.title}>
              <p className="summary-kicker">Knowledge Scope</p>
              <h3>{topic.title}</h3>
              <p>{topic.detail}</p>
            </article>
          ))}
        </div>

        <section className="legal-encyclopedia" aria-labelledby="legal-encyclopedia-title">
          <div className="legal-heading">
            <p className="eyebrow">Legal Compliance Core</p>
            <h2 id="legal-encyclopedia-title">All core legal aspects involved in CSR</h2>
            <p className="section-intro">
              This section captures the principal statutory obligations typically
              expected in CSR governance under Indian law and current compliance
              practice. Always validate with updated legal counsel for your specific case.
            </p>
          </div>

          <div className="legal-grid">
            {legalAspects.map((item) => (
              <article className="legal-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="hub-grid">
          <article className="summary-tile">
            <p className="summary-kicker">Guided Navigation</p>
            <h3>Detailed Project Discoverability</h3>
            <p>
              Browse sector-wise projects and map legal compliance context to
              on-ground implementation patterns.
            </p>
            <Link className="text-link" to="/csr-projects">
              Open CSR Project Explorer
            </Link>
          </article>
          <article className="summary-tile">
            <p className="summary-kicker">Guided Navigation</p>
            <h3>CSR Knowledge Library</h3>
            <p>
              Review broad CSR concepts, frameworks, and operational templates
              for planning and documentation.
            </p>
            <Link className="text-link" to="/csr-projects/information">
              Open CSR Knowledge Library
            </Link>
          </article>
          <article className="summary-tile">
            <p className="summary-kicker">Guided Navigation</p>
            <h3>NGO Intelligence Directory</h3>
            <p>
              Discover NGO landscape information to support partner due diligence
              and collaboration design.
            </p>
            <Link className="text-link" to="/ecosystem/ngos-information">
              Open NGO Intelligence Directory
            </Link>
          </article>
        </div>

        <div className="hub-grid">
          <article className="ad-strip ad-strip-inline">
            <p className="eyebrow">Ad Space 728 x 90</p>
            <h3>Leaderboard Ad Placement</h3>
            <p>
              Placement optimized for public awareness campaigns, annual report
              launches, impact storytelling, and ecosystem announcements.
            </p>
          </article>
          <article className="ad-strip ad-strip-inline">
            <p className="eyebrow">Ad Space 320 x 100</p>
            <h3>Mobile Sticky Sponsorship</h3>
            <p>
              Mobile-focused ad inventory for quick campaign visibility across
              CSR and NGO information journeys.
            </p>
          </article>
          <article className="ad-strip ad-strip-inline">
            <p className="eyebrow">Ad Space</p>
            <h3>Partnership Inquiry Slot</h3>
            <p>
              For sponsors looking to place educational, ecosystem, and policy-aware
              awareness campaigns on this CSR hub.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
