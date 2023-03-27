import { createUserFB } from "./fbase.js";

let registerButton = document.querySelector("#loginButton");
let passwordEl = document.querySelector("#password");
let usernameEl = document.querySelector("#username");

let email;
let password;

registerButton.addEventListener("click", createUser);

async function createUser() {
  
  email = usernameEl.value;
  password = passwordEl.value;
  

  const result = await createUserFB(email,password);
  console.log(result);
  if(result[0] === "successful"){
    alert("Successful. Welcome : " + result[1])
    window.location.href = "index.html";
  }else{
    alert("Error")
  }

}