// Projects.js
import React, { Component } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import ProjectList from './ProjectList';
import HardwareCheckout from './HardwareCheckout';
import UserList from './UserList';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
        { id: 1, name: 'Project A', users: ['User1', 'User2'] },
        { id: 2, name: 'Project B', users: ['User3', 'User4'] },
      ],
      hardwareData: {
        available: ['Hardware1', 'Hardware2'],
        checkedOut: ['Hardware3'],
      },
      userAuthorizedProjects: [1],
    };
  }

  handleJoinLeaveProject = (projectId) => {
    this.setState((prevState) => {
      const userAuthorizedProjects = [...prevState.userAuthorizedProjects];
      const index = userAuthorizedProjects.indexOf(projectId);
      if (index === -1) {
        userAuthorizedProjects.push(projectId);
      } else {
        userAuthorizedProjects.splice(index, 1);
      }
      return { userAuthorizedProjects };
    });
  };

  handleCheckOutHardware = (hardware) => {
    // Add logic to handle hardware checkout
    console.log(`Checking out ${hardware}`);
  };

  handleCheckInHardware = (hardware) => {
    // Add logic to handle hardware check-in
    console.log(`Checking in ${hardware}`);
  };

  render() {
    const { projects, hardwareData, userAuthorizedProjects } = this.state;

    return (
      <div>
        <h1>Projects</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Hardware</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell><UserList users={project.users} /></TableCell>
                <TableCell>
                  <HardwareCheckout hardwareData={hardwareData} />
                  <Button variant="outlined" color="primary" onClick={() => this.handleCheckOutHardware('Hardware1')}>
                    Check Out Hardware
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => this.handleCheckInHardware('Hardware2')}>
                    Check In Hardware
                  </Button>
                </TableCell>
                <TableCell>
                  {userAuthorizedProjects.includes(project.id) ? (
                    <Button variant="outlined" color="secondary" onClick={() => this.handleJoinLeaveProject(project.id)}>
                      Leave Project
                    </Button>
                  ) : (
                    <Button variant="outlined" color="primary" onClick={() => this.handleJoinLeaveProject(project.id)}>
                      Join Project
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Projects;
