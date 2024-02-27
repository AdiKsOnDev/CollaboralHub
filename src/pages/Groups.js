import Navbar from '../components/Navbar.js';
import GroupsList from '../components/Groups/GroupsList.js';

function Groups() {
  return (
    <div className="w-screen h-full flex">
      <Navbar page="groups" />
      <GroupsList />
    </div>
  )
}

export default Groups;
