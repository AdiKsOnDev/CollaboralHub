import React, { useState } from 'react';
import ChannelList from 'stream-chat-react';
import { useContext } from 'react';
import { ChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChannelSearch from './ChannelSearch';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';
import { LuLogOut } from "react-icons/lu";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="w-[72px] shadow-[1px 0px 0px rgba(0,0,0,0.25)] bg-gradient-to-r from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.2)] var(--primary-color)">
    <div className="w-11 h-11 shadow-[0px 4px 8px rgba(0,0,0,0.33)] m-3.5 rounded-full bg-gradient-to-r from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0)] #ffffff">
      <div className="h-full flex items-center justify-center font-sans">
      </div>
    </div>
    <div className="w-11 h-11 shadow-[0px 4px 8px rgba(0,0,0,0.33)] cursor-pointer m-3.5 rounded-full bg-gradient-to-r from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0)] #ffffff">
      <div className="h-full flex items-center justify-center font-sans" onClick={logout}>
        <LuLogOut />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  const { client } = useContext(ChatContext);

  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
}

const ChannelListContainer = () => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>

      <SideBar />
    </>
  )

}

export default ChannelListContainer;