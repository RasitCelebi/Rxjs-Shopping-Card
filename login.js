// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSPNBCX71YzK9Sa_I_bc7YEbkak2ckSx4",
  authDomain: "degisiknet-web-project.firebaseapp.com",
  projectId: "degisiknet-web-project",
  storageBucket: "degisiknet-web-project.appspot.com",
  messagingSenderId: "567736301061",
  appId: "1:567736301061:web:0899eaffd754793b610e6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase();

console.log(app + auth + database)


let loginButton = document.querySelector("#loginButton");
let passwordEl = document.querySelector("#password");
let usernameEl = document.querySelector("#username");

let email;
let password;

loginButton.addEventListener("click", deneme);

function sendData() {

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
        alert("Kullanici ekleme başarili");
      })
        .catch((error) => {
          // The write failed...
          alert(error);
        });

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
}

function deneme() {

  email = usernameEl.value;
  password = passwordEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      let lgDate = new Date();

      set(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      }).then(() => {
        // Data saved successfully!
        alert("Logged in succesfully");
      })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}