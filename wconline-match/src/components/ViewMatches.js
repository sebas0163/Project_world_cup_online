import React, { useState, useEffect } from 'react'
import axios from "axios";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './match.css';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import plusLGIcon from '../assets/icons/plus-lg.svg';

function ViewMatches() {
    const navigate = useNavigate();
    const [tourneysData, setTourneysData] = useState([])
    const [tournamentData, setTournamentData] = useState({
        Id: "",
        CodeTournament: "",
        Name: "",
        StartDate: "",
        EndDate: "",
        Rules: "",
        Type: ""
    })

    const [matchesInTournaments2, setmatchesInTournamentsData2] = useState([])
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    useEffect(() => {
        client.get('tournament/').then((response) => {
            setTourneysData(response.data[0]);
        });

    }, []);

    async function handle(e) {
        const newData = { ...tournamentData }
        newData[e.target.id] = e.target.value
        setTournamentData(newData)
        console.log(newData)
        const tournament_response = await client.get('match/tournament/' + newData.Tournament_ID);
        setmatchesInTournamentsData2(tournament_response.data[0])
        console.log(tournament_response.data[0])

    }
    const tableRows = matchesInTournaments2.map(
        (element) => {
            return (

                <tr>
                    <td>{element.Id}</td>
                    <td>{element.Stadium}</td>
                    <td>{element.Team1}</td>
                    <td>{element.Team2}</td>
                    <td>{element.StartDateTime}</td>
                    <td>{element.Tournament_ID}</td>
                    <td>{element.Stage_ID}</td>
                    <td>{element.State}</td>
                    <td>{element.Score}</td>
                </tr>

            )
        }
    )
    return (
        <div>
            <h1>Ver partidos</h1>
            <div></div>
            <div className="row">
                <div className="col-3">
                    <image src={plusLGIcon} id="icon" alt="plus" />
                </div>
            </div>
            <div className="col-6">
                <button className="btn btn-primary" onClick={() => navigate("/create-match")}>Crear nuevo partido</button>
            </div>
            <a href="#" class="float">
                <i class="fa fa-plus my-float">

                </i>
            </a>

            <h3>Torneo: </h3>
            <select onChange={(e) => handle(e)} id="Tournament_ID" value={tournamentData.Tournament_ID}>
                <option value=""> --Escoja un torneo--</option>
                {tourneysData.map((option, index) => (
                    <option key={index} value={option.CodeTournament}>
                        {option.CodeTournament + " - " + option.Name}
                    </option>
                ))}
            </select>
            <div>
                <h3>Partidos:</h3>
                <Table hover>
                    <thead>
                        <tr>
                            <th> Id</th>
                            <th>Stadium</th>
                            <th>Team1</th>
                            <th>Team2</th>
                            <th>StartDateTime</th>
                            <th>Tournament_ID</th>
                            <th>Stage_ID</th>
                            <th>State</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
                <br /><br /><br /><br />

            </div>
        </div>
    );
}
export default ViewMatches;
