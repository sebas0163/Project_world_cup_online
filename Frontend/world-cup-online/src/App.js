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
import { CreateUserAccount } from './components/CreateUserAccount';
import AdminDashboard from './components/admin/home';
import { Helmet } from 'react-helmet';
import { Create_group } from './components/Group/Create_group';

export default function App() {

  const [tournament, setTournament] = useState(null);
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);
  const [userType, setUserType] = useState(null);

  /**
   * When the user clicks on a tournament, set the tournament to the one that was clicked on.
   * @param [tournament=null] - The tournament object that was selected.
   */
  async function selectTournament(tournament = null) {
    setTournament(tournament);
  }
  async function selectUser(user = null) {
    setUser(user);
    Nickname = user.NickName;
  }
  async function selectMatch(match = null) {
    setMatch(match);
  }
  async function selectUserType(userType = null) {
    setUserType(userType);
  }

  return (
    <div className="App">

      <Routes>

        <Route element={<InitContainer />}>
          <Route exact path="/" element={<Login select={selectUser} mode="user" />}></Route>
          <Route path='/create-user' element={<CreateUserAccount />}></Route>

        </Route>

        <Route element={<AdminInitContainer />}>
          <Route path='/admin-login' element={<Login select={selectUser} mode="admin" />}></Route>
        </Route>

        <Route element={<AdminContainer />}>
          <Route path="/admin-dashboard" element={<AdminDashboard select = {selectMatch} mode = {selectUserType}/>}></Route>
          <Route path='/scoreboard' element={<PositionsTable />}>
          </Route>
          <Route path='/create-result' element={<CreatePrediction user={user} match={match} mode={userType}/>}>
          </Route>
          <Route path='/tournament-display' element={<TournamentDisplays select={selectTournament} />}>
          </Route>
          <Route path="/create-match" element={<CreateMatch />}>
          </Route>
          <Route path='/create-tournament' element={<CreateTournament />}>
          </Route>
          <Route path='/view-match' element={<ViewMatches />}>
          </Route>
          <Route path='/create-stage' element={<CreateStage />}>
          </Route>
          <Route path='/assignment' element={<ParticipantTeams />}>
          </Route>
        </Route>

        <Route element={<DefaultContainer />}>
          <Route path="/home" element={<Home user={user} mode = {selectUserType}
            selectTournament={selectTournament} selectMatch={selectMatch}/>}>
          </Route>
          <Route path="/tournament" element={<Tournament tournament={tournament} select={selectMatch} />}></Route>
          <Route path="/tournaments" element={<ActiveTournaments selectTournament={selectTournament} />}></Route>
          <Route path="/matches" element={<ActiveMatches selectMatch={selectMatch} />}></Route>
          <Route path='/create-prediction' element={<CreatePrediction user={user} match={match} mode={userType}/>}>
          </Route>
          <Route path='/view-prediction' element={<ViewPredictions user={user} />}>
          </Route>
          <Route path='/Create-group' element={<Create_group user={user}  tournament={tournament}/>}>
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

const AdminInitContainer = () => (
  <div className="container-fluid">
    <Helmet>
      <style>{'body { background-color: rgb(228, 227, 227); color: black;}'}</style>
      <style>{'body { color: black;}'}</style>
    </Helmet>
    <Outlet />
  </div>
)

let Nickname = "Usuario";

const AdminContainer = () => (
  <>
    <div id='adminContainer' className="container-fluid p-0">
      <Helmet>
        <style>{'body { background-color: rgb(228, 227, 227); color: black; }'}</style>
      </Helmet>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id='adminNavbar'>
        <div class="container-fluid">
          <Link class="navbar-brand" to="/admin-dashboard">World Cup Online</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAdmin" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAdmin">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/admin-dashboard">Inicio</Link>
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
              <li class="nav-item">
                <Link class="nav-link" to="/admin-login">Cerrar sesión</Link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <h5 id='nickname'>Administrador</h5>
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
                <Link class="nav-link" to="/tournaments">Torneos</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/matches">Partidos</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/view-prediction">Predicciones</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/">Cerrar sesión</Link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <h5 id='nickname'>{Nickname}</h5>
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
