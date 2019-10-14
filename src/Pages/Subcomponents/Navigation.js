import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
    const [contact, setContact] = useState({
        contact: false
    })

    const ContactModal = ({contactmodal}) => {
        if (contactmodal === true) {
            return (
                <div className="modal-page">
                 <div className="container">
                  <div className="modal-padding">
                  <div className="modal-box">
                   <span className="closebtndark" onClick={() => {
                       setContact({
                           contact: false
                       })
                   }}>&times;</span>
                   <h1>CONTACT</h1>
                  </div>
                  </div>
                 </div>
                </div>
            )
        } else {
            return null;
        }
    }
    return (
        <div>
         <div className="navigation-bar">
          <div className="container">
           <div className="row">
            <div className="col-md-4">
             <h5>JPI</h5>
            </div>
            <div className="col-md-4">
             <div className="row">
             <div className="col-md-4">
              <h6 className="text-center">PRODUCTS</h6>
             </div>
             <div className="col-md-4">
              <h6 className="text-center">PRICING</h6>
             </div>
             <div className="col-md-4">
              <h6 className="text-center" onClick={() => {
                  setContact({
                      contact: true
                  })
              }}>CONTACT</h6>
             </div>
             </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-6">
                <NavLink to="/Login" className="navlink"><h6 className="text-center">LOGIN</h6></NavLink>
                </div>  
                <div className="col-md-6">
                <NavLink to="/Register" className="navlink"><h6 className="text-center">REGISTER</h6></NavLink>
                </div>  
              </div>
            </div>
           </div>
          </div>
         </div>
         <ContactModal contactmodal={contact.contact}/>
        </div>
    )
}

export default Navigation;
