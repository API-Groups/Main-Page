import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const PrivateRoute = ({path ,comp, isAuthenticated, ...rest}) => {

    if (isAuthenticated === true) {
        return <Route exact path={path} component={comp}  />
    } else {
        return <Redirect to="/" />
    }
 
}

export default PrivateRoute;