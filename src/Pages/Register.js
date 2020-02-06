import React,{useState} from 'react';
import Navigation from './Subcomponents/Navigation';
import LoadingWholePage from '../MiscComps/Wholeloading';
import { JPIAuth } from '../Authentication/Auth';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
//import JPID from '../Test/testdata';

const Register = (props) => {
  const [loading, setLoading] = useState({
    loading: false
  })
  const [firstname, setFirstName] = useState({
    firstname: ''
  })
  const [lastname, setLastName] = useState({
    lastname: ''
  })
  const [email, setEmail] = useState({
    email: ''
  })
  const [password, setPassword] = useState({
    password: ''
  })
  const [username, setUserName] = useState({
    username: ''
  })
  const [loggedin, setLoggedIn] = useState({
    loggedin: false
  })



  if (loggedin.loggedin) {
    return <Redirect to="/Dash" />
  }

    return (
        <div>
         <Navigation/>
         <div className="page">
          <div className="container">
            <h1>REGISTER</h1>
              <div className="input-container">
               <input type="text" className="input-bar" placeholder="Username" onChange={(e) => {
                 setUserName({
                   username: e.target.value
                 })
               }}/>
              </div>
            <div className="row">
             <div className="col-md-6">
              <div className="input-container">
               <input type="text" className="input-bar" placeholder="First Name" onChange={(e) => {
                 setFirstName({
                   firstname: e.target.value
                 })
               }}/>
              </div>
             </div>
             <div className="col-md-6">
              <div className="input-container">
               <input type="text" className="input-bar" placeholder="Last Name" onChange={(e) => {
                 setLastName({
                   lastname: e.target.value
                 })
               }} />
              </div>
             </div>
            </div>
            <div className="input-container">
             <input type="text" className="input-bar" placeholder="Email" onChange={(e) => {
               setEmail({
                 email: e.target.value
               })
             }} />
            </div>
            <div className="input-container">
             <input type="password" className="input-bar" placeholder="Password" onChange={(e) => {
               setPassword({
                 password: e.target.value
               })
             }} />
            </div>
            <div className="button-padding">
             <button className="button-purple" onClick={() => {
               const data = {
                 firstname: firstname.firstname,
                 lastname: lastname.lastname,
                 email: email.email,
                 username: username.username,
                 password: password.password
               }

               axios.post('https://jpi-backend.herokuapp.com/api/authentication/createuser', data , {
                 headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
               }).then((body) => {
                console.log(body);
                console.log(body.data.username);
                console.log(body.data.password)

                setLoading({
                  loading: true
                })
                setTimeout(() => {
                  setLoading({
                    loading: false
                  })
                  JPIAuth.signIn(body.data.username, body.data.password)
                  .then(() => {
                    setLoggedIn({
                      loggedin: true
                    })
                  }).catch((error) => {
                    console.log(error)
                  })
                }, 5000);
               }).catch((error) => {
                 console.log(error);
               })
             }}>REGISTER</button>
            </div>
          </div>
         </div>
         <LoadingWholePage loadingprocess={loading.loading}/>
        </div>
    )
}

export default Register;