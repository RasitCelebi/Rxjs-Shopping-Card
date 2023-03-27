import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, signOut, EmailAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

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

let message = "default";
let userMail = "error";



export async function loginUserFB(email, password) {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            message = "successful";
            userMail = user.email;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            message = errorMessage
            alert(errorMessage);

        });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve([message, userMail]);
        }, 1500);
    });

}

export async function signOutUserFB() {

    let message = "";

    signOut(auth).then(() => {
        message = "Sign-out successful." + auth.userMail;
    }).catch((error) => {
        message = "bir hata var";
    });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(message);
        }, 1500);
    });

}

export async function authStateFB() {

    let userGlobal ;

    onAuthStateChanged(auth, (user) => {

        userGlobal = user;
        
        if (user) {

            console.log(user.uid + " and email : " + user.email);

        } else {
            console.log("User is signed out");
            console.log(user)
        }
    });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(userGlobal);
        }, 1500);
    });

}

export async function authControl() {
    const user = auth.currentUser;

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
    } else {
        // No user is signed in.

        user = "No user signed in."
    }

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(user);
        }, 1500);
    });

}



