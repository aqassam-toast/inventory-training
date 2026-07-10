// Search index — each entry has: title, type, description, url, keywords (searchable text)
var SEARCH_INDEX = [
  // Videos
  {
    title: "Overview of the Item Library",
    type: "Video",
    url: "https://play.vidyard.com/XzJUbiW5sQ1TMhSXVYzdLE",
    external: true,
    description: "A walkthrough of the Item Library — your central hub for managing everything you stock track against.",
    keywords: "item library overview retail items stock track hub manage navigation"
  },
  {
    title: "Tracking Stock on an Item",
    type: "Video",
    url: "https://www.loom.com/share/87b5263e4f9f4df2b6d1e7baddd30512",
    external: true,
    description: "How to enable stock tracking, set units of measure, and manage item quantities.",
    keywords: "tracking stock enable units of measure quantities FIFO cost item"
  },
  {
    title: "Test Kitchen Onboarding — June 2026",
    type: "Video",
    url: "https://toasttab.zoom.us/clips/share/-JHr2coFRbCQwnW6XEb7kQ",
    external: true,
    description: "Live walkthrough of item setup, invoice upload, cycle counts, and reports.",
    keywords: "test kitchen onboarding webinar item setup invoice upload cycle counts reports recipes ingredients shared inventory sales cogs roll forward snapshot purchasing receiving stock tracking barcode scanning retail products supplier"
  },
  // Tutorials
  {
    title: "Getting Started with the Test Kitchen Sandbox",
    type: "Tutorial",
    url: "tutorials/sandbox-access.html",
    external: false,
    description: "Join Test Kitchen, complete the access survey, and navigate to the Item Library.",
    keywords: "sandbox access test kitchen join survey item library navigate getting started onboarding"
  },
  {
    title: "Getting Early Access on Your Account",
    type: "Tutorial",
    url: "tutorials/production-access.html",
    external: false,
    description: "Request early access on your production Toast account through the Test Kitchen program.",
    keywords: "production account early access enable feature flag test kitchen email"
  },
  // FAQs
  {
    title: "Will inventory update automatically from invoices?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — invoice ingestion updates inventory with minimal manual intervention.",
    keywords: "invoice automatic update stock ingestion mapping purchases products"
  },
  {
    title: "Do recipes need to exist before sales?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "No — you can enter a manual plate cost and update it up to 30 days in the past.",
    keywords: "recipes sales plate cost margin manual flexible historical update 30 days retroactive"
  },
  {
    title: "Can multiple products share the same inventory?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — core use case. Different pours from the same keg, shared inventory.",
    keywords: "shared inventory multiple products keg pours bundle shared sellable"
  },
  {
    title: "Will batch production / prep workflows be supported?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — batch production will exist, manual at the start.",
    keywords: "batch production prep workflows cocktails prep builds manual automation"
  },
  {
    title: "Can I track inventory by sub-location?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Not fully in first release — high-priority area of feedback.",
    keywords: "sub-location bar kitchen retail location tracking"
  },
  {
    title: "Will the system automate reordering?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Eventually — alerts first, then recommendations, then automation.",
    keywords: "reorder automated alerts recommendations par level stockout"
  },
  {
    title: "Can I set par levels and trigger orders?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — par-based workflows are already part of the system.",
    keywords: "par levels trigger orders reorder point minimum stock"
  },
  {
    title: "Can the system automatically 86 items?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — especially based on ingredient stock.",
    keywords: "86 items out of stock availability ingredient depletion sales"
  },
  {
    title: "Will there be integrations with scales or draft systems?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Active area of research. Barcode scanning and label printing included.",
    keywords: "scales draft systems hardware barcode scanning label printing integrations"
  },
  {
    title: "Does this integrate with QuickBooks?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — payroll, sales, and invoice automation integrations with QuickBooks.",
    keywords: "quickbooks accounting payroll integration sales invoice automation xtraCHEF"
  },
  {
    title: "When will this be available?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Rolling out in phases: retail first, recipes next, modifiers after.",
    keywords: "availability rollout phases retail recipes modifiers timeline when"
  },
  {
    title: "Will there be sandbox access?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — sandbox / early testing environments are planned.",
    keywords: "sandbox testing early access environment demo"
  },
  {
    title: "Will this be available outside the U.S.?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — all countries where Toast is sold today.",
    keywords: "international countries outside US global"
  },
  {
    title: "Will this cost extra?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — pricing is still being finalized.",
    keywords: "cost price pricing extra paid"
  },
  {
    title: "Can large catering orders be handled differently?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Not yet fully considered — great suggestions came up in the webinar.",
    keywords: "catering orders large batch events"
  },
  // Documents
  {
    title: "FAQ — Inventory Test Kitchen (PDF)",
    type: "Document",
    url: "assets/docs/faq-test-kitchen.pdf",
    external: true,
    description: "Downloadable FAQ from the June 2026 webinar.",
    keywords: "faq pdf download test kitchen webinar document"
  },
  {
    title: "Sandbox Access Acknowledgement Form",
    type: "Document",
    url: "https://docs.google.com/forms/d/1cEDLAh22wpyiBbnibtwP2k5qwT0xHowIFcgpDn6yuyI/viewform",
    external: true,
    description: "Confidentiality agreement required before getting access to the sandbox.",
    keywords: "sandbox access acknowledgement confidentiality form agreement sign"
  }
];
