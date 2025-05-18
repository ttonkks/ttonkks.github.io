import React from "react";
import "./Progress.css";

function Progress({ completedGoals, totalGoals }) {
  const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <section id="progress">
      <h2>Прогрес</h2>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <p className="progress-text">Прогрес: {progressPercentage}%</p>
    </section>
  );
}

export default Progress;
 