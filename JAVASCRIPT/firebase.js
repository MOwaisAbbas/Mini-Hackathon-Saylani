import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyBOW-Ow6dqWiiy5548hhNEsZjRazUuG3GU",
    authDomain: "saylani-mini-hackathon-b1e65.firebaseapp.com",
    projectId: "saylani-mini-hackathon-b1e65",
    storageBucket: "saylani-mini-hackathon-b1e65.appspot.com",
    messagingSenderId: "200445253319",
    appId: "1:200445253319:web:36cfcbfeae01ffb0e6d0e2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, doc, setDoc, onAuthStateChanged, signOut, getDoc, collection, updateDoc, storage, ref, uploadBytesResumable, getDownloadURL }   