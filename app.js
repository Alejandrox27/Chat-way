const btnEnter = document.getElementById("btnEnter")
const btnExit = document.getElementById("btnExit")
const chat = document.getElementById("chat")
const form = document.getElementById("form")
const btnSend = document.getElementById("btnSend")
const msgEnter = document.getElementById("msgEnter")

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
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

const removeElement = (element) => {
  element.classList.add("d-none")
}

const visualizeElement = (element) => {
  element.classList.remove("d-none")
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    visualizeElement(btnExit)
    removeElement(btnEnter)
    visualizeElement(form)
    visualizeElement(chat)
    removeElement(msgEnter)
    // ...
  } else {
    removeElement(btnExit)
    visualizeElement(btnEnter)
    removeElement(form)
    removeElement(chat)
    visualizeElement(msgEnter)

  }
});


btnEnter.addEventListener('click', async() => {
  try{
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result)
  }catch(error){
    console.log(error)
  }
})

btnExit.addEventListener("click", async() => {
  try{
    await signOut(auth)

  }catch(error){
    console.log(error)
  }
}) 

form.addEventListener("submit", async(e) => {
  e.preventDefault();
  try {
    console.log(form.msg.value)
  } catch (error) {
    console.log(error)
  }
})