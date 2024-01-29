import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../../Assets/Messaging/ChannelInfo';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div className="flex w-full">
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
    const additionalMembers = members.length - 3;

    if (channel.type === 'messaging') {
      return (
        <div className="flex-3 flex items-center overflow-x-auto max-w-500px whitespace-nowrap -ms-overflow-style-none scrollbar-none">
          {members.map(({ user }, i) => (
            <div key={i} className="flex items-center mr-8">
              <Avatar image={user.image} name={user.fullName || user.id} size={32} />
              <p className="font-medium text-sm">{user.fullName || user.id}</p>
            </div>
          ))}

          {additionalMembers > 0 && <p className="font-medium text-sm">and {additionalMembers} more</p>}
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <p className="font-bold text-xl text-gray-700 mr-8"># {channel.data.name}</p>
        <span className="flex" onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return 'No users online';
    if (watchers === 1) return '1 user online';
    return `${watchers} users online`;
  };

  return (
    <div className='team-channel-header__container'>
      <MessagingHeader />
      <div className='team-channel-header__right'>
        <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
      </div>
    </div>
  );
};

export default ChannelInner;