const btnEnter = document.getElementById("btnEnter")
const btnExit = document.getElementById("btnExit")
const chat = document.getElementById("chat")
const form = document.getElementById("form")
const btnSend = document.getElementById("btnSend")

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLUZ2wZxw3VfU1VWNgKAnpcSEtY8-0fiU",
  authDomain: "firechat-bootstrap-b07e1.firebaseapp.com",
  projectId: "firechat-bootstrap-b07e1",
  storageBucket: "firechat-bootstrap-b07e1.appspot.com",
  messagingSenderId: "1078533434003",
  appId: "1:1078533434003:web:34bbe395eab1a2dfffbb66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

btnEnter.addEventListener('click', async() => {
  try{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result)
  }catch(error){
    console.log(error)
  }
})