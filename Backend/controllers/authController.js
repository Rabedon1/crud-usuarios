// controllers/authController.js
const Usuario = require('../models/usersModels');

class AuthController {
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

module.exports = new AuthController();
