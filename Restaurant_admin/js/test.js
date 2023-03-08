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

function isValidEmail(email) {
    // Regular expression for validating email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    if (emailPattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

function createAccount(){
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const emailAddress = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const adminPassword = document.getElementById('adminPassword').value;

    // validate inputs
    if (!firstName || !lastName || !phoneNumber || !emailAddress || !password) {
        alert('Please enter all required fields.');
        return;
    }

    if (role === 'admin' && adminPassword !== 'DRJ2022') {
        alert('Incorrect admin password!');
        return;
    } 
}

const createAccountButton = document.getElementById('create-account-btn');
createAccountButton.addEventListener('click', () => {
    const script = document.createElement('script');
    script.src = '../js/createaccount.js';
    script.type = 'module';
    document.body.appendChild(script);
});