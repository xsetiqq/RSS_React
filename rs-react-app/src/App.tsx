import { Component, ReactNode } from 'react';
import './App.css';
import Topcontrols from './components/header/TopControls';
import Main from './components/main/Main';
import { fetchData } from './utils/api';
class App extends Component {
  state = { data: [], isLoading: false, isError: false };

  componentDidUpdate(): void {
    console.log(this.state);
  }
  getApiData = async (searchTerm: string) => {
    this.setState({ data: this.state.data, isLoading: true, isError: false });
    const data = await fetchData(searchTerm);
    console.log(data);
    this.setState({ data: data.data, isLoading: false, isError: data.isError });
  };

  render(): ReactNode {
    return (
      <>
        <Topcontrols getApiData={this.getApiData} />
        <Main
          data={this.state.data}
          isLoading={this.state.isLoading}
          isError={this.state.isError}
        />
      </>
    );
  }
}

export default App;
