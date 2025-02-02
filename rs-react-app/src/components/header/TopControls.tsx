import { ChangeEvent, Component } from 'react';
import './TopControls.css';

interface SearchState {
  query: string;
}
interface TopControlsProps {
  getApiData: (searchTerm: string) => Promise<void>;
}

export default class Topcontrols extends Component<
  TopControlsProps,
  SearchState
> {
  constructor(props: TopControlsProps) {
    super(props);
    const lastQuery = localStorage.getItem('lastSearch') || '';
    this.state = {
      query: lastQuery,
    };
    console.log(this.props);
  }

  componentDidMount(): void {
    this.props.getApiData(this.state.query);
  }

  handleSearch = (): void => {
    const { query } = this.state;
    if (query.trim() === '') return;

    localStorage.setItem('lastSearch', query);
    this.setState({ query });
    this.props.getApiData(query);
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <h2>Top controls</h2>
        <div className="TopControls">
          <input
            type="search"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder={this.state.query}
            className="search-input"
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    );
  }
}
