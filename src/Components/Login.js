import React from "react";
import Button from '@material-ui/core/Button';
import '../index.css';

export default class Login extends React.Component {

  
  render() {
    const div = {
      backgroundColor: "#0EA348"
    }
    return (
      <div style={{div}}className="component-app" >
        <h1 style={{display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0EA348"
            }}>Supafy</h1>
        <p style={{display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0EA348"
            }}>Made for those who need a quick and easy way of creating music playlists</p> 
        <Button style={{display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0EA348",
            color: "blue"
            }} href="https://localhost:8888/login">Login</Button>
      </div>
    );
  }
}