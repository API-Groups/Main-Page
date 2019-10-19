import React, {useState, useEffect} from 'react';
import Search from '../Functions/Search'

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

const FrontEndPage = ({frontendpage}, props) => {
    const [searchOptions, setSearchOptions] = useState({
        searchOptions: []
    })
    const [currentComponent, setCurrentComponent] = useState({
        currentComponent: []
    })
    const [modalComponent, setModalComponent] = useState({
        modalComponent: false
    })
    useEffect(() => {
      fetch('/api/frontend/searchcomponents')
      .then((res => {
          return res.json();
      })).then((body) => {
         setSearchOptions({
             searchOptions: body
         })
      }).catch((error) => {
          console.log(error);
      })
    }, [])

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
                          <h4>{currentComponent.currentComponent.name}</h4>
                          <div className="row">
                          {
                              currentComponent.currentComponent.tags.map((item) => (
                                 <div key={currentComponent.currentComponent.tags.indexOf(item)}>
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
                                currentComponent.currentComponent.installation.map((item) => (
                                    <div key={currentComponent.currentComponent.installation.indexOf(item)}>
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
                  output={["name" , "description"]}
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
        const [usersadded, setUsersAdded] = useState({
            usersadded: []
        })

        useEffect(() => {
            fetch("/api/project/getusers")
            .then((res) => {
                return res.json();
            }).then((body) => {
                setGetUsers({
                    users: body
                })
            }).catch((error) => {
                console.log(error);
            })
        } , [])
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
                      output={["username" , "fullname"]}
                      variable={users.users}
                      placeholder="People you want to add"
                      longRender={true}
                      callback={(item) => {
                         usersadded.usersadded.push(item.useruid)
                        setUsersAdded({
                            usersadded: usersadded.usersadded
                        })
                      }}
                      />
                      <div className="button-padding">
                        <button className="button-purple" onClick={() => {
                            const data = {
                                projectname: projectname.projectname,
                                projectdescription: projectdescription.projectdescription,
                                usersadded: usersadded.usersadded
                            }

                            console.log(data)
                            console.log(usersadded.usersadded)
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
                 </div>
                 <h4>PROJECTS</h4>
             </div>
              <div className="projects-homepage">
                <h6>Allow your projects to get the best services so that your users are given the best experience that your project has to offer.</h6>
                <div className="title-padding">
                 <h3>YOUR PROJECTS</h3>
                </div>
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

    return (
        <div>
          <div className="dash-navigation">
            <div className="container">
             <h3 className="text-center">JAFFER</h3>
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
}

export default Dash;