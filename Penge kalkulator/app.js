const pengeScreenEl = document.querySelector(".money-box .value")
const timeEl = document.querySelector(".time-box .value")
const inputEls = document.querySelectorAll(".input-item input")
const presetEls = document.querySelectorAll(".preset-grid button")
const timeButtonEls = document.querySelectorAll(".time-buttons button")
const timeInputEl = document.querySelectorAll(".time-buttons button")

let penger = 0
let time = 0
let inc = 0
let innskudd = 0

presetEls.forEach((e, idx)=> {
    if (idx = 0){e.value = 1.04}
    else if (idx = 1){e.value = 1.07}
    else if (idx = 2){e.value = 1.09}
    else {e.value = 1.06}
})

document.querySelector(".start").addEventListener("click",() => {
    penger = inputEls[0].value 
    inc = inputEls[1].value
    innskudd = inputEls[2].value
}) 