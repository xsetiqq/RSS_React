import { Component, ReactNode } from 'react';
import './App.css';
import Topcontrols from './components/header/TopControls';
import Main from './components/main/Main';
import { fetchData } from './utils/api';
class App extends Component {
  state = { data: [], isLoading: false };

  componentDidUpdate(): void {
    console.log(this.state);
  }
  getApiData = async (searchTerm: string) => {
    this.setState({ data: this.state.data, isLoading: true });
    const data = await fetchData(searchTerm);
    this.setState({ data, isLoading: false });
  };

  render(): ReactNode {
    return (
      <>
        <Topcontrols getApiData={this.getApiData} />
        <Main data={this.state.data} isLoading={this.state.isLoading} />
      </>
    );
  }
}

export default App;
