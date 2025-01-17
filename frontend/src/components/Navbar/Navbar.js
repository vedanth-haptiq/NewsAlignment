import React, { useState, useEffect, useRef } from "react";
import "../../styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ categories, onSelectCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">E-NewsPaper</h1>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown" ref={dropdownRef}>
              <button
                className="btn btn-secondary dropdown-toggle"
                onClick={toggleCategoryDropdown}
                aria-expanded={isCategoryDropdownOpen}
              >
                Categories
              </button>
              <ul
                className={`dropdown-menu ${
                  isCategoryDropdownOpen ? "show" : ""
                }`}
                aria-labelledby="navbarDropdown"
              >
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`dropdown-item ${
                        selectedCategory === category ? "active" : ""
                      }`}
                      onClick={() => {
                        onSelectCategory(category);
                        setIsCategoryDropdownOpen(false);
                      }}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
