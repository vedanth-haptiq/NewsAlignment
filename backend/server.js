// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = '597bcc7a87c74ac9ba4796b0389e5ee0';
// const AI_SERVICE_URL = 'http://localhost:5001/analyze';
// const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

// app.get('/api/breaking-news', async (req, res) => {
//   try {
//     const category = req.query.category || 'general'; 

//     const newsResponse = await axios.get(
//       `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
//     );

//     const articles = newsResponse.data.articles;

//     const aiResponse = await axios.post(AI_SERVICE_URL, { articles });
//     const analyzedArticles = aiResponse.data.articles;

//     const breakingNews = analyzedArticles
//       .filter((article) => article.sentiment === 'POSITIVE')
//       .sort((a, b) => b.score - a.score);

//     res.json(breakingNews.slice(0, 5)); 
//   } catch (error) {
//     console.error('Error fetching or analyzing breaking news:', error.message);
//     res.status(500).json({ error: 'Failed to fetch or analyze breaking news' });
//   }
// });

// // app.get('/api/breaking-news', async (req, res) => {
// //   try {
// //     const category = req.query.category || 'general'; // Use the selected category or default to 'general'
// //     const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`);
// //     const articles = response.data.articles;

// //     // Send articles to AI service for analysis
// //     const aiResponse = await axios.post(AI_SERVICE_URL, { articles });
// //     const analyzedArticles = aiResponse.data.articles;

// //     // Filter and sort articles by sentiment or score
// //     const breakingNews = analyzedArticles
// //       .filter((article) => article.sentiment === 'POSITIVE')
// //       .sort((a, b) => b.score - a.score);

// //     res.json(breakingNews.slice(0, 5)); // Return top 5 breaking news
// //   } catch (error) {
// //     console.error('Error fetching or analyzing breaking news:', error.message);
// //     res.status(500).json({ error: 'Failed to fetch or analyze breaking news' });
// //   }
// // });



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware to allow CORS
app.use(cors());

// Twitter API endpoint
app.get('/api/twitter-shares', async (req, res) => {
  const query = req.query.query; // Get the query from the request

  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=100`,
      {
        headers: {
          Authorization: `AAAAAAAAAAAAAAAAAAAAADHRxgEAAAAAxor5gv9DDfIPceKaHWgkgw%2FDEqI%3DCy7flu37Gn4om9KsPBu9jHiKvYZaOS6zhkDJg3lmZ6eXdzLZjD   `, // Replace with your Twitter API bearer token
        },
      }
    );

    res.json(response.data); // Send the Twitter API response to the client
  } catch (error) {
    console.error("Error fetching Twitter shares:", error);
    res.status(500).json({ error: "Failed to fetch Twitter shares" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});