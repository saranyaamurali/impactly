// backend/seeds/seedCsrArticles.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const CSRArticle = require('../models/CSRArticle');
const User = require('../models/User');
require('dotenv').config();

const articles = [
    {
        title: "A Guide to Corporate Social Responsibility (CSR)",
        description: "A comprehensive overview of CSR principles, its benefits to businesses, and implementation strategies.",
        category: "CSR Basics",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
        link: "https://www.investopedia.com/terms/c/corporatesocialresponsibility.asp",
        author: "Investopedia",
        readTime: "8 min",
    },
    {
        title: "The Ten Principles of the UN Global Compact",
        description: "Learn about the ten principles covering human rights, labor, environment, and anti-corruption.",
        category: "Legal Compliance",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        link: "https://unglobalcompact.org/what-is-gc/mission/principles",
        author: "UN Global Compact",
        readTime: "5 min",
    },
    {
        title: "Why Sustainability is Now the Key Driver of Innovation",
        description: "How sustainability and CSR have moved from being a cost center to a critical driver of business innovation.",
        category: "Environment & Sustainability",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
        link: "https://hbr.org/2009/09/why-sustainability-is-now-the-key-driver-of-innovation",
        author: "Harvard Business Review",
        readTime: "12 min",
    },
    {
        title: "Measuring Impact: The Key to Successful CSR",
        description: "A deep dive into frameworks and methodologies for accurately measuring the social impact of your corporate programs.",
        category: "Impact Measurement",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        link: "https://ssir.org/articles/entry/measuring_impact",
        author: "Stanford Social Innovation Review",
        readTime: "10 min",
    },
    {
        title: "CSR and Schedule VII of the Companies Act, 2013",
        description: "An essential legal guide outlining permitted CSR activities under Indian corporate law.",
        category: "Legal Compliance",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
        link: "https://www.mca.gov.in/MinistryV2/csr_data.html",
        author: "Ministry of Corporate Affairs",
        readTime: "7 min",
    },
    {
        title: "The Role of Business in Education",
        description: "How corporate partnerships can bridge the education gap and build the workforce of the future.",
        category: "Education",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        link: "https://www.weforum.org/agenda/2021/01/future-of-education-and-skills-the-role-of-business/",
        author: "World Economic Forum",
        readTime: "6 min",
    },
    {
        title: "Climate Action: What Business Can Do",
        description: "Actionable steps for corporations to integrate climate resilience and carbon reduction into their CSR strategy.",
        category: "Environment & Sustainability",
        image: "https://images.unsplash.com/photo-1469571486292-b53601020f90?w=800&q=80",
        link: "https://www.wri.org/business",
        author: "World Resources Institute",
        readTime: "9 min",
    },
    {
        title: "Effective Stakeholder Engagement in CSR",
        description: "Strategies for communicating your CSR goals to employees, communities, and investors effectively.",
        category: "Stakeholder Engagement",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
        link: "https://www.mckinsey.com/capabilities/sustainability/our-insights/the-esg-premium-new-perspectives-on-value-and-performance",
        author: "McKinsey & Company",
        readTime: "11 min",
    },
    {
        title: "Corporate Philanthropy vs. CSR: What's the Difference?",
        description: "Understanding the distinction between charitable giving and integrated corporate social responsibility.",
        category: "CSR Basics",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
        link: "https://online.hbs.edu/blog/post/corporate-philanthropy-vs-csr",
        author: "Harvard Business School",
        readTime: "5 min",
    },
    {
        title: "Global Reporting Initiative (GRI) Standards",
        description: "A primer on the world's most widely used standards for sustainability reporting.",
        category: "Reporting & Transparency",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        link: "https://www.globalreporting.org/standards/",
        author: "Global Reporting Initiative",
        readTime: "15 min",
    },
    {
        title: "Bridging the Digital Divide: A Corporate Mandate",
        description: "Exploring the role of tech companies in ensuring digital literacy and access in underserved communities.",
        category: "Community Development",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
        link: "https://www.brookings.edu/research/bridging-the-digital-divide/",
        author: "Brookings Institution",
        readTime: "8 min",
    },
    {
        title: "Disaster Relief and Corporate Response",
        description: "Best practices for how corporations can rapidly deploy resources and funds during national or global emergencies.",
        category: "Disaster Relief",
        image: "https://images.unsplash.com/photo-1469571486292-b53601020f90?w=800&q=80",
        link: "https://www.fema.gov/business-industry/private-sector",
        author: "FEMA",
        readTime: "6 min",
    },
    {
        title: "The Future of CSR in an AI-Driven World",
        description: "How artificial intelligence and data analytics will revolutionize impact tracking and matchmaking.",
        category: "Innovation & Technology",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        link: "https://sloanreview.mit.edu/article/the-future-of-corporate-responsibility-in-the-ai-era/",
        author: "MIT Sloan Management Review",
        readTime: "10 min",
    },
    {
        title: "Women Empowerment and Livelihood Generation",
        description: "Case studies on corporate programs that successfully upskill and empower women in rural economies.",
        category: "Livelihood & Poverty",
        image: "https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=800&q=80",
        link: "https://www.unwomen.org/en/partnerships/businesses-and-foundations",
        author: "UN Women",
        readTime: "9 min",
    },
    {
        title: "Corporate Governance and ESG Compliance",
        description: "The integration of Environmental, Social, and Governance criteria into core corporate governance frameworks.",
        category: "Legal Compliance",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
        link: "https://corpgov.law.harvard.edu/2020/08/01/esg-and-corporate-governance/",
        author: "Harvard Law School",
        readTime: "13 min",
    }
];

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/impactly");

        // --- 1. SEED ARTICLES ---
        await CSRArticle.deleteMany({});
        const articleResult = await CSRArticle.insertMany(articles);
        console.log(`✅ ${articleResult.length} articles seeded successfully`);

        // --- 2. SEED ADMIN USER ---
        const adminEmail = 'admin@impactly.com';
        const adminPassword = 'admin'; // simple password for MVP
        
        // Check if admin exists
        let adminUser = await User.findOne({ email: adminEmail });
        
        if (adminUser) {
            console.log(`ℹ️ Admin user ${adminEmail} already exists.`);
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            adminUser = await User.create({
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                isActive: true,
                emailVerified: true
            });
            console.log(`✅ Admin user created: ${adminEmail} / ${adminPassword}`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
}

seedData();