const express = require('express');
const admin = require('../db/firebaseAdmin');
const router = express.Router();
const db = admin.firestore();

// Отримати цілі користувача
router.get('/', async (req, res) => {
  const { userId } = req.query;
  console.log("[GET] /api/goals | userId:", userId);

  if (!userId) {
    console.warn(" userId is missing in query");
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const snapshot = await db.collection('goals')
      .where('userId', '==', userId)
      .get();

    const goals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(` Found ${goals.length} goals for userId: ${userId}`);
    res.json(goals);
  } catch (err) {
    console.error("Error retrieving goals:", err);
    res.status(500).send('Error retrieving goals');
  }
});

// Створити ціль
router.post('/', async (req, res) => {
  const { userId, title, description, imgSrc, actions, completed } = req.body;
  const completedAt = new Date();

  console.log(" [POST] /api/goals | body:", req.body);

  try {
    const docRef = await db.collection('goals').add({
      userId,
      title,
      description: description || "",
      imgSrc: imgSrc || "",
      actions: actions || [],
      completed: completed || false,
      completedAt,
    });

    console.log(" Goal created with ID:", docRef.id);

    res.status(201).json({
      id: docRef.id,
      userId,
      title,
      description,
      imgSrc,
      actions,
      completed,
      completedAt
    });
  } catch (err) {
    console.error(" Error saving goal:", err);
    res.status(500).send('Error saving goal');
  }
});

// Оновити ціль
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  console.log(` [PUT] /api/goals/${id} | updates:`, updates);

  try {
    await db.collection('goals').doc(id).update(updates);
    console.log(" Goal updated:", id);
    res.status(200).send('Goal updated');
  } catch (err) {
    console.error(" Error updating goal:", err);
    res.status(500).send('Error updating goal');
  }
});

// Видалити ціль
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  console.log(` [DELETE] /api/goals/${id}`);

  try {
    await db.collection('goals').doc(id).delete();
    console.log(" Goal deleted:", id);
    res.status(200).send('Goal deleted');
  } catch (err) {
    console.error(" Error deleting goal:", err);
    res.status(500).send('Error deleting goal');
  }
});

module.exports = router;
