import React, {useState, useEffect} from 'react';
import './App.css';
import {HashRouter , Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './App.css'
import Register from './Pages/Register';
import Dash from './AuthPages/Dash';
import SetComponent from './Admin/Setcomponent';
import ProjectDetails from './AuthPages/ProjectPages/Projecthome';
import PrivateRoute from './Security/PrivateRoute';
import { JPIAuth } from './Authentication/Auth';
import Tablepage from './AuthPages/ProjectAnalytics/Tablepage'

const App = () => {
 
 const [authenticated, setAuthenticated] = useState({
   authenticated: false
 })

 useEffect(() => {
  JPIAuth.registerListener((user) => {
    if (user) {
      setAuthenticated({
        authenticated: true
      })
    } else {
      setAuthenticated({
        authenticated: false
      })
    }
  })
 }, [])


 
  return (
    <div>
     <HashRouter basename="/">
      <Route path="/Login" component={Login} exact />
      <Route path="/Register" component={Register} exact />
      <Route path="/Admin" component={SetComponent} exact />
      <Route path="/" component={Home} exact/>
      <PrivateRoute path="/Dash" comp={Dash} isAuthenticated={authenticated.authenticated} />
      <PrivateRoute path="/project/:projectapi" comp={ProjectDetails} isAuthenticated={authenticated.authenticated} />
      <PrivateRoute path="/project/projectanalytics/:projectapi/:tableapi" comp={Tablepage} isAuthenticated={authenticated.authenticated} />
     </HashRouter>
    </div>
  );
}

export default App;
