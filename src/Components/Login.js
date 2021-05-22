import React from "react";
import Button from '@material-ui/core/Button';

export default class Login extends React.Component {

  render() {
    return (
      
      <div className="component-app">
        {/* <Button onClick={this.handleLogin} >Login</Button> */}
        <Button style={{left: "50%"}} href="https://localhost:8888/login">Login</Button>
      </div>
    );
  }
}
