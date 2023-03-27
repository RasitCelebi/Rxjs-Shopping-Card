import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSPNBCX71YzK9Sa_I_bc7YEbkak2ckSx4",
  authDomain: "degisiknet-web-project.firebaseapp.com",
  projectId: "degisiknet-web-project",
  storageBucket: "degisiknet-web-project.appspot.com",
  messagingSenderId: "567736301061",
  appId: "1:567736301061:web:0899eaffd754793b610e6c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase();

let registerButton = document.querySelector("#loginButton");
let passwordEl = document.querySelector("#password");
let usernameEl = document.querySelector("#username");

let email;
let password;

registerButton.addEventListener("click", sendRegisterData);

function sendRegisterData() {

  email = usernameEl.value;
  password = passwordEl.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        email: email,
        password: password,
      }).then(() => {
        // Data saved successfully!
        alert("Welcome :) User saved successfully!");
        window.location= "index.html";
      }).catch((error) => {
          // The write failed...
          alert(error);
        });

      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });

}