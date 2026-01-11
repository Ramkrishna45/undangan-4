firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function submitComment() {
  const name = document.getElementById("form-name").value.trim();
  const message = document.getElementById("form-comment").value.trim();

  if (!name || !message) {
    alert("Please enter your name and message");
    return;
  }

  db.collection("wishes").add({
    name: name,
    message: message,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById("form-comment").value = "";
  });
}

function loadComments() {
  const container = document.getElementById("comments");
  container.innerHTML = "";

  db.collection("wishes")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      container.innerHTML = "";
      snapshot.forEach(doc => {
        const d = doc.data();
        container.innerHTML += `
          <div class="border rounded-4 p-2 mb-2">
            <strong>${d.name}</strong><br>${d.message}
          </div>
        `;
      });
    });
}

window.addEventListener("load", loadComments);
