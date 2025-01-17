const { TwitterApi } = require("twitter-api-v2");

const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAADHRxgEAAAAAxor5gv9DDfIPceKaHWgkgw%2FDEqI%3DCy7flu37Gn4om9KsPBu9jHiKvYZaOS6zhkDJg3lmZ6eXdzLZjD";
const client = new TwitterApi(BEARER_TOKEN);
const roClient = client.readOnly;

const getTweetEngagement = async (url) => {
  try {
    // Search for tweets containing the article URL
    const searchResults = await roClient.v2.search(url, {
      max_results: 1, // Fetch only the most recent tweet
    });

    if (searchResults.tweets.length === 0) {
      return { like_count: 0, retweet_count: 0 }; // Nothing found
    }

    const tweetId = searchResults.tweets[0].id;

    // Fetch engagement metrics for the tweet
    const tweet = await roClient.v2.singleTweet(tweetId, {
      "tweet.fields": "public_metrics",
    });

    const { like_count, retweet_count } = tweet.data.public_metrics;
    return { like_count, retweet_count };
  } catch (error) {
    console.error("Error fetching Twitter engagement:", error);
    return { like_count: 0, retweet_count: 0 }; // Fallback if Twitter API fails
  }
};

module.exports = { getTweetEngagement };
