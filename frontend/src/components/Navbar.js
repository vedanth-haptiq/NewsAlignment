import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ categories, onSelectCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <h1>E-NewsPaper</h1>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              style={{ fontWeight: selectedCategory === category ? 'bold' : 'normal' }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
