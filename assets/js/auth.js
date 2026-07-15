// Redirect to gate if not authenticated
(function() {
  var HASH = "e9fb34ce28a625b0f56cecc4cf6d7fcf74dc21282dc3f94d8c5cf35527d46fea";
  var KEY  = "ti_beta_auth";
  if (sessionStorage.getItem(KEY) !== HASH) {
    // Count directory depth relative to site root (works on both custom domain and github.io/repo)
    var parts = window.location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    // On custom domain: /tracker/index.html → depth 1
    // On github pages:  /inventory-training/tracker/index.html → depth 2, but repo root is depth 1
    var repoIdx = parts.indexOf('inventory-training');
    var depth = repoIdx >= 0 ? parts.length - repoIdx - 1 : parts.length;
    // Remove 1 more if the last segment is a file
    var last = parts[parts.length - 1] || '';
    if (last.indexOf('.') !== -1) depth = depth - 1;
    var prefix = '';
    for (var i = 0; i < depth; i++) prefix += '../';
    window.location.replace(prefix + 'gate.html');
  }
})();
