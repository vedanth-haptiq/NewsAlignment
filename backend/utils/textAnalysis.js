const natural = require("natural");
const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");

const analyzeSentiment = (text) => {
  return analyzer.getSentiment(text.split(" "));
};

module.exports = { analyzeSentiment };
