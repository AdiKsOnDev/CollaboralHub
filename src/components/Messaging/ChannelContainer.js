import React from 'react';
import { Channel } from 'stream-chat-react';
import { Message } from 'stream-chat-react';

import ChannelInner from './ChannelInner';
import CreateChannel from './CreateChannel';
import EditChannel from './EditChannel';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
  if (isCreating) {
    return (
      <div className="h-full w-full">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="h-full w-full">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className="flex flex-col h-full justify-end ml-20 mr-20 pb-20">
      <p className="font-bold text-base leading-6 text-gray-700 mb-4">This is the beginning of your chat history.</p>
      <p className="text-sm leading-6 m-0 text-gray-500">Send messages, attachments, links, emojis, and more!</p>
    </div>
  )

  return (
    <div className=" h-full w-full">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <Message key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
}

export default ChannelContainer;