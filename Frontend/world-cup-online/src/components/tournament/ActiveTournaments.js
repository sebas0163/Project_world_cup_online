import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultTournament from '../../assets/images/tournament_default.jpg';

const ActiveTournaments = props => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([]);

    const client = axios.create({
        baseURL: 'http://localhost:5000/api/v1/'
    });

    const getMatches = async () => {
        client.get("tournament").then((response) => {
            console.log(response.data);
            setTournaments(response.data);
        });
    }

    const goToTournament = (e, tournament) => {
        e.preventDefault();
        props.selectTournament(tournament);
        navigate("/tournament");
    }

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <>
            <h1 id="leftTitle">Torneos Activos</h1>
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
        </>
    );
}

export default ActiveTournaments;