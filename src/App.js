import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './components/loginForm';
const axios = require('axios');

const URL = 'http://localhost:3001/';

export default class App extends Component {

  login = async(email, password) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${URL}login`,
        data: {
          "email": email,
          "password": password
        }
      });
      console.log('response', response);
    }
    catch(e) {
      console.log('e', e);
    }
  }

  render() {
    return (
      <div className="App container">
        <Router>
          {/* <div style={{border: "1px solid green"}} onClick={this.onclick2}>HERE login</div> */}
          <Route path="/">
            <LoginForm login={this.login}/>
          </Route>
        </Router>
      </div>
    );
  }
}


 // ____________________________________________________________________________________________________________________________

  // Add new user without form just for testing

  // addNewUser = async() => {
  //   const test = await axios({
  //     method: 'post',
  //     url: 'http://localhost:3001/register',
  //     data: {
  //       "email": "test@gmail.com", //choose email and password which you want
  //       "password": "password2020"
  //     }
  //   });
  //   console.log(test);
  // }

  /* <div style={{border: "1px solid red", width: "120px", cursor: "pointer"}} onClick={this.addNewUser}>HERE register</div> */
  // ______________________________________________________________________________________________________________________________