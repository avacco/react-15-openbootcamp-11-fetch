import logo from './logo.svg';
import './App.css';
import FetchExample from './components/pure/FetchExample';
import AxiosExample from './components/pure/AxiosExample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*<FetchExample/>*/}
        <AxiosExample/>
      </header>
    </div>
  );
}

export default App;
