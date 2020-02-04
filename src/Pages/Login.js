import React, {useState} from 'react';
import Navigation from './Subcomponents/Navigation';
import {JPIAuth} from '../Authentication/Auth';
import {Redirect} from 'react-router-dom';
const Login = () => {
  const [username, setUserName] = useState({
    username: ''
  })
  const [password, setPassword] = useState({
    password: ''
  })
  const [loggedIn, setLogin] = useState({
    loggedin: false
  })

  let {loggedin} = loggedIn
  if(loggedin) {
    return <Redirect to="/Dash" />
  }

  console.log(username.username);
  console.log(password.password)
 
    return (
        <div>
         <Navigation/>
         <div className="login-page">
         <div className="page">
          <div className="container">
            <h1>LOGIN</h1>
            <div className="input-login-container">
            <div className="input-container">
             <input type="text" className="input-bar" placeholder="user name" onChange={(e) => {
               setUserName({
                 username: e.target.value
               })
             }}/>
            </div>
            <div className="input-container">
             <input type="password" className="input-bar" placeholder="password" onChange={(e) => {
               setPassword({
                 password: e.target.value
               })
             }}/>
            </div>
            </div>
            <button className="button-purple" onClick={() => {
              JPIAuth.signIn(username.username , password.password)
              .then(() => {
                setLogin({
                  loggedin: true
                })
              }).catch((error) => {
                console.log(error);
              })
            }}>LOGIN</button>
          </div>
         </div>
         </div>
        </div>
    )
}

export default Login;