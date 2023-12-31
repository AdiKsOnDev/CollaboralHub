import React from 'react';
import UsersFolder from './UsersFolder';
import Projects from './Projects';
import Greeting from './Greeting';
import CreateNewFiles from './CreateNewFiles';
import UserTeams from './UserTeams';

function HomeBox() {
  return (
    <div className="home-box">
      <Greeting />
      <UsersFolder />
      <Projects />
      <CreateNewFiles />
      <UserTeams />
    </div>
  );
}

export default HomeBox;