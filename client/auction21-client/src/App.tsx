import React from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';

let googleClientId = "151004553284-r57cgf5ipjipqjnvcn2ijt6aep9kbh3b.apps.googleusercontent.com"
export default class App extends React.Component {
  onResponse = (response: any) => {
    console.log(response);
  }
  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login"
          onSuccess={this.onResponse}
          onFailure={this.onResponse}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

