import React, { useState, useEffect } from 'react'
import axios from "axios";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import './match.css';
import plusLGIcon from '../../assets/icons/plus-lg.svg';
import { Link } from 'react-router-dom';

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
            <br /><br />
            <div></div>
            <a href='/create-match' class="float" title='Create a new match'>
                <i class="fa fa-plus my-float">
                    <img src={plusLGIcon} alt="plus icon" id="icon" />
                </i>
            </a>
            <div className="row">
                <div className="col-auto">
                    <h4>Torneo: </h4>
                </div>
                <div className="col-auto">
                    <select onChange={(e) => handle(e)} id="Tournament_ID" value={tournamentData.Tournament_ID}>
                        <option value=""> --Escoja un torneo--</option>
                        {tourneysData.map((option, index) => (
                            <option key={index} value={option.CodeTournament}>
                                {option.CodeTournament + " - " + option.Name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <br />
            <div>
                <div className='row'>
                    <div className='col-auto'>
                        <h3>Partidos</h3>
                    </div>
                    <div className='col-auto'>
                    </div>
                </div>
                <br />
                <Table hover id='gamesTable'>
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
