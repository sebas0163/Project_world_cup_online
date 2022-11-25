import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultTournament from '../../assets/images/tournament_default.jpg';

const ActiveMatches = props => {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);

    const client = axios.create({
        baseURL: 'http://localhost:5000/api/v1/'
    });

    const getMatches = async () => {
        client.get("match").then((response) => {
            console.log(response.data);
            setMatches(response.data);
        });
    }

    const goToPrediction = (e, match) => {
        e.preventDefault();
        props.selectMatch(match);
        props.mode("user");
        navigate("/create-prediction");
    }

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <>
            <h1 id="leftTitle">Proximos partidos</h1>
            <div className="row g-4">
                {matches.map((match, index) => (
                    <div className="col-3">
                        <div id="tournamentCard" className="card" key={index}>
                            <img id="defaultImageTournament" src={defaultTournament} className="card-img-top" alt="default" />
                            <div className="card-body">
                                <h5 className="card-title">{match.Name}</h5>
                                <p id="cardRules" className="card-text">{match.HomeName} vs {match.VisitName}</p>
                                <a onClick={(e) => goToPrediction(e, match)} id="goldBtn" className="btn btn-warning">Hacer Prediccion</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ActiveMatches;
