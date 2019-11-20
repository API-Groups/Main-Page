import React, {useState , useEffect} from 'react';
import Search from '../../Functions/Search';

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

     useEffect(() => {
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

        setFrontEnd({
            frontend: []
        })
   
        fetch('/api/frontcompliance/getfrontcompliance')
        .then((res) => {
            return res.json();
        }).then((body) => {
           setFrontCompliance({
               frontcompliance: body
           })
        }).catch((error) => {
            console.log(error)
        })
     }, [])
    



    const ServiceApi = ({serviceapi}) => {
     if (serviceapi === true) {
         return (
             <div>
                <div className="project-component">
                    <div className="container">
                      <h4>Service Credentials</h4>
                      <h6>Add Key Credentials to your code to use our backend API's and Frontcompliance components for effective and productive code.</h6>
                      <div className="text-padding">
                        <div className="service-box">
                        <h4>SERVICE CREDENTIALS</h4>
                         <div className="row">
                          <div className="col-md-6">
                            <h6>JPI Service Credentials is the key to using the backend and the Front compliance components where you can monitor specific data that we display for you so that you can modify and update your application to its most promising potential. Please be advised that this key is very IMPORTANT and make sure that this is not public information because of the fact that this can affect your data immensley. In the case that we find any abnormalities or insecurities we will notify you immediately.</h6>
                          </div>
                          <div className="col-md-6">
                            <div className="button-major-padding">
                             <div className="d-flex justify-content-center">
                             <button className="button-white" onClick={() => {
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
        if (projectapi === true) {
           return (
               <div>
                  <div className="project-component">
                     <div className="container">
                      <h4>Project API's</h4>
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