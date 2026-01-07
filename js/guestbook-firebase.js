// ===============================
// FIREBASE GUESTBOOK (SAFE MODE)
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// 🔥 GANTI DENGAN CONFIG KAMU
const firebaseConfig = {
  apiKey: "AIzaSyCVtXCLSQMHDLWamQUN7hvo5r6i4xwk0qI",
  authDomain: "guestbook-4630e.firebaseapp.com",
  databaseURL: "https://guestbook-4630e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "guestbook-4630e",
  storageBucket: "guestbook-4630e.firebasestorage.app",
  messagingSenderId: "400616667516",
  appId: "1:400616667516:web:a2af83e7d6c1066fc84cf9"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM READY
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("guestForm");
  const list = document.getElementById("guestList");

  if (!form || !list) return;

  const guestRef = ref(db, "guestbook");

  // SUBMIT
  form.addEventListener("submit", e => {
    e.preventDefault();

    push(guestRef, {
      name: document.getElementById("fbName").value,
      attendance: document.getElementById("fbAttendance").value,
      message: document.getElementById("fbMessage").value,
      time: Date.now()
    });

    alert("Terima kasih atas ucapan dan doanya 🙏");
    form.reset();
  });

  // LOAD DATA REALTIME
  onValue(guestRef, snapshot => {
    list.innerHTML = "";

    snapshot.forEach(child => {
      const d = child.val();

      list.innerHTML =
        `<div class="bg-white p-3 rounded shadow">
          <h3 class="font-semibold">${d.name}</h3>
          <p class="text-sm ${
            d.attendance === "Hadir"
              ? "text-green-600"
              : "text-red-500"
          }">${d.attendance}</p>
          <p class="mt-1">${d.message}</p>
        </div>` + list.innerHTML;
    });
  });

});
