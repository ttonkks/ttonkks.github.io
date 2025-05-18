
import { v4 as uuidv4 } from 'uuid'; 
import {
  collection,
  doc,
  setDoc,  
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

// Створення нової цілі
export const createGoal = async (goal) => {
  const id = uuidv4(); 
  const goalWithId = { ...goal, id }; 
  const goalRef = doc(db, "goals", id); 
  await setDoc(goalRef, goalWithId); 
  return { id, ...goalWithId }; 
};

// Отримання цілі за ID
export const getGoalById = async (id) => {
  const docRef = doc(db, "goals", id);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id, ...snap.data() } : null;
};

// Отримання всіх цілей користувача
export const getUserGoals = async (userId) => {
  const q = query(collection(db, "goals"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Оновлення цілі
export const updateGoal = async (id, updates) => {
  await updateDoc(doc(db, "goals", id), updates);
};

// Видалення цілі
export const deleteGoal = async (id) => {
  await deleteDoc(doc(db, "goals", id));
};
