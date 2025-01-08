import React, { useState, useEffect } from "react";
import './NewsFetcher.css'
const NewsFetcher = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [randomArticles, setRandomArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      setLoading(true);

      fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=597bcc7a87c74ac9ba4796b0389e5ee0`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.articles) {
            const sortedArticles = sortArticlesByPriority(data.articles);
            setArticles(sortedArticles);

            const selectedArticles = pickRandomArticles(sortedArticles, 3);
            setRandomArticles(selectedArticles);
          } else {
            console.error("No articles found");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
          setLoading(false);
        });
    }
  }, [category]);

  const sortArticlesByPriority = (articles) => {
    return articles
      .map((article) => {
        let priority = 3; 

        if (article.title && article.title.toLowerCase().includes("breaking")) {
          priority = 1;
        } else if (
          article.publishedAt &&
          new Date(article.publishedAt) > new Date().setDate(new Date().getDate() - 1)
        ) {
          priority = 2; 
        }

        return { ...article, priority };
      })
      .sort((a, b) => a.priority - b.priority); 
  };

  const pickRandomArticles = (articles, count) => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  if (loading) {
    return <p></p>;
  }

  return (
    <div className="news-articles">
      <h2>All News</h2>
      {articles.map((article, index) => (
        <div key={index} className="article">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}

      <h2>Top 3 High-Priority News</h2>
      <div className="random-articles">
        {randomArticles.map((article, index) => (
          <div key={index} className="article random">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFetcher;
