
import './App.css';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CreateMatch from './components/CreateMatch';
import CreateTournament from './components/CreateTournament';
function App() {
  return (
    <div className="App">
        <h1>Hihihi</h1>
        <CreateTournament />
    </div>
  );
}

export default App;
