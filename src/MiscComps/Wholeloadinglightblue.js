import React from 'react';

const LoadingWholePageLight = ({loadingprocess, title }) => {
    if (loadingprocess === true) {
        return (
            <div>
              <div className="modal-page-light-purple">
                <div className="container">
                  <div className="major-padding-page">
                    <div className="row">
                      <div className="col-md-12">
                      <div className="d-flex justify-content-center">
                      <div className="loader" title="2">
                      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="10px" y="10px"
                          width="40px" height="40px" viewBox="0 0 50 50" xmlSpace="preserve">
                      <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                          <animateTransform attributeType="xml"
                          attributeName="transform"
                          type="rotate"
                          from="0 25 25"
                          to="360 25 25"
                          dur="0.6s"
                          repeatCount="indefinite"
                          fontSize="50px"/>
                          </path>
                      </svg>
                      </div>
                      </div>
                      </div>
                    </div>
                    <div className="row">
                     <div className="col-md-12">
                     <div className="text-padding-major">
                      <h3 className="text-white text-center">{title}</h3>
                     </div>
                     </div>
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

export default LoadingWholePageLight;