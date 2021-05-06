import React from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  useLocation} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Components/Login.js';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
  <Router> 
      <Route path="/" exact component={App}/>
      <Route path="/login" exact component={Login}/>
      {/* <Route path="/profile" exact component={Profile}/>
      <Route path="/goals" exact component={Goals}/>
      <Route path="/statistics" exact component={Statistics}/>
      <Route path="/signup" exact component={SignUp}/> */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
