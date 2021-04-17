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

function getUUID(UUID){
    const playlist = db.collection("superplaylists").doc(UUID).get();
    console.log(playlist);
}
