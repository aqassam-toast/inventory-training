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
    "title": "How do I get access to Toast IQ Inventory?",
    "type": "FAQ",
    "url": "faqs/index.html#early-access",
    "external": false,
    "description": "Contact your Toast sales representative to check availability and get set up.",
    "keywords": "early access"
  },
  {
    "title": "Where is Toast IQ Inventory available?",
    "type": "FAQ",
    "url": "faqs/index.html#availability",
    "external": false,
    "description": "Open Beta is available in the UK & Ireland, Canada, and Australia, and for purchase in select U.S. districts.",
    "keywords": "availability"
  },
  {
    "title": "Is this available outside the U.S.?",
    "type": "FAQ",
    "url": "faqs/index.html#international",
    "external": false,
    "description": "Yes. Toast IQ Inventory is available in the UK & Ireland, Canada, and Australia. Accounting integration availability is limited to the U.S. and Canada.",
    "keywords": "international"
  },
  {
    "title": "Does Toast IQ Inventory cost extra?",
    "type": "FAQ",
    "url": "faqs/index.html#pricing",
    "external": false,
    "description": "Yes. It is a paid addition to your Toast subscription. Check Toast Shop or ask your Toast representative for pricing.",
    "keywords": "pricing"
  },
  {
    "title": "Do I need the Toast Retail module?",
    "type": "FAQ",
    "url": "faqs/index.html#need-retail-module",
    "external": false,
    "description": "No. You do not need to purchase Toast Retail to use Toast IQ Inventory.",
    "keywords": "need retail module"
  },
  {
    "title": "Why can’t I see my menu items?",
    "type": "FAQ",
    "url": "faqs/index.html#no-items-showing",
    "external": false,
    "description": "In Categories, select the menus you want to include. If items still do not appear, contact the Inventory team.",
    "keywords": "no items showing"
  },
  {
    "title": "How do I share feedback?",
    "type": "FAQ",
    "url": "faqs/index.html#how-to-give-feedback",
    "external": false,
    "description": "Use the feedback form for suggestions, or email the Inventory team for help.",
    "keywords": "how to give feedback"
  },
  {
    "title": "What types of items can I create?",
    "type": "FAQ",
    "url": "faqs/index.html#item-types",
    "external": false,
    "description": "Retail, prepared food & beverage, ingredient, and supply. Recipe configuration is available on prepared food & beverage items.",
    "keywords": "item types"
  },
  {
    "title": "Do I manage items in Inventory or Menu Manager?",
    "type": "FAQ",
    "url": "faqs/index.html#inventory-vs-menu-manager",
    "external": false,
    "description": "Either. Both use the same item data. Use Inventory for recipes and stock tracking, and continue managing menus in Menu Manager.",
    "keywords": "inventory vs menu manager"
  },
  {
    "title": "Do recipes need to exist before sales? Can I edit them later?",
    "type": "FAQ",
    "url": "faqs/index.html#recipes-before-sales",
    "external": false,
    "description": "No. You can enter a manual plate cost and back-date it up to 30 days. You can also update recipes over time without creating new menu items.",
    "keywords": "recipes before sales"
  },
  {
    "title": "Do I need to recreate recipes at every location?",
    "type": "FAQ",
    "url": "faqs/index.html#multi-location-recipes",
    "external": false,
    "description": "No. A recipe follows its menu item to the locations where that item is shared. Editing the recipe updates it across those locations.",
    "keywords": "multi location recipes"
  },
  {
    "title": "How do unit conversions work?",
    "type": "FAQ",
    "url": "faqs/index.html#unit-conversions",
    "external": false,
    "description": "Conversions are stored on the ingredient and used wherever that ingredient appears. Check them carefully: incorrect conversions affect inventory calculations.",
    "keywords": "unit conversions"
  },
  {
    "title": "Can I edit multiple items at once?",
    "type": "FAQ",
    "url": "faqs/index.html#bulk-editing",
    "external": false,
    "description": "Yes. Select items in the item catalog, then use the bulk action menus to update shared fields. Many fields can also be edited directly in the table.",
    "keywords": "bulk editing"
  },
  {
    "title": "Can I add my own fields to items?",
    "type": "FAQ",
    "url": "faqs/index.html#custom-attributes",
    "external": false,
    "description": "Yes. Create custom attributes to store extra information, filter your catalog, and include values on labels.",
    "keywords": "custom attributes"
  },
  {
    "title": "Does this support location-specific pricing?",
    "type": "FAQ",
    "url": "faqs/index.html#location-specific-pricing",
    "external": false,
    "description": "Yes. Reports and margins use each location’s price. Continue editing location-specific prices in your existing pricing tools.",
    "keywords": "location specific pricing"
  },
  {
    "title": "Do recipe quantities change with modifier selections?",
    "type": "FAQ",
    "url": "faqs/index.html#modifier-support",
    "external": false,
    "description": "No. Recipes are set on the sellable item; checkout modifiers do not add or remove recipe ingredients.",
    "keywords": "modifier support"
  },
  {
    "title": "Can I customize the allergen list?",
    "type": "FAQ",
    "url": "faqs/index.html#allergens",
    "external": false,
    "description": "No. You can tag finished items using the fixed, country-specific list. Allergens appear on POS and online ordering; third-party ordering is not supported.",
    "keywords": "allergens"
  },
  {
    "title": "Can I add custom dietary tags?",
    "type": "FAQ",
    "url": "faqs/index.html#dietary-tags",
    "external": false,
    "description": "Yes. Dietary tags are customizable and appear on POS and online ordering. They are separate from allergen information.",
    "keywords": "dietary tags"
  },
  {
    "title": "Do ingredient allergens roll up to recipes?",
    "type": "FAQ",
    "url": "faqs/index.html#ingredient-allergens",
    "external": false,
    "description": "No. Add allergens directly to the finished item.",
    "keywords": "ingredient allergens"
  },
  {
    "title": "How do I add invoices?",
    "type": "FAQ",
    "url": "faqs/index.html#invoice-capture",
    "external": false,
    "description": "Use email, mobile scan, upload, manual entry, or purchase order workflows.",
    "keywords": "invoice capture"
  },
  {
    "title": "How do I receive an invoice and update stock?",
    "type": "FAQ",
    "url": "faqs/index.html#invoice-updates",
    "external": false,
    "description": "Review the invoice, match items, and confirm receiving units. Mark it as received to update stock.",
    "keywords": "invoice updates"
  },
  {
    "title": "How do I complete my first stock count?",
    "type": "FAQ",
    "url": "faqs/index.html#first-stock-count",
    "external": false,
    "description": "Set up item locations, create a count template, enter the quantities you have, and submit the count.",
    "keywords": "first stock count"
  },
  {
    "title": "Why is my first count’s variance different from later counts?",
    "type": "FAQ",
    "url": "faqs/index.html#first-count-variance",
    "external": false,
    "description": "Your first count sets the starting point. Later counts compare what you count with what Toast expects.",
    "keywords": "first count variance"
  },
  {
    "title": "Do I have to track stock on every item?",
    "type": "FAQ",
    "url": "faqs/index.html#stock-tracking-optional",
    "external": false,
    "description": "No. Choose which items to track. Counting an item automatically enables stock tracking for it.",
    "keywords": "stock tracking optional"
  },
  {
    "title": "Can stock on hand go negative?",
    "type": "FAQ",
    "url": "faqs/index.html#negative-stock",
    "external": false,
    "description": "No. Stock on hand stops at zero until you count or receive more.",
    "keywords": "negative stock"
  },
  {
    "title": "Can I back-date a receipt or correct an earlier stock entry?",
    "type": "FAQ",
    "url": "faqs/index.html#backdate-stock",
    "external": false,
    "description": "Yes. Back-date or edit past stock entries to reflect when changes actually happened.",
    "keywords": "backdate stock"
  },
  {
    "title": "What recalculates when I edit a past stock entry?",
    "type": "FAQ",
    "url": "faqs/index.html#historic-recalculations",
    "external": false,
    "description": "Stock balances after the edited entry are recalculated throughout the subsequent history.",
    "keywords": "historic recalculations"
  },
  {
    "title": "How do I add or disable adjustment reasons?",
    "type": "FAQ",
    "url": "faqs/index.html#adjustment-reasons",
    "external": false,
    "description": "Go to Settings → Adjustment reasons. Add your own reasons or deactivate ones your team does not use.",
    "keywords": "adjustment reasons"
  },
  {
    "title": "How do I record batch production?",
    "type": "FAQ",
    "url": "faqs/index.html#batch-production",
    "external": false,
    "description": "Use stock counts or manual production events in the item catalog on the web or mobile app.",
    "keywords": "batch production"
  },
  {
    "title": "Does POS waste update inventory?",
    "type": "FAQ",
    "url": "faqs/index.html#waste-tracking",
    "external": false,
    "description": "Yes. POS waste appears in the item’s inventory activity. Configure waste reasons before logging waste.",
    "keywords": "waste tracking"
  },
  {
    "title": "Can I track stock balances by sub-location?",
    "type": "FAQ",
    "url": "faqs/index.html#sub-location-tracking",
    "external": false,
    "description": "No. Separate stock balances by sub-location are not supported. Item locations organize your counts.",
    "keywords": "sub location tracking"
  },
  {
    "title": "When do I need to sync sales availability with stock?",
    "type": "FAQ",
    "url": "faqs/index.html#auto-86",
    "external": false,
    "description": "Sales and POS waste update availability automatically. Sync after receiving inventory, negative Retail stock adjustments, or stock counts using Item actions → Sync availability with stock on-hand.",
    "keywords": "auto 86"
  },
  {
    "title": "Does changing quantity on the POS update stock on hand?",
    "type": "FAQ",
    "url": "faqs/index.html#pos-quantity",
    "external": false,
    "description": "No. Changing quantity on a POS device updates sales availability. Counts, receipts, sales, and waste change stock on hand.",
    "keywords": "pos quantity"
  },
  {
    "title": "Which ordering channels deplete inventory?",
    "type": "FAQ",
    "url": "faqs/index.html#which-channels-deplete",
    "external": false,
    "description": "POS, online ordering, kiosk, and catering & events all deplete stock. For future orders, depletion happens when the order fires.",
    "keywords": "which channels deplete"
  },
  {
    "title": "Can I set par levels?",
    "type": "FAQ",
    "url": "faqs/index.html#par-levels",
    "external": false,
    "description": "Yes, for sellable items. Set par min and max in the item catalog. Ingredient and supply par levels, and automated restock-to-par, are not supported.",
    "keywords": "par levels"
  },
  {
    "title": "Do future orders reduce stock when they are placed?",
    "type": "FAQ",
    "url": "faqs/index.html#preorders-and-fire-time",
    "external": false,
    "description": "No. Stock decreases when the order fires to the kitchen. Fire timing depends on your account’s settings.",
    "keywords": "preorders and fire time"
  },
  {
    "title": "Can I see stock committed to future orders?",
    "type": "FAQ",
    "url": "faqs/index.html#overselling-preorders",
    "external": false,
    "description": "No. Future orders do not reduce on-hand stock until they fire. There is no committed-stock view.",
    "keywords": "overselling preorders"
  },
  {
    "title": "Do voids and refunds return stock?",
    "type": "FAQ",
    "url": "faqs/index.html#voids-and-restocking",
    "external": false,
    "description": "A void before firing has no stock impact; a void after firing restocks the item. To refund without restocking, return the payment rather than voiding the order.",
    "keywords": "voids and restocking"
  },
  {
    "title": "Which inventory reports are available?",
    "type": "FAQ",
    "url": "faqs/index.html#reporting",
    "external": false,
    "description": "Sales & COGS, Inventory Snapshot, and Inventory Roll Forward.",
    "keywords": "reporting"
  },
  {
    "title": "Do I need to wait until tomorrow to see today’s reports?",
    "type": "FAQ",
    "url": "faqs/index.html#current-day-reporting",
    "external": false,
    "description": "No. Reports include current-day activity without waiting for an overnight batch.",
    "keywords": "current day reporting"
  },
  {
    "title": "How do I check the detail behind a report number?",
    "type": "FAQ",
    "url": "faqs/index.html#validate-report-numbers",
    "external": false,
    "description": "Open the item’s Inventory tab. Its activity log contains the individual movements behind summary report figures.",
    "keywords": "validate report numbers"
  },
  {
    "title": "Does Sales & COGS include waste or stock adjustments?",
    "type": "FAQ",
    "url": "faqs/index.html#cogs-sales-only",
    "external": false,
    "description": "No. COGS in this report focuses on sales, excluding waste, counts, and other stock movements.",
    "keywords": "cogs sales only"
  },
  {
    "title": "Does COGS include items I do not track inventory for?",
    "type": "FAQ",
    "url": "faqs/index.html#cogs-untracked-items",
    "external": false,
    "description": "Yes. Sales & COGS includes all items that sell, including items without stock tracking.",
    "keywords": "cogs untracked items"
  },
  {
    "title": "Why do prices and costs appear for items with no sales?",
    "type": "FAQ",
    "url": "faqs/index.html#prices-without-sales",
    "external": false,
    "description": "Price and cost values display even when an item has not sold.",
    "keywords": "prices without sales"
  },
  {
    "title": "How is inventory cost calculated?",
    "type": "FAQ",
    "url": "faqs/index.html#fifo-costing",
    "external": false,
    "description": "Using first-in, first-out (FIFO): the oldest received stock is consumed first. You can trace a sale’s cost to the receipt it used.",
    "keywords": "fifo costing"
  },
  {
    "title": "Can I see who changed an item and when?",
    "type": "FAQ",
    "url": "faqs/index.html#audit-log",
    "external": false,
    "description": "Yes. Item history shows what changed, when, who made the change, and where it came from. Use Reports → History to review changes across your business.",
    "keywords": "audit log"
  },
  {
    "title": "Can I choose the number of decimal places?",
    "type": "FAQ",
    "url": "faqs/index.html#decimal-precision",
    "external": false,
    "description": "No. Decimal precision is not customizable.",
    "keywords": "decimal precision"
  },
  {
    "title": "Can I ask questions about my inventory data?",
    "type": "FAQ",
    "url": "faqs/index.html#toastiq",
    "external": false,
    "description": "Yes. Use Toast IQ to ask about stock levels and margin changes in plain language.",
    "keywords": "toastiq"
  },
  {
    "title": "Which accounting options are supported?",
    "type": "FAQ",
    "url": "faqs/index.html#accounting-integrations",
    "external": false,
    "description": "QuickBooks Online, QuickBooks Desktop via IIF file, and export to Excel. QuickBooks Online supports sales, payroll, and accounts payable invoices. Accounting integrations are supported in the U.S. and Canada only.",
    "keywords": "accounting integrations"
  },
  {
    "title": "Does this support scales or draft-system integrations?",
    "type": "FAQ",
    "url": "faqs/index.html#hardware-integrations",
    "external": false,
    "description": "No. Barcode scanning and label generation and printing are supported.",
    "keywords": "hardware integrations"
  },
  {
    "title": "Can I generate barcodes and print labels?",
    "type": "FAQ",
    "url": "faqs/index.html#labels-and-barcodes",
    "external": false,
    "description": "Yes. Generate barcodes and customize and print labels individually or in bulk. Prep labels are not supported.",
    "keywords": "labels and barcodes"
  },
  {
    "title": "What happens to my existing Toast inventory product?",
    "type": "FAQ",
    "url": "faqs/index.html#current-product",
    "external": false,
    "description": "Most Toast Retail customers are expected to upgrade in January 2027; alternate-package exceptions are still being confirmed. For xtraCHEF or International Inventory, contact your Toast representative.",
    "keywords": "current product"
  },
  {
    "title": "What changes when I move from Toast Retail?",
    "type": "FAQ",
    "url": "faqs/index.html#retail-what-is-toast-inventory",
    "external": false,
    "description": "Sales availability is separate from stock. You also get real-time reporting, historic corrections, customizable adjustment reasons, and item history.",
    "keywords": "retail what is toast inventory"
  },
  {
    "title": "When will Toast Retail customers upgrade?",
    "type": "FAQ",
    "url": "faqs/index.html#retail-should-i-upgrade",
    "external": false,
    "description": "We expect most retailers to upgrade in January 2027. Some alternate-package users may be exceptions; this is still being confirmed.",
    "keywords": "retail should i upgrade"
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
