'use client';
import styles from './RightSectionPage.module.css';
import { DetailPerson } from '../../models/person';

type MyProps = {
  detailData: DetailPerson | undefined;
  isDetailLoading: boolean;
};

const RightSection = ({ detailData, isDetailLoading }: MyProps) => {
  const closeDetails = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('details');

    window.history.pushState({}, '', `?${currentParams.toString()}`);

    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (isDetailLoading) {
    return (
      <div className={styles.rightSection}>
        <button className={styles.closeBtn} onClick={closeDetails}>
          ×
        </button>
        <h2>Details</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!detailData) {
    return (
      <div className={styles.rightSection}>
        <button className={styles.closeBtn} onClick={closeDetails}>
          ×
        </button>
        <h2>Details</h2>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={styles.rightSection}>
      <button className={styles.closeBtn} onClick={closeDetails}>
        ×
      </button>
      <h2>Details</h2>
      <div className={styles.detailsContent}>
        <p>{`Name: ${detailData.name}`}</p>
        <p>{`Gender: ${detailData.gender}`}</p>
        <p>{`Mass: ${detailData.mass}`}</p>
        <p>{`Hair color: ${detailData.hair_color}`}</p>
        <p>{`Eye color: ${detailData.eye_color}`}</p>
      </div>
    </div>
  );
};

export default RightSection;
