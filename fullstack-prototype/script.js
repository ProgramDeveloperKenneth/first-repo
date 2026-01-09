// Check login status as soon as the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();

    // Handle Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate a successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', 'admin'); // Set to 'admin' per guide
            localStorage.setItem('username', 'Admin User');

            alert('Logged in successfully!');
            window.location.href = 'index.html'; // Redirect to home page
        });
    }

    // Handle Register Form Submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Account created! Please log in.');
            window.location.href = 'login.html'; // Redirect to login
        });
    }
});

// Function to update Navbar based on localStorage
function updateNavbar() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('username');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (isLoggedIn) {
        // Show the Admin Dropdown as seen in your image
        navLinks.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                    ${name} (${role})
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    ${role === 'admin' ? `
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Employees</a></li>
                        <li><a class="dropdown-item" href="#">Accounts</a></li>
                        <li><a class="dropdown-item" href="#">Departments</a></li>
                        <li><hr class="dropdown-divider"></li>
                    ` : ''}
                    <li><a class="dropdown-item" href="#">My Requests</a></li>
                    <li><a class="dropdown-item text-danger" href="#" id="logout-btn">Logout</a></li>
                </ul>
            </li>
        `;

        // Add Logout Functionality
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    } else {
        // Show navigation links for anonymous users,
        // but hide the link for the page you're already on
        const links = [];

        if (currentPage !== 'index.html') {
            links.push(`
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
            `);
        }
        if (currentPage !== 'login.html') {
            links.push(`
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
            `);
        }
        if (currentPage !== 'register.html') {
            links.push(`
                <li class="nav-item">
                    <a class="nav-link" href="register.html">Register</a>
                </li>
            `);
        }

        navLinks.innerHTML = links.join('');
    }
}