import React, {useState, useEffect,useRef} from 'react';
import Search from '../Functions/Search'
import {JPIAuth} from '../Authentication/Auth';
import LoadingPage from '../Functions/Loadingpage';
import {NavLink} from 'react-router-dom';

const FrontCompliance = ({frontcompliance}) => {
    if (frontcompliance === true) {
        return (
            <div>
             <div className="non-nav-page">
                <div className="frontcompliance-page-title">
                    <h2>FRONT COMPONENT COMPLIANCE</h2>
                </div>
                <div className="page-content">
                 <h3>Front Component Compliance</h3>
                </div>
             </div>
            </div>
        )
    } else {
        return null;
    }
}

const BackEndPage = ({backendpage}) => {
    if (backendpage === true) {
        return (
             <div className="non-nav-page">
                 <div className="backend-page-title">
                  <h2>BACK END</h2>
                 </div>
                 <div className="page-content">
                  <h3>Back End API's</h3>
                 </div>
              </div>
        )
    } else {
        return null;
    }
}

const FrontEndPage = ({frontendpage}) => {
    const [searchOptions, setSearchOptions] = useState({
        searchOptions: []
    })
    const [currentComponent, setCurrentComponent] = useState({
        currentComponent: []
    })
    const [modalComponent, setModalComponent] = useState({
        modalComponent: false
    })

    const componentDidMount = useRef(false);
    
    useEffect(() => {
    componentDidMount.current = true;
    if (frontendpage === true) {
        if (componentDidMount.current) {
            fetch('/api/frontend/getcomponents')
            .then((res) => {
                return res.json();
            }).then((body) => {
                setSearchOptions({
                    searchOptions: body
                })
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return () => {componentDidMount.current = false}
    }, [currentComponent.currentComponent , frontendpage])
    

    const ModalCurrentComponent = ({modalcomponent}) => {
        if (modalcomponent === true) {
            return (
                <div>
                    <div className="modal-page">
                     <div className="container">
                      <div className="modal-padding">
                        <div className="modal-box">
                          <span className="closebtndark" onClick={() => {
                              setModalComponent({
                                  modalComponent: false
                              })
                          }}>&times;</span>
                          <h4>{currentComponent.currentComponent.componentname}</h4>
                          <div className="row">
                          {
                              currentComponent.currentComponent.componenttags.map((item) => (
                                 <div key={currentComponent.currentComponent.componenttags.indexOf(item)}>
                                    <div className="tag-padding">
                                        <h6 className="tag d-inline-flex p-2">{item}</h6>
                                    </div>
                                 </div>
                              ))
                          }
                          </div>
                          <div className="text-padding">
                            <h5>{currentComponent.currentComponent.description}</h5>
                          </div>
                          <div className="code-padding-container">
                            <div className="code-container">
                              <pre>
                                  {currentComponent.currentComponent.model}
                              </pre>
                            </div>
                          </div>
                          <div className="text-padding">
                            {
                                currentComponent.currentComponent.install.map((item) => (
                                    <div key={currentComponent.currentComponent.install.indexOf(item)}>
                                       <div className={item.className}>
                                         <h5>{item.text}</h5>
                                       </div> 
                                    </div>
                                ))
                            }
                          </div>
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

    if (frontendpage === true) {
        return (
            <div>
              <div className="non-nav-page">
                 <div className="frontend-page-title">
                  <h3>FRONT END</h3>
                  <h6>Front End Functions and components that help you develop a better interface with much cleaner run time. All Front end functions are free.</h6>
                 </div>
                 <div className="page-content">
                  <h3>Front End API's</h3>
                  <Search
                  inputstyle="input-bar"
                  renderstyle="render-card"
                  output={["componentname" , "description"]}
                  variable={searchOptions.searchOptions}
                  placeholder="Search for a React Component"
                  longRender={true}
                  callback={(item) => {
                   setCurrentComponent({
                       currentComponent: item
                   })
                   setModalComponent({
                       modalComponent: true
                   })
                  }}
                  />
                 </div>
                </div>
                <ModalCurrentComponent modalcomponent={modalComponent.modalComponent} />
            </div>
        )
    } else {
        return null;
    }
}

const Projects = ({projectcomponent}) => {
    const [createmodal, setCreateModal] = useState({
        createmodal: false
    })
    const [projects, setProjects] = useState({
        projects: []
    })

    const componentDidMount = useRef(false);
    
    useEffect(() => {
     componentDidMount.current = true;
     if (projectcomponent === true) {
       setTimeout(() => {
        if (componentDidMount.current) {
            if (JPIAuth.currentUser.userid !== undefined) {
            fetch('/api/dash/getprojects/' + JPIAuth.currentUser.userid)
            .then((res) => {
                return res.json();
            }).then((body) => {
                console.log(body);
                setProjects({
                    projects: body
                })
            }).catch((error) => {
                console.log(error);
            })
          }
       }
       }, 500);
     }
     return () => {
         componentDidMount.current = false
        }
    }, [projectcomponent])


    const ProjectCards = () => {
        if (projects.projects !== 0) {
            return (
                <div>
                 <div className="row">
                 {
                     projects.projects.map((item) => (
                        <div key={projects.projects.indexOf(item)}>
                         <div className="card-spacing">
                          <NavLink className="nav-card" to={"/project/" + item.projectapi}>
                          <div className="project-card">
                           <h4 className="text-center">{item.projectname}</h4>
                          </div>
                          </NavLink>
                         </div>
                        </div>
                     ))
                 }
                 </div>
                </div>
            )
        } else {
            return (
                <div>
                 <div className="title-padding">
                  <h2 className="text-center">YOU ARE NOT APART OF ANY GROUPS</h2>
                 </div>
                </div>
            )
        }
    }


    const CreatModal = ({createmodal}) => {
        const [users, setGetUsers] = useState({
            users: []
        })
        const [projectname, setProjectName] = useState({
            projectname: ''
        })
        const [projectdescription, setProjectDescription] = useState({
            projectdescription: ''
        })
        const [requestedusers, setRequestedUsers] = useState({
            requestedusers: []
        })
       
        const subComponentDidMount = useRef(null);
        useEffect(() => {
        subComponentDidMount.current = true;
        if (createmodal === true) {
            if (subComponentDidMount.current) {
                setTimeout(() => {
                fetch('/api/dash/getusers')
                .then((res) => {
                    return res.json();
                }).then((body) => {
                    setGetUsers({
                      users: body
                    })
                }).catch((error) => {
                    console.log(error)
                })
                }, 500);
            }
        }

        return () => {subComponentDidMount.current = false}
        } , [createmodal])
       
        if (createmodal === true) {
            return (
                <div>
                 <div className="modal-page">
                  <div className="container">
                    <div className="modal-padding">
                     <div className="modal-box">
                      <span className="closebtndark" onClick={() => {
                          setCreateModal({
                              createmodal: false
                          })
                      }}>&times;</span>
                      <h3>CREATE PROJECT</h3>
                      <div className="input-container">
                        <input type="text" className="input-bar" placeholder="Project Name" onChange={(e) => {
                            setProjectName({
                                projectname: e.target.value
                            })
                        }} />
                      </div>
                      <div className="input-container">
                        <textarea type="text" className="text-area-input" placeholder="Project Description" onChange={(e) => {
                            setProjectDescription({
                                projectdescription: e.target.value
                            })
                        }} />
                      </div>
                      <Search
                      inputstyle="input-bar"
                      renderstyle="user-search-container"
                      output={["username" , "fullname", "firstname"]}
                      variable={users.users}
                      placeholder="People you want to add"
                      longRender={true}
                      callback={(item) => {
                        requestedusers.requestedusers.push(item.userid)
                        setRequestedUsers({
                            requestedusers: requestedusers.requestedusers
                        })
                      }}
                      />
                      <div className="button-padding">
                        <button className="button-purple" onClick={() => {
                            const data = {
                                projectname: projectname.projectname,
                                projectdescription: projectdescription.projectdescription,
                                requestedusers: requestedusers.requestedusers,
                            }

                            fetch('/api/dash/createproject/' + JPIAuth.currentUser.userid, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            }).then((res) => {
                                return res.json();
                            }).then((body) => {
                                console.log(body);
                                projects.projects.push(body);
                                setProjects({
                                    projects: projects.projects
                                })
                                setCreateModal({
                                    createmodal: false
                                })
                            }).catch((error) => {
                                console.log(error);
                            })
                        }} >CREATE PROJECT</button>
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

    if (projectcomponent === true) {
        return (
            <div>
             <div className="non-nav-page">
             <div className="project-homepage-title">
                 <div className="float-right">
                  <button className="button-purple" onClick={() => {
                      setCreateModal({
                          createmodal: true
                      })
                  }}>CREATE PROJECT</button>
                  <div className="button-padding">
                  <button className="button-white">PENDING PROJECTS</button>
                  </div>
                 </div>
                 <h4>PROJECTS</h4>
             </div>
              <div className="projects-homepage">
                <h6>Allow your projects to get the best services so that your users are given the best experience that your project has to offer.</h6>
                <div className="title-padding">
                 <h3>YOUR PROJECTS</h3>
                </div>
                <ProjectCards/>
              </div>
             </div>
             <CreatModal createmodal={createmodal.createmodal} />
            </div>
        )
    } else {
        return null;
    }
}

const Dash = () => {
    const [frontend, setFrontEnd] = useState({
        frontend: false
    })
    const [backend, setBackEnd] = useState({
        backend: false
    })
    const [frontcompliance, setFrontCompliance] = useState({
        frontcompliance: false
    })
    const [project, setProjects] = useState({
        project: true 
    })
    const [dashpage, setDashPage] = useState({
        dashpage: false
    })
    const [loading, setLoadingPage] = useState({
        loading: false
    })


    useEffect(() => {
        setLoadingPage({
            loading: true
        })
        setTimeout(() => {
            setLoadingPage({
                loading: false
            })
            setDashPage({
                dashpage: true
            })
        }, 1000);
    } , [])


    const DashPage = ({dashpage}) => {
     if (dashpage === true) {
        return (
            <div>
              <div className="dash-navbar">
               <div className="float-right">
                <button className="button-white" onClick={() => {
                    JPIAuth.logout();
                }}>LOGOUT</button>
               </div>
               <h5>{JPIAuth.currentUser.username}</h5>
              </div>
              <div className="dash-navigation">
                <div className="container">
                 <div className="dash-comp-container">
                  <h6 onClick={() => {
                      setProjects({
                          project: true
                      })
                      setFrontEnd({
                          frontend: false
                      })
                      setBackEnd({
                          backend: false
                      })
                      setFrontCompliance({
                          frontcompliance: false
                      })
                  }}>PROJECTS</h6>
                 </div>
                 <div className="dash-comp-container">
                  <h6 onClick={() => {
                      setProjects({
                        project: false
                    })
                      setFrontEnd({
                          frontend: true
                      })
                      setBackEnd({
                          backend: false
                      })
                      setFrontCompliance({
                          frontcompliance: false
                      })
                  }}>FRONT END</h6>
                 </div>
                 <div className="dash-comp-container">
                  <h6 onClick={() => {
                      setProjects({
                        project: false
                    })
                    setFrontEnd({
                        frontend: false
                    })
                    setBackEnd({
                        backend: true
                    })
                    setFrontCompliance({
                        frontcompliance: false
                    })
                  }}>BACK END</h6>
                 </div>
                 <div className="dash-comp-container">
                  <h6 onClick={() => {
                      setProjects({
                        project: false
                    })
                      setFrontEnd({
                        frontend: false
                    })
                    setBackEnd({
                        backend: false
                    })
                    setFrontCompliance({
                        frontcompliance: true
                    })
                  }}>FRONT COMPLIANCE</h6>
                 </div>
                </div>
              </div>
              <FrontEndPage frontendpage={frontend.frontend} />
              <BackEndPage backendpage={backend.backend} />
              <FrontCompliance frontcompliance={frontcompliance.frontcompliance} />
              <Projects projectcomponent={project.project} />
            </div>
        )
     } else {
         return null;
     }
    }


    return (
        <div>
         <DashPage dashpage={dashpage.dashpage} />
         <LoadingPage loadingpage={loading.loading} />
        </div>
    )
}

export default Dash;