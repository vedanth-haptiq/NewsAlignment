const { fetchNews } = require("../services/newsService");

const getNews = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: "Category parameter is required" });
  }

  try {
    const articles = await fetchNews(category);

    // Sort articles by viewCount (descending order)
    const sortedArticles = articles.sort((a, b) => b.viewCount - a.viewCount);

    // Pick top 5 articles
    const top5Articles = sortedArticles.slice(0, 5);

    res.json({ articles: sortedArticles, top5Articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

module.exports = { getNews };
