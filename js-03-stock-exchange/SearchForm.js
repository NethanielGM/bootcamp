class SearchForm {
  constructor(element) {
    this.element = element;
    {
      this.element.innerHTML += `<div class="d-flex justify-content-center">
      <div class="card" style="width: 20rem">
        <div class="card-body">
          <div class="d-flex justify-content-center">
            <div class="d-flex flex-column">
              <div class="d-flex">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search"
                  id="input"
                />
                <div class="d-flex align-items-center">
                  <div
                    id="load"
                    class="spinner-border ms-2 d-none"
                    role="status"
                  ></div>
                </div>
                <button
                  id="myBtn"
                  type="button"
                  class="btn btn-outline-primary"
                  onclick=""
                >
                  search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>`;
    }
    this.input = document.getElementById("input");
    this.button = document.getElementById("myBtn");
    this.load = document.getElementById("load");
    this.results = document.getElementById("results");
  }

  async onSearch(callback) {
    let _this = this;
    this.button.addEventListener("click", async function () {
      _this.load.classList.remove("d-none");
      _this.button.classList.add("d-none");
      const inputHighlight = _this.input.value;
      const companies = await _this.getData();
      companies.inputHighlight = inputHighlight;
      _this.load.classList.add("d-none");
      _this.button.classList.remove("d-none");
      callback(companies);
    });
  }
  async getData() {
    let inputValue = this.input.value;
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ`
      );
      if (!response.ok) {
        throw Error(
          await response.text((text) => {
            return text;
          })
        );
      }
      this.data = await response.json();
    } catch (err) {
      console.log("Fetch failed:", err);
      this.load.classList.add("d-none");
      this.button.classList.remove("d-none");
    }
    return Promise.all(
      this.data.map(async (data) => {
        let symbol = data.symbol;
        return this.company(
          `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`,
          symbol
        );
      })
    );
  }
  async company(url_, symbol) {
    try {
      const response = await fetch(url_);
      if (!response.ok) {
        throw Error(
          await response.text((text) => {
            return text;
          })
        );
      }
      const data = await response.json();
      const company = await data.profile;
      company.symbol = symbol;
      return company;
    } catch (err) {
      console.log("Fetch failed:", err);
      this.load.classList.add("d-none");
      this.button.classList.remove("d-none");
    }
  }
}
