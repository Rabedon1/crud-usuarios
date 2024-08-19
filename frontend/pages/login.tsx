import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Importa useRouter
import styles from '../styles/Login.module.css';

const Login = () => {
  const [correo_electronico, setCorreo_electronico] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [usuario_nombre, setUsuarioNombre] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSuccessMessage, setModalSuccessMessage] = useState('');
  const router = useRouter(); // Crea una instancia del enrutador

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validar campos
    if (!correo_electronico || !contrasenia) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!validateEmail(correo_electronico)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', { // Asegúrate de que esta ruta coincida con la de tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_electronico, contrasenia }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al autenticar. Por favor, verifica tus credenciales.');
      }

      const data = await response.json();
      console.log('Login exitoso:', data);
      setSuccessMessage('Login exitoso!');
      setError('');

      // Guarda el token en el almacenamiento local si se usa JWT
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      // Redirige al usuario a la página de tareas
      router.push('/user'); // Cambia la ruta según sea necesario

    } catch (error: any) {
      setError(error.message);
      setSuccessMessage(''); // Limpiar mensaje de éxito si hay un error
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validar campos del formulario del modal
    if (!nombre || !apellido || !fecha_nacimiento || !correo_electronico || !usuario_nombre || !contrasenia) {
      setModalError('Todos los campos son obligatorios.');
      return;
    }

    if (!validateEmail(correo_electronico)) {
      setModalError('El correo electrónico no es válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/usuarios/crear', { // Asegúrate de que esta ruta coincida con la de tu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, fecha_nacimiento, correo_electronico, usuario_nombre, contrasenia }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al registrar. Por favor, verifica tus datos.');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
      setModalSuccessMessage('Registro exitoso!');
      setModalError('');
      setTimeout(() => {
        setShowModal(false); // Cierra el modal después de un tiempo
        setNombre('');
        setApellido('');
        setFechaNacimiento('');
        setUsuarioNombre('');
        setCorreo_electronico('');
        setContrasenia('');
      }, 2000);

    } catch (error: any) {
      setModalError(error.message);
      setModalSuccessMessage(''); // Limpiar mensaje de éxito si hay un error
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login - Dragon Ball Z</title>
        <meta name="description" content="Página de login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <div className={styles.leftContainer}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Dragon_Ball_Z_logo.svg" alt="Descripción de la imagen" className={styles.image} />
            <h1 className={styles.welcomeTitle}>BIENVENIDO</h1>
            <p className={styles.description}>Desata tu poder Saiyan: Explora el universo de Dragon Ball Z como nunca antes.</p>
          </div>
          <div className={styles.rightContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="correo_electronico">Email</label>
                <input
                  type="email"
                  id="correo_electronico"
                  name="correo_electronico"
                  value={correo_electronico}
                  onChange={(e) => setCorreo_electronico(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="contrasenia">Contraseña</label>
                <input
                  type="password"
                  id="contrasenia"
                  name="contrasenia"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.loginButton}>Ingresar</button>
              <button type="button" className={styles.signupButton} onClick={() => setShowModal(true)}>Registrarse</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}
          </div>
        </div>
      </main>

      {/* Modal de Registro */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister}>
              <div className={styles.inputGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  value={fecha_nacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="usuario_nombre">Nombre de Usuario</label>
                <input
                  type="text"
                  id="usuario_nombre"
                  name="usuario_nombre"
                  value={usuario_nombre}
                  onChange={(e) => setUsuarioNombre(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="modal_correo_electronico">Email</label>
                <input
                  type="email"
                  id="modal_correo_electronico"
                  name="correo_electronico"
                  value={correo_electronico}
                  onChange={(e) => setCorreo_electronico(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="modal_contrasenia">Contraseña</label>
                <input
                  type="password"
                  id="modal_contrasenia"
                  name="contrasenia"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.registerButton}>Registrar</button>
              {modalError && <p className={styles.error}>{modalError}</p>}
              {modalSuccessMessage && <p className={styles.success}>{modalSuccessMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
