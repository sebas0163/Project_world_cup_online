import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultTournament from '../../assets/images/tournament_default.jpg';

const Tournament = props => {
    const navigate = useNavigate();
    const [tournament, setTournament] = useState([]);
    const [matches, setMatches] = useState([]);
    const [areMatches, setAreMatches] = useState(false);

    const client = axios.create({
        baseURL: 'http://localhost:5000/api/v1/match/tournament/'
    });

    const getMatches = async (code) => {
        client.get(code).then((response) => {
            console.log(response.data);
            setMatches(response.data);
            if (response.data.length > 0) {
                setAreMatches(true);
            }
        });
    }
    const goToGroups = (e, tournament) => {
        e.preventDefault();
        props.select(tournament);
        navigate("/Create-group");
    }
    useEffect(() => {
        setTournament(props.tournament);
        getMatches(props.tournament.CodeTournament);
    }, [props.tournament]);

    function handlePrediction(e, match) {
        e.preventDefault();
        props.select(match);
        props.mode("user");
        console.log("Match Tour", match);
        navigate("/create-prediction");

    }
    return (
        <>
            <h1 id="leftTitle">{tournament.Name}</h1>
            <h4 id="leftTitle">Detalles</h4> 
            <div id="rw" className="row">
                <div id="rw"className="col-6">
                    <button onClick={(e) => goToGroups(e, tournament)} id="btn" className="btn btn-warning" type="submit"> Crear grupo</button>
                </div>
                <div id="rw"className="col-6">
                    <br />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-6">
                    <div id="detailsCard" className="card">
                        <div className="card-body">
                            <br />
                            <div className="row">
                                <div className="col">
                                    <h5>Inicio: </h5>
                                </div>
                                <div className="col">
                                    <p>{tournament.StartDate?.split("T", 1)}</p>
                                </div>
                                <div className="col">
                                    <h5>Fin: </h5>
                                </div>
                                <div className="col">
                                    <p>{tournament.EndDate?.split("T", 1)}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h5>Reglas: </h5>
                                </div>
                                <div className="col">
                                    <p>{tournament.Rules}</p>
                                </div>
                                <div className="col">
                                    <h5>Tipo: </h5>
                                </div>
                                <div className="col">
                                    <p>{tournament.Type}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <img id="tournamentDetailsImage" src={defaultTournament} alt="default"></img>
                </div>
            </div>
            {areMatches ? <><h3 id="leftTitle">Partidos Disponibles</h3>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Partido</th>
                            <th scope="col">Estadio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => (
                            <tr key={index}>
                                <td>{match.StartDateTime?.split("T", 1)}</td>
                                <td>{match.HomeName} vs {match.VisitName}</td>
                                <td>{match.Stadium}</td>
                                <td><a id="goldenBtn" className="btn btn-warning" onClick={(e) => handlePrediction(e, match)}>Hacer prediccion </a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
                : <h3 id="leftTitle">No hay partidos disponibles</h3>}

        </>
    )
}

export default Tournament;