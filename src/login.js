import { loginUserFB } from "./fbase.js";


let loginButton = document.querySelector("#loginButton");
let passwordEl = document.querySelector("#password");
let usernameEl = document.querySelector("#username");

let email;
let password;

loginButton.addEventListener("click", loginUser);

async function loginUser() {
  console.log('calling');
  email = usernameEl.value;
  password = passwordEl.value;
  const result = await loginUserFB(email,password);
  console.log(result);

  if(result[0] === "successful"){
    window.location.href = "index.html";
  }


  /* signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const credential = EmailAuthProvider.credential(email, password);

      console.log(credential._email);
      alert("Logged in succesfully");


      /* let lgDate = new Date();

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
      // ... */
    /* })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }); */ 



}
