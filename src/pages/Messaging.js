import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import ChannelContainer from '../components/Messaging/ChannelContainer';
import ChannelListContainer from '../components/Messaging/ChannelListContainer';


const apiKey = 'gr65wzrsgsuv';

const client = StreamChat.getInstance(apiKey);

const Messaging = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-1 h-full border-radius:1rem ">
      <Chat client={client} >
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}


export default Messaging;