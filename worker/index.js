/**
 * Cloudflare Worker — Jira proxy for Toast Inventory Tracker
 *
 * Environment variables to set in Cloudflare dashboard (Workers > Settings > Variables):
 *   JIRA_TOKEN   — Jira API token (base64: email:token)
 *   ALLOWED_ORIGIN — e.g. https://aqassam-toast.github.io
 *
 * Routes handled:
 *   GET  /tracker        — fetch all tracker-visible tickets
 *   POST /tracker        — create a new ticket
 *   PUT  /tracker/:key   — update a ticket's editable fields
 */

const JIRA_CLOUD_ID = '44d13531-925f-44fb-a70c-706711bed47d';
const JIRA_BASE = `https://api.atlassian.com/ex/jira/${JIRA_CLOUD_ID}/rest/api/3`;
const NVR_PROJECT = 'NVR';
const TRACKER_LABEL = 'tracker-visible';

// Issue type IDs in NVR
const TYPE_FEATURE = '10200'; // Feature Request
const TYPE_BUG     = '10602'; // Bug

// Field IDs
const FIELD_RELEASE_NOTE  = 'customfield_13117';      // workaround (both types)
const FIELD_EST_DELIVERY  = 'customfield_13254';       // timeline for Bugs
const FIELD_STORY_POINTS  = 'customfield_10016';       // votes (story points)
// Features use standard duedate for timeline

function cors(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, status, env) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', ...cors(env) },
  });
}

