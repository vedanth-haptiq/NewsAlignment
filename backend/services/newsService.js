const axios = require("axios");
const { getTweetEngagement } = require("./twitterServices");

const NEWS_API_KEY = "597bcc7a87c74ac9ba4796b0389e5ee0";
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

const fetchNews = async (category) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category,
        apiKey: NEWS_API_KEY,
      },
    });

    if (!response.data.articles) {
      throw new Error("No articles found in the response");
    }

    const articles = response.data.articles;

    const articlesWithEngagement = await Promise.all(
      articles.map(async (article) => {
        try {
          if (article.url) {
            const engagement = await getTweetEngagement(article.url); // Fetch engagement from Twitter
            const viewCount = engagement.like_count + engagement.retweet_count; // Calculate total engagement
            return { ...article, viewCount };
          }
          return { ...article, viewCount: 0 }; // Default view count if no URL
        } catch (error) {
          console.error(
            "Error fetching Twitter engagement for article:",
            article.url,
            error
          );
          return { ...article, viewCount: 0 }; // Fallback if Twitter API fails
        }
      })
    );

    return articlesWithEngagement;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};

module.exports = { fetchNews };
