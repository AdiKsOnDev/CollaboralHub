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
    <div className="flex flex-col h-[169px] shadow-[0px_1px_0px_rgba(0,0,0,0.1)] pl-5 flex flex-col h-[169px] shadow-[0px_1px_0px_rgba(0,0,0,0.1)] pl-5;">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
      <p>Add Members</p>
    </div>
  )
}

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
  const [channelName, setChannelName] = useState('');

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-[62px] shadow-[0px_1px_0px_rgba(0,0,0,0.1)] pr-5;">
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="h-[82px] flex items-center justify-end px-2.5 py-0 rounded-br-2xl;
  background: #f7f6f8;" onClick={createChannel}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  )
}

export default CreateChannel