import React from 'react';
import {NavLink} from 'react-router-dom';

const AnalyticNav = ({navtitle , projectapi}) => {
    return (
        <div>
          <div className="data-nav-bar">
          <div className="float-right">
            <NavLink to={"/project/" + projectapi} className="navlink">
            <button className="button-purple">Project Models</button>
            </NavLink> 
          </div>
          <h5>{navtitle}</h5>
         </div>  
        </div>
    )
}

export default AnalyticNav;