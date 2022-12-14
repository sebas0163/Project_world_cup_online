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
    /* All tournaments */
    const [tourneysData, setTourneysData] = useState([])
    /* Selected tournament */
    const [tournamentData, setTournamentData] = useState({
        Id: "",
        CodeTournament: "",
        Name: "",
        StartDate: "",
        EndDate: "",
        Rules: "",
        Type: ""
    })

    const [matchesInTournaments, setmatchesInTournamentsData2] = useState([])
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    /* Getting the tournament data from the API */
    useEffect(() => {
        client.get('tournament/').then((response) => {
            console.log("resp>", response.data)
            setTourneysData(response.data);
        });

    }, []);

    const getTeamName = (id) => {
        let teamName = "";
        client.get('team/single' + id).then((response) => {
            teamName = response.data[0].Name;
        });
        return teamName;
    }

    /**
     * Updates information shown when the user picks a tournament.
     * @param e - the event
     */
    async function handle(e) {
        const newData = { ...tournamentData }
        newData[e.target.id] = e.target.value
        setTournamentData(newData)
        console.log(newData)
        const tournament_response = await client.get('match/tournament/' + newData.Tournament_ID);
        setmatchesInTournamentsData2(tournament_response.data)
        console.log("matches", tournament_response.data)

    }
    /* Creating a table row for each element in the array. */
    const tableRows = matchesInTournaments.map(
        (element) => {
            return (

                <tr>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Id}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Stadium}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.HomeId}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.VisitId}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.StartDateTime}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Tournament_ID}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Stage_ID}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.State}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Score}</td>
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
                <Table hover id='gamesTable' borderless>
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
