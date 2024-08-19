const Tarea = require('../models/tasksModels');

class TasksController {
  // Obtener todos los Tareas
  async getAllTareas(req, res) {
    try {
      const tareas = await Tarea.findAll();
      res.json(tareas);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tareas' });
    }
  }

  // Obtener un Tarea por ID
  async getTareaById(req, res) {
    try {
      const tarea = await Tarea.findByPk(req.params.id);
      if (tarea) {
        res.json(tarea);
      } else {
        res.status(404).json({ error: 'Tarea not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tarea' });
    }
  }

  // Crear un nuevo tarea
  async createTarea(req, res) {
    try {
      const tarea = await Tarea.create(req.body);
      res.status(201).json(tarea);
    } catch (error) {
      res.status(400).json({ error: 'Error creating tarea' });
    }
  }

  // Actualizar un tarea existente
  async updateTarea(req, res) {
    try {
      const tarea = await Tarea.findByPk(req.params.id);
      if (tarea) {
        await tarea.update(req.body);
        res.json(tarea);
      } else {
        res.status(404).json({ error: 'Tarea not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error updating tarea' });
    }
  }

  // Eliminar un tarea
  async deleteTarea(req, res) {
    try {
      const tarea = await Tarea.findByPk(req.params.id);
      if (tarea) {
        await tarea.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Tarea not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting tarea' });
    }
  }
}

module.exports = new TasksController();
