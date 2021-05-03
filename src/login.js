/**
 * This example is using the Authorization Code flow.
 *
 * In root directory run
 *
 *     npm install express
 *
 * then run with the followinng command. If you don't have a client_id and client_secret yet,
 * create an application on Create an application here: https://developer.spotify.com/my-applications to get them.
 * Make sure you whitelist the correct redirectUri in line 26.

 *
 *  and visit <http://localhost:8888/login> in your Browser.
 */
 const SpotifyWebApi = require('spotify-web-api-node');
 const express = require('express');
 const cors = require('cors')
 var querystring = require('querystring');
 
 const scopes = [
   'ugc-image-upload',
   'user-read-playback-state',
   'user-modify-playback-state',
   'user-read-currently-playing',
   'streaming',
   'app-remote-control',
   'user-read-email',
   'user-read-private',
   'playlist-read-collaborative',
   'playlist-modify-public',
   'playlist-read-private',
   'playlist-modify-private',
   'user-library-modify',
   'user-library-read',
   'user-top-read',
   'user-read-playback-position',
   'user-read-recently-played',
   'user-follow-read',
   'user-follow-modify'
 ];
 
 const spotifyApi = new SpotifyWebApi({
   redirectUri: 'http://localhost:8888/callback',
   clientId: '88800b669eb946ef806f4d2a1b455a57',
   clientSecret: 'ff015504cb8e4ed592e29fcc0bdd6ae0'
 });
 
 const app = express();
 app.use(cors());
 app.options('*', cors());
 
 app.get('/login', (req, res) => {
   res.redirect(spotifyApi.createAuthorizeURL(scopes));
 });
 
 app.get('/callback', (req, res) => {
   const error = req.query.error;
   const code = req.query.code;
   const state = req.query.state;
 
   if (error) {
     console.error('Callback Error:', error);
     res.send(`Callback Error: ${error}`);
     return;
   }
 
   spotifyApi
     .authorizationCodeGrant(code)
     .then(data => {
       const access_token  = data.body['access_token'];
       const refresh_token = data.body['refresh_token'];
       const expires_in    = data.body['expires_in'];
 
       spotifyApi.setAccessToken(access_token);
       spotifyApi.setRefreshToken(refresh_token);
 
       console.log('access_token:', access_token);
       console.log('refresh_token:', refresh_token);
 
       console.log(
         `Sucessfully retreived access token. Expires in ${expires_in} s.`
       );
      //  res.send('Success! You can now close the window.');
      //  res.send(access_token);
        // we can also pass the token to the browser to make requests from there
        res['Access-Control-Allow-Origin'] = '*';
        res['Access-Control-Allow-Credentials']= true;
        res['Access-Control-Allow-Methods']= 'POST, GET, PUT, DELETE, OPTIONS';
        res['Access-Control-Allow-Headers']= 'Content-Type';

        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
       setInterval(async () => {
         const data = await spotifyApi.refreshAccessToken();
         const access_token = data.body['access_token'];
 
         console.log('The access token has been refreshed!');
         console.log('access_token:', access_token);
         spotifyApi.setAccessToken(access_token);
       }, expires_in / 2 * 1000);
     })
     .catch(error => {
       console.error('Error getting Tokens:', error);
       res.send(`Error getting Tokens: ${error}`);
     });
 });
 
 app.listen(8888, () =>
   console.log(
     'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
   )
 );
 