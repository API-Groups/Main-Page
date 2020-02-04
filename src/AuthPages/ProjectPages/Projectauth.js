import React, {useState, useEffect} from 'react';
import generateId from '../../Functions/Miscfuncs';

const Projectauth = ({projectauth , projectapi}) => {
    const [addUserModal, setAddUsersModal] = useState({
        addUserModal: false
    })
    const [users, setUsers] = useState({
        users: []
    })
    const [data, setData] = useState({
        data: {}
    })
    const [trackingData, setTrackingData] = useState({
        trackingData: []
    })
    const [usersModal, setUsersModal] = useState({
        usersmodal: false
    })
    const [currentusers, setCurrentUser] = useState({
        currentusers: {}
    })
    
    useEffect(() => {
     setTimeout(() => {
        fetch('/projectauth/getprojectauthcreds/' + projectapi)
        .then((res) => {
            return res.json()
        }).then((body) => {
            setData({
                data: body
            })
            setTrackingData({
                trackingData: body.trackinglabels
            })
            const userall = [];
            for (let i = 0; i < body.users.length; i++) {
                body.users[i].response["userid"] = body.users[i].useruid
                userall.push(body.users[i].response)
            }
            setUsers({
                users: userall
            })
        }).catch((error) => {
            console.log(error);
        })
     }, 500);
    }, [projectapi])


    const NullifiedData = (current) => {
        if (current === null) {
            return "null"
        } else {
            return current
        }
    }
    const MinimizeText = (text , int) => {
     if (text.length > int) {
         return text.substring(0, int + 1) + '...'
     } else {
         return text
     }
    }
    const StringifyBoolean = (text) => {
        if (typeof text === "boolean") {
            return text.toString()
        } else {
            return text
        }
    }

    const UsersModal = ({usersmodal , item}) => {
        const [editemail, setEditEmail] = useState({
            editemail: ''
        })
        const [editfirstname, setEditFirstname] = useState({
            editfirstname: ''
        })
        const [editlastname, setEditLastName] = useState({
            editlastname: ''
        })
        const [editusername, setEditUserName] = useState({
            editusername: ''
        })
        const [editusertoken, setEditUserToken] = useState({
            editusertoken: ''
        })
        let mapJson  ={}
        if (usersmodal === true) {
            return (
                <div>
                 <div className="modal-page">
                  <div className="container">
                   <div className="modal-padding">
                    <div className="modal-box">
                     <span className="closebtndark" onClick={() => {
                         setUsersModal({
                             usersmodal: false
                         })
                     }}>&times;</span>
                     <h4>CURRENT USER</h4>
                     <div className="text-padding">
                    <h6>{"User id: " + item.userid}</h6>
                     </div>
                     <div className="input-container">
                     <table>
                       <tbody>
                       <tr className="table-data-headers">
                        {
                            data.data.labels.map((index) => (
                            <th className="table-header" key={data.data.labels.indexOf(index)}>{index}</th>
                            ))
                        }
                     </tr>
                     <tr className="table-row">
                        {
                            data.data.labels.map((current) => (
                                <td className="table-item" key={data.data.labels.indexOf(current)}>{StringifyBoolean(MinimizeText(NullifiedData(item)[current] , 7))}</td>
                            ))
                        }
                     </tr>
                     </tbody>  
                     </table>
                     <div className="row">
                     <div className="spacing-container">
                        <div className="input-container">
                          <input type="text" className="input-bar" placeholder="Email" onChange={(e) => {
                             setEditEmail({
                                 editemail: e.target.value
                             })
                          }} />
                        </div>
                     </div>
                     <div className="spacing-container">
                      <div className="input-container">
                          <input type="text" className="input-bar" placeholder="First Name" onChange={(e) => {
                             setEditFirstname({
                                 editfirstname: e.target.value
                             })
                          }} />
                        </div>
                     </div>
                     <div className="spacing-container ">
                        <div className="input-container">
                          <input type="text" className="input-bar" placeholder="Last Name" onChange={(e) => {
                            setEditLastName({
                                editlastname: e.target.value
                            })
                          }} />
                        </div>
                     </div>
                     <div className="spacing-container">
                        <div className="input-container">
                          <input type="text" className="input-bar" placeholder="Username" onChange={(e) => {
                            setEditUserName({
                                editusername: e.target.value
                            })
                          }} />
                        </div>
                     </div>
                     <div className="spacing-container">
                        <div className="input-container">
                          <input type="text" className="input-bar" placeholder="Usertoken" onChange={(e) => {
                            setEditUserToken({
                                editusertoken: e.target.value
                            })
                          }} />
                        </div>
                     </div>
                      {
                          trackingData.trackingData.map((item) => (
                              <div key={generateId(50)}>
                                <div className="spacing-container">
                                <div className="input-container">
                                 <input type="text" className="input-bar" placeholder={item} onChange={(e) => {
                                     mapJson[item] = e.target.value
                                 }} />
                                </div>
                                </div>
                              </div>
                          ))
                      }
                     </div>
                     <div className="button-padding">
                      <button className="button-purple" onClick={() => {
                         let visuals = {};
                         let key;
                         const regData = {
                            email: editemail.editemail,
                            firstname: editfirstname.editfirstname,
                            lastname: editlastname.editlastname,
                            username: editusername.editusername,
                            usertoken: editusertoken.editusertoken
                         }
                         for (key in mapJson) {
                             if (mapJson.hasOwnProperty(key)) {
                                 visuals[key] = mapJson[key]
                             }
                         }

                         for (key in regData) {
                             if (regData.hasOwnProperty(key)) {
                                 visuals[key] = regData[key]
                             }
                         }

                         const data = {
                             email: editemail.editemail,
                             firstname: editfirstname.editfirstname,
                             lastname: editlastname.editlastname,
                             username: editusername.editusername,
                             usertoken: editusertoken.editusertoken,
                             mapJson: mapJson,
                             visuals: visuals
                         }

                         fetch('/projectauth/edituserinproject/' + projectapi + '/' + item.userid, {
                             method: 'POST',
                             headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                             },
                             body: JSON.stringify(data)
                         }).then((res) => {
                             return res.json();
                         }).then((body) => {
                             body.response["userid"] = body.useruid;
                             let checker = null;
                             for (const item of users.users) {
                                 if (item.userid === body.useruid) {
                                    checker = users.users.indexOf(item)
                                 }
                             }
                             if (~checker) {
                                 users.users[checker] = body.response
                             }

                             setUsers({
                                 users: users.users
                             })
                             setUsersModal({
                                 usersmodal: false
                             })
                         }).catch((error) => {
                             console.log(error);
                         })

                      }}>Edit Changes</button>
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
    
    const AddUsersModal = ({addUserModal}) => {
        const [firstname, setFirstName] = useState({
            firstname: ''
        })
        const [lastname, setLastName] = useState({
            lastname: ''
        })
        const [email, setEmail] = useState({
            email: ''
        })
        const [username ,setUsername] = useState({
            username: ''
        })
        const [password , setPassword] = useState({
            password: ''
        })
        const [authmethod, setAuthMethod] = useState({
            authmethod: "Email and Password"
        })
        const [usertoken, setUserToken] = useState({
            usertoken: ''
        })

        const AuthMethod = () => {
            if (data.data.authmethod === "") {
                return (
                    <div>
                      <div className="input-contianer">
                       <select className="input-bar" onChange={(e) => {
                        setAuthMethod({
                            authmethod: e.target.value
                        })
                       }}>
                         <option value="Email and Password">Email and Password</option>
                         <option value="Username and Password">Username and Password</option>
                       </select>
                      </div>
                    </div>
                )
            } else {
                return null;
            }
        }

        let mapJson = {}
        if (addUserModal === true) {
            return (
                <div>
                  <div className="modal-page">
                   <div className="container">
                    <div className="modal-padding">
                      <div className="modal-box">
                      <span className="closebtndark" onClick={() => {
                          setAddUsersModal({
                              addUserModal: false
                          })
                      }}>&times;</span>
                      <h4>ADD USER</h4>
                      <AuthMethod/>
                      <div className="input-container">
                        <input type="text" className="input-bar" placeholder="First Name" onChange={(e) => {
                            setFirstName({
                                firstname: e.target.value
                            })
                        }} />
                      </div>
                      <div className="input-container">
                        <input type="text" className="input-bar" placeholder="Last Name" onChange={(e) => {
                            setLastName({
                                lastname: e.target.value
                            })
                        }} />
                      </div>
                      <div className="input-container">
                        <input type="text" className="input-bar" placeholder="Email" onChange={(e) => {
                            setEmail({
                                email: e.target.value
                            })
                        }} />
                      </div>
                      <div className="input-container">
                       <input type="text" className="input-bar" placeholder="Username" onChange={(e) => {
                            setUsername({
                                username: e.target.value
                            })
                        }} />
                      </div>
                      <div className="input-container">
                       <input type="text" className="input-bar" placeholder="Usertoken" onChange={(e) => {
                            setUserToken({
                                usertoken: e.target.value
                            })
                        }} />
                      </div>
                      <div className="input-container">
                        <input type="password" className="input-bar" placeholder="Password" onChange={(e) => {
                            setPassword({
                                password: e.target.value
                            })
                        }} />
                      </div>
                      {
                          trackingData.trackingData.map((item) => (
                              <div key={generateId(20)} className="input-container">
                                <input type="text" className="input-bar" placeholder={item} onChange={(e) => {
                                    mapJson[item] = e.target.value
                                }} />
                              </div>
                          ))
                      }
                      <div className="button-padding">
                       <button className="button-purple" onClick={() => {
                           const mapNames = [];
                           const object = Object.keys(mapJson);
                           for (let i = 0; i < object.length; i++) {
                               mapNames.push(object[i]);
                           };
                           let visualtest = {};
                            visualtest["username"] = username.username;
                            visualtest["password"] = password.password;
                            visualtest["firstname"] = firstname.firstname;
                            visualtest["lastname"] = lastname.lastname;
                            visualtest["email"] = email.email;
                            visualtest["usertoken"] = usertoken.usertoken;
                            let visuals = {};
                            let key;
                            for (key in mapJson) {
                                if (mapJson.hasOwnProperty(key)) {
                                    visuals[key] = mapJson[key]
                                }
                            }
                            for (key in visualtest) {
                                if (visualtest.hasOwnProperty(key)) {
                                    visuals[key] = visualtest[key]
                                }
                            }
                           
                            const data = {
                            email: email.email,
                            password: password.password,
                            firstname: firstname.firstname,
                            lastname: lastname.lastname,
                            username: username.username,
                            usertoken: usertoken.usertoken,
                            mapJson: mapJson,
                            mapNames: mapNames,
                            visuals: visuals,
                            authmethod: authmethod.authmethod
                            }

                            fetch('/projectauth/addusertoproject/' + projectapi, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }, 
                                body: JSON.stringify(data)
                            }).then((res) => {
                                return res.json();
                            }).then((body) => {
                                body.response["userid"] = body.useruid;
                                users.users.push(body.response);
                                setUsers({
                                    users: users.users
                                })
                                setAddUsersModal({
                                    addUserModal: false
                                })
                            }).catch((error) => {
                                console.log(error);
                            })
                       }}>ADD USER</button>
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

    const TableUsers = () => {
        if (users.users.length === 0) {
            return (
                <div>
                 <div className="empty-padding">
                  <div className="empty-auth-container">
                      <h2>There are no users for this project</h2>
                      <div className="button-padding">
                       <button className="button-purple" onClick={() => {
                           setAddUsersModal({
                               addUserModal: true
                           })
                       }}>Add a User</button>
                      </div>
                  </div>
                 </div>
                </div>
            )
        } else {
           return (
            <div>
            <div className="table-container">
             <table className="table-data">
              <tbody>
                <tr className="table-data-headers">
                 {
                     data.data.labels.map((item) => (
                     <th className="table-header" key={data.data.labels.indexOf(item)}>{item}</th>
                     ))
                 }
                </tr>
                {
                    users.users.map((item) => (
                        <tr className="table-row" key={users.users.indexOf(item)} onClick={() => {
                            setCurrentUser({
                                currentusers: item
                            })
                            setUsersModal({
                                usersmodal: true
                            })
                        }} >
                          {
                              data.data.labels.map((index) => (
                              <td className="table-item" key={data.data.labels.indexOf(index)}>{StringifyBoolean(MinimizeText(NullifiedData(item)[index], 7))}</td>
                              ))
                          }
                        </tr>
                    ))
                }
              </tbody>
             </table>
            </div>
           </div>
           )
        }
    }

    const AuthMethodShow = () => {
        const [authMethodValue, setAuthMethodValue] = useState({
            authMethodValue: "Email and Password"
        })
        if (data.data.authmethod === "") {
            return (
                <div>
                  <div className="input-container">
                    <label>Please pick a type authentication method</label>
                    <select className="input-bar" onChange={(e) => {
                        setAuthMethodValue({
                            authMethodValue: e.target.value
                        })
                    }}>
                      <option value="Email and Password">Email and Password</option>
                      <option value="Username and Password">Username and Password</option>
                    </select>
                  </div>
                  <div className="button-padding">
                    <button className="button-purple" onClick={() => {
                        const data = {authmethod: authMethodValue.authMethodValue}
                        fetch('/projectauth/setauthmethod/' + projectapi, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }).then((res) => {
                            return res.json()
                        }).then((body) => {
                            setData({
                                data: body
                            })
                        }).catch((error) => {
                            console.log(error)
                        })
                    }}>Set Authentication Method</button>
                  </div>
                </div>
            )
        } else {
            return (
                <div>
                 <div className="text-padding">
                   <h6>{"Authentication: " + data.data.authmethod}</h6>
                 </div>
                </div>
            )
        }
    }

  if (projectauth === true) {
      return (
          <div>
            <div className="non-nav-page">
             <div className="project-auth">
              <div className="container">
               <div className="float-right">
                <button className="button-purple" onClick={() => {
                  setAddUsersModal({
                      addUserModal: true
                  })
                }} >ADD USER</button>
               </div>
               <h3>PROJECT AUTHENTICATION</h3>
               <AuthMethodShow/>
               <TableUsers/>
              </div>
             </div>
            </div>
            <AddUsersModal addUserModal={addUserModal.addUserModal} />
            <UsersModal usersmodal={usersModal.usersmodal} item={currentusers.currentusers} />
          </div>
      )
  } else {
      return null;
  }
}

export default Projectauth;