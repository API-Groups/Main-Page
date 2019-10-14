import React,{useState} from 'react';
import Navigation from './Subcomponents/Navigation';
import LoadingWholePage from '../MiscComps/Wholeloading';

const Register = () => {
  const [loading, setLoading] = useState({
    loading: false
  })
    return (
        <div>
         <Navigation/>
         <div className="page">
          <div className="container">
            <h1>REGISTER</h1>
            <div className="row">
             <div className="col-md-6">
              <div className="input-container">
               <input type="text" className="input-bar" placeholder="First Name"/>
              </div>
             </div>
             <div className="col-md-6">
              <div className="input-container">
               <input type="text" className="input-bar" placeholder="Last Name"/>
              </div>
             </div>
            </div>
            <div className="input-container">
             <input type="text" className="input-bar" placeholder="Email"/>
            </div>
            <div className="input-container">
             <input type="password" className="input-bar" placeholder="Password"/>
            </div>
            <div className="button-padding">
             <button className="button-purple" onClick={() => {
               setLoading({
                 loading: true
               })

               setTimeout(() => {
                setLoading({
                  loading: false
                })
               }, 5000);
             }}>REGISTER</button>
            </div>
          </div>
         </div>
         <LoadingWholePage loadingprocess={loading.loading}/>
        </div>
    )
}

export default Register;