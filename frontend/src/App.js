import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import NewspaperLayout from './components/NewspaperLayout';
import BreakingNews from './components/BreakingNews';
import NewsFetcher from './components/ NewsFetcher';
import Footer from './components/Footer';



const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [breakingNews, setBreakingNews] = useState([]);
  const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology', 'Politics'];

  useEffect(() => {
    fetch(`/api/breaking-news?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setBreakingNews(data))
      .catch((error) => console.error('Error fetching breaking news:', error));
  }, [selectedCategory]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category); 
  };

  return (
    <div>
      <Navbar categories={categories} onSelectCategory={handleCategorySelection} selectedCategory={selectedCategory} />
      <NewspaperLayout selectedCategory={selectedCategory} />
      <BreakingNews news={breakingNews} />
      <NewsFetcher/>
      <Footer/>
    </div>
  );
};

export default App;
