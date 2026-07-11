document.addEventListener("DOMContentLoaded", () => {
  const bdSection = document.getElementById("bd");
  const abroadSection = document.getElementById("abroad");
  const btnBd = document.getElementById("btnBd");
  const btnAbroad = document.getElementById("btnAbroad");

  function show(which){
    bdSection.style.display = which === "bd" ? "block" : "none";
    abroadSection.style.display = which === "abroad" ? "block" : "none";
  }
  btnBd.addEventListener("click", () => { show("bd"); bdSection.scrollIntoView({behavior:"smooth"}); });
  btnAbroad.addEventListener("click", () => { show("abroad"); abroadSection.scrollIntoView({behavior:"smooth"}); });

  const hash = window.location.hash.replace("#","");
  show(hash === "bd" ? "bd" : "abroad");
});
