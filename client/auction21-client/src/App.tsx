import React from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';

let googleClientId = "151004553284-r57cgf5ipjipqjnvcn2ijt6aep9kbh3b.apps.googleusercontent.com"
export default class App extends React.Component {
  onResponse = (response: any) => {
    var req = new XMLHttpRequest();
    req.addEventListener("load", (event) => {
      console.log(req.responseText);
    });

    req.setRequestHeader('Content-Type', 'application/json');
    req.open('POST', 'auction.troop712.org:80/api/login');
    req.send(JSON.stringify({accessToken: response.accessToken}));
  }

  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId={googleClientId}
          buttonText="Login with Google"
          onSuccess={this.onResponse}
          onFailure={this.onResponse}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

