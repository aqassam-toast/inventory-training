// tracker-data.js — known issues and feature requests
// To add or update items, edit this file and commit. PMs can submit a PR.
// Format:
//   type:        "issue" | "feature"
//   id:          unique string key, used for vote persistence
//   title:       short display title
//   description: longer detail shown on expand
//   version:     reported version string (issues) or "N/A" for features
//   jira:        Jira ticket key, e.g. "WI-123"
//   jiraStatus:  current Jira status string
//   timeline:    plain-text estimate, e.g. "Q3 2026" or "No ETA"
//   workaround:  plain-text workaround (issues only; omit or "" for features)
//   tags:        array of tag strings, e.g. ["cycle-counts", "mobile"]

var trackerData = [

  // ── KNOWN ISSUES ──────────────────────────────────────────────────
  {
    type: "issue",
    id: "issue-cycle-count-edit",
    title: "Cycle count items cannot be edited after submission",
    description: "Once a cycle count is submitted, individual line items cannot be edited or corrected. The entire count must be cancelled and restarted to fix a single entry mistake.",
    version: "July 2026",
    jira: "WI-186",
    jiraStatus: "Open",
    timeline: "Q3 2026",
    workaround: "Cancel the count and resubmit with corrected quantities. Partial re-counts are not yet supported.",
    tags: ["cycle-counts"]
  },
  {
    type: "issue",
    id: "issue-invoice-duplicate",
    title: "AI invoice upload may create duplicate line items on retry",
    description: "If the AI invoice upload times out and the user retries, duplicate line items can appear on the invoice. The system does not deduplicate on re-upload.",
    version: "July 2026",
    jira: "",
    jiraStatus: "",
    timeline: "No ETA",
    workaround: "Review all line items before confirming receipt. Delete duplicate lines manually before finalizing.",
    tags: ["invoices", "ai"]
  },
  {
    type: "issue",
    id: "issue-avt-expected-zero",
    title: "AVT report shows expected quantity as 0 for items without opening stock",
    description: "Items that were never given an opening stock entry show 0 as the expected quantity in the AVT report, even when stock has been received via invoices since setup.",
    version: "July 2026",
    jira: "",
    jiraStatus: "",
    timeline: "No ETA",
    workaround: "Set an opening stock adjustment for all items before running your first cycle count to establish the starting baseline.",
    tags: ["reporting", "cycle-counts"]
  },

  // ── FEATURE REQUESTS ──────────────────────────────────────────────
  {
    type: "feature",
    id: "feat-bulk-stock-adjust",
    title: "Bulk stock adjustments across multiple items",
    description: "Ability to adjust stock quantities for multiple items at once — useful for spoilage events, delivery corrections, or end-of-period cleanup without running a full cycle count.",
    version: "N/A",
    jira: "",
    jiraStatus: "",
    timeline: "No ETA",
    workaround: "",
    tags: ["inventory"]
  },
  {
    type: "feature",
    id: "feat-stock-location-filter",
    title: "Filter cycle counts and inventory by stock location",
    description: "Cycle counts and the inventory snapshot should be filterable by sub-location (e.g. bar, kitchen, back-of-house) to support multi-zone inventory management.",
    version: "N/A",
    jira: "WI-297",
    jiraStatus: "Open",
    timeline: "Q4 2026",
    workaround: "",
    tags: ["inventory", "cycle-counts"]
  },
  {
    type: "feature",
    id: "feat-custom-adj-reasons",
    title: "Custom stock adjustment reason codes",
    description: "Allow operators to define their own reason codes for stock adjustments (e.g. 'Staff meal', 'Breakage', 'Theft') rather than using a fixed system list.",
    version: "N/A",
    jira: "",
    jiraStatus: "Not Planned",
    timeline: "Not planned",
    workaround: "",
    tags: ["inventory"]
  },
  {
    type: "feature",
    id: "feat-recipe-import",
    title: "Bulk recipe import from spreadsheet",
    description: "Import recipes in bulk via a structured spreadsheet template rather than creating them one by one in the UI.",
    version: "N/A",
    jira: "WI-305",
    jiraStatus: "Open",
    timeline: "TBD — spike in progress",
    workaround: "",
    tags: ["recipes"]
  }
];
