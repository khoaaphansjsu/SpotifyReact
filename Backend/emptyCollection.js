require("firebase/firestore");
const firebase = require('firebase-admin');
// admin.initializeApp();
const serviceAccount = require("./supafy-be393-37de8cca2400.json")
var firebaseConfig = require("./prod.json")
firebaseConfig.credential = firebase.credential.cert(serviceAccount)
firebase.initializeApp(firebaseConfig)
// Firebase previously initialized using firebase.initializeApp().
var db = firebase.firestore();
// db.useEmulator("localhost", 8080);

async function addEmpty(email) {
    const empty =  {
        "playlists": [],
        "artists": [],
        "songs": []
    }
    //const res = await db.collection('superplaylists').doc('test' + 1).set(empty)
    const res = await db.collection('users').doc(email).collection('super').doc('default').set(empty) 
}

async function addArtistsToCollection(UUID, thingToAdd) {
    await db.collection('superplaylists').doc(UUID).update(
        {artists: 
            firebase.firestore.FieldValue.arrayUnion(thingToAdd)
        })
}

async function deleteCollection(nameOfCollection) {
    const res = await db.collection('users').doc(nameOfCollection).collection.delete()
}

addEmpty()
//addArtistsToCollection('test', 'idklol')
//deleteCollection('test')