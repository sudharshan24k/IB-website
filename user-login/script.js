document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission (no GET/POST to server)
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const message = document.getElementById('loginMessage');
  message.textContent = '';

  // Fetch users.json and check credentials
  fetch('users.json')
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        // Success: set login flag in localStorage
        localStorage.setItem('loggedIn', 'true');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 100); // Delay to ensure storage is written
      } else {
        // Failure: show error message, do not reload
        message.style.color = '#d32f2f';
        message.textContent = 'Invalid username or password.';
      }
    })
    .catch(() => {
      message.style.color = '#d32f2f';
      message.textContent = 'Error loading user data.';
    });
});

// Logout function for dashboard and other pages
function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
}
