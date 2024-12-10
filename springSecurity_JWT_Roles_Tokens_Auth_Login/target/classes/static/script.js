// Toggle between login and register forms
function toggleForm() {
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');

    // Toggle display of login and register boxes
    if (loginBox.style.display === 'none') {
        loginBox.style.display = 'block';
        registerBox.style.display = 'none';
    } else {
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    }
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Ensure email and password are provided
    if (email && password) {
        // Send API request for login
        fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                return response.json();
            })
            .then(data => {
                // Store JWT token in localStorage after successful login
                if (data.token) {
                    localStorage.setItem('jwtToken', data.token);
                    alert('Login successful');
                    console.log('Login Response:', data); // Handle the response here
                } else {
                    throw new Error('Token not found');
                }
            })
            .catch(error => {
                alert('Login failed: ' + error.message);
                console.error('Error:', error);
            });
    } else {
        alert('Please fill in all fields.');
    }
});

// Handle register form submission
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    // Ensure all fields are provided
    if (username && email && password && role) {
        const token = localStorage.getItem('jwtToken');  // Retrieve token from localStorage
        if (!token) {
            console.error('No token found. Please log in first.');
            return; // Prevent registration request if no token is available
        }

        // Send API request for registration
        fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include token in the header
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                role: role,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                return response.json();
            })
            .then(data => {
                alert('Registration successful');
                console.log('Registration Response:', data); // Handle registration response
            })
            .catch(error => {
                alert('Registration failed: ' + error.message);
                console.error('Error:', error);
            });
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to log out and remove the token
function logout() {
    localStorage.removeItem('jwtToken');  // Clear token from localStorage
    alert('Logged out successfully');
}
