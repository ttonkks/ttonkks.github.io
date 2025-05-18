const API_URL = "http://localhost:5000/api/goals";

// Отримати цілі користувача
export const getUserGoals = async (userId) => {
  try {
    console.log("userId", userId); 

    const res = await fetch(`${API_URL}?userId=${userId}`);
    if (!res.ok) throw new Error(`Помилка запиту: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(" getUserGoals error:", error);
    throw new Error("Не вдалося отримати цілі");
  }
};

// Створити нову ціль
export const createGoal = async (goal) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    });
    if (!res.ok) throw new Error(`Помилка створення: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(" createGoal error:", error);
    throw new Error("Не вдалося створити ціль");
  }
};

// Оновити ціль
export const updateGoal = async (goalId, updates) => {
  try {
    const res = await fetch(`${API_URL}/${goalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Помилка оновлення: ${res.status}`);
  } catch (error) {
    console.error(" updateGoal error:", error);
    throw new Error("Не вдалося оновити ціль");
  }
};

// Видалити ціль
export const deleteGoal = async (goalId) => {
  try {
    const res = await fetch(`${API_URL}/${goalId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Помилка видалення: ${res.status}`);
  } catch (error) {
    console.error(" deleteGoal error:", error);
    throw new Error("Не вдалося видалити ціль");
  }
};
