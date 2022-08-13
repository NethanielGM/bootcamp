const GITHUB_URL = "https://api.github.com/users/NethanielGM";

fetch(GITHUB_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const profileImage = document.getElementById("profile-image");
    const myName = document.getElementById("myName");
    profileImage.src = data.avatar_url;
    myName.innerHTML = data.name;
  });
function expandCard() {
  var x = document.getElementById("cardContent");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
