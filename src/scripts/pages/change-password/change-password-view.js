import "../../../styles/change-password.css";
import AuthApi from "../../data/auth-api";

const ChangePasswordView = {
  async render() {
    return `
      <section class="change-password-page">
        <div class="change-password-container">
          <h1 class="change-password-title">Change Password</h1>
          
          <form id="change-password-form" class="change-password-form">
            <div class="change-password-form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            
            <div class="change-password-form-group">
              <label for="new-password">New Password</label>
              <input type="password" id="new-password" name="new-password" required minlength="6">
            </div>
            
            <button type="submit" class="change-password-button">Change Password</button>
          </form>
          
          <div class="change-password-footer">
            <a href="#/" class="change-password-link">Back</a>
          </div>
        </div>
      </section>
    `;
  },

  bindEvents() {
    const form = document.getElementById('change-password-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const newPassword = document.getElementById('new-password').value;

        try {
          await AuthApi.changePassword(email, newPassword);
          alert('Password changed successfully!');
          window.location.hash = '#/auth';
        } catch (error) {
          alert(`Failed to change password: ${error.message}`);
        }
      });
    }
  }
};

export default ChangePasswordView;
