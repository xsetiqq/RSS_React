import CountryList from './components/CountryList';
import styles from './App.module.css';
const App = () => {
  return (
    <div className={styles.appCards}>
      <h1>𝒞𝑜𝓊𝓃𝓉𝓇𝒾𝑒𝓈 𝐿𝒾𝓈𝓉</h1>
      <CountryList />
    </div>
  );
};

export default App;
