import React from "react";
import "./home.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultTournament from '../assets/images/tournament_default.jpg';

const Home = props => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([]);

    const client = axios.create({
        baseURL: 'http://localhost:5000/api/v1/'
    });

    const getTournaments = async () => {
        client.get("tournament").then((response) => {
            console.log(response.data);
            setTournaments(response.data);
        });
    }

    useEffect(() => {
        getTournaments();
    }, []);

    return (
        <>
            <div className="Home">
                <div className="wrapperHome" >
                    <div className="row">
                        <div className="col-12">
                            <h1 id="titleHome">Torneos Activos</h1>
                        </div>
                    </div>
                    <br></br>
                    <div className="row g-4">
                        {tournaments.map((tournament, index) => (
                            <div className="col">
                                <div id="tournamentCard" className="card" key={index}>
                                    <img id="defaultImageTournament" src={defaultTournament} className="card-img-top" alt="default" />
                                    <div className="card-body">
                                        <h5 className="card-title">{tournament.Name}</h5>
                                        <p id="cardRules" className="card-text">{tournament.Rules}</p>
                                        <a href="#" id="goldenBtn" className="btn btn-warning">Ver Torneo</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br></br>
                </div>
            </div>
        </>
    )
}

export default Home;
