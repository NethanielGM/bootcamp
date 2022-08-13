class Marquee {
  constructor(element) {
    this.element = element;
  }
  async getData() {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index`
    );
    this.data = await response.json();
  }
  async load() {
    await this.getData();
    await this.data.map((data) => {
      this.element.innerHTML += `<span>&nbsp ${
        data.symbol
      } </span><span style = ${
        data.changesPercentage >= 0 ? "color:lightgreen" : "color:red"
      }> ${data.changesPercentage.toFixed(2)}`;
    });
  }
}
