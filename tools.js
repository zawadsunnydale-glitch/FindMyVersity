/* ============================================================
   Tools page interactivity
============================================================ */

/* ---------- tab switching ---------- */
function initTabs(){
  const tabs = document.querySelectorAll(".tool-tab");
  const panels = document.querySelectorAll(".tool-panel");
  function activate(name){
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle("active", p.id === "panel-" + name));
  }
  tabs.forEach(t => t.addEventListener("click", () => {
    activate(t.dataset.tab);
    history.replaceState(null, "", "#" + t.dataset.tab);
  }));
  const hash = window.location.hash.replace("#","");
  if (hash && document.getElementById("panel-" + hash)) activate(hash);
}

/* ---------- AI-lite natural language search ---------- */
const REGION_MAP = {
  europe: ["United Kingdom","Germany"],
  uk: ["United Kingdom"], britain: ["United Kingdom"], england: ["United Kingdom"],
  us: ["United States"], usa: ["United States"], america: ["United States"],
  germany: ["Germany"],
  canada: ["Canada"],
  singapore: ["Singapore"],
  "hong kong": ["Hong Kong"], hk: ["Hong Kong"],
  japan: ["Japan"],
  australia: ["Australia"],
  asia: ["Singapore","Hong Kong","Japan"],
};
const FIELD_KEYWORDS = {
  "computer-science": ["computer science","cs","software","coding","programming"],
  "ai-ml": ["ai","machine learning","ml","artificial intelligence"],
  "engineering": ["engineering","engineer"],
  "medicine": ["medicine","medical","mbbs","doctor"],
  "business": ["business","mba","finance","management"],
  "economics": ["economics","econ"],
  "law": ["law","llb","legal"],
  "physics": ["physics"],
};

function parseQuery(q){
  const lower = q.toLowerCase();
  let countries = [];
  Object.keys(REGION_MAP).forEach(key => { if (lower.includes(key)) countries.push(...REGION_MAP[key]); });
  countries = [...new Set(countries)];

  let field = null;
  Object.keys(FIELD_KEYWORDS).forEach(f => { if (FIELD_KEYWORDS[f].some(kw => lower.includes(kw))) field = f; });

  let maxBudget = null;
  const kMatch = lower.match(/\$?\s?(\d{1,3})\s?k/);
  const dollarMatch = lower.match(/\$\s?(\d{1,3}[,.]?\d{0,3})/);
  if (kMatch) maxBudget = parseInt(kMatch[1],10) * 1000;
  else if (dollarMatch) maxBudget = parseInt(dollarMatch[1].replace(/[,.]/g,""),10);

  const affordable = /afford|cheap|budget|low cost|low-cost/.test(lower);
  if (affordable && !maxBudget) maxBudget = 20000;

  return { countries, field, maxBudget };
}

function runAiSearch(q){
  const box = document.getElementById("aiSearchResults");
  if (!q.trim()){
    box.innerHTML = `<div class="result-empty">Type a plain-English description above, then hit Search.</div>`;
    return;
  }
  const parsed = parseQuery(q);
  let results = UNIVERSITIES.filter(u => {
    if (parsed.countries.length && !parsed.countries.includes(u.country)) return false;
    if (parsed.field && !u.fields.includes(parsed.field)) return false;
    if (parsed.maxBudget && (u.tuition) > parsed.maxBudget) return false;
    return true;
  });
  if (!results.length) results = [...UNIVERSITIES].sort((a,b)=>a.qs-b.qs).slice(0,6);
  results = results.sort((a,b)=>a.qs-b.qs).slice(0,8);

  const chipsRow = [
    parsed.countries.length ? `region: ${parsed.countries.join(", ")}` : null,
    parsed.field ? `field: ${FIELD_LABELS[parsed.field]}` : null,
    parsed.maxBudget ? `budget: under $${parsed.maxBudget.toLocaleString()}` : null,
  ].filter(Boolean);

  box.innerHTML = `
    ${chipsRow.length ? `<div class="subject-pill-list" style="margin-bottom:18px;">${chipsRow.map(c=>`<span class="subject-pill">${c}</span>`).join("")}</div>` : ""}
    ${results.map(u => `
      <div class="uni-result-card">
        <div>
          <div class="uni-result-name">${u.name}</div>
          <div class="uni-result-meta">${u.city}, ${u.country} · QS #${u.qs} · Employer rep ${u.employer}/100</div>
        </div>
        <span class="match-pct">$${u.tuition.toLocaleString()}/yr</span>
      </div>`).join("")}
  `;
}

/* ---------- Quick Match Quiz ---------- */
const quizState = { destination:null, tier:null, field:null, budget:null };
let quizStep = 1;

