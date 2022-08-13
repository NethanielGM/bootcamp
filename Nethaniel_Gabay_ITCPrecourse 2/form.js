function consoleForm(e) {
  e.preventDefault();
  console.log(
    "First Name:" + " " + firstName.value + ",",
    "Last Name:" + " " + lastName.value + ",",
    "Email:" + " " + email.value + ",",
    "Comment:" + " " + comment.value + ",",
    "Phone Number:" + " " + phone.value + ",",
    "NOT A ROBOT:" + " " + checkBox.value + ","
  );
}
function checkForm() {
  var inputs = document.querySelectorAll("input:not(.nothis)"); // input:not(.nothis) heh
  const filled = Array.from(inputs.values()).every((input) =>
    ["text", "number", "email"].includes(input.type)
      ? !!input.value
      : !!input.checked
  );
  if (filled) {
    document.getElementById("submitBtn").disabled = false;
  } else {
    document.getElementById("submitBtn").disabled = true;
  }
}
window.addEventListener("keyup", checkForm);
