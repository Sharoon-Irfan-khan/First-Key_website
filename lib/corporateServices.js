// First Key Corporate Services DWC-LLC — a separately registered company from
// First Key International Real Estate. Everything here mirrors the trade
// licence (No. 15468): the five services below are its five licensed
// activities, in the licence's order. Do not add activities (visas, PRO,
// audit, tax agency, legal, etc.) unless the licence is amended to cover them.

export const COMPANY = {
  name: "First Key Corporate Services",
  legalName: "FIRST KEY CORPORATE SERVICES DWC-LLC",
  legalForm: "DWC-LLC",
  licenceNumber: "15468",
  // Registered premises as printed on the licence.
  address: "Business Centre, Floor 3, Building A3, Business Park, Dubai, UAE",
};

export const corporateServices = [
  {
    slug: "mortgage-consultancy",
    // Activity name exactly as printed on the licence.
    activity: "Mortgage Consultancy",
    title: "Mortgage Consultancy",
    icon: "mortgage",
    text: "Navigate mortgage decisions with professional consultancy and practical guidance. We help clients understand financing options, mortgage requirements, and the considerations involved in property financing.",
    highlights: [
      "Mortgage options guidance",
      "Financing requirements consultation",
      "Mortgage process advisory",
      "Property financing consultation",
    ],
    cta: "Enquire About Mortgage Consultancy",
  },
  {
    slug: "accounting-bookkeeping",
    activity: "Accounting & Bookkeeping",
    title: "Accounting & Bookkeeping",
    icon: "ledger",
    text: "Maintain organized financial records with professional accounting and bookkeeping support. Our services help businesses improve financial clarity, record management, and day-to-day financial administration.",
    highlights: [
      "Bookkeeping support",
      "Financial record organization",
      "Accounts management support",
      "Financial reporting assistance",
    ],
    cta: "Enquire About Accounting Services",
  },
  {
    slug: "taxation-procedures-follow-up",
    activity: "Taxation Procedures Follow-Up",
    title: "Taxation Procedures Follow-Up",
    icon: "tax",
    text: "Stay organized with professional support for taxation-related administrative procedures, documentation coordination, and follow-up requirements.",
    highlights: [
      "Tax procedure follow-up",
      "Tax documentation coordination",
      "Administrative process support",
      "Tax-related correspondence follow-up",
    ],
    cta: "Enquire About Tax Support",
  },
  {
    slug: "corporate-services",
    activity: "Corporate Services Provider (CSP)",
    title: "Corporate Services",
    icon: "briefcase",
    text: "Support your business operations through professional corporate administration, documentation coordination, and company-related service assistance.",
    highlights: [
      "Corporate administrative support",
      "Company documentation assistance",
      "Business service coordination",
      "Corporate process follow-up",
    ],
    cta: "Explore Corporate Solutions",
  },
  {
    slug: "management-consultancy",
    activity: "Management Consultancies",
    title: "Management Consultancy",
    icon: "strategy",
    text: "Strengthen your business through management advisory services focused on operational efficiency, business planning, organizational development, and informed decision-making.",
    highlights: [
      "Business management advisory",
      "Operational improvement consultation",
      "Business planning support",
      "Organizational process advisory",
    ],
    cta: "Book a Business Consultation",
  },
];

// The dropdown and the API both work from this list, so an enquiry can only
// ever name a licensed service.
export const corporateServiceTitles = corporateServices.map((s) => s.title);
