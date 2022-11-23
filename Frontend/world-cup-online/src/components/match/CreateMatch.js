import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import 'react-datepicker/dist/react-datepicker.css'
import matchImage from '../../assets/images/match.jpg';

function CreateMatch() {
    const [stageData, setStageData] = useState([])
    const [date, setDate] = useState(new Date());
    const [minDate, setminDate] = useState("")
    const [maxDate, setmaxDate] = useState("")
    const [tourneysData, setTourneysData] = useState([])
    const [team1Data, setTeam1Data] = useState([])
    const [team2Data, setTeam2Data] = useState([])

    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });

    /* Getting the tournament data from the API */
    useEffect(() => {

        client.get('tournament/').then((response) => {
            setTourneysData(response.data);
        });

    }, []);

    const [matchData, setData] = useState({
        Stadium: "",
        HomeId: "",
        VisitId: "",
        StartDateTime: "",
        State: "Pendiente",
        Score: "0-0",
        Tournament_ID: "",
        Stage_ID: ""
    })
    const [tournamentData, setTournamentData] = useState({
        Id: "",
        CodeTournament: "",
        Name: "",
        StartDate: "",
        EndDate: "",
        Rules: "",
        Type: ""
    })


    /**
     * When the user selects a tournament from the dropdown, the function gets the tournament data,
     * sets the min and max date for the date picker, clears the date picker, clears the team
     * dropdowns, and gets the stage and team data.
     * @param e - the event
     */
    async function updateTournament(e) {
        const newData = { ...matchData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
        const tournament_response = await client.get('tournament/' + newData.Tournament_ID);
        setTournamentData(tournament_response.data)
        console.log("tournament_response.data", tournament_response.data)
        setminDate(tournament_response.data.StartDate.split("T")[0])
        setmaxDate(tournament_response.data.EndDate.split("T")[0])
        setDate('');
        setTeam1Data([]);
        setTeam2Data([]);
        setStageData([]);

        const stage_response = await client.get('stage/tournament/' + newData.Tournament_ID);
        setStageData(stage_response.data)

        const teams_response = await client.get('team/' + newData.Tournament_ID);
        setTeam1Data(teams_response.data)
        console.log("teams response", teams_response.data)

        console.log("newData.Tournament_ID", newData.Tournament_ID);

    }

    /**
     * If any of the fields are empty, return false. Otherwise, return true.
     * @returns a boolean value.
     */
    function validateMatch() {

        if (matchData.Stadium.length == 0 ||
            matchData.HomeId.length == 0 ||
            matchData.VisitId.length == 0 ||
            matchData.StartDateTime.length == 0 ||
            matchData.Tournament_ID.length == 0 ||
            matchData.Stage_ID == 0) {

            return false

        }
        return true
    }
    /**
     * When the user presses the submit button, it takes the current data from the form and sends it to the server.
     * Sends error alert if a field is empty
     * @param e - the event object
     */
    function submit(e) {
        e.preventDefault();
        if (validateMatch()) {
            console.log(matchData)
            console.log(tournamentData)
            client.post('match', {
                Stadium: matchData.Stadium,
                HomeId: matchData.HomeId,
                VisitId: matchData.VisitId,
                StartDateTime: matchData.StartDateTime,
                State: matchData.State,
                Score: matchData.Score,
                Tournament_ID: matchData.Tournament_ID,
                Stage_ID: matchData.Stage_ID
            })
                .then(response => {
                    console.log(response.status)
                    console.log(response.data)
                    // client.post('match/add', {
                    //     Id_Team: matchData.Team1,
                    //     Id_Match: response.data
                    // })
                    // client.post('match/add', {
                    //     Id_Team: matchData.Team2,
                    //     Id_Match: response.data
                    // })
                })
            alert(`Partido creado correctamente`)
        }
        else {
            alert(`Por favor llene todos los espacios`)
        }

    }
    /**
     * Updates the match values except for the date, teams and tournament. When the user types in the input field, 
     * the value of the input field is assigned to the key of the object that matches the id of the input field. 
     * @param e - the event object
     */
    function handle(e) {
        const newData = { ...matchData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)

    }
    /**
     * It updates the state of the datepicker component with the new date that is selected.
     * @param e - the date object
     */
    function handleDate(e) {
        const newData = { ...matchData }
        newData["StartDateTime"] = e.toISOString()
        setData(newData)
        console.log(newData)
        setDate(e)

        console.log(e.toISOString())
    }
    /**
     * When the user selects a team from the first dropdown, the second dropdown is updated to show the
     * remaining teams.
     * @param e - the event object
     * @returns The filtered_teams array is being returned.
     */
    function handleTeams(e) {
        const newData = { ...matchData }
        newData[e.target.id] = e.target.value
        setData(newData)
        const filtered_teams = team1Data.filter(function (el) { return el.Id != e.target.value; })
        setTeam2Data(filtered_teams)
        console.log("team2data", filtered_teams);
        console.log(newData)

    }
    return (
        <div>

            <div className="row">
                <div className="col-auto">
                    <h1>Crear un partido</h1>
                    <br />
                    <h4 id="titleLeft">Llene toda la información sobre el partido</h4>
                    <br />
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={(e) => submit(e)}>
                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Fecha y hora: </strong></label>
                                    </div>
                                    <div className="col-3">
                                        <DateTimePicker
                                            name="StartDateTime"
                                            value={date}
                                            onChange={(e) => handleDate(e)}
                                            minDate={new Date(minDate)}
                                            maxDate={new Date(maxDate)}
                                            placeholderText="Select a date"
                                        />
                                    </div>
                                </div>
                                {/* <input onChange = {(e)=>handle(e)} id = "StartDateTime" value = {matchData.StartDateTime} placeholder ="StartDateTime" type="datetime-local"
                    min = "2022-10-01" max ="2022-11-01"></input> */}
                                <br /><br />
                                <div></div>
                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Torneo: </strong></label>
                                    </div>
                                    <div className="col-3">
                                        <select onChange={(e) => updateTournament(e)} id="Tournament_ID" value={matchData.Tournament_ID}>
                                            <option value=""> --Escoja un torneo--</option>
                                            {tourneysData.map((option, index) => (
                                                <option key={index} value={option.CodeTournament}>
                                                    {option.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <br /><br />
                                <div></div>
                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Fase: </strong></label>
                                    </div>
                                    <div className="col-3">
                                        <select onChange={(e) => handle(e)} id="Stage_ID" value={matchData.Stage_ID}>
                                            <option value=""> --Escoja una fase--</option>
                                            {stageData.map((option, index) => (
                                                <option key={index} value={option.Id}>
                                                    {option.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <br /><br />
                                <div></div>
                                <div className="row">
                                    <div className="col-auto">
                                        <select onChange={(e) => handleTeams(e)} id="HomeId" value={matchData.HomeId}>
                                            <option value=""> --Escoja el equipo 1--</option>
                                            {team1Data.map((option, index) => (
                                                <option key={index} value={option.Id}>
                                                    {option.Name}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="col-auto"><label> vs </label></div>
                                    <div className="col-auto">
                                        <select onChange={(e) => handle(e)} id="VisitId" value={matchData.VisitId}>
                                            <option value=""> --Escoja el equipo 2--</option>
                                            {team2Data.map((option, index) => (
                                                <option key={index} value={option.Id}>
                                                    {option.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <br /><br />
                                <div></div>
                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Sede: </strong></label>
                                    </div>
                                    <div className="col-3">
                                        <input onChange={(e) => handle(e)} id="Stadium" value={matchData.Stadium} placeholder="Stadium" type="text"></input>
                                    </div>
                                </div>
                                <br /><br />
                                <div className="row">
                                    <div className="col-auto">
                                        <button id="goldBtn" className="btn btn-warning" type="submit"> Crear partido</button>
                                    </div></div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <img id="matchImage" src={matchImage} alt="match" />
                </div>
            </div>
            <br />
        </div>
    );
}
export default CreateMatch;