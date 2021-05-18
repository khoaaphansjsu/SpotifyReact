
const firebaseConfig = {
    apiKey: "AIzaSyC72g3jXMk0PvO1zNzab6Mo_kL0G3R8ZJg",
    authDomain: "supafy-be393.firebaseapp.com",
    projectId: "supafy-be393",
    storageBucket: "supafy-be393.appspot.com",
   messagingSenderId: "628682567503",
    appId: "1:628682567503:web:bc31cdc22f10f90f385f3a"
};
//firebaseConfig.

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
    const thing = inputEmail.value;
    addArtistsToCollection(givenUUID, thing);
})

function getEmail(email){
    var dataLOL
    const promise = db.collection("users").doc(email).get();
    //promise.then((result) => {console.log(promise.data())}); Uncomment for testing
    promise.then((result) => { dataLOL = result.data()});
}

function add(email, collectionName, thingToAdd) {
    db.collection('users').doc(email).collection('super').doc(collectionName).update(
    {links:
            firebase.firestore.FieldValue.arrayUnion(thingToAdd)
    })
}

function remove(email, collectionName, thingToAdd) {
    db.collection('users').doc(email).collection('super').doc(collectionName).update(
        {links:
            firebase.firestore.FieldValue.arrayRemove(thingToRemove)
        })
}

// function addArtistsToCollection(UUID, thingToAdd) {
//     db.collection('superplaylists').doc(UUID).update(
//         {artists: 
//             firebase.firestore.FieldValue.arrayUnion(thingToAdd)
//         })
// }

// function addPlaylistsToCollection(UUID, thingToAdd) {
//     db.collection('superplaylists').doc(UUID).update(
//         {playlists:
//             firebase.firestore.FieldValue.arrayUnion(thingToAdd)
//         })
// }

// function addSongsToCollection(UUID, thingToAdd) {
//     db.collection('superplaylists').doc(UUID).update(
//         {songs:
//             firebase.firestore.FieldValue.arrayUnion(thingToAdd)
//         })
// }

// function removeArtistsFromCollection(UUID, thingToRemove) {
//     db.collection('superplaylists').doc(UUID).update(
//         {artists:
//             firebase.firestore.FieldValue.arrayRemove(thingToRemove)
//         })
// }

// function removePlaylistsFromCollection(UUID, thingToRemove) {
//     db.collection('superplaylists').doc(UUID).update(
//         {playlists:
//             firebase.firestore.FieldValue.arrayRemove(thingToRemove)
//         })
// }

// function removeSongsFromCollection(UUID, thingToRemove) {
//     db.collection('superplaylists').doc(UUID).update(
//         {songs:
//             firebase.firestore.FieldValue.arrayRemove(thingToRemove)
//         })
// }