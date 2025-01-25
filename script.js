// User Management Class
class UserManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    registerUser(username, email, password) {
        // Check if username or email already exists
        if (this.users.some(user => user.username === username)) {
            throw new Error('Username already exists');
        }
        if (this.users.some(user => user.email === email)) {
            throw new Error('Email already exists');
        }

        // Create new user
        const user = {
            username,
            email,
            password, // In a real app, this should be hashed
            createdAt: new Date().toISOString()
        };

        this.users.push(user);
        this.saveUsers();
        return user;
    }

    loginUser(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        return user;
    }
}

// Initialize User Manager
const userManager = new UserManager();

// Landing Page Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Add a nice transition effect before redirecting
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = ctaButton.getAttribute('href');
            }, 500);
        });
    }

    // Add hover effects to control buttons
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }
});
