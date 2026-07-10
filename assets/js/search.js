// Live search over SEARCH_INDEX
(function() {
  var input = document.getElementById("search-input");
  if (!input) return;

  var wrap = input.closest(".search-wrap");
  var results = document.createElement("div");
  results.className = "search-results";
  wrap.appendChild(results);

  function search(query) {
    if (!query || query.length < 2) { results.innerHTML = ""; results.style.display = "none"; return; }
    var q = query.toLowerCase().split(/\s+/);
    var scored = SEARCH_INDEX.map(function(item) {
      var haystack = (item.title + " " + item.description + " " + item.keywords).toLowerCase();
      var score = 0;
      q.forEach(function(word) {
        if (haystack.indexOf(word) !== -1) score++;
      });
      return { item: item, score: score };
    }).filter(function(s) { return s.score > 0; }).sort(function(a, b) { return b.score - a.score; });

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
