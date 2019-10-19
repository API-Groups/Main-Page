import React, {useState, useEffect} from 'react';
import Search from '../../Functions/Search';

const ApiPage = ({apipage}) => {
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
        currentJSON: frontend.frontend
    })

    useEffect(() => {
     fetch('/api/project/getfrontend')
     .then((res) => {
         return res.json();
     }).then((body) => {
        setFrontEnd({
            frontend: body
        })
     }).catch((error) => {
         console.log(error)
     })

     fetch('/api/project/getbackend')
     .then((res) => {
         return res.json();
     }).then((body) => {
        setBackEnd({
            backend: body
        })
     }).catch((error) => {
         console.log(error)
     })

     fetch('/api/project/getfrontcompliance')
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
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="input-container">
                        <select className="input-bar">
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