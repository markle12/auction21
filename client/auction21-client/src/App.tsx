import React from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';

let googleClientId = "151004553284-r57cgf5ipjipqjnvcn2ijt6aep9kbh3b.apps.googleusercontent.com"
export default class App extends React.Component {
  onResponse = (response: any) => {
    let id_token = response.getAuthResponse().id_token;
    console.log(id_token);
    var req = new XMLHttpRequest();
    req.addEventListener("load", (event) => {
      console.log(req.responseText);
    });

    req.open('POST', 'https://auction.troop712.org/api/login');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({accessToken: id_token}));
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

