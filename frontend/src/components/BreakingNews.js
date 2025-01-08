import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    // Fetching news data
    axios.get('http://localhost:5000/api/news')
      .then((response) => {
        const fetchedNews = response.data;

        const sortedNews = fetchedNews.sort((a, b) => b.priority - a.priority);
        setTopNews(sortedNews.slice(0, 3));

        setNews(fetchedNews);
      })
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="news-page">
      <div className="top-news">
        {topNews.map((article, index) => (
          <div className="news-item" key={index}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
      <div className="all-news">
        {news.map((article, index) => (
          <div className="news-item" key={index}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;


