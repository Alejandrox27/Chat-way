const btnEnter = document.getElementById("btnEnter")
const btnExit = document.getElementById("btnExit")
const chat = document.getElementById("chat")
const form = document.getElementById("form")
const btnSend = document.getElementById("btnSend")
const msgEnter = document.getElementById("msgEnter")
const msgTemplate = document.getElementById('msgTemplate')

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js'
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
const db = getFirestore(app);

const removeElement = (element) => {
  element.classList.add("d-none")
}

const visualizeElement = (element) => {
  element.classList.remove("d-none")
}

let unsubscribe;

onAuthStateChanged(auth, (user) => {
  if (user) {
    visualizeElement(btnExit)
    removeElement(btnEnter)
    visualizeElement(form)
    visualizeElement(chat)
    removeElement(msgEnter)
    
    const q = query(collection(db, "chats"), orderBy('date'));
    chat.innerHTML = ``;
    unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New message: ", change.doc.data());

            //manipulate template
            const clone = msgTemplate.content.cloneNode(true);
            clone.querySelector('div span').textContent = change.doc.data().msg;
            if(user.uid === change.doc.data().uid){
              clone.querySelector('div span').classList.add('bg-success')
              clone.querySelector('div').classList.add('text-end')
            }else{
              clone.querySelector('div span').classList.add('bg-secondary')
            }
            chat.append(clone);
        }
        chat.scrollTop = chat.scrollHeight;
        /*
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }*/
      });
    });
    // ...
  } else {
    removeElement(btnExit)
    visualizeElement(btnEnter)
    removeElement(form)
    removeElement(chat)
    visualizeElement(msgEnter)

    if(unsubscribe){
      unsubscribe();
    }

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

  if(!form.msg.value.trim()){
    form.msg.value = "";
    form.msg.focus();
    return console.log('you have to write something')
  }

  const message = form.msg.value.trim();
  form.msg.value = "";
  try {
    btnSend.disabled = true;
    await addDoc(collection(db, "chats"), {
      msg: message,
      uid: auth.currentUser.uid,
      date: Date.now()
    })
    
  } catch (error) {
    console.log(error)
  } finally {
    btnSend.disabled = false;
  }
})