import React, {useState, useEffect, useRef} from 'react';
import Search from '../../Functions/Search';
import {NavLink} from 'react-router-dom';
import LoadingComponent from '../../Functions/LoadingComp'
import axios from 'axios'
const ProjectAnalytics = ({projectanalytics, api}) => {
    const [datamodel, setDataModel] = useState({
        datamodel: false
    })
    const [projectusers, setProjectUsers] = useState({
        projectusers: []
    })
    const [models, setModels] = useState({
        models: []
    })
    const [modelShow, setModelShow] = useState({
        modelShow: false
    })
    const [loading, setLoading] = useState({
        loading: true
    })

    const componentMounted = useRef(false);

    useEffect(() => {
      componentMounted.current = true;
      if (projectanalytics === true) {
        setTimeout(() => {
          if (componentMounted.current) {
            axios.get('https://jpi-backend.herokuapp.com/api/project/getprojectusers/' + api)
            .then((body) => {
                setProjectUsers({
                    projectusers: body.data
                })
            }).catch((error) => {
                console.log(error);
            })
      
            axios.get('https://jpi-backend.herokuapp.com/projectanalytics/getmodels/' + api)
            .then((body) => {
                setModels({
                    models: body.data
                })
                setLoading({
                    loading: false
                })
                setModelShow({
                    modelShow: true
                })
            }).catch((error) => {
                console.log(error);
            })
          }
        }, 1000);
      }
      return () => {
          componentMounted.current = false
        }
    }, [api, projectanalytics])

    console.log(loading.loading)

    const CreateDataModel = ({dataform}) => {
        const [modelname, setModelName] = useState({
            modelname: ''
        })
        const [modeldescription, setModelDescription] = useState({
            modeldescription: ''
        })
        const [dataviewers, setDataViewers] = useState({
            dataviewers: []
        })
        const [datadevs , setDataDevs] = useState({
            datadevs: []
        })
        const [datatype, setDataType] = useState({
            datatype: "table"
        })
        if (dataform === true) {
            return (
                <div>
                 <div className="modal-page">
                  <div className="container">
                   <div className="modal-padding">
                    <div className="modal-box">
                    <span className="closebtndark" onClick={() => {
                        setDataModel({
                            datamodel: false
                        })
                    }}>&times;</span>
                    <h4>CREATE DATA MODEL</h4>
                    <div className="input-container">
                     <input type="text" className="input-bar" placeholder="Model Name" onChange={(e) => {
                         setModelName({
                             modelname: e.target.value
                         })
                     }}/>
                    </div>
                    <div className="input-container">
                     <textarea className="text-area-input" placeholder="Model Description" onChange={(e) => {
                         setModelDescription({
                             modeldescription: e.target.value
                         })
                     }} />
                    </div>
                    <div className="input-container">
                    <Search 
                    inputstyle="input-bar"
                    renderstyle="render-card"
                    output={["username" , "fullname"]}
                    placeholder="Add data scienctist to view this data"
                    longRender={false}
                    variable={projectusers.projectusers}
                    callback={(item) => {
                        dataviewers.dataviewers.push(item.userid);
                        setDataViewers({
                            dataviewers: dataviewers.dataviewers
                        })
                    }}
                    />
                    </div>
                    <div className="input-container">
                    <Search
                    inputstyle="input-bar"
                    renderstyle="render-card"
                    output={["username" , "fullname"]}
                    placeholder="Add developers to this data"
                    longRender={false}
                    variable={projectusers.projectusers}
                    callback={(item) => {
                        datadevs.datadevs.push(item.userid);
                        setDataDevs({
                            datadevs: datadevs.datadevs
                        })
                    }}
                    />
                    </div>
                    <div className="input-container">
                     <select className="input-bar" onChange={(e) => {
                         setDataType({
                            datatype: e.target.value
                         })
                     }}>
                        <option value="table">TABLE</option>
                        <option value="pie">PIE GRAPHS</option>
                        <option value="bar">BAR GRAPHS</option>
                        <option value="line">LINE GRAPHS</option>
                     </select>
                    </div>
                    <div className="button-padding">
                     <button className="button-white" onClick={() => {
                         const data = {
                             modelname: modelname.modelname,
                             modeldescription: modeldescription.modeldescription,
                             dataviewers: dataviewers.dataviewers,
                             datadevs: datadevs.datadevs,
                             datatype: datatype.datatype
                         }

                         axios.post('https://jpi-backend.herokuapp.com/api/project/createmodel/' + api, data,{
                             headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                             },
                         }).then((body) => {
                             models.models.push(body.data);
                             setModels({
                                 models: models.models
                             })
                             setDataModel({
                                 datamodel: false
                             })
                         }).catch((error) =>{ 
                             console.log(error);
                         })
                     }}>CREATE MODEL</button>
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

    console.log(models.models)

    const ModelCards = ({modelcards}) => {
        const [currentModelCard, setModelCard] = useState({
            currentModelCard: false
        })
        const [currentModelItem, setCurrentModelItem] = useState({
            currentModelItem: {}
        })

        const CurrentModelCard = ({currentmodelcard, item}) => {
            const [itemName, setItemName] = useState({
                itemname: ""
            })
            const [itemDescription, setItemDescription] = useState({
                itemDescription: ""
            })
            const NullItem = () => {
                return item.modeldescription === null ? "There is no current description. Write one !" : item.modeldescription
            }
            if (currentmodelcard === true) {
                return (
                    <div>
                     <div className="modal-page">
                      <div className="container">
                        <div className="modal-padding">
                         <div className="modal-box">
                          <span className="closebtndark" onClick={() => {
                              setModelCard({
                                  currentModelCard: false
                              })
                          }}>&times;</span>
                         <h3>{item.modelname}</h3>
                         <div className="input-container">
                          <input type="text" className="input-bar" placeholder={item.modelname} onChange={(e) => {
                              setItemName({
                                  itemname: e.target.value
                              })
                          }} />
                         </div>
                         <div className="input-container">
                          <input type="text" className="input-bar" placeholder={NullItem()} onChange={(e) => {
                              setItemDescription({
                                  itemDescription: e.target.value
                              })
                          }} />
                         </div>
                         <div className="button-padding">
                          <button className="button-purple" onClick={() => {
                              const data = {title: itemName.itemname, description: itemDescription.itemDescription}
                              axios.post('https://jpi-backend.herokuapp.com/projectanalytics/setModelName/' + api + '/' + item.modelapi , data,{
                                headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                                },
                              }).then((body) => {
                                  let currentIndex = null
                                  for (const item of models.models) {
                                      if (item.modelapi === body.data.modelapi) {
                                          currentIndex = models.models.indexOf(item);
                                      }
                                  }
                                  if (~currentIndex) {
                                      models.models[currentIndex] = body.data
                                  }

                                  setModels({
                                      models: models.models
                                  })
                                  setCurrentModelItem({
                                      currentModelItem: false
                                  })
                              }).catch((error) => {
                                  console.log(error);
                              })
                          }}>EDIT</button>
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

        if (modelcards === true) {
            if (models.models.length === 0) {
                return (
                    <div>
                     <div className="empty-padding">
                     <div className="empty-model-container">
                      <h2>You have No Models right now</h2>
                      <div className="button-padding">
                        <button className="button-all-white" onClick={() => {
                            setDataModel({
                                datamodel: true
                            })
                        }}>CREATE MODEL</button>
                      </div>
                     </div>
                     </div>
                    </div>
                )
            } else {
                return (
                    <div>
                     <div className="row">
                        {
                            models.models.map((item) => (
                                <div key={models.models.indexOf(item)}>
                                 <div className="card-spacing">
                                  <div className="model-edit-container">
                                   <div className="float-right">
                                    <button className="button-all-white" onClick={() => {
                                         setModelCard({
                                             currentModelCard: true
                                         })
                                         setCurrentModelItem({
                                             currentModelItem: item
                                         })
                                     }} >Edit</button>
                                   </div>
                                  </div>
                                  <NavLink to={item.redirectapi} className="navlink">
                                  <div className={"model-card " + item.modeltype}>
                                    <h6 className="color-white">{item.modeltype}</h6>
                                    <h4 className="text-center color-white">{item.modelname}</h4>
                                  </div>
                                  </NavLink>
                                 </div>
                                 <CurrentModelCard currentmodelcard={currentModelCard.currentModelCard} item={currentModelItem.currentModelItem} />
                                </div>
                            ))
                        }
                     </div>
                    </div>
                )
            }
        } else {
            return null;
        }
    }

    if (projectanalytics === true) {
        return (
            <div>
                <div className="non-nav-page">
                 <div className="analyticspage">
                  <div className="float-right">
                    <div className="button-padding">
                    <button className="button-purple" onClick={() => {
                        setDataModel({
                            datamodel: true
                        })
                    }}>CREATE DATA MODEL</button>
                    </div>
                  </div>
                  <h3>PROJECT ANALYTICS</h3>
                  <div className="input-container">
                     <ModelCards modelcards={modelShow.modelShow}/>
                     <LoadingComponent loadingComponent={loading.loading} />
                  </div>
                 </div>
                </div>
                <CreateDataModel dataform={datamodel.datamodel} /> 
                
            </div>
        )
    } else {
        return null;
    }
}

export default ProjectAnalytics;