import CONFIG from "./pilahin-API";

const AuthApi = {
  async login(email, password) {
    const response = await fetch(`${CONFIG.BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok && result.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.message || 'Login failed');
    }
  },

  async register(name, email, password) {
    const response = await fetch(`${CONFIG.BASE_URL}register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok && result.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.message || 'Registration failed');
    }
  },

  async changePassword(email, password) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Unauthorized: No token found');
    }

    const response = await fetch(`${CONFIG.BASE_URL}profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok && result.status === 'success') {
      return result;
    } else {
      throw new Error(result.message || 'Failed to change password');
    }
  },

  async deleteAccount() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Unauthorized: No token found');
    }

    const response = await fetch(`${CONFIG.BASE_URL}profile`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (response.ok && result.status === 'success') {
      return result;
    } else {
      throw new Error(result.message || 'Failed to delete account');
    }
  }
};

export default AuthApi;
