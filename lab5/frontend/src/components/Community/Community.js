import React, { useState } from 'react';
import './Community.css';

function Community() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    'Маленькі кроки ведуть до великих результатів!',
    'Рекомендую книгу \'Атомні звички\' – дуже мотивує!',
    'Головне – ставити реальні цілі і нагороджувати себе!',
    'Неймовірний сайт! Заслуговує найвищого балу'
  ]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      setComments([comment, ...comments]); // додаємо новий коментар на початок списку
      setComment(''); // очищаємо поле
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <section id="community">
      <h2>Спільнота</h2>
      <p className="community-description">
        Наша спільнота — це місце для обміну ідеями, порадами та натхненням. Ми віримо, що разом легше досягати цілей!
        Поділись своїм враженням або мотиваційним коментарем нижче.
      </p>
      
      <input 
        type="text" 
        id="comment-input" 
        placeholder="Введіть коментар..." 
        value={comment} 
        onChange={handleCommentChange}
        onKeyDown={handleKeyPress}
      />
      <button id="comment-button" onClick={handleAddComment}>Опублікувати</button>

      <ul id="comment-list">
        {comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </section>
  );
}

export default Community;
