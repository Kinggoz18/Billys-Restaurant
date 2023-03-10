function resetForm() {
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("oldPassword").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("phoneNumber").value = "";
}

function checkPassword() {

    var oldPassword = document.getElementById("oldpassword").value;
    var newPassword = document.getElementById("newpassword").value;
    if (oldPassword === newPassword) {
        alert("The old password and the new password cannot be the same.");
    }
    else {
        // If the old and new passwords are not the same, you can submit the form
        document.getElementById("Profile").submit();
    }
}

/* function isValidEmail(email) {
    // Regular expression for validating email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    if (emailPattern.test(email)) {
        return true;
    } else {
        return false;
    }
}
 */

