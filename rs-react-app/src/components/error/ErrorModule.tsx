import { Component } from 'react';
import './error.css';

export default class Error extends Component {
  render() {
    return (
      <div className="error">
        <img src=".\src\assets\alert.png" alt="" width={100} />
        <h1>Oops! something went wrong</h1>
      </div>
    );
  }
}
