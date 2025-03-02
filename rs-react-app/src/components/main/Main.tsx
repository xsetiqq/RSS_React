'use client';
import styles from './Main.module.css';
import { Person } from '../../models/person';
import Error from '../error/ErrorModule';
import RightSection from './RightSectionPage';
import { useGetPersonDetailsQuery } from '../../store/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { selectItem, unselectItem } from '../../store/selectedItemsSlice';
import Flyout from './Flyout';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type MyProps = {
  data: Person[] | undefined;
  isLoading: boolean;
  isError: boolean;
  countPersons: number;
  getApiData: (newSearchTerm: string) => void;
};

const Main = ({ data, isError, isLoading, getApiData }: MyProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    getApiData(searchQuery);
  }, [getApiData, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      getApiData(searchQuery);
    }
  }, [getApiData, searchQuery]);

  const [detailsId, setDetailsId] = useState<string | null>(
    searchParams.get('details')
  );

  useEffect(() => {
    const handlePopState = () => {
      setDetailsId(new URLSearchParams(window.location.search).get('details'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    const splittedUrl = url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];

    const params = new URLSearchParams(window.location.search);
    params.set('details', id);

    window.history.pushState({}, '', `?${params.toString()}`);
    setDetailsId(id);
    window.dispatchEvent(new PopStateEvent('popstate'));
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
    <>
      <div className={styles.mainContainer}>
        <h2>Results</h2>
        {isError || error ? (
          <Error />
        ) : isLoading || isDetailLoading ? (
          <img src="/assets/ring-resize.svg" alt="loading..." />
        ) : (
          <div className={styles.items}>
            <div className={styles.werticalColumn}>
              <div className={styles.itemsName}>
                <div className={styles.item}>
                  <h3>Select</h3>
                </div>
                <div className={styles.item}>
                  <h3>Person</h3>
                </div>
                <div className={styles.item}>
                  <h3>Height</h3>
                </div>
                <div className={styles.item}>
                  <h3>Gender</h3>
                </div>
              </div>

              {data?.map((person, index) => (
                <div key={index} className={styles.itemRow}>
                  <hr />
                  <div className={styles.itemsName}>
                    <div className={styles.item}>
                      <input
                        type="checkbox"
                        checked={selectedItems.some(
                          (item) => item.id === person.url
                        )}
                        onChange={() => handleCheckboxChange(person)}
                      />
                    </div>
                    <div
                      className={styles.item}
                      onClick={() => handleItemClick(person.url)}
                    >
                      {person.name}
                    </div>
                    <div
                      className={styles.item}
                      onClick={() => handleItemClick(person.url)}
                    >
                      <div>{person.height} cm</div>
                    </div>
                    <div
                      className={styles.item}
                      onClick={() => handleItemClick(person.url)}
                    >
                      <div>{person.gender}</div>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
            </div>

            {isLoading ? (
              <img src="/assets/ring-resize.svg" alt="loading..." />
            ) : (
              detailsId && (
                <RightSection
                  detailData={detailData}
                  isDetailLoading={isDetailLoading}
                />
              )
            )}
          </div>
        )}
      </div>
      <Flyout />
    </>
  );
};

export default Main;
