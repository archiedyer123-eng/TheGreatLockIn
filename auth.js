// auth.js
// Route guard for PROTECTED pages only (index.html, gym.html, trading.html, etc.).
// Do NOT load this on login.html.
// Relies on the `auth` global from firebase-app.js.

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = 'login.html';
  }
});

