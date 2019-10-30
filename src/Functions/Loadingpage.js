import React from 'react';

const LoadingPage = ({loadingpage}) => {
    if (loadingpage === true) {
        return (
            <div>
             <div className="modal-page-white">
              <div className="container">
               <div className="major-padding-page">
                <div className="d-flex justify-content-center">
                <div className="loadingblue"></div>
                </div>
               </div>
              </div>
             </div>
            </div>
        )
    } else {
        return null;
    }
}

export default LoadingPage;