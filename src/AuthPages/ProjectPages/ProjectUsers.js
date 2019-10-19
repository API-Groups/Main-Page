import React from 'react';

const ProjectUsers = ({projectusers}) => {
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