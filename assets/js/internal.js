// Internal view — password modal, banner, and content filtering
(function() {
  var HASH = "ecd64d4210349796828b6e9a336506121b6afad4b907ee2b78cf8ec93a227824";
  var KEY  = "ti_internal_auth";

  function isInternal() {
    return sessionStorage.getItem(KEY) === HASH;
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
    if (hash === HASH) {
      sessionStorage.setItem(KEY, HASH);
      hideModal();
      applyInternalState();
    } else {
      document.getElementById("internal-pwd-error").style.display = "block";
    }
  }

  function exitInternal() {
    sessionStorage.removeItem(KEY);
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
