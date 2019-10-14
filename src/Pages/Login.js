import React, {useState} from 'react';
import Navigation from './Subcomponents/Navigation';

const Login = () => {
  const [email, setEmail] = useState({
    email: ''
  })
  const [password, setPassword] = useState({
    password: ''
  })
    return (
        <div>
         <Navigation/>
         <div className="page">
          <div className="container">
            <h1>LOGIN</h1>
            <div className="input-login-container">
            <div className="input-container">
             <input type="text" className="input-bar" placeholder="email" onChange={(e) => {
               setEmail({
                 email: e.target.value
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
              const data = {
                email: email.email,
                password: password.password
              }
              console.log(data);
            }}>LOGIN</button>
          </div>
         </div>
        </div>
    )
}

export default Login;