const firebaseConfig = {
    apiKey: "AIzaSyC72g3jXMk0PvO1zNzab6Mo_kL0G3R8ZJg",
    authDomain: "supafy-be393.firebaseapp.com",
    projectId: "supafy-be393",
    storageBucket: "supafy-be393.appspot.com",
   messagingSenderId: "628682567503",
    appId: "1:628682567503:web:bc31cdc22f10f90f385f3a"
  };
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const output = document.querySelector("#uuid");
const input = document.querySelector("#status");
const saveButton = document.querySelector("#save");

const outputEmail = document.querySelector("#email");
const inputEmail = document.querySelector("#emailStatus");
const saveButtonEmail = document.querySelector("#emailSave");

saveButton.addEventListener("click", function() {
    const givenUUID = input.value;
    getUUID(givenUUID);

})

saveButtonEmail.addEventListener("click", function() {
    const givenEmail = inputEmail.value;
    const xd = getEmail(givenEmail);
    getEmail(givenEmail);
})

function getUUID(UUID){
    const promiseUUID = db.collection("superplaylists").doc(UUID).get();
    //promiseUUID.then((result) => {console.log(result.data())});
    promise.then((result) => {return result.data()});
}

function getEmail(email){
    const promise = db.collection("users").doc(email).get();
    //promise.then((result) => {console.log(promise.data())}); Uncomment for testing
    promise.then((result) => {return result.data()});
}