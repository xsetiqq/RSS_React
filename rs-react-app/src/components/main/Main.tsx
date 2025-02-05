import './Main.css';
import { Planet } from '../../models/planet';
import Error from '../error/ErrorModule';

type MyProps = {
  data: Planet[] | undefined;
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
                  <h3>Planet name</h3>
                </div>
                <div className="item">
                  <h3>Terrain type</h3>
                </div>
              </div>
              {data?.map((planet, index) => {
                return (
                  <div key={index}>
                    <hr />
                    <div className="itemsName">
                      <div className="item">{planet.name}</div>
                      <div className="item">{planet.terrain}</div>
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
