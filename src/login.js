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

}
