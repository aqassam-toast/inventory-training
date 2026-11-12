// Search index — each entry has: title, type, description, url, keywords (searchable text)
var SEARCH_INDEX = [
  // Videos
  {
    title: "Toast IQ Inventory: First Look",
    type: "Video",
    url: "https://www.loom.com/share/1489f7a1bf564659960370dc8b60f01f",
    external: true,
    description: "Curious about what Toast IQ Inventory is? Get a first look at the product in this quick walkthrough.",
    keywords: "first look overview introduction what is toast iq inventory product vision demo"
  },
  {
    title: "What to Expect During Onboarding",
    type: "Tutorial",
    url: "tutorials/what-to-expect-during-onboarding.html",
    external: false,
    description: "An overview of what the onboarding process will be like and how to prepare.",
    keywords: "onboarding overview prepare process what to expect getting started setup"
  },
  {
    title: "Completing Your First Stock Count",
    type: "Tutorial",
    url: "tutorials/completing-your-first-stock-count.html",
    external: false,
    description: "Set up item locations, create a count template, run the count, and review your variance.",
    keywords: "stock count first count cycle count item locations count template schedule rules perpetual inventory variance actual theoretical mobile app ad hoc count baseline submit count"
  },
  {
    title: "Recipes & Ingredients — What's Ready for Testing",
    type: "Video",
    internal: true,
    url: "https://toasttab.zoom.us/rec/share/-wYqVadtrbDPCIxoMELXjJsRIVpqlED3lF54gBsnaS4uhuWW8cfqO-RQfV9XC7nV.IVN0BPZJPa6QF3JV?startTime=1786021178000",
    external: true,
    description: "A live demo of the recipe and ingredient capability now available for testing.",
    keywords: "recipes ingredients webinar august 2026 batch prep FIFO depletion allergens barcode label ingredient import xtrachef migration pricing rollout modifiers shared inventory passcode"
  },
  {
    title: "How to get started with advanced inventory in Toast Retail",
    type: "Video",
    internal: true,
    url: "https://www.loom.com/share/90a0ad55eef2462390e673d2c8a82ac2",
    external: true,
    description: "A step-by-step walkthrough of how to upgrade to Advanced Inventory as an existing Toast Retail customer.",
    keywords: "advanced inventory upgrade toast retail existing customer getting started"
  },
  {
    title: "Toast IQ Inventory First Look — May 2026",
    type: "Video",
    internal: true,
    url: "https://www.loom.com/share/74b05496f42a443c9e80b83ab79c5e28",
    external: true,
    description: "A live first look at Toast IQ Inventory for Test Kitchen members.",
    keywords: "first look webinar may 2026 product vision FIFO costing item library shared inventory pooling recipes prep AI invoice upload par levels auto-86 multi-location passcode test kitchen"
  },
  {
    title: "Tracking Stock on an Item",
    type: "Video",
    internal: true,
    url: "https://www.loom.com/share/87b5263e4f9f4df2b6d1e7baddd30512",
    external: true,
    description: "How to enable stock tracking, set units of measure, and manage item quantities.",
    keywords: "tracking stock enable units of measure quantities FIFO cost item"
  },
  {
    title: "Test Kitchen Onboarding — June 2026",
    type: "Video",
    internal: true,
    url: "https://toasttab.zoom.us/clips/share/-JHr2coFRbCQwnW6XEb7kQ",
    external: true,
    description: "Live walkthrough of item setup, invoice upload, cycle counts, and reports.",
    keywords: "test kitchen onboarding webinar item setup invoice upload cycle counts reports recipes ingredients shared inventory sales cogs roll forward snapshot purchasing receiving stock tracking barcode scanning retail products supplier"
  },
  {
    title: "Recipes & Ingredients Overview",
    type: "Tutorial",
    url: "tutorials/recipes-and-ingredients-overview.html",
    external: false,
    description: "Define what goes into each menu item so selling it depletes ingredients and keeps your costs accurate.",
    keywords: "recipes ingredients prepared food beverage recipe tab yield unit of measure unit conversion plate cost allergens prep time cook time depletion cost of goods stock purchase cost sellable non-sellable item catalog filters"
  },
  {
    title: "Cross-Location Transfer, Introduction",
    type: "Video",
    url: "https://www.loom.com/share/2a3b727f25a04cbb9f0ec98cb62224f7",
    external: true,
    description: "A walkthrough of cross-location transfers — requesting stock from another location, matching items automatically, and approving, receiving, and duplicating transfers to keep every location at par.",
    keywords: "cross location transfer introduction feature multi-location stock move par max draft submit approve receive duplicate"
  },
  // Tutorials
  // FAQs
  {
    title: "How do I get access to Toast IQ Inventory?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Open Beta is live in the UK & Ireland, Canada, and Australia, and available for purchase in select U.S. districts.",
    keywords: "access get started buy purchase district availability open beta how"
  },
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
    title: "Is batch production / prep supported?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — batch production is supported and is manual today.",
    keywords: "batch production prep workflows cocktails prep builds manual"
  },
  {
    title: "Can I track inventory by sub-location?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "No — tracking by sub-location is not supported.",
    keywords: "sub-location bar kitchen retail location tracking"
  },
  {
    title: "Can I set par levels?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Par levels are supported for sellable items, not ingredients or supplies. Automated restock-to-par is not available.",
    keywords: "par levels reorder point minimum stock par min par max"
  },
  {
    title: "Can the system automatically 86 items?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Not automatically — sales availability is separate from stock; sync availability with stock on-hand from Item actions.",
    keywords: "86 items out of stock availability sync stock on hand sales availability"
  },
  {
    title: "Does this integrate with scales or draft systems?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Not today. Barcode scanning and label printing are included.",
    keywords: "scales draft systems hardware barcode scanning label printing integrations"
  },
  {
    title: "Does this integrate with QuickBooks?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Available for QuickBooks Online, QuickBooks Desktop via IIF file, and generic export to Excel. Expanded to Canada; no other countries yet.",
    keywords: "quickbooks accounting payroll integration sales invoice qbo iif quickbooks desktop excel export canada international"
  },
  {
    title: "Is Toast IQ Inventory available?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Open Beta since September 8, 2026 in the UK & Ireland, Canada, and Australia, and select U.S. districts.",
    keywords: "availability rollout open beta countries when"
  },
  {
    title: "Is this available outside the U.S.?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — live in the UK & Ireland, Canada, and Australia as part of the Open Beta.",
    keywords: "international countries outside US uk ireland canada australia"
  },
  {
    title: "Will this cost extra?",
    type: "FAQ",
    url: "faqs/index.html",
    external: false,
    description: "Yes — it is a paid addition to your Toast subscription. See Toast Shop or your Toast representative.",
    keywords: "cost price pricing extra paid"
  },
  // Item catalog
  {
    title: "Mastering the Item Catalog",
    type: "Tutorial",
    url: "tutorials/mastering-the-item-catalog.html",
    external: false,
    description: "Search, columns, sorting, filters, inline editing, and bulk actions to keep your item data accurate.",
    keywords: "item catalog search columns sort filter warnings barcodes inline edit bulk actions set values margins items table"
  },
  {
    title: "Receiving Invoices for Ingredients",
    type: "Tutorial",
    url: "tutorials/receiving-invoices.html",
    external: false,
    description: "Upload a scanned invoice, match your items, set the receiving unit, and update stock and costs.",
    keywords: "receiving invoices ingredients upload scan invoice match items vendor item id receiving unit primary unit create new item ingredient supply retail item mark as received update pricing margin updated widget purchasing receiving PO manual invoice chocolate chips cases packs"
  },
  // Guides
  {
    title: "Upgrading from Toast Retail",
    type: "Tutorial",
    url: "tutorials/upgrading-from-toast-retail.html",
    description: "What changes when you move from Toast Retail: sales availability vs stock, real-time stock tracking, adjustment reasons, and item history.",
    keywords: "upgrade upgrading toast retail transition migrate changes 86 availability activity log adjustment reasons real-time reports"
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
    url: "https://docs.google.com/forms/d/e/1FAIpQLScSRBvaz3QeEr_3QXmP7MLQtUGtAD4Q5k2gNocoH-d9C0IcvQ/viewform",
    external: true,
    description: "Confidentiality agreement required before getting access to the sandbox.",
    keywords: "sandbox access acknowledgement confidentiality form agreement sign"
  }
];
