// Internal view — password modal, banner, and content filtering
(function() {
  var HASH       = "8dd40795099ef28537203f1668d2812d4357c9176fcd6345389f224e3ae390b1";
  var ADMIN_HASH = "5ab59b0f23217a8b65039340ed2857430abf52f10ab4c34a94aac0ace660b161";
  var KEY        = "ti_internal_auth";
  var ADMIN_KEY  = "ti_admin_auth";

  function isInternal() {
    return localStorage.getItem(KEY) === HASH;
  }

  function applyInternalState() {
    var internal = isInternal();
    // Show/hide internal-only content
    document.querySelectorAll("[data-internal='true']").forEach(function(el) {
      el.style.display = internal ? "" : "none";
    });
    // Show/hide the internal banner
    var banner = document.getElementById("internal-banner");
    if (banner) banner.style.display = internal ? "flex" : "none";
  }

  function showModal() {
    document.getElementById("internal-modal").style.display = "flex";
    document.getElementById("internal-pwd-input").value = "";
    document.getElementById("internal-pwd-error").style.display = "none";
    setTimeout(function() { document.getElementById("internal-pwd-input").focus(); }, 50);
  }

  function hideModal() {
    document.getElementById("internal-modal").style.display = "none";
  }

  async function tryUnlock() {
    var val = document.getElementById("internal-pwd-input").value;
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(val));
    var hash = Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2,"0"); }).join("");
    if (hash === ADMIN_HASH) {
      localStorage.setItem(KEY, HASH);
      localStorage.setItem(ADMIN_KEY, ADMIN_HASH);
      hideModal();
      applyInternalState();
    } else if (hash === HASH) {
      localStorage.setItem(KEY, HASH);
      localStorage.removeItem(ADMIN_KEY);
      hideModal();
      applyInternalState();
    } else {
      document.getElementById("internal-pwd-error").style.display = "block";
    }
  }

  function exitInternal() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(ADMIN_KEY);
    applyInternalState();
  }

  // Inject modal + banner HTML once DOM is ready
  function inject() {
    // Banner
    var banner = document.createElement("div");
    banner.id = "internal-banner";
    banner.innerHTML = '<span>Internal view active</span><button id="internal-exit-btn">Exit internal view</button>';
    document.body.prepend(banner);

    // Modal
    var modal = document.createElement("div");
    modal.id = "internal-modal";
    modal.innerHTML = [
      '<div class="internal-modal-box">',
      '  <div class="internal-modal-title">Internal access</div>',
      '  <p class="internal-modal-sub">Enter the internal password to view team-only content.</p>',
      '  <input id="internal-pwd-input" type="password" placeholder="Password" autocomplete="off" />',
      '  <div id="internal-pwd-error">Incorrect password</div>',
      '  <div class="internal-modal-actions">',
      '    <button id="internal-cancel-btn">Cancel</button>',
      '    <button id="internal-submit-btn">Unlock</button>',
      '  </div>',
      '</div>'
    ].join("");
    document.body.appendChild(modal);

    // Wire up events
    document.getElementById("internal-exit-btn").addEventListener("click", exitInternal);
    document.getElementById("internal-cancel-btn").addEventListener("click", hideModal);
    document.getElementById("internal-submit-btn").addEventListener("click", tryUnlock);
    document.getElementById("internal-pwd-input").addEventListener("keydown", function(e) {
      if (e.key === "Enter") tryUnlock();
    });
    modal.addEventListener("click", function(e) {
      if (e.target === modal) hideModal();
    });

    // Footer trigger — find or create the internal link
    document.querySelectorAll(".internal-trigger").forEach(function(el) {
      el.addEventListener("click", function(e) {
        e.preventDefault();
        if (isInternal()) {
          exitInternal();
        } else {
          showModal();
        }
      });
    });

    applyInternalState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
