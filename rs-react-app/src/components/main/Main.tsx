import { Component } from 'react';
import './Main.css';
import { Planet } from '../../models/planet';
import Error from '../error/ErrorModule';

type MyProps = {
  data: Planet[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export default class Main extends Component<MyProps> {
  componentDidUpdate() {
    console.log(this.props.data);
  }

  render() {
    return (
      <div>
        <div className="mainContainer">
          <h2>Results</h2>
          {this.props.isError ? (
            <Error />
          ) : this.props.isLoading ? (
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
                {this.props.data?.map((planet, index) => {
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
  }
}
