const Usuario = require('../models/usersModels');

class UsersController {
  // Obtener todos los usuarios
  async getAllUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching usuarios' });
    }
  }

  // Obtener un usuario por ID
  async getUsuarioById(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching usuario' });
    }
  }

  // Crear un nuevo usuario
  async createUsuario(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: 'Error creating usuario' });
    }
  }

  // Actualizar un usuario existente
  async updateUsuario(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.update(req.body);
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error updating usuario' });
    }
  }

  // Eliminar un usuario
  async deleteUsuario(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Usuario not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting usuario' });
    }
  }

  // Endpoint para el login
  async login(req, res) {
    const { correo_electronico, contrasenia } = req.body;

    try {
      // Buscar el usuario por correo electrónico
      const usuario = await Usuario.findOne({ where: { correo_electronico } });

      if (!usuario) {
        return res.status(401).json({ error: 'Usuario inválido' });
      }

      // Comparar las contraseñas en texto claro
      if (usuario.contrasenia !== contrasenia) {
        return res.status(401).json({ error: 'Contraseña inválida' });
      }

      // Autenticación exitosa
      // Puedes generar un token JWT aquí si estás usando autenticación basada en tokens
      res.status(200).json({ message: 'Login exitoso' });

    } catch (error) {
      console.error('Error en la autenticación:', error);
      res.status(500).json({ error: 'Error en la autenticación' });
    }
  }
}

module.exports = new UsersController();
