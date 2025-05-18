import React from 'react';
import './Community.css';

function Community() {
  return (
    <section id="community">
      <h2>Спільнота</h2>
      <input type="text" id="comment-input" placeholder="Введіть коментар..." />
      <button id="comment-button">Опублікувати</button>
      <ul id="comment-list">
        <li>"Маленькі кроки ведуть до великих результатів!" – Олександр</li>
        <li>"Рекомендую книгу 'Атомні звички' – дуже мотивує!" – Марина</li>
        <li>"Головне – ставити реальні цілі і нагороджувати себе!" – Іван</li>
        <li>"Неймовірний сайт! Заслуговує найвищого балу" – Тоня</li>
      </ul>
    </section>
  );
}

export default Community;
