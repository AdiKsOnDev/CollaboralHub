import React from 'react';
import HomeBox from '../components/HomeBox';
import Navbar from '../components/Navbar.js';

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <HomeBox />
    </div>
  );
}

export default Home;
