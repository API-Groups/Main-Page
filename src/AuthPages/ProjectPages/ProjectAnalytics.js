import React, {useState, useEffect} from 'react';
import Search from '../../Functions/Search';
import {NavLink} from 'react-router-dom';
//import JPID from '../../Test/testdata';

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
    

    useEffect(() => {
      fetch('/api/project/getprojectusers/' + api)
      .then((res) => {
          return res.json();
      }).then((body) => {
          setProjectUsers({
              projectusers: body
          })
      }).catch((error) => {
          console.log(error);
      })

      fetch('/projectanalytics/getmodels/' + api)
      .then((res) => {
          return res.json();
      }).then((body) => {
          console.log(body);
          setModels({
              models: body
          })
      }).catch((error) => {
          console.log(error);
      })

    }, [api])

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
                             modeldescription: modeldescription.modeldescriptionm,
                             dataviewers: dataviewers.dataviewers,
                             datadevs: datadevs.datadevs,
                             datatype: datatype.datatype
                         }

                         fetch('/api/project/createmodel/' + api, {
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

    const ModelCards = () => {
        return (
            <div>
             <div className="row">
                {
                    models.models.map((item) => (
                        <div key={models.models.indexOf(item)}>
                         <div className="card-spacing">
                          <NavLink to={item.redirectapi} className="navlink" >
                          <div className={"model-card " + item.modeltype}>
                            <h6>{item.modeltype}</h6>
                            <h4 className="text-center">{item.modelname}</h4>
                          </div>
                          </NavLink>
                         </div>
                        </div>
                    ))
                }
             </div>
            </div>
        )
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
                     <ModelCards/>
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