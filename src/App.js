import React  from "react";
import Dashboard from "./Components/Dashboard.js";
import Login  from "./Components/Login.js";
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <>
      <Router> 
        <Route path="/" exact component={Dashboard}/>
        <Route path="/login" exact component={Login}/>
      </Router>
    </>
  );
}

