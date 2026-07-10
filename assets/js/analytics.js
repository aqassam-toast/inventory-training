// Search tracking — fires when user types and pauses, or presses Enter
(function() {
  var input = document.getElementById("search-input");
  if (!input) return;

  var timer;
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && input.value.trim()) {
      gtag("event", "search", { search_term: input.value.trim() });
    }
  });
  input.addEventListener("input", function() {
    clearTimeout(timer);
    var val = input.value.trim();
    if (!val) return;
    timer = setTimeout(function() {
      gtag("event", "search", { search_term: val });
    }, 1500);
  });
})();

// Click tracking — fires on any element with data-track attribute
document.addEventListener("click", function(e) {
  var el = e.target.closest("[data-track]");
  if (!el) return;
  gtag("event", "click", {
    label: el.getAttribute("data-track"),
    href: el.href || null
  });
});