async function jiraFetch(path, options, env) {
  const res = await fetch(`${JIRA_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Basic ${env.JIRA_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = { raw: text }; }
  return { status: res.status, body };
}

// Map a raw Jira issue to our tracker shape
function mapIssue(issue) {
  const f = issue.fields;
  const itype = f.issuetype?.id;
  const isBug = itype === TYPE_BUG;

  // Category: pull from labels that start with "cat-"
  const category = (f.labels || []).find(l => l.startsWith('cat-'))?.replace('cat-', '') || '';

  // Reported version: label starting with "ver-" or affects versions
  const version = (f.labels || []).find(l => l.startsWith('ver-'))?.replace('ver-', '')
    || (f.versions?.[0]?.name)
    || '';

  // Timeline
  const timeline = isBug
    ? (f[FIELD_EST_DELIVERY] || '')
    : (f.duedate || '');

  // Workaround
  const workaround = extractPlainText(f[FIELD_RELEASE_NOTE]) || '';

  return {
    id: issue.key,
    key: issue.key,
    type: isBug ? 'issue' : 'feature',
    title: f.summary || '',
    description: extractPlainText(f.description) || '',
    version,
    jira: issue.key,
    jiraStatus: f.status?.name || '',
    resolution: f.resolution?.name || '',
    timeline,
    workaround,
    category,
    tags: (f.labels || [])
      .filter(l => !l.startsWith('cat-') && !l.startsWith('ver-') && l !== TRACKER_LABEL),
    priority: f.priority?.name || '',
    votes: typeof f[FIELD_STORY_POINTS] === 'number' ? f[FIELD_STORY_POINTS] : 0,
    created: f.created,
    updated: f.updated,
  };
}

// Recursively extract plain text from Atlassian Document Format
function extractPlainText(adf) {
  if (!adf) return '';
  if (typeof adf === 'string') return adf;
  if (adf.type === 'text') return adf.text || '';
  if (adf.content) return adf.content.map(extractPlainText).join('');
  return '';
}

// Wrap a plain string into minimal ADF for writing back to Jira
function toAdf(text) {
  if (!text) return null;
  return {
    type: 'doc',
    version: 1,
    content: [{
      type: 'paragraph',
      content: [{ type: 'text', text: String(text) }],
    }],
  };
}

// GET /tracker — fetch Feature Requests and Bugs in NVR (parallel queries)
async function handleGet(env) {
  const fields = [
    'summary', 'description', 'status', 'issuetype', 'labels',
    'priority', 'created', 'updated', 'versions', 'duedate',
    'resolution',
    FIELD_RELEASE_NOTE, FIELD_EST_DELIVERY, FIELD_STORY_POINTS,
  ];

  async function search(jql) {
    const { status, body } = await jiraFetch(
      '/search/jql',
      { method: 'POST', body: JSON.stringify({ jql, maxResults: 200, fields }) },
      env
    );
    if (status !== 200) throw new Error(JSON.stringify(body));
    return Array.isArray(body.issues) ? body.issues
      : Array.isArray(body.issues?.nodes) ? body.issues.nodes
      : [];
  }

  try {
    const [featureRaw, bugRaw] = await Promise.all([
      search(`project = ${NVR_PROJECT} AND issuetype = "Feature Request" AND labels = "FeatureRequest" ORDER BY created DESC`),
      search(`project = ${NVR_PROJECT} AND issuetype = "Bug" AND labels = "Important_Bugs" ORDER BY created DESC`),
    ]);
    const issues = [...featureRaw, ...bugRaw].map(mapIssue);
    return json({ issues, total: issues.length }, 200, env);
  } catch (e) {
    return json({ error: e.message }, 500, env);
  }
}

// POST /tracker — create a new ticket
async function handlePost(body, env) {
  const {
    type,       // 'issue' | 'feature'
    title,
    description,
    category,
    version,
    workaround,
    timeline,
    urgency,    // optional priority label
  } = body;

  if (!title) return json({ error: 'title is required' }, 400, env);

  const isBug = type === 'issue';
  const issueTypeId = isBug ? TYPE_BUG : TYPE_FEATURE;

  const labels = [TRACKER_LABEL];
  if (category) labels.push(`cat-${category}`);
  if (version)  labels.push(`ver-${version}`);
  if (urgency)  labels.push(`urgency-${urgency}`);

  const fields = {
    project: { key: NVR_PROJECT },
    issuetype: { id: issueTypeId },
    summary: title,
    description: toAdf(description || ''),
    labels,
  };

  if (workaround) fields[FIELD_RELEASE_NOTE] = toAdf(workaround);

  if (isBug && timeline)     fields[FIELD_EST_DELIVERY] = timeline;
  if (!isBug && timeline)    fields['duedate'] = timeline;

  const { status, body: resp } = await jiraFetch(
    '/issue',
    { method: 'POST', body: JSON.stringify({ fields }) },
    env
  );

  if (status !== 201) return json({ error: resp }, status, env);
  return json({ key: resp.key, id: resp.id }, 201, env);
}

// POST /tracker/:key/vote — increment or decrement story points by 1
async function handleVote(key, body, env) {
  if (!key) return json({ error: 'issue key required' }, 400, env);
  const delta = body.delta === -1 ? -1 : 1;

  // Fetch current story points
  const { status: getStatus, body: current } = await jiraFetch(
    `/issue/${key}?fields=${FIELD_STORY_POINTS}`,
    { method: 'GET' },
    env
  );
  if (getStatus !== 200) return json({ error: current }, getStatus, env);

  const current_points = typeof current.fields?.[FIELD_STORY_POINTS] === 'number'
    ? current.fields[FIELD_STORY_POINTS]
    : 0;
  const new_points = Math.max(0, current_points + delta);

  const { status, body: resp } = await jiraFetch(
    `/issue/${key}`,
    { method: 'PUT', body: JSON.stringify({ fields: { [FIELD_STORY_POINTS]: new_points } }) },
    env
  );

  if (status !== 204) return json({ error: resp }, status, env);
  return json({ votes: new_points }, 200, env);
}

// PUT /tracker/:key — update editable fields on an existing ticket
async function handlePut(key, body, env) {
  if (!key) return json({ error: 'issue key required' }, 400, env);

  const { title, description, workaround, timeline, jiraStatus, category, version } = body;

  // Fetch current issue to preserve labels
  const { status: getStatus, body: current } = await jiraFetch(
    `/issue/${key}?fields=labels,issuetype`,
    { method: 'GET' },
    env
  );
  if (getStatus !== 200) return json({ error: current }, getStatus, env);

  const isBug = current.fields?.issuetype?.id === TYPE_BUG;

  // Rebuild labels: keep non-cat non-ver non-urgency labels, replace cat/ver
  let labels = (current.fields?.labels || []).filter(
    l => !l.startsWith('cat-') && !l.startsWith('ver-')
  );
  if (category !== undefined) {
    labels = labels.filter(l => !l.startsWith('cat-'));
    if (category) labels.push(`cat-${category}`);
  }
  if (version !== undefined) {
    labels = labels.filter(l => !l.startsWith('ver-'));
    if (version) labels.push(`ver-${version}`);
  }

  const fields = { labels };
  if (title)       fields.summary = title;
  if (description) fields.description = toAdf(description);
  if (workaround !== undefined) fields[FIELD_RELEASE_NOTE] = workaround ? toAdf(workaround) : null;
  if (timeline !== undefined) {
    if (isBug)  fields[FIELD_EST_DELIVERY] = timeline || null;
    else        fields['duedate'] = timeline || null;
  }

  const { status, body: resp } = await jiraFetch(
    `/issue/${key}`,
    { method: 'PUT', body: JSON.stringify({ fields }) },
    env
  );

  // Status transitions
  if (jiraStatus) {
    const { body: transitions } = await jiraFetch(
      `/issue/${key}/transitions`,
      { method: 'GET' },
      env
    );
    const match = (transitions.transitions || []).find(
      t => t.name.toLowerCase() === jiraStatus.toLowerCase()
    );
    if (match) {
      await jiraFetch(
        `/issue/${key}/transitions`,
        { method: 'POST', body: JSON.stringify({ transition: { id: match.id } }) },
        env
      );
    }
  }

  if (status !== 204) return json({ error: resp }, status, env);
  return json({ ok: true }, 200, env);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(env) });
    }

    const path = url.pathname.replace(/\/$/, '');

    // GET /tracker
    if (method === 'GET' && path === '/tracker') {
      return handleGet(env);
    }


    // POST /tracker — create
    if (method === 'POST' && path === '/tracker') {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'invalid json' }, 400, env); }
      return handlePost(body, env);
    }

    // POST /tracker/:key/vote — cast or retract a vote
    const voteMatch = path.match(/^\/tracker\/([A-Z]+-\d+)\/vote$/);
    if (method === 'POST' && voteMatch) {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'invalid json' }, 400, env); }
      return handleVote(voteMatch[1], body, env);
    }

    // PUT /tracker/:key — update
    const putMatch = path.match(/^\/tracker\/([A-Z]+-\d+)$/);
    if (method === 'PUT' && putMatch) {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'invalid json' }, 400, env); }
      return handlePut(putMatch[1], body, env);
    }

    return json({ error: 'not found' }, 404, env);
  },
};
