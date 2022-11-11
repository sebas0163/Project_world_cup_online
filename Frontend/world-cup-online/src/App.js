import './App.css';
import React, { useState } from "react";
import { Link, Routes, Route, Outlet } from 'react-router-dom';
import CreateMatch from './components/match/CreateMatch';
import CreateTournament from './components/tournament/CreateTournament';
import Home from './components/home';
import ViewMatches from './components/match/ViewMatches';
import TournamentDisplays from './components/tournament/TournamentDisplay';
import CreateStage from './components/tournament/CreateStage'
import PositionsTable from './components/PositionsTable'
import ParticipantTeams from './components/tournament/ParticipantTeams';
import Login from './components/login';
import CreatePrediction from './components/prediction/CreatePrediction';
import Tournament from './components/tournament/Tournament';
import ViewPredictions from './components/prediction/ViewPredictions';
import ActiveTournaments from './components/tournament/ActiveTournaments';
import ActiveMatches from './components/match/ActiveMatches';

export default function App() {

  const [tournament, setTournament] = useState(null);
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);

  /**
   * When the user clicks on a tournament, set the tournament to the one that was clicked on.
   * @param [tournament=null] - The tournament object that was selected.
   */
  async function selectTournament(tournament = null) {
    setTournament(tournament);
  }
  async function selectUser(user = null) {
    setUser(user);
  }
  async function selectMatch(match = null) {
    setMatch(match);
  }

  return (
    <div className="App">

      <Routes>
        <Route element={<InitContainer />}>
          <Route exact path="/" element={<Login select={selectUser} />} />
        </Route>
        <Route element={<DefaultContainer />}>
          <Route path="/home" element={<Home user={user}
            selectTournament={selectTournament} selectMatch={selectMatch} />}>
          </Route>
          <Route path="/tournament" element={<Tournament tournament={tournament} select={selectMatch} />}></Route>
          <Route path="/tournaments" element={<ActiveTournaments selectTournament={selectTournament} />}></Route>
          <Route path="/matches" element={<ActiveMatches selectMatch={selectMatch} />}></Route>
          <Route path="/create-match" element={<CreateMatch />}>
          </Route>
          <Route path='/create-tournament' element={<CreateTournament />}>
          </Route>
          <Route path='/view-match' element={<ViewMatches />}>
          </Route>
          <Route path='/tournament-display' element={<TournamentDisplays select={selectTournament} />}>
          </Route>
          <Route path='/create-stage' element={<CreateStage />}>
          </Route>
          <Route path='/scoreboard' element={<PositionsTable />}>
          </Route>
          <Route path='/assignment' element={<ParticipantTeams />}>
          </Route>
          <Route path='/create-prediction' element={<CreatePrediction user={user} match={match} />}>
          </Route>
          <Route path='/view-prediction' element={<ViewPredictions />}>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

const InitContainer = () => (
  <div className="container-fluid">
    <Outlet />
  </div>
)

const DefaultContainer = () => (
  <>
    <div id='defaultContainer' className="container-fluid p-0">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id='navbar'>
        <div class="container-fluid">
          <Link class="navbar-brand" to="/home">World Cup Online</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/home">Inicio</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/tournament-display">Torneos</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/view-match">Partidos</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/view-prediction">Predicciones</Link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <h5 id='nickname'>Nickname</h5>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div className="container-fluid">
      <Outlet />
    </div>
  </>
)
