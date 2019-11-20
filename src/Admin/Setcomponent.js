import React, {useState} from 'react';

const SetComponent = () => {
    const [componentname, setComponentName] = useState({
        componentname: ''
    })
    const [componentDescription, setComponentDescription] = useState({
        componentDescription: ''
    })
    const [componentTags, setComponentTags] = useState({
        componentTags: []
    })
    const [currentclassModel, setCurrentClassModel] = useState({
        currentclassModel: 'text-model'
    })
    const [model, setComponentModel] = useState({
        model: ''
    })
    const [installation, setInstallation] = useState({
        installation: []
    })
    const [subcomponent, setSubComponent] = useState({
        subcomponent: "EMPTY"
    })
    const [componenttype, setComponentType] = useState({
        componenttype: "FRONTEND"
    })

    const ShowInstallTitle = () => {
        if (installation.installation.length > 0) {
            return (
                <div>
                    <h4>INSTALL</h4>
                </div>
            )
        } else {
            return null;
        }
    }

    const TypeFrontEnd = () => {
        if (componenttype.componenttype === "FRONTEND") {
          return (
              <div>
                  <select className="input-bar" onChange={(e) => {
                      setSubComponent({
                          subcomponent: e.target.value
                      })
                  }}> 
                      <option value="EMPTY">Pick a languange</option>
                      <option value="REACT">React Component</option>
                      <option value="VANILLAJS">Vanilla Javascript</option>
                  </select>
              </div>
          )
        } else if (componenttype.componenttype === "BACKEND") {
            return (
                <div>
                <select className="input-bar" onChange={(e) => {
                      setSubComponent({
                          subcomponent: e.target.value
                      })
                  }}>
                    <option value="EMPTY">Pick a languange</option>
                    <option value="NODEJS">Node.js</option>
                    <option value="PYTHON">Python</option>
                    <option value="JAVA">Java</option>
                    <option value="GO">Go</option>
                    <option value="SWIFT">Swift</option>
                </select>
                </div>
            )
        } else if (componenttype.componenttype === "FRONTCOMPLIANCE") {
            return (
                <div>
                 <select className="input-bar" onChange={(e) => {
                      setSubComponent({
                          subcomponent: e.target.value
                      })
                  }}>
                     <option value="EMPTY">Pick a languange</option>
                     <option value="REACTJS">React JS</option>
                 </select>
                </div>
            )
        } else {
            return null;
        }
    }


    return (
        <div>
            <div className="admin-page">
             <div className="container">
             <h3>SET COMPONENT</h3>
              <div className="row">
                <div className="col-md-6">
                <div className="input-container">
                <input type="text" className="input-bar" placeholder="Component Name" onChange={(e) => {
                        setComponentName({
                            componentname: e.target.value
                        })
                    }} />
                </div>
                <div className="input-container">
                <select  className="input-bar" onChange={(e) => {
                        setComponentType({
                            componenttype: e.target.value
                        })
                        setSubComponent({
                            subcomponent: ""
                        })
                    }}>
                 <option value="FRONTEND">FRONT END</option>
                 <option value="BACKEND">BACK END</option>
                 <option value="FRONTCOMPLIANCE">FRONT COMPLIANCE</option>
                </select>
                </div>
                <div className="input-container">
                 <TypeFrontEnd/>
                </div>
                <div className="input-container">
                    <textarea type="text" className="input-bar" placeholder="Component Description" onChange={(e) => {
                        setComponentDescription({
                            componentDescription: e.target.value
                        })
                    }} />
                </div>
                <div className="input-container">
                <input type="text" className="input-bar" placeholder="Component Tags" onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                    componentTags.componentTags.push(e.target.value);
                    setComponentTags({
                        componentTags: componentTags.componentTags
                    })
                    e.target.value = ""
                    }
                }} />
                </div>
                <div className="input-container">
                <textarea type="text" className="text-area-input" placeholder="Component Model" onChange={(e) => {
                    setComponentModel({
                        model: e.target.value
                    })
                }} />
                </div>
                <div className="input-container">
                <div className="row">
                    <div className="col-md-6">
                    <div className="input-container">
                    <select className="input-bar" placeholder="Component class" onChange={(e) => {
                        setCurrentClassModel({
                            currentclassModel: e.target.value
                        })
                    }}>
                    <option value="code-model">Code</option>
                    <option value="text-model">Text</option>
                    </select>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <input type="text" className="input-bar" placeholder="Component Installation" onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            const modelinstallation = {
                                className: currentclassModel.currentclassModel,
                                text: e.target.value
                            }
                            installation.installation.push(modelinstallation);
                            setInstallation({
                                installation: installation.installation
                            })

                            e.target.value = ""
                        }
                    }} />
                    </div>
                 </div>
                </div>
                <div className="button-padding">
                    <button className="button-purple" onClick={() => {
                        const data = {
                            componentname: componentname.componentname,
                            componenttype: componenttype.componenttype,
                            componenttags: componentTags.componentTags,
                            description: componentDescription.componentDescription,
                            model: model.model,
                            install: installation.installation,
                            subcomponent: subcomponent.subcomponent
                        }
                        
                        console.log(data);

                        
                        fetch('/adminapi/setcomponent' , {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }, 
                            body: JSON.stringify(data)
                        }).then(() => {
                            console.log('this worked')
                        }).catch((error) => {
                            console.log(error);
                        })
                        
                    }}>SUBMIT COMPONENT</button>
                 </div>
                </div>
                <div className="col-md-6">
                 <h3>{componentname.componentname}</h3>
                 <div className="row">
                 {
                     componentTags.componentTags.map((item) => (
                         <div key={componentTags.componentTags.indexOf(item)}>
                             <div className="tag-padding">
                             <h6 className="tag d-inline-flex p-2">{item}</h6>
                             </div>
                         </div>
                     ))
                 }
                 </div>
                 <div className="text-padding">
                    <h6>{componentDescription.componentDescription}</h6>
                 </div>
                 <div className="code-container">
                  <pre>
                      {model.model}
                  </pre>
                 </div>
                 <ShowInstallTitle/>
                 <div className="title-padding">
                    {
                        installation.installation.map((item) => (
                            <div key={installation.installation.indexOf(item)}>
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
}

export default SetComponent;