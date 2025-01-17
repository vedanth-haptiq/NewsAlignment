import React, { useState, useEffect } from "react";
import "../../styles/NewsFetcher.css";
import { DotLoader } from "react-spinners";
import { fetchNews } from "../../services/apiServices";

const NewsFetcher = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [top5Articles, setTop5Articles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(true);

      // Fetch news from the backend
      fetchNews(category)
        .then((data) => {
          // Set all articles and top 5 high-priority articles
          setArticles(data.articles);
          setTop5Articles(data.top5Articles);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
          setLoading(false);
        });
    }
  }, [category]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <DotLoader color="#36d7b7" size={60} />
      </div>
    );
  }

  return (
    <div className="news-articles">
      <h2>Top 5 High-Priority News</h2>
      <div className="article-grid">
        {top5Articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="article-image"
              />
            )}
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p className="engagement">
                Engagement: {article.viewCount} likes & retweets
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="news">All News</h2>
      <div className="article-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="article-image"
              />
            )}
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <p className="engagement">
                Engagement: {article.viewCount} likes & retweets
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFetcher;
