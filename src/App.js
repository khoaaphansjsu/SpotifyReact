import React  from "react";
import Dashboard from "./Components/Dashboard.js";
import Login  from "./Components/Login.js";
import Button from '@material-ui/core/Button';

export default class App extends React.Component {
  state = {
    loggedin: false,
    token: null,
  };

  handleLogin = () => {
    console.log("logging in");
    fetch("http://localhost:8888/login",{
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods':'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
    .then(
      (res) => {
         res.text().then((ress=>{
          console.log("here " + ress)
          this.setState({loggedin:true, token:ress})
        }));
      }
    )
    .catch(
      (res)=>{console.log('error:' + res);}
    )
  }

  render() {
    if(!this.state.loggedin)
      return (
        <div className="component-app">
          <Button onClick={this.handleLogin} >Login</Button>
        </div>
      )
    else
      return (
        <div className="component-app">
          {/* {this.state.token} */}
          Success
          <Dashboard />
        </div>
      );
  }
}
