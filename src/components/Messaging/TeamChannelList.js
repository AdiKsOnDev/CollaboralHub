import React from 'react';

import { AddChannel } from '../../Assets/Messaging/AddChannel';

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  if (error) {
    return type === 'team' ? (
      <div className="w-full flex flex-col">
        <p className="text-white px-4 py-0;">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col">
        <p className="h-[115px];">
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center px-4 py-0;">
        <p className="text-[13px] leading-4 h-4 text-[rgba(255,255,255,0.66)] mb-2.5;
  font-family: Helvetica Neue, sans-serif;">
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList