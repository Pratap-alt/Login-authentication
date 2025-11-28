// Toggle password visibility
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

if (togglePassword && passwordInput) {
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  });
}

// Login submit -> backend /api/auth/login
const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const body = {
      username: document.getElementById('username').value.trim(),
      password: document.getElementById('password').value,
      remember: document.getElementById('rememberMe').checked
    };

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      if (data.token && body.remember) {
        localStorage.setItem('auth_token', data.token);
      }

      alert('Login successful!');
      // Example redirect:
      // window.location.href = '/dashboard.html';

    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  });
}
