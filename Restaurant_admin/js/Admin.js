
function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("new-password").value = "";
  document.getElementById("phone").value = "";
}

document.getElementById("Profile").addEventListener("submit", function(event) {
  event.preventDefault();
  checkPassword();
});

function checkPassword() {
  var oldPassword = document.getElementById("password").value;
  var newPassword = document.getElementById("new-password").value;
  if (oldPassword === newPassword) {
    alert("The old password and the new password cannot be the same.");
  }
  else {
    // If the old and new passwords are not the same, you can submit the form
    document.getElementById("Profile").submit();
  }
}
function isValidEmail(email) {
  // Regular expression for validating email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if the email matches the pattern
  if(emailPattern.test(email)) {
    return true;
  } else {
    return false;
  }
}
