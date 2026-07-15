# Toast Inventory Tracker — Cloudflare Worker Setup

## What this does
The Worker is a thin proxy between the GitHub Pages site and the Jira REST API.
It holds your Jira API token securely (never exposed in the browser) and handles:
- **GET /tracker** — fetches all NVR tickets labelled `tracker-visible`
- **POST /tracker** — creates a new Feature Request or Bug in NVR
- **PUT /tracker/:key** — updates title, description, timeline, workaround, category

## One-time setup (15 minutes)

### 1. Create a Cloudflare account
Go to https://cloudflare.com and sign up for free.

### 2. Get a Jira API token
1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **Create API token** → name it "inventory-tracker-worker"
3. Copy the token
4. Encode your credentials:
   ```
   echo -n "your.email@toasttab.com:YOUR_TOKEN" | base64
   ```
   Copy the base64 output — this is your `JIRA_TOKEN`.

### 3. Deploy the Worker
```bash
cd worker/
npm install -g wrangler          # skip if already installed
wrangler login                   # opens browser to authenticate
wrangler deploy                  # deploys and prints your Worker URL
```
Your Worker URL will look like:
`https://toast-inventory-tracker.YOUR_SUBDOMAIN.workers.dev`

### 4. Set secrets
```bash
wrangler secret put JIRA_TOKEN
# paste your base64 string when prompted

wrangler secret put ALLOWED_ORIGIN
# paste: https://aqassam-toast.github.io
```

### 5. Update the tracker page
Edit `tracker/index.html` and replace the WORKER_URL line:
```js
var WORKER_URL = 'https://toast-inventory-tracker.YOUR_SUBDOMAIN.workers.dev';
```
with your actual Worker URL from step 3.

Commit and push — done.

## Jira ticket conventions

| Field | Convention |
|-------|-----------|
| Issue type | **Feature Request** (10200) for features, **Bug** (10602) for issues |
| Label | Must include `tracker-visible` to surface in the tracker |
| Category | Add a label like `cat-POS`, `cat-Catalog`, `cat-Reports`, etc. |
| Version | Add a label like `ver-July2026` to populate Reported Version |
| Timeline | Bug → Estimated Delivery Date field; Feature → Due Date field |
| Workaround | Both types → Release Note field |

## Updating the tracker
- **Add a request from the site**: use the Submit form — creates the Jira ticket automatically
- **Edit from the site**: unlock Internal view → click Edit on any row → Save to Jira
- **Edit directly in Jira**: just update the ticket — click Refresh on the tracker to pull latest
- **Bulk import from CSV**: add `tracker-visible` + appropriate labels to each ticket in Jira
