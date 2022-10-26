
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import CreateMatch from './components/CreateMatch';
import ViewMatches from './components/ViewMatches';
import CreateTournament from './components/CreateTournament';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">World Cup Online</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/create-tournament">Tournament</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/view-match">Match</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/create-match" element={<CreateMatch />}>
          </Route>
          <Route path='/create-tournament' element={<CreateTournament />}>
          </Route>
          <Route path='/view-match' element={<ViewMatches />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
