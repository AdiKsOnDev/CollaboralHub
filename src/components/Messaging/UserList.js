import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../../Assets/Messaging/InviteIcon';

const ListContainer = ({ children }) => {
  return (
    <div className="flex flex-col h-full;">
      <div className="flex items-center justify-between mx-5 my-0;">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  )
}

const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false)

  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id])
    }

    setSelected((prevSelected) => !prevSelected)
  }

  return (
    <div className="flex items-center justify-between mx-5 my-0 hover:cursor-pointer;" onClick={handleSelect}>
      <div className="flex items-center flex-[2] text-left;">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="flex items-center flex-[2] text-left">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  )
}


const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    }

    if (client) getUsers()
  }, []);

  if (error) {
    return (
      <ListContainer>
        <div className="text-base text-[#2c2c30] m-5;
  font-family: Helvetica Neue, sans-serif;">
          Error loading, please refresh and try again.
        </div>
      </ListContainer>
    )
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="text-base text-[#2c2c30] m-5;
  font-family: Helvetica Neue, sans-serif;">
          No users found.
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      {loading ? <div className="text-base text-[#2c2c30] m-5;
  font-family: Helvetica Neue, sans-serif;">
        Loading users...
      </div> : (
        users?.map((user, i) => (
          <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
        ))
      )}
    </ListContainer>
  )
}

export default UserList;