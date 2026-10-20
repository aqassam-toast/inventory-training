// Feature list explorer: search, grouped filters with counts, active filter chips,
// collapsible sections. Expects #ft-explorer[data-statuses] and .ft-section[data-label] markup.
(function () {
  var root = document.getElementById('ft-explorer');
  if (!root) return;

  var statuses = JSON.parse(root.dataset.statuses);
  var TAGS = { 'ft-ai': 'AI', 'ft-mobile': 'Mobile', 'ft-mlm': 'MLM' };

  var rows = Array.prototype.slice.call(document.querySelectorAll('.ft-section tbody tr')).map(function (tr) {
    var section = tr.closest('.ft-section');
    var statusCell = tr.querySelector('td:nth-child(3)');
    var tagCell = tr.querySelector('td:nth-child(2)');
    return {
      el: tr,
      section: section.dataset.section,
      status: statuses.map(function (s) { return s.value; }).find(function (v) { return statusCell && statusCell.classList.contains(v); }),
      tags: Object.keys(TAGS).filter(function (t) { return tagCell && tagCell.querySelector('.' + t); }),
      text: tr.textContent.toLowerCase()
    };
  });
  var sections = Array.prototype.slice.call(document.querySelectorAll('.ft-section')).map(function (s) {
    return { value: s.dataset.section, label: s.dataset.label, el: s };
  });
  var tags = Object.keys(TAGS).filter(function (t) { return rows.some(function (r) { return r.tags.indexOf(t) >= 0; }); })
    .map(function (t) { return { value: t, label: TAGS[t] }; });

  var groups = {
    status: { title: 'Availability', allLabel: 'All features', options: statuses, count: function (o) { return rows.filter(function (r) { return r.status === o; }).length; } },
    section: { title: 'Category', allLabel: 'All', options: sections, count: function (o) { return rows.filter(function (r) { return r.section === o; }).length; } },
    tag: { title: 'Technology', allLabel: 'All', options: tags, count: function (o) { return rows.filter(function (r) { return r.tags.indexOf(o) >= 0; }).length; } }
  };
  var state = { status: 'all', section: 'all', tag: 'all', q: '' };

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // Search
  var search = el('div', 'ftx-search');
  var input = el('input');
  input.type = 'search';
  input.placeholder = 'Search features by name or keyword...';
  input.setAttribute('aria-label', 'Search features');
  search.appendChild(input);
  root.appendChild(search);

  // Grouped filters
  var panel = el('div', 'ftx-panel');
  var btns = {};
  Object.keys(groups).forEach(function (key) {
    var g = groups[key];
    var row = el('div', 'ftx-row');
    row.appendChild(el('span', 'ftx-label', g.title));
    var wrap = el('div', 'ftx-chips');
    btns[key] = [{ value: 'all', label: g.allLabel, n: rows.length }].concat(g.options.map(function (o) {
      return { value: o.value, label: o.label, n: g.count(o.value) };
    })).map(function (o) {
      var b = el('button', 'ftx-btn', o.label + ' (' + o.n + ')');
      b.type = 'button';
      b.addEventListener('click', function () { state[key] = o.value; render(); });
      wrap.appendChild(b);
      return { btn: b, value: o.value, label: o.label };
    });
    row.appendChild(wrap);
    panel.appendChild(row);
  });
  root.appendChild(panel);

  // Active chips
  var active = el('div', 'ftx-active');
  var showing = el('strong', 'ftx-showing');
  var chips = el('span', 'ftx-active-chips');
  active.appendChild(showing);
  active.appendChild(chips);
  root.appendChild(active);

  // Disclaimer
  var note = el('div', 'ftx-callout');
  note.appendChild(el('span', 'ftx-callout-icon', 'i'));
  var noteText = el('div');
  noteText.appendChild(el('strong', null, 'About roadmap features'));
  noteText.appendChild(el('p', null, 'Roadmap features are not yet available. We provide a look at upcoming features, and while our goal is to launch these features by GA, we can\'t guarantee it.'));
  note.appendChild(noteText);
  root.appendChild(note);

  var empty = el('p', 'ftx-empty', 'No features match your filters.');
  empty.style.display = 'none';
  root.appendChild(empty);

  input.addEventListener('input', function () { state.q = input.value.trim().toLowerCase(); render(); });

  function chip(label, onRemove) {
    var c = el('button', 'ftx-chip', label + ' ');
    c.type = 'button';
    c.setAttribute('aria-label', 'Remove filter: ' + label);
    c.appendChild(el('span', null, '×'));
    c.addEventListener('click', onRemove);
    chips.appendChild(c);
  }

  function render() {
    Object.keys(btns).forEach(function (key) {
      btns[key].forEach(function (o) { o.btn.classList.toggle('active', state[key] === o.value); });
    });

    var shown = 0;
    rows.forEach(function (r) {
      var ok = (state.status === 'all' || r.status === state.status) &&
               (state.section === 'all' || r.section === state.section) &&
               (state.tag === 'all' || r.tags.indexOf(state.tag) >= 0) &&
               (!state.q || r.text.indexOf(state.q) >= 0);
      r.el.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    sections.forEach(function (s) {
      var any = Array.prototype.some.call(s.el.querySelectorAll('tbody tr'), function (tr) { return tr.style.display !== 'none'; });
      s.el.style.display = any ? '' : 'none';
    });

    showing.textContent = 'Showing ' + shown + ' feature' + (shown === 1 ? '' : 's');
    empty.style.display = shown ? 'none' : '';
    chips.textContent = '';
    var any = false;
    Object.keys(groups).forEach(function (key) {
      if (state[key] === 'all') return;
      any = true;
      var o = btns[key].filter(function (b) { return b.value === state[key]; })[0];
      chip(o.label, function () { state[key] = 'all'; render(); });
    });
    if (state.q) {
      any = true;
      chip('"' + input.value.trim() + '"', function () { state.q = ''; input.value = ''; render(); });
    }
    if (any) {
      var clear = el('button', 'ftx-clear', 'Clear all');
      clear.type = 'button';
      clear.addEventListener('click', function () {
        state = { status: 'all', section: 'all', tag: 'all', q: '' };
        input.value = '';
        render();
      });
      chips.appendChild(clear);
    }
  }
  render();

  // Collapsible section headers
  document.querySelectorAll('.ft-section-header').forEach(function (h) {
    h.setAttribute('role', 'button');
    h.setAttribute('tabindex', '0');
    h.setAttribute('aria-expanded', 'true');
    function toggle() {
      var collapsed = h.parentElement.classList.toggle('collapsed');
      h.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    }
    h.addEventListener('click', toggle);
    h.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();
