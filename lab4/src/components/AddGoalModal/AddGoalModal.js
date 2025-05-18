import React, { useState } from "react";
import "./AddGoalModal.css";

const AddGoalModal = ({ onClose, onAddGoal }) => {
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    imgSrc: "",
    actions: [],
    completed: false
  });

  const [actionInput, setActionInput] = useState("");

  // Функція для додавання нової дії
  const addAction = () => {
    if (actionInput.trim()) {
      setNewGoal((prev) => ({
        ...prev,
        actions: [...prev.actions, actionInput.trim()]
      }));
      setActionInput("");
    }
  };

  // Функція для обробки вибору файлу
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setNewGoal((prev) => ({ ...prev, imgSrc: localUrl }));
    }
  };

  // Функція для обробки відправлення нової цілі
  const handleSubmit = () => {
    if (newGoal.title && newGoal.description && newGoal.imgSrc) {
      const goalWithId = {
        ...newGoal,
        id: Date.now()
      };
      onAddGoal(goalWithId);
      onClose();
    } else {
      alert("Заповніть всі поля перед збереженням.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Нова ціль</h2>

        <input
          type="text"
          id="goal-title"
          placeholder="Назва"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          autoComplete="off"
        />

        <textarea
          id="goal-description"
          placeholder="Опис"
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          autoComplete="off"
        ></textarea>

        <label htmlFor="file-upload" className="file-upload">
          <span>Завантажте зображення для вашої цілі</span>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {newGoal.imgSrc && (
          <img src={newGoal.imgSrc} alt="preview" className="preview-image" />
        )}

        <div className="actions-section">
       
          <input
            type="text"
            id="action-input"
            placeholder="Нова дія"
            value={actionInput}
            onChange={(e) => setActionInput(e.target.value)}
            autoComplete="off"
          />
          <button className="add-action" onClick={addAction}>Додати дію</button>
          <ul>
            {newGoal.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>

        <div className="modal-buttons">
          <button className="save" onClick={handleSubmit}>Зберегти</button>
          <button className="cancel" onClick={onClose}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;
