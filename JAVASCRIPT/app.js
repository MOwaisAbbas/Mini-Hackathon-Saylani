// import {app, auth ,createUserWithEmailAndPassword } from './firebase.js'




// createUserWithEmailAndPassword(auth, "owais@gmail.com", "12345678")
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//     console.log("user=====>" , user)
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//     console.log("error" , errorMessage)
//   });

let pasImg = document.querySelectorAll("#pas-img")[0];
let pasInput = document.querySelectorAll("input[type='password']")[0];
let flag = false
pasImg && pasImg.addEventListener("click", () => {

    if (!flag) {
        pasImg.src = "./images/icons8-hide-password-24.png"
        pasInput.type = "text"
        flag = true;

    } else if (flag) {
        pasImg.src = "./images/icons8-eye-24.png"
        pasInput.type = "password"
        flag = false;
    }


})
console.log("horaha")