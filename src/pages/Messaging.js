import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import { Cookie } from 'universal-cookie';
import ChannelContainer from '../components/Messaging/ChannelContainer';
import ChannelListContainer from '../components/Messaging/ChannelListContainer';

const apiKey = 'gr65wzrsgsuv';
const client = StreamChat.getInstance(apiKey);

function Messaging() {
  return (
    <div className="flex flex-1 h-full border-radius:1rem ">
      <Chat client={client}>
        <ChannelListContainer

        />
        <ChannelContainer

        />
      </Chat>
    </div>
  )
}

export default Messaging;