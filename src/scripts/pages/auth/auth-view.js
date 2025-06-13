import "../../../styles/auth.css";

const AuthView = {
  render() {
    return `
      <section class="auth-page">
        <div class="auth-container">
          <h1 class="auth-title">Welcome to Pilahin</h1>
          <div class="auth-tabs">
            <button class="auth-tab active" id="login-tab">Login</button>
            <button class="auth-tab" id="register-tab">Register</button>
          </div>
          <div class="auth-forms">
            <form id="login-form" class="auth-form active">
              <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" required>
              </div>
              <div class="form-group">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" required>
              </div>
              <button type="submit" class="auth-btn">Login</button>
            </form>
            <form id="register-form" class="auth-form">
              <div class="form-group">
                <label for="register-name">Full Name</label>
                <input type="text" id="register-name" required>
              </div>
              <div class="form-group">
                <label for="register-email">Email</label>
                <input type="email" id="register-email" required>
              </div>
              <div class="form-group">
                <label for="register-password">Password</label>
                <input type="password" id="register-password" required>
              </div>
              <div class="form-group">
                <label for="register-confirm">Confirm Password</label>
                <input type="password" id="register-confirm" required>
              </div>
              <button type="submit" class="auth-btn">Register</button>
            </form>
          </div>
          <div class="auth-divider">
            <span>OR</span>
          </div>
          <button id="google-auth" class="google-auth-btn">
            <img src="/images/Google.png" alt="Google Logo" class="google-logo">
            Continue with Google
          </button>
        </div>
      </section>
    `;
  },

  bindEvents() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.add('active');
      registerForm.classList.remove('active');
    });

    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active');
      loginTab.classList.remove('active');
      registerForm.classList.add('active');
      loginForm.classList.remove('active');
    });

    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      document.dispatchEvent(new CustomEvent('loginAttempt', { 
        detail: { email, password } 
      }));
    });

    document.getElementById('register-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm').value;
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      document.dispatchEvent(new CustomEvent('registerAttempt', { 
        detail: { name, email, password } 
      }));
    });

    document.getElementById('google-auth').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('googleAuthAttempt'));
    });
  },

  showError(message) {
  const container = document.querySelector('.auth-container');
  if (!container) {
    alert(message); // fallback jika container tidak ditemukan
    return;
  }

  const errorElement = document.createElement('div');
  errorElement.className = 'auth-error';
  errorElement.textContent = message;
  const existingError = document.querySelector('.auth-error');
  if (existingError) existingError.remove();
  container.prepend(errorElement);
},

showSuccess(message) {
  const container = document.querySelector('.auth-container');
  if (!container) {
    alert(message);
    return;
  }

  const successElement = document.createElement('div');
  successElement.className = 'auth-success';
  successElement.textContent = message;
  const existingSuccess = document.querySelector('.auth-success');
  if (existingSuccess) existingSuccess.remove();
  container.prepend(successElement);
}

};

function updateNavUser(email) {
  const username = email.split('@')[0];
  const authLink = document.getElementById('auth-link');
  const dropdownMenu = document.getElementById('user-dropdown-menu');

  if (authLink) {
    authLink.textContent = username;
    authLink.href = '#';

    const newAuthLink = authLink.cloneNode(true);
    authLink.parentNode.replaceChild(newAuthLink, authLink);

    newAuthLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (dropdownMenu) {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
      }
    });
  }

  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    const newLogoutLink = logoutLink.cloneNode(true);
    logoutLink.parentNode.replaceChild(newLogoutLink, logoutLink);

    newLogoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      resetNavUser();
      window.location.hash = '#/';
    });
  }

  const deleteAccountLink = document.getElementById('delete-account-link');
  if (deleteAccountLink) {
    const newDeleteLink = deleteAccountLink.cloneNode(true);
    deleteAccountLink.parentNode.replaceChild(newDeleteLink, deleteAccountLink);

    newDeleteLink.addEventListener('click', async (e) => {
      e.preventDefault();
      const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
      if (confirmed) {
        document.dispatchEvent(new CustomEvent('deleteAccountAttempt'));
      }
    });
  }
}

function resetNavUser() {
  const authLink = document.getElementById('auth-link');
  const dropdownMenu = document.getElementById('user-dropdown-menu');

  if (authLink) {
    const newAuthLink = authLink.cloneNode(true);
    authLink.parentNode.replaceChild(newAuthLink, authLink);

    newAuthLink.textContent = 'Login / Register';
    newAuthLink.href = '#/auth';

    if (dropdownMenu) dropdownMenu.style.display = 'none';
  }
}

export { updateNavUser, resetNavUser };
export default AuthView;
