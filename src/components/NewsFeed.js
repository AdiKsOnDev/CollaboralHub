import React, { useEffect, useState } from 'react';
import { database } from '../firebase';

const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = database.collection('NewsFeed');
        const snapshot = await collectionRef.get();

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNewsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="news-container h-screen h-1/2">
      <div className="main-title"> Community News </div>
      {newsData.map(news => (
        <div key={news.id} className="news-item">
          <div className="news-title">{news.title}</div>
          <div className="news-body">{news.body}</div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
