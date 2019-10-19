import React, {useState} from 'react';
import ApiPage from './ProjectApi';
import ProjectNotes from './ProjectNotes';
import ProjectUsers from './ProjectUsers';
import {NavLink} from 'react-router-dom'

const ProjectDetails = () => {
    const [apipage, setApiPage] = useState({
        apipage: false
    })
    const [notes, setNotes] = useState({
        notes: true
    })
    const [userspage, setUsersPage] = useState({
        userspage: false
    })
    return (
        <div>
        <div className="project-title">
          <div className="float-right">
            <NavLink className="navlink" to="/Dash"><button className="button-white">DASHBOARD</button></NavLink>
          </div>
          <h4>PROJECT NAME</h4>
        </div>
        <div className="project-navigation">
         <div className="container">
          <div className="nav-comp-container">
          <h4 className="pointer" onClick={() => {
            setApiPage({
                apipage: true
            })
            setNotes({
                notes: false
            })
            setUsersPage({
                userspage: false
            })
          }}>API's</h4>
          </div>
          <div className="nav-comp-container">
          <h4 className="pointer" onClick={() => {
            setApiPage({
                apipage: false
            })
            setNotes({
                notes: true
            })
            setUsersPage({
                userspage: false
            })
          }}>Notes</h4>
          </div>
          <div className="nav-comp-container">
          <h4 className="pointer" onClick={() => {
            setApiPage({
                apipage: false
            })
            setNotes({
                notes: false
            })
            setUsersPage({
                userspage: true
            })
          }}>Users</h4>
          </div>
         </div>
        </div>
        <div>
            <ApiPage apipage={apipage.apipage} />
            <ProjectNotes projectNotes={notes.notes} />
            <ProjectUsers projectusers={userspage.userspage} />
        </div>
        </div>
    )
}

export default ProjectDetails;