function initQuiz(){
  const destWrap = document.getElementById("quizDestination");
  if (destWrap) destWrap.innerHTML = COUNTRY_LIST.filter(c=>c!=="Bangladesh").map(c=>`<button class="chip" data-field="destination" data-value="${c}">${c}</button>`).join("");
  const fieldWrap = document.getElementById("quizField");
  if (fieldWrap) fieldWrap.innerHTML = Object.keys(FIELD_LABELS).map(f=>`<button class="chip" data-field="field" data-value="${f}">${FIELD_LABELS[f]}</button>`).join("");

  document.querySelectorAll("#panel-quiz .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const { field, value } = chip.dataset;
      quizState[field] = value;
      document.querySelectorAll(`#panel-quiz .chip[data-field="${field}"]`).forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
    });
  });

  document.getElementById("quizNext").addEventListener("click", () => {
    if (quizStep < 4){ quizStep++; renderQuizStep(); }
    else { computeQuizResults(); }
  });
  document.getElementById("quizBack").addEventListener("click", () => {
    if (quizStep > 1){ quizStep--; renderQuizStep(); }
  });
  renderQuizStep();
}

function renderQuizStep(){
  document.querySelectorAll(".quiz-step").forEach(s => s.classList.toggle("active", +s.dataset.step === quizStep));
  for (let i=1;i<=4;i++){
    document.getElementById("qp"+i).style.width = i <= quizStep ? "100%" : "0%";
  }
  document.getElementById("quizBack").disabled = quizStep === 1;
  document.getElementById("quizNext").textContent = quizStep === 4 ? "See my matches →" : "Next →";
}

function computeQuizResults(){
  const box = document.getElementById("quizResults");
  const budget = quizState.budget ? parseInt(quizState.budget,10) : 999999;
  let pool = UNIVERSITIES.filter(u => {
    if (quizState.destination && u.country !== quizState.destination) return false;
    if (quizState.field && !u.fields.includes(quizState.field)) return false;
    return (u.tuition + u.living) <= budget;
  });
  if (!pool.length){
    pool = UNIVERSITIES.filter(u => !quizState.field || u.fields.includes(quizState.field)).slice(0,5);
  }
  pool = pool.sort((a,b)=>a.qs-b.qs).slice(0,5);

  if (!pool.length){
    box.innerHTML = `<div class="result-empty">No exact matches — try loosening your budget or destination.</div>`;
    return;
  }

  box.innerHTML = `
    <div class="career-results-head"><h3>Your matches</h3></div>
    ${pool.map((u,i) => {
      const score = 96 - i*4;
      return `<div class="match-row">
        <span class="match-rank">${String(i+1).padStart(2,"0")}</span>
        <div>
          <div class="match-name">${u.name}</div>
          <div class="match-loc">${u.city}, ${u.country} · $${(u.tuition+u.living).toLocaleString()}/yr total</div>
        </div>
        <span class="match-pct">${score}%</span>
      </div>`;
    }).join("")}
  `;
}

/* ---------- Subject Planner ---------- */
function initPlanner(){
  const wrap = document.getElementById("plannerCareerChips");
  wrap.innerHTML = CAREERS.map(c => `<button class="chip" data-career="${c.id}">${c.label}</button>`).join("");
  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    wrap.querySelectorAll(".chip").forEach(c=>c.classList.remove("selected","gold"));
    btn.classList.add("selected","gold");
    renderPlannerResult(btn.dataset.career);
  });
}
function renderPlannerResult(careerId){
  const req = SUBJECT_REQUIREMENTS[careerId];
  const career = CAREERS.find(c=>c.id===careerId);
  const box = document.getElementById("plannerResults");
  if (!req){ box.innerHTML = `<div class="result-empty">No data for that career yet.</div>`; return; }
  box.innerHTML = `
    <h3 style="font-size:1.2rem;margin-bottom:6px;">${career.label}</h3>
    <p style="color:var(--cream-45);font-size:.85rem;margin-bottom:20px;">${career.blurb}</p>
    <div style="margin-bottom:16px;">
      <span class="field-label">National Curriculum (HSC)</span>
      <div class="subject-pill-list">${req.hsc.map(s=>`<span class="subject-pill">${s}</span>`).join("")}</div>
    </div>
    <div style="margin-bottom:16px;">
      <span class="field-label">Madrasha Board</span>
      <div class="subject-pill-list">${req.madrasha.map(s=>`<span class="subject-pill">${s}</span>`).join("")}</div>
    </div>
    <div>
      <span class="field-label">English Medium (A-Levels)</span>
      <div class="subject-pill-list">${req.alevels.map(s=>`<span class="subject-pill">${s}</span>`).join("")}</div>
    </div>
  `;
}

