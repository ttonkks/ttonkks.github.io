import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./GoalDetails.css";
import goalsData from "../../json/jsonDetails.json";

const GoalDetails = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [checkedActions, setCheckedActions] = useState([]);

  useEffect(() => {
    const foundGoal = goalsData.find((g) => g.id === parseInt(id));
    setGoal(foundGoal);
    setCheckedActions([]);
  }, [id]);

  const toggleAction = (index) => {
    setCheckedActions((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleBackButtonClick = () => {
    window.scrollTo(0, 0);
  };

  if (!goal) {
    return <h2 className="error">Ціль не знайдена</h2>;
  }

  return (
    <div className="goals-details-container">
      <div className="goals-cards">
        <img src={goal.imgSrc} alt={goal.title} className="goals-image" />
        <h2 className="goals-title">{goal.title}</h2>
        <p className="goals-description">{goal.description}</p>

        {goal.actions && goal.actions.length > 0 && (
          <div className="goal-actions">
            <h3>Що потрібно зробити:</h3>
            <ul>
              {goal.actions.map((action, index) => (
                <li key={index}>
                  <label className={`action-item ${checkedActions.includes(index) ? "completed" : ""}`}>
                    <input
                      type="checkbox"
                      checked={checkedActions.includes(index)}
                      onChange={() => toggleAction(index)}
                    />
                    {action}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link to="/" className="back-button" onClick={handleBackButtonClick}>Назад до цілей</Link>
      </div>
    </div>
  );
};

export default GoalDetails;
