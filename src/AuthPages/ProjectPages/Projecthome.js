import React, {useState, useEffect, useRef} from 'react';
import ApiPage from './ProjectApi';
import ProjectNotes from './ProjectNotes';
import ProjectUsers from './ProjectUsers';
import ProjectAnalytics from './ProjectAnalytics';
import Projectauth from './Projectauth';
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
    const [projectAnalytics, setProjectAnalytics] = useState({
        projectAnalytics: false
    })
    const [projectname, setProjectName] = useState({
        projectName: ''
    })
    const [projectauth, setProjectAuth] = useState({
        projectauth: false
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
                    return res.text()
                }).then((body) => {
                    setProjectName({
                        projectName: body
                    })
                    setLoadingPage({
                        loadingpage: false
                    })
                }).catch((error) => {
                    console.log(error);
                })
            }, 1000);
        } else if (componentDidMount.current === false) {
            setLoadingPage({
                loadingpage: true
            })
        }
     }
    }, [props.match.params])

    return (
        <div>
        <div className="project-title">
          <div className="float-right">
            <NavLink className="navlink" to="/Dash"><button className="button-white">DASHBOARD</button></NavLink>
          </div>
          <h4>{projectname.projectName}</h4>
        </div>
        <div className="project">
        <div className="project-navigation">
         <div className="container">
         <div className="nav-comp-container">
          <h6 className="pointer" onClick={() => {
            setApiPage({
                apipage: true
            })
            setNotes({
                notes: false
            })
            setUsersPage({
                userspage: false
            })
            setProjectAnalytics({
                projectAnalytics: false
            })
            setProjectAuth({
                projectauth: false
            })
          }}>API's</h6>
          </div>
          <div className="nav-comp-container">
          <h6 className="pointer" onClick={() => {
            setApiPage({
                apipage: false
            })
            setNotes({
                notes: false
            })
            setUsersPage({
                userspage: false
            })
            setProjectAnalytics({
                projectAnalytics: true
            })
            setProjectAuth({
                projectauth: false
            })
          }}>Analytics</h6>
          </div>
          <div className="nav-comp-container">
          <h6 className="pointer" onClick={() => {
            setApiPage({
                apipage: false
            })
            setNotes({
                notes: false
            })
            setUsersPage({
                userspage: false
            })
            setProjectAnalytics({
                projectAnalytics: false
            })
            setProjectAuth({
                projectauth: true
            })
          }}>Authentication</h6>
          </div>
          <div className="nav-comp-container">
          <h6 className="pointer" onClick={() => {
            setApiPage({
                apipage: false
            })
            setNotes({
                notes: true
            })
            setUsersPage({
                userspage: false
            })
            setProjectAnalytics({
                projectAnalytics: false
            })
            setProjectAuth({
                projectauth: false
            })
          }}>Notes</h6>
          </div>
          <div className="nav-comp-container">
          <h6 className="pointer" onClick={() => {
            setApiPage({
                apipage: false
            })
            setNotes({
                notes: false
            })
            setUsersPage({
                userspage: true
            })
            setProjectAnalytics({
                projectAnalytics: false
            })
            setProjectAuth({
                projectauth: false
            })
          }}>Users</h6>
          </div>
         </div>
        </div>
        <div>
            <ApiPage apipage={apipage.apipage} api={props.match.params.projectapi} />
            <ProjectNotes projectNotes={notes.notes} api={props.match.params.projectapi} />
            <ProjectUsers projectusers={userspage.userspage} api={props.match.params.projectapi} />
            <ProjectAnalytics projectanalytics={projectAnalytics.projectAnalytics} api={props.match.params.projectapi} />
            <LoadingBluePage loadingprocess={loadingpage.loadingpage} />
            <Projectauth projectauth={projectauth.projectauth} projectapi={props.match.params.projectapi} />
        </div>
        </div>
        </div>
    )
}

export default ProjectDetails;