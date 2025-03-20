import React from 'react';
import { Country } from '../api/types';
import styles from './CountryCard.module.css';

interface Props {
  country: Country;
  visited: boolean;
  toggleVisited: (code: string) => void;
}

const CountryCard: React.FC<Props> = ({ country, visited, toggleVisited }) => {
  const capital = country.capital?.[0] || 'No Capital';
  const [lat, lng] = country.latlng;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div
      className={styles.card}
      onClick={() => toggleVisited(country.cca3)}
      style={{ backgroundColor: visited ? '#e0f7fa' : '#e7e7e7' }}
    >
      <div className={styles.left}>
        <img
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
          className={styles.flag}
        />
        <div className={styles.info}>
          <span className={styles.name}>{country.name.common}</span>
          <span className={styles.detail}>Capital: {capital}</span>
          <span className={styles.detail}>Region: {country.region}</span>
          <span className={styles.detail}>
            Population: {country.population.toLocaleString()}
          </span>
        </div>
      </div>

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mapButton}
        onClick={(e) => e.stopPropagation()}
      >
        View on Google Maps
      </a>
    </div>
  );
};

export default React.memo(CountryCard);
