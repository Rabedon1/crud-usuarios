const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/database');

app.use(cors());
app.use(express.json());  // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios

app.use('/api', userRoutes);  // Rutas API prefijadas con '/api'
app.use('/api', taskRoutes);

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
