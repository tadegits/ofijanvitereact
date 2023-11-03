import React, { useState, useEffect } from 'react';
import './App.scss';

const CategoryDiv = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {

    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`category-div ${isHidden ? 'hidden' : ''}`}
      style={{ position: 'fixed', top: 0, width: '100%', zIndex: 999 }}
    >
      <ul className='categories'>
        <li><a href="#">Exam /</a></li>
        <li><a className={`category-item ${isActive? 'active' : ''}`} href="#">Study tips /</a></li>
        <li><a href="#">Books /</a></li>
        <li><a href="#">News /</a></li>
        <li><a href="#">Entertainment /</a></li>
      </ul>
    </div>
  );
};

export default CategoryDiv;
