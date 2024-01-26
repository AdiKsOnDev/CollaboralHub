'use client';
import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

async function getNews() {
  const querySnapshot = await getDocs(collection(database, 'NewsFeed'));
  const news=[];

  querySnapshot.forEach((doc) => {
    news.push({ id:doc.id, ...doc.data() });
    console.log(doc.id, ' => ', doc.data());
  })
  return news;
}
const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const news = await getNews();
      setNewsData(news);
    }
    fetchData();
  }, []);
  return (
    <div className="flex h-3/4 bg-secondary p-5 rounded-2xl flex-col mr-10">
      <div className="font-semibold text-white text-xl mb-8">Community News</div>
      <div >  
        {newsData.map((news) => (
          
          <div key={newsData.id} className='mb-4 w-[209px] pb-[40px] relative'> 
            <p className="text-white text-sm font-bold underline tracking-wide"> {news.newsTitle}</p>
            <p className="text-white text-sm font-normal tracking-wide">{news.newsBody}</p>
          </div>
          ))}
      </div>
    </div>
  );
};

export default NewsFeed;
