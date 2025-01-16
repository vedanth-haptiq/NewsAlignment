import React from 'react';
import './NewspaperLayout.css'; 
import NewsFetcher from './ NewsFetcher';

const NewspaperLayout = ({ selectedCategory }) => {
  return (
    <div className="newspaper-container">
      <header className="header">
        <h1>My Newspaper</h1>
      </header>
      <div className="main-content">
        <section className="main-column">
          <h2>{selectedCategory ? selectedCategory : 'Top News'}</h2>
          <NewsFetcher category={selectedCategory} />
        </section>
      </div>
    </div>
  );
};

export default NewspaperLayout;