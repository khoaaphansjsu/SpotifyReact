const express        = require('express')
const bodyParser     = require('body-parser')
var firebase         = require('firebase')
require("firebase/firestore");
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();


const firebaseConfig = require('./prod.json');
firebase.initializeApp(firebaseConfig)

const app = express()
const port = 3000

app.getUsersCollections('/', (req, res) => {
    console.log("getMyCollections")
    const docRef = db.collection('excercises').doc('pushups');
})

app.addCollection('/addCollection', (req, res) => {
    console.log("adding a collection", req)
    
}
)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})