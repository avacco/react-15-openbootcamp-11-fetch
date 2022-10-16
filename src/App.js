import logo from './logo.svg';
import './App.css';
import FetchExample from './components/pure/FetchExample';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FetchExample/>
      </header>
    </div>
  );
}

export default App;
