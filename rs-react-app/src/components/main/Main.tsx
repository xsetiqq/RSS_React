import './Main.css';
import { Person } from '../../models/person';
import Error from '../error/ErrorModule';
import { useSearchParams } from 'react-router-dom';
import RightSection from '../../pages/RightSectionPage';
import { useGetPersonDetailsQuery } from '../../store/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { selectItem, unselectItem } from '../../store/selectedItemsSlice';

type MyProps = {
  data: Person[] | undefined;
  isLoading: boolean;
  isError: boolean;
  countPersons: number;
};

const Main = ({ data, isError, isLoading }: MyProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selected
  );

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

  const handleCheckboxChange = (person: Person) => {
    const isSelected = selectedItems.some((item) => item.id === person.url);
    if (isSelected) {
      dispatch(unselectItem(person.url));
    } else {
      dispatch(
        selectItem({
          id: person.url,
          name: person.name,
          description: '',
          url: person.url,
        })
      );
    }
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
                <h3>Select</h3>
              </div>
              <div className="item">
                <h3>Person</h3>
              </div>
              <div className="item">
                <h3>Height</h3>
              </div>
              <div className="item">
                <h3>Gender</h3>
              </div>
            </div>

            {data?.map((person, index) => (
              <div key={index} className="itemRow">
                <hr />
                <div className="itemsName">
                  <div className="item">
                    <input
                      type="checkbox"
                      checked={selectedItems.some(
                        (item) => item.id === person.url
                      )}
                      onChange={() => handleCheckboxChange(person)}
                    />
                  </div>
                  <div
                    className="item"
                    onClick={() => handleItemClick(person.url)}
                  >
                    {person.name}
                  </div>
                  <div
                    className="item"
                    onClick={() => handleItemClick(person.url)}
                  >
                    <div>{person.height} cm</div>
                  </div>
                  <div
                    className="item"
                    onClick={() => handleItemClick(person.url)}
                  >
                    <div>{person.gender}</div>
                  </div>
                </div>
              </div>
            ))}
            <hr />
          </div>
          {detailsId && (
            <RightSection
              detailData={detailData}
              isDetailLoading={isDetailLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
