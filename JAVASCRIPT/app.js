import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, doc, setDoc, onAuthStateChanged, signOut, getDoc, collection, updateDoc  ,storage, ref, uploadBytesResumable, getDownloadURL} from './firebase.js'







const uploadFile = (file) => {
    let uid = localStorage.getItem("uid")

    console.log("filename", file.name)

    return new Promise((resolve, reject) => {
        const mountainsRef = ref(storage, `images/${uid}`);
        const uploadTask = uploadBytesResumable(mountainsRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
}
let srrc;
let fileInput = document.querySelectorAll("input[type='file']")[0];
fileInput && fileInput.addEventListener("change", () => {

    console.log("working", fileInput.files[0])

    uploadFile(fileInput.files[0]).then((res) => {
        let profImg = document.querySelectorAll(".prof-img")[0];
        profImg.src = res;
        srrc = res
        console.log("imgurl", res)
    }).catch((rej) => {
        console.log("reject==>".rej)
    })
})







let usertologin = document.getElementById("usertologin");
usertologin && usertologin.addEventListener("click", () => {
    usertologin.href = "./login.html"
    window.location = "./login.html"
    console.log(usertologin)

});
let loginBtn = document.getElementById("login-btn");
loginBtn && loginBtn.addEventListener("click", () => {
    let loginUserName = document.getElementById("login-user-name");
    let loginPass = document.getElementById("login-pas");

    signInWithEmailAndPassword(auth, loginUserName.value, loginPass.value)
        .then((userCredential) => {

            const user = userCredential.user;
            window.location.href = './blogs.html';

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,

            })

        });
});
let loginToSignup = document.getElementById("loginToSignup");
loginToSignup && loginToSignup.addEventListener("click", () => {
    loginToSignup.href = "./signup.html"
});

let signupBtn = document.getElementById("signupBtn");
signupBtn && signupBtn.addEventListener("click", () => {
    let signFName = document.getElementById("signFName");
    let signLName = document.getElementById("signLName");
    let signEmail = document.getElementById("signEmail");
    let signPass = document.getElementById("signPass");
    let signRePass = document.getElementById("signRePass");


    if (signPass.value === signRePass.value) {


        createUserWithEmailAndPassword(auth, signEmail.value, signPass.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(db, "user", user.uid), {
                    FirstName: signFName.value,
                    LastName: signLName.value,
                    Email: signEmail.value,
                    Password: signPass.value
                });

                window.location.href = "blogs.html"
                console.log("user=====>", user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,

                })
            });
        console.log(signFName, signLName, signPass, signRePass, signEmail)
    }

});

onAuthStateChanged(auth, async (user) => {
    user && localStorage.setItem("userID", user.uid)
    if (user) {
        const uid = user.uid;
        if (location.pathname === "login.html" || location.pathname === "lsignup.html") {
            // if (currentPageURL.indexOf("login.html") === -1 && currentPageURL.indexOf("signup.html") === -1) {
            // location.assign("blogs.html")
            window.location.href = "blogs.html";
        }
        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let profileName = document.getElementsByClassName('profile-name');
            profileName[0].innerHTML = docSnap.data().FirstName
            if (profileName[1]) {
                profileName[1].innerHTML = docSnap.data().FirstName

            }

            let arr = docSnap.data().arr
            let blogs = document.getElementById("blogs");
            console.log(arr)
            if (blogs) {
                arr.forEach(element => {
                    console.log(element)
                    blogs.innerHTML += `<div class="cont d-flex mt-5 justify-content-evenly flex-column ">

                              <div class="blog-img-div d-flex  justify-content-between">
                              <img src="./images/profile.jpg" alt="Profile Image">
                              <div class="pp">
                              <p>${element.heading}</p>
                              <div class="p">
                              <p class="name-blog">${docSnap.data().FirstName} -</p>
                              <p class="date-blog">August 16th 2023</p>
                              </div>
                              </div>
                              </div>
                              <p class="text-blog">${element.description}
                              </p>
                              <div class="blog-btn">
                              <button type="button" class="btn btn-outline-primary">Delete</button>
                              <button type="button" class="btn btn-outline-primary">Edit</button>
                              </div>
                              </div>`
                });

            }
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    } else {
        console.log(" userchalagya")
        if (location.pathname === "blogs.html" && location.pathname === "index.html" && location.pathname === "profile.html" && location.pathname === "user.html.html") {

            location.assign("login.html")
        }


    }
});


let logout = document.getElementById("logout");
logout && logout.addEventListener("click", () => {
    localStorage.clear()

    auth.signOut()
        .then(function () {
            // Sign-out successful.

            console.log("User logged out successfully");
            location.assign("index.html")
            // You can redirect the user to a different page after logout if needed.
        })
        .catch(function (error) {
            // An error happened.
            console.error("Error logging out:", error);
        });


});


let profileName = document.getElementsByClassName('profile-name')[0];

profileName && profileName.addEventListener("click", () => {
    window.location.assign("profile.html")
})




let publishBlog = document.getElementById("publishBlog");
publishBlog && publishBlog.addEventListener("click", async () => {
    let titleTOAdd = document.getElementById("titleTOAdd");
    let textToAdd = document.getElementById("textToAdd");

    let userID = localStorage.getItem("userID")
    const washingtonRef = doc(db, "user", userID);


    await updateDoc(washingtonRef, {
        arr: [{
            heading: titleTOAdd.value,
            description: textToAdd.value
        }]
    });


});
let returnToBlogs = document.getElementById("returnToBlogs");

returnToBlogs && returnToBlogs.addEventListener("click", () => {
    window.location.href = './blogs.html'
})
let sendToUser = document.getElementById("sendToUser");
sendToUser && sendToUser.addEventListener("click", () => {
    window.location.href = "./user.html"
})
let hclick = document.getElementById("h1-click");
hclick && hclick.addEventListener("click", () => {
    window.location.href = "./index.html"
})



