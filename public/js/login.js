document.addEventListener('DOMContentLoaded', () => {
    // --- Admin Login --- 
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            if (username === 'Prajjwal' && document.getElementById('password').value === 'Prajjwal') {
                localStorage.setItem('username', username);
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }
});