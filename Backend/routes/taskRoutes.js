const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasksController');

router.get('/tareas/ver', taskController.getAllTareas);
router.get('/tareas/ver/:id', taskController.getTareaById);
router.post('/tareas/crear', taskController.createTarea);
router.put('/tareas/editar/:id', taskController.updateTarea);
router.delete('/tareas/eliminar/:id', taskController.deleteTarea);

module.exports = router;
