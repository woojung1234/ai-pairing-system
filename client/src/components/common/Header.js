import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-container">
              <span className="logo-text">주미당</span>
              <span className="logo-subtitle">JOOMIDANG</span>
            </div>
          </Link>
          
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>홈</Link></li>
              <li><Link to="/pairing" onClick={() => setMobileMenuOpen(false)}>페어링 검색</Link></li>
              <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>서비스 소개</Link></li>
              <li className="special-link"><Link to="/login" onClick={() => setMobileMenuOpen(false)}>로그인</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
