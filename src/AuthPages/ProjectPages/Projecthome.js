import React, {useState, useEffect, useRef} from 'react';
import ApiPage from './ProjectApi';
import ProjectNotes from './ProjectNotes';
import ProjectUsers from './ProjectUsers';
import {NavLink} from 'react-router-dom';
import LoadingBluePage from '../../MiscComps/Wholeloadingblue';

const ProjectDetails = (props) => {
    const [apipage, setApiPage] = useState({
        apipage: true
    })
    const [notes, setNotes] = useState({
        notes:  false
    })
    const [userspage, setUsersPage] = useState({
        userspage: false
    })
    const [projectdetails, setProjectdetails] = useState({
        projectdetails: {}
    })
    const [loadingpage, setLoadingPage] = useState({
        loadingpage: true
    })

    const componentDidMount = useRef(null);
    useEffect(() => {
     componentDidMount.current = true
     const {projectapi} = props.match.params;
     if (projectapi !== undefined) {
        if (componentDidMount.current) {
            setTimeout(() => {
                fetch('/api/project/getprojectcreds/' + projectapi)
                .then((res) => {
                    return res.json()
                }).then((body) => {
                    setProjectdetails({
                        projectdetails: body
                    })
                    setLoadingPage({
                        loadingpage: false
                    })
                })
            }, 1000);
        }
     }
    }, [props.match.params])

    return (
        <div>
        <div className="project-title">
          <div className="float-right">
            <NavLink className="navlink" to="/Dash"><button className="button-white">DASHBOARD</button></NavLink>
          </div>
          <h4>{projectdetails.projectdetails.projectname}</h4>
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
            <ProjectNotes projectNotes={notes.notes} api={props.match.params.projectapi} />
            <ProjectUsers projectusers={userspage.userspage} api={props.match.params.projectapi} />
            <LoadingBluePage loadingprocess={loadingpage.loadingpage} />
        </div>
        </div>
    )
}

export default ProjectDetails;