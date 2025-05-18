const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const goalsRoutes = require('./routes/goals');

const app = express();
const PORT = process.env.PORT || 5000;

// Лог при запуску
console.log(" Registering middleware and routes");

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Роут
app.use('/api/goals', goalsRoutes);

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
