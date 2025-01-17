# Backend - News Aggregator API

This is the backend for the **News Aggregator** application. It provides APIs to fetch news articles and prioritize them based on Twitter engagement metrics.

---

## **Features**

1. **Fetch News Articles**:

   - Fetch news articles from categories like General, Business, Entertainment, Health, Science, Sports, Technology, and Politics.
   - Articles are fetched from the [NewsAPI](https://newsapi.org/).

2. **Prioritize Articles**:

   - Articles are prioritized based on **Twitter engagement metrics** (likes + retweets).
   - The top 5 articles with the highest engagement are returned.

3. **Breaking News**:
   - A dedicated API endpoint for fetching breaking news.

---

## **Technologies Used**

- **Node.js**
- **Express.js**
- **Twitter API** (for engagement metrics)
- **NewsAPI** (for fetching news articles)
- **Axios** (for making HTTP requests)
- **CORS** (for cross-origin requests)

---

## **Folder Structure**

backend/
├── controllers/
│ └── newsControllers.js
├── routes/
│ └── newsRoutes.js
├── services/
│ ├── newsService.js
│ └── twitterServices.js
├── utils/
│ └── textAnalysis.js
├── package.json
├── package-lock.json
└── server.js

---

## **Frontend README.md**

```markdown
# Frontend - News Aggregator

This is the frontend for the **News Aggregator** application. It allows users to view news articles prioritized by Twitter engagement metrics.

---

## **Features**

1. **Fetch and Display News Articles**:

   - Fetch news articles from various categories.
   - Display the top 5 articles with the highest Twitter engagement.

2. **Breaking News Section**:

   - A dedicated section for breaking news.

3. **Responsive Design**:
   - The application is designed to be responsive and works seamlessly on both desktop and mobile devices.

---

## **Technologies Used**

- **React.js**
- **Axios** (for API calls)
- **CSS** (for styling)
- **React Spinners** (for loading animations)

---

## **Folder Structure**
```

frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── BreakingNews.js
│ │ ├── Footer.jsx
│ │ ├── Navbar.js
│ │ ├── NewsFetcher.js
│ │ └── NewspaperLayout.jsx
│ ├── services/
│ │ └── apiServices.js
| ├──styles/
| | ├── BreakingNews.css
│ │ ├── Footer.css
│ │ ├── Navbar.css
│ │ ├── NewsFetcher.css
│ │ └── NewspaperLayout.css
│ ├── App.js
│ ├── index.js
│ └── index.css
├── package.json
├── package-lock.json
