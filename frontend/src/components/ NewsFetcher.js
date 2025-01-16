// NewsFetcher.js
import React, { useState, useEffect } from "react";
import './NewsFetcher.css';
import getTwitterShares from './TwitterService'; 

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
        .then(async (data) => {
          if (data.articles) {
            // Fetch Twitter shares for each article and assign priorities
            const articlesWithPriority = await Promise.all(
              data.articles.map(async (article) => {
                const twitterShares = await getTwitterShares(article.title);
                let priority = 3; // Default priority

                // Priority 1: Articles with high social media engagement (e.g., 100+ shares)
                if (twitterShares >= 100) {
                  priority = 1;
                }
                // Priority 2: Articles published in the last 24 hours
                else if (
                  article.publishedAt &&
                  new Date(article.publishedAt) > new Date().setDate(new Date().getDate() - 1)
                ) {
                  priority = 2;
                }

                return { ...article, priority };
              })
            );

            // Sort articles by priority
            const sortedArticles = articlesWithPriority.sort((a, b) => a.priority - b.priority);
            setArticles(sortedArticles);

            // Pick random articles for the "Top 3 High-Priority News" section
            const selectedArticles = pickRandomArticles(sortedArticles, 5);
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

  const pickRandomArticles = (articles, count) => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="news-articles">
       <h2>Top 5 High-Priority News</h2>
      <div className="article-grid">
        {randomArticles.map((article, index) => (
          <div key={index} className="article-card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="article-image" />
            )}
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
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
              <img src={article.urlToImage} alt={article.title} className="article-image" />
            )}
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
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

// import React, { useState, useEffect } from "react";
// import './NewsFetcher.css';

// const NewsFetcher = ({ category }) => {
//   const [articles, setArticles] = useState([]);
//   const [topArticles, setTopArticles] = useState([]); // State for top 5 priority articles
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (category) {
//       setLoading(true);
//       fetch(
//         `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=20&apiKey=597bcc7a87c74ac9ba4796b0389e5ee0` // Fetch 20 articles
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.articles) {
//             const sortedArticles = sortArticlesByPriority(data.articles);
//             setArticles(sortedArticles);

//             // Select top 5 priority articles
//             const top5Articles = sortedArticles.slice(0, 5);
//             setTopArticles(top5Articles);
//           } else {
//             console.error("No articles found");
//           }
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching news:", error);
//           setLoading(false);
//         });
//     }
//   }, [category]);

//   const sortArticlesByPriority = (articles) => {
//     return articles
//       .map((article) => {
//         let priority = 3; // Default priority
//         if (article.title && article.title.toLowerCase().includes("breaking")) {
//           priority = 1; // Breaking news
//         } else if (
//           article.publishedAt &&
//           new Date(article.publishedAt) > new Date().setDate(new Date().getDate() - 1)
//         ) {
//           priority = 2; // Recent news
//         }
//         return { ...article, priority };
//       })
//       .sort((a, b) => a.priority - b.priority); // Sort by priority
//   };

//   if (loading) {
//     return <div className="loading-spinner">Loading...</div>;
//   }

//   return (
//     <div className="news-articles">
//        <h2>Top 5 High-Priority News</h2>
//       <div className="article-grid top-articles">
//         {topArticles.map((article, index) => (
//           <div key={index} className="article-card">
//             {article.urlToImage && (
//               <img src={article.urlToImage} alt={article.title} className="article-image" />
//             )}
//             <div className="article-content">
//               <h3>{article.title}</h3>
//               <p>{article.description}</p>
//               <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
//                 Read more
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//       <h2 className="news">All News</h2>
//       <div className="article-grid">
//         {articles.map((article, index) => (
//           <div key={index} className="article-card">
//             {article.urlToImage && (
//               <img src={article.urlToImage} alt={article.title} className="article-image" />
//             )}
//             <div className="article-content">
//               <h3>{article.title}</h3>
//               <p>{article.description}</p>
//               <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
//                 Read more
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

     
//     </div>
//   );
// };

// export default NewsFetcher;