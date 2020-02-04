import React from 'react';

const NonAuthFooter = () => {
    return (
        <div>
         <div className="footer-component">
          <h5>Programming made easy</h5>
          <div className="footer-padding">
           <div className="row">
            <div className="col-md-4">
              <h3 className="text-center">Authentication</h3>
              <div className="text-padding">
               <h5>We give authentication services to JPI projects, the ability to register users and login users and to get unique user credentials.</h5>
              </div>
            </div>
            <div className="col-md-4">
              <h3 className="text-center">Data Management</h3>
              <div className="text-padding">
               <h5>API Services that help you manage data easily where we give you analytics and statistics that help you and people involved in the app to  make decisive descisions with easily visible data</h5>
              </div>
            </div>
            <div className="col-md-4">
              <h3 className="text-center">API Services</h3>
              <div className="text-padding">
               <h5>Free API services and components that can make your app more productive. A variety of frameworks are supported</h5>
              </div>
            </div>
            </div>
          </div>
         </div>
        </div>
    )
}

export default NonAuthFooter;