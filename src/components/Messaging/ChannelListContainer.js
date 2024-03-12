import React, { useState } from 'react';
import { ChannelList } from 'stream-chat-react';
// import { useContext } from 'react';
// import { ChatContext } from 'stream-chat-react';
import { useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import TeamChannelList from './TeamChannelList';
import TeamChannelPreview from './TeamChannelPreview';
import { LuLogOut } from "react-icons/lu";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <div className="w-[72px] shadow-[1px 0px 0px rgba(0,0,0,0.25)] bg-white var(--primary-color)">
    <div className="w-11 h-11 shadow-[0px 4px 8px rgba(0,0,0,0.33)] m-3.5 rounded-full bg-black">
      <div className="h-full flex items-center justify-center font-sans">
      </div>
    </div>
    <div className="w-11 h-11 shadow-[0px 4px 8px rgba(0,0,0,0.33)] cursor-pointer m-3.5 rounded-full bg-white">
      <div className="h-full flex items-center justify-center font-sans" onClick={logout}>
        <LuLogOut />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="h-[62px] pl-4  bg-white">
    <p className="h-full w-full flex justify-center items-center font-bold text-lg leading-7 text-black">Messaging</p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  const { client } = useChatContext();

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
      <div className="flex flex-col w-60 bg-white">
        <CompanyHeader />
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
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <ChannelListContent
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing}
      />
    </>
  )

}

export default ChannelListContainer;