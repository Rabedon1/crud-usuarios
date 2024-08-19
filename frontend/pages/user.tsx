import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Link from 'next/link'; // Importa el componente Link
import styles from '../styles/User.module.css';

Modal.setAppElement('#__next'); // Para accesibilidad, especifica el elemento raíz de tu aplicación

interface User {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  correo_electronico: string;
  usuario_nombre: string;
  contrasenia: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<{
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    correo_electronico: string;
    usuario_nombre: string;
    contrasenia: string;
  }>({
    nombre: '',
    apellido: '',
    fecha_nacimiento: new Date(),
    correo_electronico: '',
    usuario_nombre: '',
    contrasenia: ''
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [deleteSuccessModalIsOpen, setDeleteSuccessModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/ver');
      const data = await response.json();
      setUsers(data.map((user: any) => ({
        ...user,
        fecha_nacimiento: new Date(user.fecha_nacimiento) // Convertir cadena a Date
      })));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await fetch('http://localhost:3000/api/usuarios/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          fecha_nacimiento: newUser.fecha_nacimiento.toISOString(), // Convertir Date a cadena ISO
          correo_electronico: newUser.correo_electronico,
          usuario_nombre: newUser.usuario_nombre,
          contrasenia: newUser.contrasenia
        }),
      });
      setNewUser({
        nombre: '',
        apellido: '',
        fecha_nacimiento: new Date(),
        correo_electronico: '',
        usuario_nombre: '',
        contrasenia: ''
      });
      fetchUsers();
      closeModal();
      setSuccessModalIsOpen(true); // Mostrar modal de éxito
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const handleEditUser = async () => {
    if (editingUser) {
      try {
        await fetch(`http://localhost:3000/api/usuarios/editar/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...editingUser,
            nombre: newUser.nombre,
            apellido: newUser.apellido,
            fecha_nacimiento: newUser.fecha_nacimiento.toISOString(), // Convertir Date a cadena ISO
            correo_electronico: newUser.correo_electronico,
            usuario_nombre: newUser.usuario_nombre,
            contrasenia: newUser.contrasenia
          }),
        });
        setEditingUser(null);
        fetchUsers();
        closeModal();
        setSuccessModalIsOpen(true); // Mostrar modal de éxito
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/usuarios/eliminar/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
      setDeleteSuccessModalIsOpen(true); // Mostrar modal de éxito de eliminación
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const openModal = (user?: User) => {
    setEditingUser(user || null);
    setIsEditing(!!user);
    setModalIsOpen(true);
    if (user) {
      setNewUser({
        nombre: user.nombre,
        apellido: user.apellido,
        fecha_nacimiento: new Date(user.fecha_nacimiento), // Convertir cadena a Date
        correo_electronico: user.correo_electronico,
        usuario_nombre: user.usuario_nombre,
        contrasenia: user.contrasenia
      });
    } else {
      setNewUser({
        nombre: '',
        apellido: '',
        fecha_nacimiento: new Date(),
        correo_electronico: '',
        usuario_nombre: '',
        contrasenia: ''
      });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingUser(null);
    setNewUser({
      nombre: '',
      apellido: '',
      fecha_nacimiento: new Date(),
      correo_electronico: '',
      usuario_nombre: '',
      contrasenia: ''
    });
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  const closeDeleteSuccessModal = () => {
    setDeleteSuccessModalIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestor de Usuarios</h1>
      </div>

      <div className={styles.section}>
        <button className={`${styles.button} ${styles.addButton}`} onClick={() => openModal()}>Crear nuevo Usuario</button>
        {/* Botón para redirigir a la página de caracteres */}
        <Link href="/characters" className={`${styles.button} ${styles.addButton}`}>
          Ir a personajes
        </Link>

      </div>

      <div className={styles.section}>
        <h2>Lista de Usuarios</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nacimiento</th>
              <th>Correo Electrónico</th>
              <th>Nombre de Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{new Date(user.fecha_nacimiento).toLocaleDateString()}</td>
                <td>{user.correo_electronico}</td>
                <td>{user.usuario_nombre}</td>
                <td>
                  <button className={`${styles.button} ${styles.editButton}`} onClick={() => openModal(user)}>Editar</button>
                  <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>{isEditing ? 'Editar Usuario' : 'Crear nuevo Usuario'}</h2>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Nombre"
          value={newUser.nombre}
          onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Apellido"
          value={newUser.apellido}
          onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
        />
        <input
          type="date"
          className={styles.inputField}
          value={newUser.fecha_nacimiento.toISOString().split('T')[0]} // Mostrar solo la parte de la fecha
          onChange={(e) => setNewUser({ ...newUser, fecha_nacimiento: new Date(e.target.value) })}
        />
        <input
          type="email"
          className={styles.inputField}
          placeholder="Correo Electrónico"
          value={newUser.correo_electronico}
          onChange={(e) => setNewUser({ ...newUser, correo_electronico: e.target.value })}
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Nombre de Usuario"
          value={newUser.usuario_nombre}
          onChange={(e) => setNewUser({ ...newUser, usuario_nombre: e.target.value })}
        />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Contraseña"
          value={newUser.contrasenia}
          onChange={(e) => setNewUser({ ...newUser, contrasenia: e.target.value })}
        />
        <button
          className={`${styles.button} ${styles.saveButton}`}
          onClick={isEditing ? handleEditUser : handleAddUser}
        >
          {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
        <button className={`${styles.button} ${styles.cancelButton}`} onClick={closeModal}>Cancelar</button>
      </Modal>

      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Éxito</h2>
        <p>La operación se realizó con éxito.</p>
        <button className={styles.button} onClick={closeSuccessModal}>Cerrar</button>
      </Modal>

      <Modal
        isOpen={deleteSuccessModalIsOpen}
        onRequestClose={closeDeleteSuccessModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Éxito</h2>
        <p>El usuario fue eliminado correctamente.</p>
        <button className={styles.button} onClick={closeDeleteSuccessModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default UsersPage;
