import React from 'react';
import Navigation from './Subcomponents/Navigation';
const Home = () => {
    return (
        <div>
         <Navigation/>
         <div className="major-padding-page">
          <div className="container">
            <h1>JPI</h1>
            <div className="text-padding">
             <h5>API Library to help with all type of services</h5>
            </div>
          </div>
         </div>
        </div>
    )
}

export default Home;