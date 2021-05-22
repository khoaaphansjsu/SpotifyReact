const express        = require('express')
const bodyParser     = require('body-parser')
require("firebase/firestore");
const firebase = require('firebase-admin');
// admin.initializeApp();
const serviceAccount = require("./supafy-be393-37de8cca2400.json")
var firebaseConfig = require("./prod.json")
firebaseConfig.credential = firebase.credential.cert(serviceAccount)
firebase.initializeApp(firebaseConfig)
// Firebase previously initialized using firebase.initializeApp().
var db = firebase.firestore();

var request = require('request'); // "Request" library
const fs = require('fs');
var cors = require('cors');
const https = require('https');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const { CompareArrowsOutlined } = require('@material-ui/icons');

var client_id = '92e926db9a184761aa10331a81c59ba3'; // Your client id
var client_secret = '97704c4daa5a44a6b222a76b44f386d8'; // Your secret
var redirect_uri = 'https://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

//firebase.initializeApp(firebaseConfig)

/*
function getEmail(email){
  const promise = db.collection("users").doc(email).get();
  //promise.then((result) => {console.log(result.data())}); //Uncomment for testing
  promise.then((result) => {return result.data()});
}
*/

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 
    'playlist-read-private ' +
    'playlist-read-collaborative ' +
    'user-read-private ' +
    'user-read-email ';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        //we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/?' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
       // res.header('Access-Control-Allow-Origin', '*');

       //    res.json({
       //     access_token: access_token,
       //     refresh_token: refresh_token
       //   })
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/getMyCollections', async (req, res) => {
  const userId = req.query.userId;
  console.log("getMyCollections " + userId)
  var result
  const superplaylistsRef = await db.collection("users").doc(userId).collection('super').get();
  let superplaylists = await superplaylistsRef.docs.map( async (doc) => {
    let res = {};
    res.id = doc.id;
    res.items = await doc.data();
    console.log(res);
    return res;
  } )
  result = await Promise.all(superplaylists)
  console.log("promises" + result);
  res.send(result);

  // const doc = await db.collection('users').doc('ularavind@hotmail.com').get()
  // console.log(doc.id, '=>', doc);
  // let data = doc.data();
  // console.log(doc.id, '=>', data);
  // res.json(data);
})

app.get('/addCollection', (req, res) => {
  console.log("adding a collection", req)
})

function add(email, collectionName, thingToAdd) {
  const userId = req.query.userId;
  db.collection('users').doc(email).collection('super').doc(collectionName).update(
  {links:
          firebase.firestore.FieldValue.arrayUnion(thingToAdd)
  })
}

app.get("/getCollection", async (req, res) => {
  console.log("getting collection " + req.query.uuid)
  const doc = await db.collection(req.query.uuid[0]).doc(req.query.uuid[1]).get();
  console.log("getting collection " + doc.data())
  res.json(doc.data());
})

console.log('Listening on 8888');
const httpsServer = https.createServer({
   key:  fs.readFileSync("key.pem"),
   cert: fs.readFileSync("cert.pem"),
 }, app);
 httpsServer.listen(8888);