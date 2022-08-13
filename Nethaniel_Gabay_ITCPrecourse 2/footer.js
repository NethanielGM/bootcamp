(function () {
  const codingLanguages = ["HTML", "CSS", "Bootstrap", "Javascript"];

  let a = codingLanguages.slice(0, -1).join(", ");
  let b = codingLanguages.at(-1);
  var p = document.getElementById("footerItem");

  if (a.length === 0) {
    p.innerText = p.innerText + "This page was built using: " + b;
    console.log("This page was built using: " + b);
  } else {
    p.innerText = p.innerText + "This page was built using: " + a + " and " + b;
    console.log("This page was built using: " + a + " and " + b);
  }
})();
