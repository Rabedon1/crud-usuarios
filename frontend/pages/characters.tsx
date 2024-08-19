import { useEffect, useState } from 'react';
import styles from '../styles/Character.module.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://dragonball-api.com/api/characters');
        const data = await response.json();
        setCharacters(data.items);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Dragon Ball Characters</h1>
      <div className={styles.cardContainer}>
        {characters.map((character) => (
          <div key={character.id} className={styles.card}>
            <img src={character.image} alt={character.name} className={styles.image} />
            <h2>{character.name}</h2>
            <p><strong>Race:</strong> {character.race}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Ki:</strong> {character.ki}</p>
            <p><strong>Description:</strong> {character.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