/* ---------- Eligibility Checker ---------- */
const eligState = { curriculum:"hsc", stream:"science", subjects:new Set() };
function initEligibility(){
  document.getElementById("eligCurriculum").addEventListener("click", e=>{
    const btn = e.target.closest(".chip"); if(!btn) return;
    document.querySelectorAll("#eligCurriculum .chip").forEach(c=>c.classList.remove("selected"));
    btn.classList.add("selected");
    eligState.curriculum = btn.dataset.value;
  });
  document.getElementById("eligStream").addEventListener("click", e=>{
    const btn = e.target.closest(".chip"); if(!btn) return;
    document.querySelectorAll("#eligStream .chip").forEach(c=>c.classList.remove("selected","gold"));
    btn.classList.add("selected","gold");
    eligState.stream = btn.dataset.value;
    eligState.subjects.clear();
    renderEligSubjects();
  });
  renderEligSubjects();
  document.getElementById("eligCheckBtn").addEventListener("click", checkEligibility);
}
function renderEligSubjects(){
  const wrap = document.getElementById("eligSubjects");
  const subjects = SUBJECTS_BY_STREAM[eligState.stream];
  wrap.innerHTML = subjects.map(s=>`<button class="chip" data-subject="${s}">${s}</button>`).join("");
  wrap.querySelectorAll(".chip").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      const s = chip.dataset.subject;
      if (eligState.subjects.has(s)){ eligState.subjects.delete(s); chip.classList.remove("selected"); }
      else { eligState.subjects.add(s); chip.classList.add("selected"); }
    });
  });
}
function checkEligibility(){
  const box = document.getElementById("eligResults");
  const chosen = eligState.subjects;
  const eligible = ELIGIBILITY_PROGRAMS.filter(p => p.stream === eligState.stream && p.needs.every(n => chosen.has(n)));
  const notEligible = ELIGIBILITY_PROGRAMS.filter(p => p.stream === eligState.stream && !p.needs.every(n => chosen.has(n)));
  box.innerHTML = `
    <div style="margin-bottom:20px;">
      <span class="field-label" style="color:var(--teal);">You qualify for (${eligible.length})</span>
      ${eligible.length ? eligible.map(p=>`<div class="uni-result-card"><div class="uni-result-name">${p.program}</div></div>`).join("") : `<p style="color:var(--cream-45);font-size:.88rem;">None yet — select more subjects.</p>`}
    </div>
    <div>
      <span class="field-label">Not yet eligible (${notEligible.length})</span>
      ${notEligible.map(p=>`<div class="uni-result-card" style="opacity:.55;"><div><div class="uni-result-name">${p.program}</div><div class="uni-result-meta">Needs: ${p.needs.join(", ") || "—"}</div></div></div>`).join("")}
    </div>
  `;
}

/* ---------- Career Map ---------- */
function initCareerMap(){
  const grid = document.getElementById("careerMapGrid");
  grid.innerHTML = CAREERS.map(c => `<button class="career-card" data-career="${c.id}"><div class="career-name">${c.label}</div><div class="career-field">${c.field}</div></button>`).join("");
  grid.addEventListener("click", e => {
    const btn = e.target.closest(".career-card"); if (!btn) return;
    grid.querySelectorAll(".career-card").forEach(c=>c.classList.remove("active"));
    btn.classList.add("active");
    renderCareerMapResults(btn.dataset.career);
  });
  renderCareerMapResults(CAREERS[0].id);
  grid.querySelector(".career-card").classList.add("active");
}
function renderCareerMapResults(careerId){
  const career = CAREERS.find(c=>c.id===careerId);
  const box = document.getElementById("careerMapResults");
  box.innerHTML = `
    <div class="career-results-head">
      <div>
        <h3>${career.label}</h3>
        <p>${career.blurb}</p>
      </div>
    </div>
    ${career.topUnis.map((id,i) => {
      const u = UNIVERSITIES.find(x=>x.id===id); if(!u) return "";
      return `<div class="match-row">
        <span class="match-rank">${String(i+1).padStart(2,"0")}</span>
        <div><div class="match-name">${u.name}</div><div class="match-loc">${u.country} · QS #${u.qs}</div></div>
        <span class="match-pct">${98-i*3}%</span>
      </div>`;
    }).join("")}
  `;
}

