import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from './CardComponent.module.css';

const CardComponent: React.FC = () => {
  const users = useSelector((state: RootState) => state.form.users);
  const [highlightedUser, setHighlightedUser] = useState<string | null>(null);

  useEffect(() => {
    if (users.length > 0) {
      const lastUser = users[users.length - 1];
      setHighlightedUser(lastUser.email);

      const timeout = setTimeout(() => {
        setHighlightedUser(null);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [users]);

  return (
    <div className={styles.cardContainer}>
      {users.map((user, index) => (
        <div
          key={index}
          className={`${styles.card} ${
            highlightedUser === user.email ? styles.highlight : ''
          }`}
        >
          <h3>{user.name}</h3>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Country:</strong> {user.country}
          </p>
          <p>
            <strong>Accepted Terms:</strong> {user.acceptTerms ? 'Yes' : 'No'}
          </p>
          {user.picture && (
            <img src={user.picture} alt="User" className={styles.userImage} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
