// Simple working hash for GitHub Pages
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString();
}

/* ------------------ SIGNUP ---------------------- */
async function signup() {
    let user = document.getElementById("new-username").value.trim();
    let pass = document.getElementById("new-password").value;

    if (!user || !pass) {
        return alert("Fill in all fields");
    }

    const hashed = hashPassword(pass);

    await db.collection("users").doc(user).set({
        password: hashed,
        checklist: {}
    });

    alert("Account created!");
    showLogin();
}

/* ------------------ LOGIN ---------------------- */
async function login() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value;

    const doc = await db.collection("users").doc(user).get();
    if (!doc.exists) return alert("User not found");

    const hashed = hashPassword(pass);

    if (hashed !== doc.data().password) {
        return alert("Wrong password");
    }

    localStorage.setItem("currentUser", user);
    window.location.href = "checklist.html";
}

/* ------------------ FORM SWITCHING ---------------------- */
function showSignup() {
    document.getElementById("signup").style.display = "block";

    // Hide login fields
    document.getElementById("username").style.display = "none";
    document.getElementById("password").style.display = "none";
    document.querySelector('button[onclick="login()"]').style.display = "none";
}

function showLogin() {
    document.getElementById("signup").style.display = "none";

    // Show login fields again
    document.getElementById("username").style.display = "block";
    document.getElementById("password").style.display = "block";
    document.querySelector('button[onclick="login()"]').style.display = "block";
}

/* ------------------ CHECKLIST SYNC ---------------------- */
async function loadChecklist() {
    const user = localStorage.getItem("currentUser");
    if (!user) return window.location.href = "index.html";

    const doc = await db.collection("users").doc(user).get();
    const saved = doc.data().checklist || {};

    for (const key in saved) {
        let box = document.getElementById(key);
        if (box) box.checked = saved[key];
    }
}

async function saveChecklist(id) {
    const user = localStorage.getItem("currentUser");
    const value = document.getElementById(id).checked;

    db.collection("users").doc(user).update({
        [`checklist.${id}`]: value
    });
}
