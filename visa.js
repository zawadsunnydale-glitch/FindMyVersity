const SPONSOR_DETAIL = {
  USA: { amountLabel: "$25,000+", seasoningMonths: 2, note: "US consular officers rarely require 'seasoned' funds, but a sudden large deposit right before interview raises questions — 2 months of stability looks strongest." },
  UK: { amountLabel: "£12,000–£16,650+", seasoningMonths: 1, note: "UK requires funds held for a consecutive 28-day period ending no more than 31 days before you apply." },
  Canada: { amountLabel: "CA$20,635+", seasoningMonths: 4, note: "GIC funds should be arranged well ahead — banks typically take 2–4 weeks to issue the certificate, so start 4 months out." },
  Germany: { amountLabel: "€11,904", seasoningMonths: 3, note: "The blocked account must be opened and funded before your visa appointment; allow time for the transfer and account setup." },
  Australia: { amountLabel: "AU$29,710+", seasoningMonths: 3, note: "Funds should be genuinely available (GTE requirement) — sudden unexplained deposits can trigger extra scrutiny." },
  Singapore: { amountLabel: "Varies by course", seasoningMonths: 1, note: "Requirements are set per-institution; check your offer letter for the exact figure." },
  "Hong Kong": { amountLabel: "HK$180,000+", seasoningMonths: 3, note: "Immigration Department expects clear, explainable fund sources — avoid last-minute lump sums." },
  Japan: { amountLabel: "¥2,000,000+", seasoningMonths: 6, note: "Certificate of Eligibility processing plus embassy review can take months — start your sponsor paperwork early." },
};

function renderVisaCards(){
  document.getElementById("visaGrid").innerHTML = VISA_INFO.map(v => `
    <div class="visa-card">
      <div class="visa-card-head">
        <h3>${v.country}</h3>
        <span class="visa-badge">${v.visa}</span>
      </div>
      <div class="visa-meta">
        <div><span class="label">Processing</span>${v.processing}</div>
        <div><span class="label">Funds required</span>${v.funds}</div>
      </div>
      <ul class="visa-steps">${v.steps.map(s=>`<li>${s}</li>`).join("")}</ul>
    </div>`).join("");
}

function renderSponsorCalc(){
  const country = document.getElementById("sponsorCountrySelect").value;
  const dateStr = document.getElementById("sponsorDate").value;
  const detail = SPONSOR_DETAIL[country];
  const box = document.getElementById("sponsorResult");
  if (!detail){ box.innerHTML = `<div class="result-empty">Pick a destination to see the required funds and a deposit timeline.</div>`; return; }

  let timelineHtml = "";
  if (dateStr){
    const intake = new Date(dateStr);
    const deposit = new Date(intake);
    deposit.setMonth(deposit.getMonth() - detail.seasoningMonths);
    const today = new Date();
    const daysLeft = Math.ceil((deposit - today) / 86400000);
    timelineHtml = `
      <div class="cost-breakdown-row"><span>Deposit funds by</span><span class="mono-num">${deposit.toDateString()}</span></div>
      <div class="cost-breakdown-row"><span>${daysLeft >= 0 ? "Days until deposit deadline" : "Days past recommended deadline"}</span><span class="mono-num">${Math.abs(daysLeft)}</span></div>
    `;
  }

  box.innerHTML = `
    <div class="cost-breakdown-row"><span>Minimum funds required</span><span class="mono-num">${detail.amountLabel}</span></div>
    <div class="cost-breakdown-row"><span>Recommended seasoning period</span><span class="mono-num">${detail.seasoningMonths} month${detail.seasoningMonths>1?"s":""}</span></div>
    ${timelineHtml}
    <p style="font-size:.85rem;color:var(--cream-dim);margin-top:16px;line-height:1.55;">${detail.note}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderVisaCards();
  const select = document.getElementById("sponsorCountrySelect");
  select.innerHTML = Object.keys(SPONSOR_DETAIL).map(c=>`<option value="${c}">${c}</option>`).join("");
  select.addEventListener("change", renderSponsorCalc);
  document.getElementById("sponsorDate").addEventListener("change", renderSponsorCalc);
  renderSponsorCalc();
});
