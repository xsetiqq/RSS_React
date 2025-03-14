import { Link } from 'react-router-dom';
import CardComponent from '../components/CardsComponents';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from '../styles/Homepage.module.css';

export default function Homepage() {
  const users = useSelector((state: RootState) => state.form.users);

  return (
    <div className={styles.homeContainer}>
      <h2>Welcome to the home page!</h2>
      <p>Select one of the forms to fill out.</p>

      <div className={styles.buttonContainer}>
        <Link to="/react-hook-form">
          <button className={styles.button}>Форма React Hook Form</button>
        </Link>

        <Link to="/uncontrolled-form">
          <button className={styles.button}>Uncontrolled Form</button>
        </Link>
      </div>

      <hr />

      {users.length > 0 ? (
        <CardComponent />
      ) : (
        <p className={styles.dataMessage}>
          This is where the data cards will appear . . .
        </p>
      )}
    </div>
  );
}
