import { Component } from 'react';

export default class ErrorComponent extends Component<
  object,
  { throwError: boolean }
> {
  constructor(props: object) {
    super(props);
    this.state = { throwError: false };
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('This is a test error!');
    }

    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}
