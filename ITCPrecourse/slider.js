const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const cities = document.querySelectorAll(".cities");
let currentlySelected = 0;
const sources = [
  "https://maps.google.com/maps?q=hadasa%20hospital&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "https://maps.google.com/maps?q=Central%20Tel-Aviv&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "https://maps.google.com/maps?q=Haifa&t=&z=13&ie=UTF8&iwloc=&output=embed",
  "https://maps.google.com/maps?q=Bet%20Shemesh&t=&z=13&ie=UTF8&iwloc=&output=embed",
];
const iframe = document.getElementById("someFrame");

function handleButtonState() {
  prev.disabled = next.disabled = false;
  if (currentlySelected === 0) {
    prev.disabled = true;
  } else if (currentlySelected === sources.length - 1) {
    next.disabled = true;
  }
}
function toggleIframe(direction) {
  cities[currentlySelected].classList.remove("active-city");
  direction === "next" ? currentlySelected++ : currentlySelected--;
  cities[currentlySelected].classList.add("active-city");
  if (sources[currentlySelected]) {
    iframe.src = sources[currentlySelected];
  }
  handleButtonState();
}
function setIframeSource(source) {
  cities[currentlySelected].classList.remove("active-city");
  currentlySelected = sources.indexOf(source);
  cities[currentlySelected].classList.add("active-city");
  iframe.src = source;
  handleButtonState();
}
