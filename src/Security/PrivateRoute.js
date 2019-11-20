import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const PrivateRoute = ({path ,comp, isAuthenticated, ...rest}) => {

    if (isAuthenticated === true) {
        return <Route path={path} component={comp} exact/>
    } else {
        return <Redirect to="/" />
    }
 
}

export default PrivateRoute;