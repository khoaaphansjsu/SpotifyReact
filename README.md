# Getting Started with Create React App

App for efficient music playlist management

## Setup   

### Setup SSL for backend

Generate a self-signed key and certificate in /src:   
`cd ./src` 
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -config .\noc.cfg `   


## Run

In the project directory, you can run:

### Client

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Server

`cd ./src`   
`node ./loginV2.js`   


