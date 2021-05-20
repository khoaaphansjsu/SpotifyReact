# Supafy

App for efficient music playlist management

## Setup   

`npm install`   
`cd backend/ && npm install`

### Setup SSL for backend

[install openssl](https://www.xolphin.com/support/OpenSSL/OpenSSL_-_Installation_under_Windows)

Generate a self-signed key and certificate in /src:   
`cd ./backend` 
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -config .\noc.cfg `   


## Run

Start a clinet and a server. Note: Privacy Badger browser plugin blocks spotify api calls, so disable it if you have it.

### Client

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Server

`cd ./backend`   
`node ./backend.js`   


