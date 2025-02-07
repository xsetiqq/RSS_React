import './Main.css';
import { Person } from '../../models/person';
import Error from '../error/ErrorModule';

type MyProps = {
  data: Person[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const Main = ({ data, isError, isLoading }: MyProps) => {
  return (
    <div>
      <div className="mainContainer">
        <h2>Results</h2>
        {isError ? (
          <Error />
        ) : isLoading ? (
          <img src=".\src\assets\ring-resize.svg" alt="loading..."></img>
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
              {data?.map((person, index) => {
                return (
                  <div key={index}>
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
                );
              })}
              <hr />
            </div>
            <div className="itemsDescription"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
