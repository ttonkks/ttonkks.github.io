import React, { useState, useEffect } from "react";
import Progress from "../Progress/Progress";
import Community from "../Community/Community";
import AddGoalModal from "../AddGoalModal/AddGoalModal";
import "./Goals.css";
import goalsData from "../../json/goalsData.json"; 

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    setGoals(goalsData);
  }, []);

  const toggleGoal = (index) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (index) => {
    setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
  };

  const addGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const filteredGoals = goals.filter((goal) =>
    filter === "all"
      ? true
      : filter === "completed"
      ? goal.completed
      : !goal.completed
  );

  const completedGoals = goals.filter((goal) => goal.completed).length;
  const totalGoals = goals.length;

  return (
    <section id="goals">
      <div className="filter-container">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">Всі</option>
          <option value="active">Активні</option>
          <option value="completed">Виконані</option>
        </select>
      </div>

      <div className="goal-cards">
        {filteredGoals.map((goal, index) => (
          <article
            className={`goal-card ${goal.completed ? "completed" : ""}`}
            key={goal.id}
            onClick={() => (window.location.href = `/goal/${goal.id}`)}
          >
            <img src={goal.imgSrc} alt={goal.title} />
            <h3>{goal.title}</h3>
            <button
              className="mark-done"
              onClick={(e) => {
                e.stopPropagation();
                toggleGoal(index);
              }}
            >
              {goal.completed ? "Виконано" : "Виконати"}
            </button>
            <button
              className="delete-goal"
              onClick={(e) => {
                e.stopPropagation();
                deleteGoal(index);
              }}
            >
              ✖
            </button>
          </article>
        ))}

        <article className="goal-card add-goal" onClick={() => setShowModal(true)}>
          <div className="plus-sign">+</div>
          <h3>Додати ціль</h3>
        </article>
      </div>

      <Progress completedGoals={completedGoals} totalGoals={totalGoals} />
      <Community />

      {showModal && (
        <AddGoalModal
          onClose={() => setShowModal(false)}
          onAddGoal={addGoal}
        />
      )}
    </section>
  );
};

export default Goals;
