// Live search over SEARCH_INDEX
(function() {
  var input = document.getElementById("search-input");
  if (!input) return;

  // Entries flagged `internal: true` are hidden from search unless internal view
  // is unlocked, matching the data-internal="true" content gating in internal.js.
  var INTERNAL_HASH = "8dd40795099ef28537203f1668d2812d4357c9176fcd6345389f224e3ae390b1";
  function isInternal() {
    // localStorage throws in Safari private mode and when storage is blocked.
    try { return localStorage.getItem("ti_internal_auth") === INTERNAL_HASH; } catch (e) { return false; }
  }

  var wrap = input.closest(".search-wrap");
  var results = document.createElement("div");
  results.className = "search-results";
  wrap.appendChild(results);

  function search(query) {
    if (!query || query.length < 2) { results.innerHTML = ""; results.style.display = "none"; return; }
    var q = query.toLowerCase().split(/\s+/);
    // Checked per query, so unlocking internal view takes effect without a reload
    var internal = isInternal();
    var scored = SEARCH_INDEX.filter(function(item) {
      return internal || !item.internal;
    }).map(function(item) {
      var haystack = (item.title + " " + item.description + " " + item.keywords).toLowerCase();
      var score = 0;
      q.forEach(function(word) {
        if (haystack.indexOf(word) !== -1) score++;
      });
      return { item: item, score: score };
    }).filter(function(s) { return s.score > 0; }).sort(function(a, b) {
      var aFaq = a.item.type === "FAQ" ? 1 : 0;
      var bFaq = b.item.type === "FAQ" ? 1 : 0;
      if (bFaq !== aFaq) return bFaq - aFaq;
      return b.score - a.score;
    });

    if (scored.length === 0) {
      results.innerHTML = '<div class="search-empty">No results found</div>';
      results.style.display = "block";
      return;
    }

    var html = scored.slice(0, 8).map(function(s) {
      var item = s.item;
      var target = item.external ? ' target="_blank"' : '';
      return '<a class="search-result" href="' + item.url + '"' + target + '>' +
        '<span class="search-result-type">' + item.type + '</span>' +
        '<span class="search-result-title">' + item.title + '</span>' +
        '<span class="search-result-desc">' + item.description + '</span>' +
      '</a>';
    }).join("");
    results.innerHTML = html;
    results.style.display = "block";
  }

  var timer;
  input.addEventListener("input", function() {
    clearTimeout(timer);
    timer = setTimeout(function() { search(input.value.trim()); }, 150);
  });
  input.addEventListener("keydown", function(e) {
    if (e.key === "Escape") { results.innerHTML = ""; results.style.display = "none"; input.blur(); }
  });

  document.addEventListener("click", function(e) {
    if (!wrap.contains(e.target)) { results.innerHTML = ""; results.style.display = "none"; }
  });
})();
