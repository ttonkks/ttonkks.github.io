import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import './Header.css';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error("Помилка при виході з акаунту:", error);
    }
  };

  return (
    <header>
      <nav>
        <div className="logo-container">
          <img src="/img/logo.png" alt="Логотип" className="logo" />
        </div>
        <button className="burger-menu">&#9776;</button>
        <ul>
          {isAuthenticated && (
            <>
              <li><NavLink to="/">Мої цілі</NavLink></li>
              <li><NavLink to="/community">Спільнота</NavLink></li>
            </>
          )}
        </ul>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="auth-button logout">Вийти</button>
          ) : (
            <>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
