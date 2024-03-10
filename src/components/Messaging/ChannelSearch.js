import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';

import ResultsDropdown from './ResultsDropdown'

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([])
  const [directChannels, setDirectChannels] = useState([])

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query])

  const getChannels = async (text) => {
    try {
      const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userID] }
      });
      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text }
      })

      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      setQuery('')
    }
  }

  const onSearch = (event) => {
    event.preventDefault();

    setLoading(true);
    setQuery(event.target.value);
    getChannels(event.target.value)
  }

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  }

  return (
    <div className="relative flex justify-center items-center pt-4 border-t-[#00000033] border-t border-solid;">
      <div className="flex justify-center items-center h-10 border w-[95%] mb-2 rounded-lg border-solid border-transparent focus-within:border focus-within:border-solid focus-within:border-white; background: rgba(255, 255, 255, 0.2);">
        <div className="w-8 flex justify-center">
        </div>
        <input
          className="text-white text-base border-[none];
          background: none;
          font-family: Helvetica Neue, sans-serif;
          outline: none;"
          placeholder="Search"
          type="text"
          value={query}
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  )
}

export default ChannelSearch