// src/components/Goals/Goals.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {
  createGoal,
  getUserGoals,
  updateGoal,
  deleteGoal as deleteGoalFromDb,
} from "../../firebase/filestore";
import Progress from "../Progress/Progress";
import AddGoalModal from "../AddGoalModal/AddGoalModal";
import "./Goals.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserId(user.uid);
        const userGoals = await getUserGoals(user.uid);
        setGoals(userGoals);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        setGoals([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddGoal = async (newGoal) => {
    if (!userId) return;
    const goalWithUser = { ...newGoal, userId, completed: false };
    const savedGoal = await createGoal(goalWithUser);
    setGoals((prev) => [...prev, savedGoal]);
  };

  const handleToggleGoal = async (goal) => {
    if (!goal.id) {
      console.error("Помилка: goal.id відсутній!", goal);
      return;
    }
    await updateGoal(String(goal.id), { completed: !goal.completed });
    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoalFromDb(goalId); 
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId)); 
    } catch (error) {
      console.error("Помилка при видаленні цілі:", error);
    }
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
      {isAuthenticated ? (
        <>
          <div className="filter-container">
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="all">Всі</option>
              <option value="active">Активні</option>
              <option value="completed">Виконані</option>
            </select>
          </div>

          <div className="goal-cards">
            {filteredGoals.map((goal) => (
              <article
                className={`goal-card ${goal.completed ? "completed" : ""}`}
                key={goal.id}
                onClick={() =>
                  navigate(`/goal/${goal.id}`, { state: { ...goal } })
                }
              >
                <img src={goal.imgSrc} alt={goal.title} />
                <h3>{goal.title}</h3>
                <button
                  className="mark-done"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleGoal(goal);
                  }}
                >
                  {goal.completed ? "Виконано" : "Виконати"}
                </button>
                <button
                className="delete-goal"
                onClick={(e) => {
                e.stopPropagation();
                handleDeleteGoal(goal.id);
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

          {showModal && (
            <AddGoalModal
              onClose={() => setShowModal(false)}
              onAddGoal={handleAddGoal}
            />
          )}
        </>
      ) : (
        <div className="guest-message">
          <h2>
            Ласкаво просимо до сервісу <span className="brand">MyGoals</span>!
          </h2>
          <p>
            Цей сервіс допоможе вам планувати, відстежувати та досягати своїх цілей.
          </p>
          <p className="cta">Щоб почати, зареєструйтесь або увійдіть у свій акаунт:</p>
          <div className="auth-actions">
            <button onClick={() => navigate("/register")} className="auth-button register">Зареєструватися</button>
            <button onClick={() => navigate("/login")} className="auth-button">Увійти</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Goals;
