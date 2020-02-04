import React from 'react';

const LoadingComponent = ({loadingComponent}) => {
    if (loadingComponent === true) {
        return (
            <div>
              <div className="loading-padding">
                <div className="d-flex justify-content-center">
                 <div className="loadingblue"></div>
                </div>
              </div>
            </div>
        )
    } else {
        return null;
    }
}

export default LoadingComponent;