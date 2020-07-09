import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Office from './components/office';
const axios = require('axios');

const URL = 'http://localhost:3001/';

export default class App extends Component {

  state = {
    authorized: false,
    loginError: false,
  }

  login = async(email, password) => {
    try {
      await axios({
        method: 'post',
        url: `${URL}login`,
        data: {
          "email": email,
          "password": password
        }
      });
      this.setState({ authorized: true });
    }
    catch {
      this.setState({ loginError: true });
      setTimeout(() => this.setState({ loginError: false }), 2500);
    }
  }

  render() {
    const { authorized, loginError } = this.state;
    return (
      <div className="App container">
        <Router>
          <Route path="/" exact>
            {loginError? <div className="row justify-content-center log-err">Вы ввели неверные данные, попробуйте ещё раз</div> : null}
            <LoginForm login={this.login}/>
          </Route>
          {/* <Route path="/office" component={Office}/> */}
          {authorized && <><Route path="/office" component={Office}/> <Redirect to="/office" /></>}
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