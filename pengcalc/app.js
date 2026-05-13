const pengeScreenEl = document.querySelector(".money-box .value");
const timeEl = document.querySelector(".time-box .value");
const inputEls = document.querySelectorAll(".input-item input");
const presetEls = document.querySelectorAll(".preset-grid button");
const timeButtonEls = document.querySelectorAll(".time-buttons button");
const customYearEl = document.querySelector("#custom-year");
const startBtn = document.querySelector(".start");

const presetVerdier = [1.07, 1.04, 1.06, 1.09];
const årPresets = [5, 10, 20, 50];

let simulationIntervalId = null;

presetEls.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const prosent = (presetVerdier[idx] - 1) * 100;
    inputEls[1].value = prosent.toFixed(1);
    presetEls.forEach((b) => {
      b.style.borderColor = "navy";
    });
    btn.style.borderColor = "gold";
  });
});

timeButtonEls.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    customYearEl.value = String(årPresets[idx]);
    timeButtonEls.forEach((b) => {
      b.style.borderColor = "navy";
    });
    btn.style.borderColor = "gold";
  });
});

startBtn.addEventListener("click", () => {
  if (simulationIntervalId !== null) {
    clearInterval(simulationIntervalId);
    simulationIntervalId = null;
  }

  let nåværendePenger = Number(document.querySelector("#start").value) || 0;
  const renteFaktor =
    1 + Number(document.querySelector("#increase").value) / 100;
  const månedligInnskudd =
    Number(document.querySelector("#inskudd").value) || 0;
  const målAr = Number(customYearEl.value);

  if (!målAr || målAr < 1) {
    alert("Velg antall år (knapp eller eget tall) først!");
    return;
  }

  let år = 0;
  pengeScreenEl.textContent = "0 kr";
  timeEl.textContent = "0 år";

  simulationIntervalId = setInterval(() => {
    år += 1;
    nåværendePenger += månedligInnskudd * 12;
    nåværendePenger *= renteFaktor;

    pengeScreenEl.textContent =
      Math.floor(nåværendePenger).toLocaleString("no-NO") + " kr";
    timeEl.textContent = år + " år";

    pengeScreenEl.style.transform = "scale(1.1)";
    setTimeout(() => {
      pengeScreenEl.style.transform = "scale(1)";
    }, 60);

    if (år >= målAr) {
      clearInterval(simulationIntervalId);
      simulationIntervalId = null;
      pengeScreenEl.style.color = "gold";
    }
  }, 50);
});
