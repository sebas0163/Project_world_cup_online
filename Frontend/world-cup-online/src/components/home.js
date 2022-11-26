import React from "react";
import "./home.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultTournament from '../assets/images/tournament_default.jpg';

const Home = props => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([]);
    const [matches, setMatches] = useState([]);

    const client = axios.create({
        baseURL: 'http://localhost:5000/api/v1/'
    });

    const getTournaments = async () => {
        client.get("tournament").then((response) => {
            console.log(response.data);
            setTournaments(response.data.splice(0, 4));
        });
    }

    const getMatches = async () => {
        client.get("match").then((response) => {
            console.log(response.data);
            setMatches(response.data.splice(0, 4));
        });
    }

    const goToTournament = (e, tournament) => {
        e.preventDefault();
        props.selectTournament(tournament);
        navigate("/tournament");
    }
    const goToPrediction = (e, match) => {
        e.preventDefault();
        props.selectMatch(match);
        props.mode("user");
        navigate("/create-prediction");
    }

    useEffect(() => {
        getTournaments();
        getMatches();
    }, []);

    return (
        <>
            <div className="Home">
                <div className="wrapperHome" >
                    <div className="row">
                        <div className="col-12">
                            <h1 id="leftTitle">Torneos Populares</h1>
                        </div>
                    </div>
                    <br></br>
                    <div className="row g-4">
                        {tournaments.map((tournament, index) => (
                            <div className="col-3">
                                <div id="tournamentCard" className="card" key={index}>
                                    <img id="defaultImageTournament" src={defaultTournament} className="card-img-top" alt="default" />
                                    <div className="card-body">
                                        <h5 className="card-title">{tournament.Name}</h5>
                                        <p id="cardRules" className="card-text">{tournament.Rules}</p>
                                        <a onClick={(e) => goToTournament(e, tournament)} id="goldenBtn" className="btn btn-warning">Ver Torneo</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br></br>
                    <a href="/tournaments" id="rightTitle">Ver todos los torneos</a>
                    <br></br>
                    <div className="row">
                        <div className="col-12">
                            <h1 id="leftTitle">Proximos partidos</h1>
                        </div>
                    </div>
                    <br></br>
                    <div className="row g-4">
                        {matches.map((match, index) => (
                            <div className="col-3">
                                <div id="tournamentCard" className="card" key={index}>
                                    <img id="defaultImageTournament" src={defaultTournament} className="card-img-top" alt="default" />
                                    <div className="card-body">
                                        <h5 className="card-title">{match.Name}</h5>
                                        <p id="cardRules" className="card-text">{match.HomeName} vs {match.VisitName}</p>
                                        <a onClick={(e) => goToPrediction(e, match)} id="goldenBtn" className="btn btn-warning">Hacer Prediccion</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br></br>
                    <a href="/matches" id="rightTitle">Ver todos los partidos disponibles</a>
                    <br></br><br></br>
                </div>
            </div>
        </>
    )
}

export default Home;
