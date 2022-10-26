
//<CreateMatch />
//<ViewMatches />
//<CreateTournament/>
//<TournamentDisplays/>
import './App.css';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CreateMatch from './components/CreateMatch';
import CreateTournament from './components/CreateTournament';
import ViewMatches from './components/ViewMatches';
import TournamentDisplays from './components/TournamentDisplay';
function App() {
  return (
    <div className="App">
        <h1>World Cup Online</h1>
        <ViewMatches />
    </div>
  );
}

export default App;
