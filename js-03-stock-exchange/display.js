const title = document.getElementById("title");
const graph = document.getElementById("graph");
const load = document.getElementById("load");
const chart = document.getElementById("myChart");
const canvas = document.getElementById("canvas");
const ctx = document.getElementById("myChart").getContext("2d");
const xs = [];
const ys = [];
let changes;
let thisor;
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const symbol = params.symbol;
window.onload = function () {
  getResults();
};
async function getResults() {
  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
    );
    if (!response.ok) {
      throw Error(
        await response.text((text) => {
          return text;
        })
      );
    }
    const data = await response.json();
    profile = await data.profile;

    if (profile.changes > 0) {
      changes = "positive";
      thisor = "+";
    } else {
      changes = "nevative";
      thisor = "";
    }
    const allRes = `<div class="d-flex justify-content-center mt-4">
    <div class="card text-center" style="width: 80%">
      <img src="${profile.image}" class="card-img-top rounded mx-auto d-block" onerror="this.onerror=null;this.src='image-placeholder.jpeg';" style="max-width: 150px; height: auto";
      "/>
      <div class="card-body">
        <h5 class="card-title">${profile.companyName} | ${symbol}</h5>
        <p class="card-text">
        ${profile.description}
        </p>
        <p class="card-text">
        ${profile.price} ${profile.currency}
        </p>
        <p class="card-text ${changes}">
         ${thisor}${profile.changes}
        </p>
        <a href="${profile.website}" class="btn btn-primary">Visit website</a>
      </div>
    </div>
  </div>`;
    output.innerHTML = allRes;
  } catch (err) {
    console.log("Fetch failed:", err.message);
  }
  chartIt();
  history();
}
async function history() {
  load.classList.remove("d-none");
  canvas.classList.add("d-none");

  try {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
    );
    if (!response.ok) {
      throw Error(
        await response.text((text) => {
          return text;
        })
      );
    }
    const data = await response.json();
    profile = await data.profile;
    let dataHistory = data.historical;
    dataHistory.forEach((element) => {
      xs.unshift(element.date);
      ys.unshift(element.close);
    });
  } catch (err) {
    console.log("Fetch failed:", err.message);
  }
}
async function chartIt() {
  await history();
  load.classList.add("d-none");
  canvas.classList.remove("d-none");
  const labels = xs;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: ys,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {},
  };
  new Chart(chart, config);
}
