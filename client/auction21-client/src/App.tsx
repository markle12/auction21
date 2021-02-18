import { send } from 'process';
import React from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';
import config from './config';
import server from './server';

export default class App extends React.Component {
  onResponse = (response: any) => {
    console.log(response);
    let id_token = response.getAuthResponse().id_token;
    let email = response.getBasicProfile().getEmail();
    
    server.login(email, id_token);
  }

  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId={config.googleClientId}
          buttonText="Login with Google"
          onSuccess={this.onResponse}
          onFailure={this.onResponse}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

