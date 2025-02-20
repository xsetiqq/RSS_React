import './Main.css';
import { Person } from '../../models/person';
import Error from '../error/ErrorModule';
import { useSearchParams } from 'react-router-dom';
import RightSection from '../../pages/RightSectionPage';
import { useGetPersonDetailsQuery } from '../../store/apiSlice';

type MyProps = {
  data: Person[] | undefined;
  isLoading: boolean;
  isError: boolean;
  countPersons: number;
};

const Main = ({ data, isError, isLoading }: MyProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');

  const {
    data: detailData,
    isLoading: isDetailLoading,
    error,
  } = useGetPersonDetailsQuery(detailsId ? `people/${detailsId}/` : '', {
    skip: !detailsId,
  });

  const handleItemClick = (url: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get('details')) {
      newSearchParams.delete('details');
      setSearchParams(newSearchParams);
      return;
    }

    const splittedUrl = url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];
    newSearchParams.set('details', String(id));
    setSearchParams(newSearchParams);
  };

  return (
    <div className="mainContainer">
      <h2>Results</h2>
      {isError || error ? (
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
          {detailsId && detailData && <RightSection detailData={detailData} />}
        </div>
      )}
    </div>
  );
};

export default Main;
