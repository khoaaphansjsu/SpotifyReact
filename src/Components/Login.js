import React from "react";

export default class Login extends React.Component {

  render() {
    return (
      <div className="component-app">
        <button clickHandler={this.props.logincallback()}>Login</button>
      </div>
    );
  }
}
