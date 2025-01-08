const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const API_KEY = '597bcc7a87c74ac9ba4796b0389e5ee0';

app.get('/api/news', async (req, res) => {
    const category = req.query.category || 'general';
    const pageSize = 10; 
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&apiKey=${API_KEY}`
        );
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
