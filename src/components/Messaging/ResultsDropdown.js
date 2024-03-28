import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {
  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });

  setChannel(newChannel)

  return setActiveChannel(newChannel);
};

const SearchResult = ({ channel, focusedId, type, setChannel, setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel)
          if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState)
          }
        }}
        className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container'}
      >
        <div className='h-6 w-7 flex items-center justify-center font-[bold] text-sm leading-[120%] text-white m-3 rounded-3xl;
  background: var(--primary-color);
  font-family: Helvetica Neue, sans-serif;'>#</div>
        <p className='w-full font-medium text-sm leading-[120%] text-[#2c2c30];
  font-family: Helvetica Neue, sans-serif;'>{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel })
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState)
        }
      }}
      className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container'}
    >
      <div className='flex items-center ml-3'>
        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
        <p className='w-full font-medium text-sm leading-[120%] text-[#2c2c30];
  font-family: Helvetica Neue, sans-serif;'>{channel.name}</p>
      </div>
    </div>
  );
};

const ResultsDropdown = ({ teamChannels, directChannels, focusedId, loading, setChannel, setToggleContainer }) => {

  return (
    <div className='absolute h-fit w-[300px] border box-border shadow-[0px_2px_4px_rgba(0,0,0,0.06)] z-10 rounded-lg border-solid border-[#e9e9ea] left-[230px] top-4;
    background: #fff;'>
      <p className='w-fit flex items-center not-italic font-medium text-sm leading-[120%] text-[#858688] ml-3;
  font-family: Helvetica Neue, sans-serif;'>Channels</p>
      {loading && !teamChannels.length && (
        <p className='w-fit flex items-center not-italic font-medium text-sm leading-[120%] text-[#858688] ml-3;
        font-family: Helvetica Neue, sans-serif;'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p className='w-fit flex items-center not-italic font-medium text-sm leading-[120%] text-[#858688] ml-3;
        font-family: Helvetica Neue, sans-serif;'>
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='channel'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <p className='w-fit flex items-center not-italic font-medium text-sm leading-[120%] text-[#858688] ml-3;
  font-family: Helvetica Neue, sans-serif;'>Users</p>
      {loading && !directChannels.length && (
        <p className='w-fit flex items-center not-italic font-medium text-sm leading-[120%] text-[#858688] ml-3;
        font-family: Helvetica Neue, sans-serif;'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p className='w-fit flex items-center not-italic font-medium text-sm leading-[120%] text-[#858688] ml-3;
        font-family: Helvetica Neue, sans-serif;'>
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='user'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </div>
  );
};

export default ResultsDropdown;