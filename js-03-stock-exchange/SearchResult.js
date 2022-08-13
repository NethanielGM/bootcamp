class SearchResult {
  constructor(element) {
    this.element = element;
  }

  async renderResults(companies) {
    this.element.innerHTML = "";
    let changes;
    let thisor;
    companies.forEach((element) => {
      if (element.changes > 0) {
        changes = "positive";
        thisor = "+";
      }
      if (element.changes < 0) {
        changes = "nevative";
        thisor = "";
      }

      let companyName = element.companyName;
      let symbol = element.symbol;
      let textToSearch = document.getElementById("input").value;
      let pattern = new RegExp(textToSearch, "gi");
      symbol = symbol.replace(pattern, (symbol) => {
        return `<span>${symbol}</span>`;
      });
      companyName = companyName.replace(pattern, (companyName) => {
        return `<span>${companyName}</span>`;
      });
      this.element.innerHTML += `<div class="d-flex justify-content-center mt-4">
        <div class="card text-center" style="width: 20rem">
        <img src="${element.image}" class="card-img-top rounded mx-auto d-block" onerror="this.onerror=null;this.src='image-placeholder.jpeg';" style="max-width: 50%; height: auto"/>
        <div class="card-body">
        <a href="/company.html?symbol=${element.symbol}" class="card-title" id="paragraph">${companyName}</a>
        <p class="card-text ${changes}">
        (${symbol}) (${thisor}${element.changes})
        </p>
        <a href="${element.website}" class="btn btn-outline-primary">Visit website</a>
        </div>
        </div>
        </div>`;
    });
  }
}
