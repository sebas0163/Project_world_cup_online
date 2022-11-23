import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminDashboard = props => {

    const [areMatches, setAreMatches] = useState(false);
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    const client = axios.create({
        baseURL: 'http://localhost:5000/api/v1/match'
    });

    const getMatches = async () => {
        client.get().then((response) => {
            console.log(response.data);
            setMatches(response.data);
            if (response.data.length > 0) {
                setAreMatches(true);
            }
        });
    }

    function handlePrediction(e, match) {
        e.preventDefault();
        props.select(match);
        props.mode("admin");
        console.log("Match Tour", match);
        navigate("/create-prediction");

    }

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <div>
            <br />
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h1>Bienvenido</h1>
                            <p>A continuacion el dashboard de administrador</p>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h2>Ultimos Partidos</h2>
                            <br />
                            {areMatches ?
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
                                                <td style={{ color: "black", backgroundColor: "white" }}>{match.StartDateTime?.split("T", 1)}</td>
                                                <td style={{ color: "black", backgroundColor: "white" }}>{match.HomeName} vs {match.VisitName}</td>
                                                <td style={{ color: "black", backgroundColor: "white" }}>{match.Stadium}</td>
                                                <td style={{ color: "black", backgroundColor: "white" }}><a id="goldenBtn" className="btn btn-warning" onClick={(e) => handlePrediction(e, match)}>Publicar resultado </a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : <h3 id="leftTitle">No hay partidos disponibles</h3>}
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5>Torneos</h5>
                            <button id="blueBtn" className="btn btn-primary" style={{ marginRight: "10px" }}>Mostrar Torneos</button>
                            <button id="blueBtn" className="btn btn-primary">Crear Torneo</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5>Partidos</h5>
                            <button id="blueBtn" className="btn btn-primary" style={{ marginRight: "10px" }}>Mostrar Partidos</button>
                            <button id="blueBtn" className="btn btn-primary">Crear Partido</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;