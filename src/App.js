import React from 'react';
import './App.css';
import {BrowserRouter , Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import './App.css'
import Register from './Pages/Register';

const App = () => {
  return (
    <div>
     <BrowserRouter>
      <Route path="/" component={Home} exact/>
      <Route path="/Login" component={Login} exact />
      <Route path="/Register" component={Register} exact />
     </BrowserRouter>
    </div>
  );
}

export default App;
