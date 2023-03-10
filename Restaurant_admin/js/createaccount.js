async function createAccount(firstName, lastName, phoneNumber, emailAddress, password, confirmPassword, role, adminPassword) {
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let endpointUrl;
    if (role === 'admin') {
        endpointUrl = 'http://chigozie107-001-site1.itempurl.com/Admin/CreateAdmin';
    } else if (role === 'employee') {
        endpointUrl = 'http://chigozie107-001-site1.itempurl.com/Employee/CreateEmployee';
    } else {
        alert('Please select a valid role');
        return;
    }

    try {
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phoneNumber,
                emailAddress,
                password,
            })
        });

        if (response.ok) {
            try {
                const data = await response.json();
                if (role === 'admin') {
                    window.location.href = 'admin.html';
                } else if (role === 'employee') {
                    window.location.href = 'employee.html';
                }
            } catch (error) {
                alert(`Failed to create account: ${error}`);
            }
        } else {
            const errorMessage = await response.text();
            console.error(`Failed to create account: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Failed to create account: ${error}`);
    }
}