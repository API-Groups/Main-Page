import React, {useState, useEffect} from 'react';

const ProjectUsers = ({projectusers, api}) => {
    const [users, setUsers] = useState({
        users: []
    })
    useEffect(() => {
     if (projectusers === true) {
        fetch('/api/project/getuser/' + api)
        .then((res) => {
            return res.json()
        }).then((body) => {
            console.log(body);
            setUsers({
                users: body
            })
        }).catch((error) => {
            console.log(error);
        }) 
     }
    }, [api, projectusers])

    console.log(users);
    if (projectusers === true) {
        return (
            <div>
                <div className="non-nav-page">
                  <div className="project-users">
                   <div className="container">
                    <h3>USERS</h3>
                   </div>
                  </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default ProjectUsers;