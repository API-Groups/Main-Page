import React, {useState , useEffect, useRef} from 'react';
import Search from '../../Functions/Search';
import LoadingComponent from '../../Functions/LoadingComp'

const ApiPage = ({apipage , api}) => {
    const [projectapi , setProjectApi] = useState({
        projectapi: true
    })
    const [findapi, setFindApi] = useState({
        findapi: false
    })
    const [serviceapi, setServiceApi] = useState({
        serviceapi: false
    })
    const [frontendcredentials , setFrontEndCreds] = useState({
        frontendcreds: {}
    })
    const [currentComponent, setCurrentComponent] = useState({
        currentComponent: 'FRONTEND'
    })
    const [frontend, setFrontEnd] = useState({
        frontend: []
    })
    const [backend, setBackEnd] = useState({
        backend: []
    })
    const [frontcompliance, setFrontCompliance] = useState({
        frontcompliance: []
    })
    const[currentJSON, setCurrentJSON] = useState({
        currentJSON: []
    })
    const [apipageconstant, setApiPageConstant] = useState({
        apipageconstant: false
    })
    const [loading, setLoading] = useState({
        loading: true
    })

    const componentMounted = useRef(false)

     useEffect(() => {
        componentMounted.current = true;
        if (apipage === true) {
            if (componentMounted.current) {
                setTimeout(() => {
                fetch('/api/backend/getbackendcomps')
                .then((res) => {
                    return res.json();
                }).then((body) => {
                setBackEnd({
                    backend: body
                })
                }).catch((error) => {
                    console.log(error)
                })
                fetch('/api/project/getfrontendapi/' + api)
                .then((res) => {
                    return res.json();
                }).then((body) => {
                    setFrontEndCreds({
                        frontendcreds: body
                    })
                })
                fetch('/api/frontend/getcomponents')
                .then((res) => {
                    return res.json();
                }).then((body) => [
                    setFrontEnd({
                        frontend: body
                    })
                ]).catch((error) => {
                    console.log(error)
                })
                fetch('/api/frontcompliance/getfrontcompliance')
                .then((res) => {
                    return res.json();
                }).then((body) => {
                setFrontCompliance({
                    frontcompliance: body
                })
                }).then(() => {
                    setLoading({
                        loading: false
                    })
                    setApiPageConstant({
                        apipageconstant: true
                    })
                }).catch((error) => {
                    console.log(error)
                })
                }, 1000);
            }
        }
     }, [apipage, api])


    const ServiceApi = ({serviceapi}) => {
     const [frontend, setFrontEnd] = useState({
         frontend: true
     })
     const [backend, setBackEnd] = useState({
         backend: false
     })

     const FrontEndCreds = ({frontendshow}) => {
         if (frontendshow === true) {
            return (
                <div>
                 <div className="row">
                  <div className="col-md-4">
                   <div className="background-front-end-nav">
                    <h5>Front End Services</h5>
                    <div className="comp-spacing">
                     <label>Authentication</label>
                     <h6>Authentication Services that allow to login and register users.</h6>
                    </div>
                   </div>
                  </div>
                  <div className="col-md-8">
                  <h4>Front-End Service Credentials</h4>
                 <div className="text-padding">
                  <h6>Copy and paste this code to a file and either use it directly to your use our services or export it.</h6>
                  <div className="code-container">
                   <pre>
                     {
                         `const app = {
        frontendprojectapi: ${frontendcredentials.frontendcreds.frontendprojectapi}, 
        projectname: ${frontendcredentials.frontendcreds.projectname}
    }
                         
    //make sure you imported the JPI package you want to use that has front end services
                         
    JPIData.service(app);
                         `
                     }
                   </pre>
                  </div>
                 </div>
                  </div>
                 </div>
                </div>
            )
         } else {
             return null
         }
     } 

     const BackendCreds = ({backendcreds}) => {
         if (backendcreds === true) {
            return (
                      <div>
                         <h4>Back-End Service Credentials</h4>
                         <h6>Add Key Credentials to your code to use our backend API's and Frontcompliance components for effective and productive code.</h6>
                         <div className="text-padding">
                         <div className="row">
                             <div className="col-md-4">
                               <h6>JPI Service Credentials is the key to using the backend and the Front compliance components where you can monitor specific data that we display for you so that you can modify and update your application to its most promising potential. Please be advised that this key is very IMPORTANT and make sure that this is not public information because of the fact that this can affect your data immensley. In the case that we find any abnormalities or insecurities we will notify you immediately.</h6>
                             </div>
                           <div className="service-box">
                             <div className="col-md-8">
                             <h4>SERVICE CREDENTIALS</h4>
                               <div className="button-major-padding">
                                <div className="d-flex justify-content-center">
                                <button className="button-all-white" onClick={() => {
                                    fetch('/api/project/getservicecredentials/' + api)
                                    .then((res) => {
                                        return res.blob();
                                    }).then((body) => {
                                        fetch('/api/project/getservicetitle/' + api)
                                        .then((res) => {
                                            return res.text();
                                        }).then((title) => {
                                           const blobUrl = URL.createObjectURL(body);
                                           const dl = document.createElement('a');
                                           dl.href = blobUrl;
                                           dl.download = title;
                                           dl.style.display = `none`;
                                           document.body.appendChild(dl);
                                           dl.click();
                                           document.body.removeChild(dl);  
                                        }).catch((error) => {
                                            console.log(error);
                                        })       
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                }}>GET CREDENTIALS</button>
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
     if (serviceapi === true) {
         return (
             <div>
                 <div className="project-component">
                    <div className="container">
                        <div className="button-padding">
                          <div className="float-left">
                           <div className="button-spacing">
                           <button className="button-purple" onClick={() => {
                            setBackEnd({
                                backend: false
                            })
                            setFrontEnd({
                                frontend: true
                            })
                           }}>FRONT-END</button>
                           </div>
                         </div>
                         <button className="button-white" onClick={() => {
                               setBackEnd({
                                   backend: true
                               })
                               setFrontEnd({
                                   frontend: false
                               })
                           }}>BACK-END</button>
                         </div>
                     <FrontEndCreds frontendshow={frontend.frontend}/>
                     <BackendCreds backendcreds={backend.backend} />
                    </div>
                  </div>
             </div>
         )
     } else {
         return null;
     }
    }
 
    const FindAPI = ({findapi}) => {
        if (findapi === true) {
            return (
                <div>
                  <div className="project-component">
                   <div className="container">
                     <h4>Add API to Project</h4>
                     <div className="row">
                      <div className="col-md-8">
                        <Search 
                        inputstyle="input-bar"
                        output={["name", "description"]}
                        renderstyle="render-card"
                        variable={currentJSON.currentJSON}
                        placeholder="Search for Components"
                        callback={(item) => {
                            console.log(item)
                        }}
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="input-container">
                        <select className="input-bar" onChange={(e) => {

                            console.log(e.target.value)

                        
                            setCurrentComponent({
                                currentComponent: e.target.value
                            })

                            if (currentComponent.currentComponent === "FRONTEND") {
                              setCurrentJSON({
                                  currentJSON: frontend.frontend
                              })
                            } else if (currentComponent.currentComponent === "BACKEND") {
                                setCurrentJSON({
                                    currentJSON: backend.backend
                                })
                            } else if (currentComponent.currentComponent === "FRONTCOMPLIANCE") {
                                setCurrentJSON({
                                    currentJSON: frontcompliance.frontcompliance
                                })
                            }
                            

                        }}>
                         <option value="FRONTEND">Front End</option>
                         <option value="BACKEND">Back End</option>
                         <option value="FRONTCOMPLIANCE">Front Compliance</option>
                        </select>
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
 
    const ProjectApis = ({projectapi}) => {
        const ApiPageConstant = ({apiPageConstant}) => {
            const [registerMethod, setRegisterMethod] = useState({
                registerMethod: true
            })
            const [signInMethod, setSignInMethod] = useState({
                signInMethod: false
            })
            

                const SignInMethod = ({signInMethod}) => {
                    if (signInMethod === true) {
                        return (
                            <div>
                             <div className="modal-comp">
                              <h4>Sign In Method</h4>
                              <div className="text-padding">
                                <h5>Users can login to your Application easily and we will be able to manage the user sessions even if you refresh the page</h5>
                              </div>
                              <div className="code-container">
                                <pre>
{
`const app = {
    frontendprojectapi: ${frontendcredentials.frontendcreds.frontendprojectapi}, 
    projectname: ${frontendcredentials.frontendcreds.projectname}
  }
                                                               
  //make sure you imported the JPI package you want to use that has front end services
                                                               
  const register = JPIData.service(app);
  JPIAuth.AuthMethods.signInEmailAndPassword()
  JPIAuth.AuthMethods.signInUsernameAndPassword()
                                          
  /*
  email = email of the user (optional if not using a email and password authentication),
  username = username of the user (optional if not using a username and password authentication),
  password = password(required)
  */      
 `
}
                                </pre>
                              </div>
                             </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                }

                const RegisterMethod = ({registerMethod}) => {
                    if (registerMethod === true) {
                        return (
                            <div>
                                <div className="modal-comp">
                                  <h4>Registering Users</h4>
                                  <div className="text-padding">
                                   <h5>Users can be registered through simple frontend functions and please note that there is backend functions in which we can register users.</h5>
                                  </div>
                                  <div className="code-container">
                                   <pre>
                                     {
                                        `
const app = {
  frontendprojectapi: ${frontendcredentials.frontendcreds.frontendprojectapi}, 
  projectname: ${frontendcredentials.frontendcreds.projectname}
}
                                                             
//make sure you imported the JPI package you want to use that has front end services
                                                             
const register = JPIData.service(app);
JPIAuth.RegisterMethods.registerUserEmailAndPassword(email, password, mapJson, firstname, lastname, username, usertoken);
JPIAuth.RegisterMethods.registerUserUsernameAndPassword(username, password, mapJson, firstname, lastname, email, usertoken);
                                        
/*
email = email of the user (optional if not using a email and password authentication),
username = username of the user (optional if not using a username and password authentication),
password = password(required),
mapJson = a JSON object of extra information you want to hold for the user,
firstname = firstname of the user (optional),
lastname = lastname of the user (optional),
usertoken = usertoken of the user (optional)
*/                   
                                        `
                                     }
                                   </pre>
                                  </div>    
                                 </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                }
                
            if (apiPageConstant === true) {
                return (
                    <div>
                        <h3>Try out our API's Authentication Services</h3>
                            <div className="title-padding">
                                <div className="text-padding">
                                 <h5>JPI Authentication services allow you to manage users by registering users and logging them in while adding specific user details that you want to include.</h5>
                                 <div className="button-padding">
                                  <div className="float-left">
                                   <div className="button-spacing">
                                   <button className="button-purple" onClick={() => {
                                       setRegisterMethod({
                                           registerMethod: true
                                       })
                                       setSignInMethod({
                                           signInMethod: false
                                       })
                                   }}>Register Users</button>
                                   </div>
                                  </div>
                                  <button className="button-white" onClick={() => {
                                    setRegisterMethod({
                                        registerMethod: false
                                    })
                                    setSignInMethod({
                                        signInMethod: true
                                    })
                                  }}>Sign In Users</button>
                                 </div>
                                 <RegisterMethod registerMethod={registerMethod.registerMethod} />
                                 <SignInMethod signInMethod={signInMethod.signInMethod} />
                                </div>
                              </div> 
                         </div>
                )
            } else {
                return null;
            }
         }
        if (projectapi === true) {
           return (
               <div>
                  <div className="project-component">
                     <div className="container">
                      <LoadingComponent loadingComponent={loading.loading} />
                      <ApiPageConstant apiPageConstant={apipageconstant.apipageconstant} />
                     </div>
                  </div> 
               </div>
           )
        } else {
            return null;
        }
    }
 
 
     if (apipage === true) {
         return (
             <div>
              <div className="non-nav-page">
               <div className="api-page">
               <div className="container">
                  <div className="row">
                     <div className="col-md-6">
                     <h3>PROJECT API's</h3>
                     </div>
                     <div className="col-md-6">
                      <div className="row">
                       <div className="col-md-4">
                       <h6 className="pointer" onClick={() => {
                         setProjectApi({
                             projectapi: true
                         })
                         setFindApi({
                             findapi: false
                         })
                         setServiceApi({
                             serviceapi: false
                         })
                             }}>PROJECT API</h6>
                       </div>
                       <div className="col-md-4">
                       <h6 className="pointer" onClick={() => {
                             setProjectApi({
                                 projectapi: false
                             })
                             setFindApi({
                                 findapi: true
                             })
                             setServiceApi({
                                 serviceapi: false
                             })
                             }}>FIND API</h6>
                       </div>
                       <div className="col-md-4">
                       <h6 className="pointer" onClick={() => {
                                 setProjectApi({
                                     projectapi: false
                                 })
                                 setFindApi({
                                     findapi: false
                                 })
                                 setServiceApi({
                                     serviceapi: true
                                 })
                             }}>SERVICE</h6>
                       </div>
                      </div>
                     </div>
                  </div>
               </div>
               </div>
               <ProjectApis projectapi={projectapi.projectapi}/>
               <FindAPI findapi={findapi.findapi} />
               <ServiceApi serviceapi={serviceapi.serviceapi} />
               </div>
              </div>
         )
     } else {
         return null;
     }
 }

 export default ApiPage