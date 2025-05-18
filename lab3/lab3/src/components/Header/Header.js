import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <img src="/img/logo.png" alt="Логотип" className="logo" />
        </div>
        <button className="burger-menu">&#9776;</button>
        <ul>
          <li><NavLink to="/">Мої цілі</NavLink></li>
          <li><NavLink to="/progress">Прогрес</NavLink></li>
          <li><NavLink to="/community">Спільнота</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
