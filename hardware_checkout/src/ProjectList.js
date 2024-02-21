// ProjectList.js
import React from 'react';
import { Button } from '@material-ui/core';

const ProjectList = ({ projects, userAuthorizedProjects, onJoinLeaveProject }) => {
  return (
    <div>
      <h2>Projects</h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
          <p>Users: {project.users.join(', ')}</p>
          {userAuthorizedProjects.includes(project.id) ? (
            <Button variant="outlined" color="secondary" onClick={() => onJoinLeaveProject(project.id)}>
              Leave Project
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={() => onJoinLeaveProject(project.id)}>
              Join Project
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
