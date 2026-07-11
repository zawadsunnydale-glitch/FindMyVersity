/* Shared chrome: header + footer injected so every page stays in sync,
   plus small progressive-enhancement behaviours. */

function renderHeader(active){
  const links = [
    { href:"index.html", label:"Home", key:"home" },
    { href:"tools.html", label:"Tools", key:"tools" },
    { href:"rankings.html", label:"Rankings", key:"rankings" },
    { href:"visa.html", label:"Visa Hub", key:"visa" },
  ];
  const nav = links.map(l => `<a href="${l.href}" class="${l.key===active?'active':''}">${l.label}</a>`).join("");
  return `
  <header class="site-header">
    <div class="wrap">
      <a href="index.html" class="brand">
        <span class="brand-mark">FV</span>
        FindMyVersity
      </a>
      <nav class="main-nav" aria-label="Primary">
        ${nav}
      </nav>
      <div class="header-actions">
        <a href="#" class="btn btn-ghost btn-sm">Sign In</a>
        <a href="admissions.html" class="btn btn-primary btn-sm">Get Started</a>
        <button class="nav-toggle" aria-label="Open menu" id="navToggle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
    <div id="mobileNav" style="display:none;border-top:1px solid var(--line);background:var(--parchment);">
      <div class="wrap" style="padding:18px 20px;display:flex;flex-direction:column;gap:16px;">
        ${links.map(l=>`<a href="${l.href}" style="font-weight:600;">${l.label}</a>`).join("")}
        <a href="#" style="font-weight:600;">Sign In</a>
      </div>
    </div>
  </header>`;
}

function renderFooter(){
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="footer-brand"><span class="brand-mark">FV</span>FindMyVersity</div>
          <p class="footer-desc">AI-assisted university matching for students everywhere — free, transparent, and built around local curriculums like HSC, Madrasha, and A-Levels.</p>
        </div>
        <div class="footer-col">
          <h4>Tools</h4>
          <ul>
            <li><a href="tools.html#quiz">Quick Match Quiz</a></li>
            <li><a href="tools.html#cost">Cost Calculator</a></li>
            <li><a href="tools.html#eligibility">Eligibility Checker</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="rankings.html">Global Rankings</a></li>
            <li><a href="visa.html">Visa Information</a></li>
            <li><a href="tools.html#career">Career Mapping</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Curriculums</h4>
          <ul>
            <li><a href="tools.html#eligibility">National (HSC)</a></li>
            <li><a href="tools.html#eligibility">Madrasha Board</a></li>
            <li><a href="tools.html#eligibility">A-Levels</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 FindMyVersity. All tools 100% free.</span>
        <span>Built for HSC · Madrasha · A-Level students</span>
      </div>
    </div>
  </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.outerHTML = renderHeader(headerMount.dataset.active || "");
  if (footerMount) footerMount.outerHTML = renderFooter();

  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav){
    toggle.addEventListener("click", () => {
      mobileNav.style.display = mobileNav.style.display === "none" ? "block" : "none";
    });
  }

  // scroll reveal
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold:0.12 });
    items.forEach(i=>io.observe(i));
  } else {
    items.forEach(i=>i.classList.add("in"));
  }
});
