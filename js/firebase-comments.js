// ==============================
// Firebase configuration
// ==============================
const firebaseConfig = {
  apiKey: "AIzaSyAMTFbtBXr76t68sMCZGQWL4-c7t8H1Ndo",
  authDomain: "wedding-218f4.firebaseapp.com",
  projectId: "wedding-218f4",
  storageBucket: "wedding-218f4.firebasestorage.app",
  messagingSenderId: "172174173322",
  appId: "1:172174173322:web:847ee7ad8908a07716f973"
};

// ==============================
// Initialize Firebase
// ==============================
if (typeof firebase !== "undefined" && typeof firebaseConfig !== "undefined") {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // ==============================
  // Submit comment
  // ==============================
  function submitComment() {
    const name = document.getElementById("form-name").value.trim();
    const message = document.getElementById("form-comment").value.trim();

    if (!name || !message) {
      alert("Please enter your name and message");
      return;
    }

    db.collection("wishes").add({
      name,
      message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      document.getElementById("form-comment").value = "";
    }).catch(console.error);
  }

  // ==============================
  // Load comments
  // ==============================
  function loadComments() {
    const container = document.getElementById("comments");
    if (!container) return;

    db.collection("wishes")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        snapshot => {
          container.innerHTML = "";
          snapshot.forEach(doc => {
            const d = doc.data();
            container.innerHTML += `
              <div class="border rounded-4 p-2 mb-2">
                <strong>${d.name}</strong><br>${d.message}
              </div>
            `;
          });
        },
        console.error
      );
  }

  // ==============================
  // Load comments on page load
  // ==============================
  window.addEventListener("load", loadComments);

  // Expose submitComment globally (if called from HTML)
  window.submitComment = submitComment;
} else {
  console.warn("Firebase not loaded — comments disabled");
}
