import { useSearchParams } from 'react-router-dom';
import './RightSectionPage.css';
import { DetailPerson } from '../models/person';

type MyProps = {
  detailData: DetailPerson | undefined;
  isDetailLoading: boolean;
};

const RightSection = ({ detailData, isDetailLoading }: MyProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const closeDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    setSearchParams(newSearchParams);
  };

  if (isDetailLoading) {
    return (
      <div className="right-section">
        <button className="close-btn" onClick={closeDetails}>
          ×
        </button>
        <h2>Details</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!detailData) {
    return (
      <div className="right-section">
        <button className="close-btn" onClick={closeDetails}>
          ×
        </button>
        <h2>Details</h2>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="right-section">
      <button className="close-btn" onClick={closeDetails}>
        ×
      </button>
      <h2>Details</h2>
      <div>
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
