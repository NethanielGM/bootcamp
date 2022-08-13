const outPut = document.getElementById("outPut");
const outPutAll = document.getElementById("outPutAll");
const button = document.getElementById("myBtn");
const load = document.getElementById("load");
const radio = document.getElementById("radio");
const inPut = document.getElementById("inPut");
let isChecked;
window.onload = function () {
  diplay();
};
function letsCheck(radio) {
  isChecked = radio.path[0].checked;
  return isChecked;
}
function startClick() {
  inPut.classList.remove("errorInput");
  outPut.classList.remove("errorBg", "errorInput");
  outPut.innerHTML = null;
  userVal = Number(inPut.value);
  if (userVal === 0) {
    inPut.classList.add("errorInput");
    outPut.classList.add("errorBg", "errorInput");
    outPut.classList.remove("d-none");
    outPut.innerHTML = "Can’t be less than 1";
    return;
  }
  if (userVal > 50) {
    inPut.classList.add("errorInput");
    outPut.classList.add("errorBg", "errorInput");
    outPut.classList.remove("d-none");
    outPut.innerHTML = "Can’t be larger than 50";
    return;
  }
  if (isChecked) {
    calculateApi(userVal);
  }
  if (!isChecked) {
    calculateLocaly(userVal);
  }
}
async function diplay() {
  try {
    const response = await fetch("http://localhost:5050/getFibonacciResults");
    if (!response.ok) {
      throw Error("Server issues");
    }
    const data = await response.json();
    const sortByDate = data.results;
    function compare(a, b) {
      return b.createdDate - a.createdDate;
    }

    const allRes = await sortByDate
      .sort(compare)
      .map((data) => {
        return `<div class="d-flex align-items-center ms-2 mt-4 border-bottom">The Fibonnaci Of ${
          data.number
        } is ${data.result} Calculated at: ${new Date(
          data.createdDate
        )} </div>`;
      })
      .join("");
    outPutAll.innerHTML = allRes;
  } catch (err) {
    console.log("Fetch failed:", err.message);
  }
}
function calculateLocaly(userVal, acc = { 0: 0, 1: 1 }) {
  if (typeof acc[userVal] === "undefined") {
    acc[userVal] =
      calculateLocaly(userVal - 2, acc) + calculateLocaly(userVal - 1, acc);
  }
  inPut.classList.remove("errorInput");
  outPut.classList.remove("errorBg", "errorMessage", "errorInput", "d-none");
  return (outPut.innerHTML = acc[userVal]);
}
async function calculateApi(userVal) {
  try {
    load.classList.remove("d-none");
    const response = await fetch("http://localhost:5050/Fibonacci/" + userVal);
    if (!response.ok) {
      throw Error(
        await response.text((text) => {
          return text;
        })
      );
    }
    const data = await response.json();
    const userRes = await data.result;
    load.classList.add("d-none");
    inPut.classList.remove("errorInput");
    outPut.classList.remove("errorBg", "errorMessage", "errorInput", "d-none");
    outPut.innerHTML = userRes;
    diplay();
  } catch (err) {
    console.log("Fetch failed:", err.message);
    load.classList.add("d-none");
    outPut.classList.remove("errorBg", "errorInput", "d-none");
    outPut.classList.add("errorMessage");
    outPut.innerHTML = "Fetch failed: " + err.message;
  }
}
button.addEventListener("click", startClick);
radio.addEventListener("click", letsCheck);
