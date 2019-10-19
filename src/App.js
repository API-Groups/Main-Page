import React from 'react';
import './App.css';
import {BrowserRouter , Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './App.css'
import Register from './Pages/Register';
import Dash from './AuthPages/Dash';
import SetComponent from './Admin/Setcomponent';
import ProjectDetails from './AuthPages/ProjectPages/Projecthome';

const App = () => {
  return (
    <div>
     <BrowserRouter>
      <Route path="/" component={Home} exact/>
      <Route path="/Login" component={Login} exact />
      <Route path="/Register" component={Register} exact />
      <Route path="/Dash" component={Dash} exact />
      <Route path="/Admin" component={SetComponent} exact />
      <Route path="/Project" component={ProjectDetails} exact />
     </BrowserRouter>
    </div>
  );
}

export default App;
