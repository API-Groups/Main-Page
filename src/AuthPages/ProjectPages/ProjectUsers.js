import React, {useState, useEffect} from 'react';
import axios from 'axios';
const ProjectUsers = ({projectusers, api}) => {
    const [users, setUsers] = useState({
        users: []
    })
    const [usermodal, setUsersModal] = useState({
        usersmodal: false
    })
    const [currentuser, setCurrentUser] = useState({
        currentuser: {}
    })
    useEffect(() => {
     if (projectusers === true) {
        axios.get('https://jpi-backend.herokuapp.com/api/project/getuser/' + api)
        .then((body) => {
            console.log(body);
            setUsers({
                users: body.data
            })
        }).catch((error) => {
            console.log(error);
        }) 
     }
    }, [api, projectusers])

    const ShowUsers = () => {
        return (
            <div>
             <div className="row">
             {
                    users.users.map((item) => (
                        <div key={users.users.indexOf(item)}>
                         <div className="users-spacing">
                          <div className="users-container" onClick={() => {
                              setCurrentUser({
                                  currentuser: item
                              })
                              setUsersModal({
                                  usersmodal: true
                              })
                          }}> 
                            <h5 className="text-center">{item.username}</h5>
                            <div className="text-padding">
                             <h6 className="text-center">{item.firstname + " " + item.lastname}</h6>
                            </div>
                          </div>
                         </div>
                        </div>
                    ))
                }
             </div>
            </div>
        )
    }

    const UsersModal = ({usersmodal, currentUser}) => {
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
                        <h4>{currentUser.username}</h4>
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
    
    if (projectusers === true) {
        return (
            <div>
                <div className="non-nav-page">
                  <div className="project-users">
                   <div className="container">
                    <h3>USERS</h3>
                    <div className="text-padding">
                     <ShowUsers/>
                    </div>
                   </div>
                  </div>
                  <UsersModal usersmodal={usermodal.usersmodal} currentUser={currentuser.currentuser} />
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default ProjectUsers;