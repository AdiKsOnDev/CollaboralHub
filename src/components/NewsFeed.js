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
    <div className="news-container flex min-h-screen flex-col">
      <div className="main-title "> Community News </div>
      <div className=" left-[25px] top-[70px] absolute">  
        {newsData.map((news) => (
          <div key={newsData.id} className='mb-4 w-[209px] pb-[40px] relative'> 

            <p className="text-white text-[10px] font-bold font-['Poppins'] underline tracking-wide"> {news.newsTitle}</p>
            <p className="text-white absolute text-[10px] font-normal font-['Poppins'] tracking-wide">{news.newsBody}</p>
            <p> </p>
          </div>
          ))}
      </div>
    </div>
  );
};

export default NewsFeed;
