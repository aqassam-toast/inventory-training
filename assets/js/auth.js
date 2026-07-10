// Redirect to gate if not authenticated
(function() {
  var HASH = "e9fb34ce28a625b0f56cecc4cf6d7fcf74dc21282dc3f94d8c5cf35527d46fea";
  var KEY  = "ti_beta_auth";
  var depth = window.location.pathname.split('/').filter(Boolean).length;
  // Determine relative path to gate.html based on directory depth
  var base = "";
  // On GitHub Pages the repo name is part of the path; find gate.html relative to current page
  var path = window.location.pathname;
  var parts = path.split('/');
  // Count how many dirs deep we are past the repo root
  // Repo root ends at /inventory-training/
  var repoIdx = parts.indexOf('inventory-training');
  var depth = repoIdx >= 0 ? parts.length - repoIdx - 2 : 0;
  var prefix = "";
  for (var i = 0; i < depth; i++) prefix += "../";
  if (localStorage.getItem(KEY) !== HASH) {
    window.location.replace(prefix + "gate.html");
  }
})();
