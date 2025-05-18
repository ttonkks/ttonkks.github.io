import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./GoalDetails.css";

const GoalDetails = () => {
  const { state } = useLocation();
  const [selectedActions, setSelectedActions] = useState([]);

  const description = state?.description || "Опис не знайдено";
  const imgSrc = state?.imgSrc || ""; 
  const title = state?.title || "Немає назви";
  const actions = state?.actions || [];

  const handleActionSelect = (action) => {
    // Перевіряємо, чи вже вибрана дія
    setSelectedActions((prevSelectedActions) => {
      if (prevSelectedActions.includes(action)) {
        // Якщо вибрано, то скидаємо вибір
        return prevSelectedActions.filter((item) => item !== action);
      } else {
        // Якщо не вибрано, додаємо до списку вибраних
        return [...prevSelectedActions, action];
      }
    });
  };

  return (
    <div className="goals-details-container">
      <div className="goals-cards">
        <h2>{title}</h2>
        {imgSrc && <img src={imgSrc} alt="Зображення цілі" className="goal-image" />}
        <p className="goals-description">{description}</p>

        <div className="goal-actions">
          <h3>Дії:</h3>
          <ul>
            {actions.length > 0 ? (
              actions.map((action, index) => (
                <li
                  key={index}
                  className={selectedActions.includes(action) ? "selected-action" : ""}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedActions.includes(action)}
                      onChange={() => handleActionSelect(action)}
                    />
                    {action}
                  </label>
                </li>
              ))
            ) : (
              <li>Дії не задані.</li>
            )}
          </ul>
        </div>

        <Link to="/" className="back-button">Назад до цілей</Link>
      </div>
    </div>
  );
};

export default GoalDetails;
