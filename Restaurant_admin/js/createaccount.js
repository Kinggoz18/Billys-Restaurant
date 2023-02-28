function createAccount(event) {
    event.preventDefault(); // prevent form submission

    // get form inputs
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

    // send data to API
    const data = {
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        password,
        role
    };

    const url = 'https://drumrockjerkapi-v1.azure-api.net/drumrockjerk';
    let endpoint;
    if (role === 'admin') {
        endpoint = '/Admin';
    } else {
        endpoint = '/Employee';
    }
    fetch(`${url}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                alert('Account created successfully!');
                console.log('Before window.location.href');
                window.location.href = 'login.html';
                console.log('After window.location.href');

            } else {
                alert('Error creating account.');
            }
        })
        .catch(error => {
            console.error('Error creating account:', error);
            alert('Error creating account.');
        });
}
const createAccountButton = document.getElementById('create-account-button');
createAccountButton.addEventListener('click', createAccount);

