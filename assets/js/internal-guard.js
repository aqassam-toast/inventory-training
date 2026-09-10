// Page-level internal guard — redirect to the internal gate if internal view isn't unlocked.
// Use on pages that are internal-only in their entirety (features, tracker, onboarding,
// migration timeline, beta rollout). Public pages must not include this.
(function() {
  var HASH = "8dd40795099ef28537203f1668d2812d4357c9176fcd6345389f224e3ae390b1";
  var KEY  = "ti_internal_auth";
  if (localStorage.getItem(KEY) === HASH) return;

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
  window.location.replace(prefix + 'gate.html?redirect=' + encodeURIComponent(window.location.href));
})();
