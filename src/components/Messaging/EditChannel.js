import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import UserList from './UserList';
import { CloseCreateChannel } from '../../Assets/Messaging/CloseCreateChannel';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  }

  return (
    <div className="text-lg text-[rgba(0,0,0,0.5)] h-[50px] w-[540px] border box-border pl-4 rounded-lg border-solid border-[rgba(0,0,0,0.1)] focus:border focus:border-[color:var(--primary-color)] focus:border-solid text-lg text-black h-[50px] w-[90%] border box-border pl-4 rounded-lg border-solid border-[rgba(0,0,0,0.1)] focus:border focus:border-[color:var(--primary-color)] focus:border-solid;
    font-family: Helvetica Neue, sans-serif;
    background: #f7f6f8;">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
      <p>Add Members</p>
    </div>
  )
}

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([])

  const updateChannel = async (event) => {
    event.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if (nameChanged) {
      await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}` });
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  }

  return (
    <div className="flex flex-col h-full;">
      <div className="flex items-center justify-between h-[62px] shadow-[0px_1px_0px_rgba(0,0,0,0.1)] pr-5;">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="h-[82px] flex items-center justify-end rounded-br-2xl;
  background: #f7f6f8;" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  )
}

export default EditChannel