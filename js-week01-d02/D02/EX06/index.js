let dataObj = '{"name":"Shany", "country":"Israel", "age":31}';
dataObj = JSON.parse(dataObj);

const header = document.createElement("h3");
header.innerHTML = "profile";
document.body.appendChild(header);

function func() {}
Object.entries(dataObj).forEach(function ([key, value]) {
  const result = `${key[0].toUpperCase() + key.slice(1)}: ${value}`;
  let newP = document.createElement("p");
  newP.addEventListener("click", func);
  newP.innerHTML = result;
  document.body.appendChild(newP);
});
