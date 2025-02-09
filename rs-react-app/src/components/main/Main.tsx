import './Main.css';
import { DetailPerson, Person } from '../../models/person';
import Error from '../error/ErrorModule';
import { useSearchParams } from 'react-router-dom';
import RightSection from '../../pages/RightSectionPage';
import { fetchDetailsData } from '../../utils/api';
import { useState } from 'react';

type MyProps = {
  data: Person[] | undefined;
  isLoading: boolean;
  isError: boolean;
  countPersons: number;
};

const Main = ({ data, isError, isLoading }: MyProps) => {
  const [detailData, setdetailData] = useState<DetailPerson>({
    name: '',
    mass: 0,
    hair_color: '',
    url: '',
    eye_color: '',
    gender: '',
  });
  const [isDetailLoading, setisDetailLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const handleItemClick = async (url: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchParams.get('details')) {
      newSearchParams.delete('details');
      setSearchParams(newSearchParams);
      return;
    }
    setisDetailLoading(true);
    const result = await fetchDetailsData(url);
    console.log(result);
    if (!result.data) return;
    const splittedUrl = result.data.url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];
    console.log(id);
    setdetailData(result.data);
    newSearchParams.set('details', String(id));
    setSearchParams(newSearchParams);
    setisDetailLoading(false);
  };

  return (
    <div className="mainContainer">
      <h2>Results</h2>
      {isError ? (
        <Error />
      ) : isLoading || isDetailLoading ? (
        <img src=".\src\assets\ring-resize.svg" alt="loading..." />
      ) : (
        <div className="Items">
          <div className="wertical-column">
            <div className="itemsName">
              <div className="item">
                <h3>Persone</h3>
              </div>
              <div className="item">
                <h3>Height</h3>
              </div>
              <div className="item">
                <h3>Gender</h3>
              </div>
            </div>
            {data?.map((person, index) => (
              <div key={index} onClick={() => handleItemClick(person.url)}>
                <hr />
                <div className="itemsName">
                  <div className="item">{person.name}</div>
                  <div className="item">
                    <div>{person.height} cm</div>
                  </div>
                  <div className="item">
                    <div>{person.gender}</div>
                  </div>
                </div>
              </div>
            ))}
            <hr />
          </div>
          {detailsId && <RightSection detailData={detailData} />}
        </div>
      )}
    </div>
  );
};

export default Main;