/* ---------- ECA Advisor ---------- */
function initEca(){
  const wrap = document.getElementById("ecaFieldChips");
  wrap.innerHTML = Object.keys(ECA_LIBRARY.competitive).map(f=>`<button class="chip" data-field="ecaField" data-value="${f}">${FIELD_LABELS[f]||f}</button>`).join("");
  wrap.querySelectorAll(".chip")[0]?.classList.add("selected","gold");
  document.querySelectorAll("#panel-eca .chip").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      const { field } = chip.dataset;
      document.querySelectorAll(`#panel-eca .chip[data-field="${field}"]`).forEach(c=>c.classList.remove("selected","gold"));
      chip.classList.add("selected","gold");
    });
  });
  document.getElementById("ecaGenerateBtn").addEventListener("click", generateEca);
}
function generateEca(){
  const fieldChip = document.querySelector('#panel-eca .chip[data-field="ecaField"].selected');
  const tierChip = document.querySelector('#panel-eca .chip[data-field="ecaTier"].selected');
  const field = fieldChip ? fieldChip.dataset.value : "computer-science";
  const tier = tierChip ? tierChip.dataset.value : "reach";
  const competitive = ECA_LIBRARY.competitive[field] || ECA_LIBRARY.competitive["computer-science"];
  const tierNote = { reach:"Top-20 admits typically show 2-3 high-impact hooks, not just breadth.", match:"Top-100 admits benefit from 1-2 strong hooks plus solid baseline activities.", safety:"Consistent baseline involvement usually clears the bar here." }[tier];

  document.getElementById("ecaResults").innerHTML = `
    <div class="eca-tier">
      <h4>Broad Baseline Goals</h4>
      <ul>${ECA_LIBRARY.broad.map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <div class="eca-tier">
      <h4>High-Impact Hooks — ${FIELD_LABELS[field]||field}</h4>
      <ul>${competitive.map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
    <p style="font-family:var(--font-mono);font-size:.78rem;color:var(--cream-45);">${tierNote}</p>
  `;
}

/* ---------- Cost Calculator ---------- */
function initCost(){
  const select = document.getElementById("costUniSelect");
  select.innerHTML = UNIVERSITIES.sort((a,b)=>a.name.localeCompare(b.name)).map(u=>`<option value="${u.id}">${u.name} — ${u.country}</option>`).join("");
  select.addEventListener("change", renderCost);
  document.getElementById("costScholarship").addEventListener("input", renderCost);
  renderCost();
}
function renderCost(){
  const uniId = document.getElementById("costUniSelect").value || UNIVERSITIES[0].id;
  const u = UNIVERSITIES.find(x=>x.id===uniId) || UNIVERSITIES[0];
  const scholarship = +document.getElementById("costScholarship").value;
  document.getElementById("costScholarshipLabel").textContent = scholarship + "% covered";

  const baseline = LIVING_COST_BASELINE[u.country] || LIVING_COST_BASELINE["United States"];
  const rentYr = baseline.rent*12, foodYr = baseline.food*12, transportYr = baseline.transport*12,
        utilYr = baseline.utilities*12, clothesYr = baseline.clothes*12, miscYr = baseline.misc*12;
  const tuitionAfter = u.tuition * (1 - scholarship/100);
  const livingTotal = rentYr+foodYr+transportYr+utilYr+clothesYr+miscYr;
  const total = tuitionAfter + livingTotal;

  document.getElementById("costResults").innerHTML = `
    <div class="cost-breakdown-row"><span>Tuition (after scholarship)</span><span class="mono-num">$${Math.round(tuitionAfter).toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>Rent / housing</span><span class="mono-num">$${rentYr.toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>Food</span><span class="mono-num">$${foodYr.toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>Transport</span><span class="mono-num">$${transportYr.toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>Utilities</span><span class="mono-num">$${utilYr.toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>Clothes</span><span class="mono-num">$${clothesYr.toLocaleString()}</span></div>
    <div class="cost-breakdown-row"><span>Miscellaneous</span><span class="mono-num">$${miscYr.toLocaleString()}</span></div>
    <div class="cost-total"><span>Total / year</span><span>$${Math.round(total).toLocaleString()}</span></div>
  `;

  const maxVal = Math.max(tuitionAfter, rentYr, foodYr, livingTotal);
  const rows = [
    ["Tuition", tuitionAfter, ""],
    ["Rent", rentYr, "teal"],
    ["Food", foodYr, "teal"],
    ["Transport", transportYr, "teal"],
    ["Living total", livingTotal, "teal"],
  ];
  document.getElementById("costChart").innerHTML = rows.map(([label,val,cls]) => `
    <div class="bar-row">
      <span class="bar-label">${label}</span>
      <div class="bar-track"><div class="bar-fill ${cls}" style="width:${Math.max(4,(val/maxVal)*100)}%"></div></div>
      <span class="bar-value">$${Math.round(val).toLocaleString()}</span>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs();

  const urlParams = new URLSearchParams(window.location.search);
  const initialQ = urlParams.get("q");
  document.getElementById("aiSearchBtn").addEventListener("click", () => runAiSearch(document.getElementById("aiSearchInput").value));
  document.getElementById("aiSearchInput").addEventListener("keydown", e => { if (e.key==="Enter") runAiSearch(e.target.value); });
  if (initialQ){
    document.getElementById("aiSearchInput").value = initialQ;
    runAiSearch(initialQ);
  }

  initQuiz();
  initPlanner();
  initEligibility();
  initCareerMap();
  initEca();
  initCost();
});
