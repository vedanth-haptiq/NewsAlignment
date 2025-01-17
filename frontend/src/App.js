import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import NewspaperLayout from "./components/NewsPaperLayout/NewspaperLayout";
import BreakingNews from "./components/BreakingNews/BreakingNews";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [breakingNews, setBreakingNews] = useState([]);
  const categories = [
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
    "Politics",
  ];

  useEffect(() => {
    fetch(`/api/breaking-news?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setBreakingNews(data))
      .catch((error) => console.error("Error fetching breaking news:", error));
  }, [selectedCategory]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Navbar
        categories={categories}
        onSelectCategory={handleCategorySelection}
        selectedCategory={selectedCategory}
      />
      <NewspaperLayout selectedCategory={selectedCategory} />
      <BreakingNews news={breakingNews} />
      <Footer />
    </div>
  );
};

export default App;
