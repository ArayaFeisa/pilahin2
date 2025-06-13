import '../styles/styles.css';

import App from './pages/app';
import { updateNavUser, resetNavUser } from './pages/auth/auth-view.js';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });

  await app.renderPage();

  const storedEmail = localStorage.getItem('userEmail');
  if (storedEmail) {
    updateNavUser(storedEmail); // Panggil ulang setelah renderPage
  }

  window.addEventListener('hashchange', async () => {
    await app.renderPage();

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      updateNavUser(storedEmail); // Pastikan navbar tetap benar setelah navigasi
    } else {
      resetNavUser(); // Jika sudah logout, reset
    }
  });
});

