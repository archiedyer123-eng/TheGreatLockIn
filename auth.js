// auth.js
// Route guard for PROTECTED pages only (index.html, gym.html, trading.html, etc.).
// Do NOT load this on login.html.
// Relies on the `auth` global from firebase-app.js.

// Ensure the session is restored from local storage before we judge auth state.
// Without this, onAuthStateChanged can fire once with `null` on a fresh page
// load (before persistence restores), causing a false redirect to login.
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch((err) => console.error('Persistence error:', err))
  .finally(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = 'login.html';
      }
    });
  });