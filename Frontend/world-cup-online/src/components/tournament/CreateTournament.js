import React, { useState, useEffect } from "react";
import axios from "axios";
//import tournamentImage from "../../assets/images/tournament.jpg";
import './tournament.css';
import DateTime from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Table from 'react-bootstrap/Table';

function TourneyForm() {
    const [teamSelected, setTeamSelected] = useState("")
    const [stageSelected, setStageSelected] = useState("")
    const [teamsCache, setTeamsCache] = useState([])
    const [stageCache, setStageCache] = useState([])
    const [teamsData, setTeamsData] = useState([])
    const [minEndDate, setMinEndDate] = useState("");
    const url = "http://localhost:5000/api/v1/tournament/full"
    const type = [
        { value: '', text: 'Escoja el tipo de torneo' },
        { value: 'Selección', text: 'Selecciones' },
        { value: 'Local', text: 'Equipos Locales' }
    ];

    const [tourneyData, setData] = useState({

        Id: "",
        Name: "",
        StartDate: "",
        EndDate: "",
        Rules: "",
        Type: "",
        StageList: [],
        TeamList: []
    })

    const [assignmentdata, setAssignmentdata] = useState({
        Id_Team: "",
        TournamentCode: ""
    })

    const client2 = axios.create({
        baseURL: "http://localhost:5000/api/v1/team/"
    });

    useEffect(() => {
        client2.get('type/').then((response) => {
            setTeamsData(response.data);
        });

    }, []);

    /**
     * If any of the properties of the tourneyData object are empty, return false. Otherwise, return
     * true.
     * @returns a boolean value.
     */
    function validateTournament() {

        if (tourneyData.Name.length == 0 ||
            tourneyData.StartDate.length == 0 ||
            tourneyData.EndDate.length == 0 ||
            tourneyData.Type.length == 0) {

            return false

        }
        return true
    }

    /**
     * Submits the tournament data to the database.
     * @param e - the event object
     */
    function submitTournament(e) {
        e.preventDefault();
        if (validateTournament()) {
            if (teamsCache.length < 2) {
                alert(`Por favor agregue al menos 2 equipos`)
            } else if (stageCache.length < 1) {
                alert(`Por favor agregue al menos una fase`)
            } else {
                console.log(url)
                console.log("Chequeo de teams", teamsCache)
                console.log("Chequeo de Stages", stageCache)
                axios.post(url, {
                    Id: tourneyData.Id,
                    Name: tourneyData.Name,
                    StartDate: tourneyData.StartDate,
                    EndDate: tourneyData.EndDate,
                    Rules: tourneyData.Rules,
                    Type: tourneyData.Type,
                    StageList: stageCache,
                    TeamList: teamsCache
                })
                    .then(response => {
                        console.log(response.tourneyData)
                    })
                alert(`Torneo creado correctamente`)
            }
        } else {
            alert(`Por favor llene todos los espacios`)
        }
    }

    /**
     * When the user types in the input field, the value of the input field is assigned to the key of
     * the object that matches the id of the input field.
     * @param e - the event object
     */
    async function handleTourneyData(e) {
        const newData = { ...tourneyData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData.Type)
        const teamResponse = await client2.get('type/' + newData.Type);
        setTeamsData(teamResponse.data)
    }

    useEffect(() => {
        setTeamsCache([...teamsCache])
    }, [teamsCache])

    useEffect(() => {
        setStageCache([...stageCache])
    }, [stageCache])

    function createTeamList() {
        teamsCache.push(teamSelected)
        console.log(teamsCache)
    }

    function createStageList() {
        stageCache.push(stageSelected)
        console.log(stageCache)
    }

    /**
     * Function used to limit and set the start date of an event
     * 
     * @param e - the date selected by the user
     */
    function handleDate(e) {
        setMinEndDate("")
        const newData = { ...tourneyData }
        newData["StartDate"] = e.toISOString()
        newData["EndDate"] = ""
        setData(newData)
        console.log(newData)
        var nextDay = new Date(e.toISOString())
        nextDay.setDate(nextDay.getDate() + 1)
        console.log("tomorrow", nextDay)
        setMinEndDate(nextDay)

        console.log(e.toISOString())
    }
    /**
     * I'm trying to set the value of the EndDate field in the tourneyData object to the value of the
     * date selected in the DatePicker component.
     * @param e - the date selected by the user
     */
    function handleEndDate(e) {
        setMinEndDate("")
        const newData = { ...tourneyData }
        newData["EndDate"] = e.toISOString()
        setData(newData)
        console.log(newData)
        console.log(e.toISOString())
    }

    var teamRows = teamsCache.map(
        (element, key) => {
            return (
                <tr>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element}</td>
                </tr>
            )
        }
    )

    const stageRows = stageCache.map(
        (element, key) => {
            return (
                <tr>
                    <td style={{ color: "black", backgroundColor: "white" }}> {element}</td>
                </tr>
            )
        }
    )
    return (
        <div>
            <h1 id="leftTitle" style={{ color: "black" }}>Creacion de torneos</h1>
            <br />
            <div className="row">
                <div className="col-auto">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={(e) => submitTournament(e)}>
                                <br />
                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Fecha de incio: </strong></label>
                                    </div>

                                    <div className="col-3">
                                        <DateTime
                                            name="StartDateTime"
                                            value={tourneyData.StartDate.split("T")[0]}
                                            onChange={(e) => handleDate(e)}
                                            minDate={new Date()}
                                            placeholderText="Select a date"
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Fecha final: </strong></label>
                                    </div>

                                    <div className="col-3">
                                        <DateTime
                                            name="EndDateTime"
                                            value={tourneyData.EndDate.split("T")[0]}
                                            onChange={(e) => handleEndDate(e)}
                                            minDate={new Date(minEndDate)}
                                            placeholderText="Select a date"
                                        />
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Nombre: </strong></label>
                                    </div>
                                    <div className="col-auto">
                                        <input onChange={(e) => handleTourneyData(e)} id="Name" value={tourneyData.Name} placeholder="Name" type="text"></input>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-auto">
                                        <label><strong>Describa las reglas del torneo </strong></label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-auto">
                                        <textarea onChange={(e) => handleTourneyData(e)} id="Rules" value={tourneyData.Rules} placeholder="Rules" type="text"></textarea>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <div className="row">
                                        <div className="col-auto">
                                            <label><strong>Tipo: </strong></label>
                                        </div>
                                        <div className="col-auto">
                                            <select onChange={(e) => handleTourneyData(e)} id="Type" value={tourneyData.Type}>
                                                {type.map((option, index) => (
                                                    <option key={index} value={option.value}>
                                                        {option.text}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <button id="goldBtn" className="btn btn-warning" type="submit"> Crear torneo</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <br />
                    <div className="row">
                        <div className="col-auto">
                            <label><strong>Fase: </strong></label>
                        </div>
                        <div className="col-auto">
                            <input onChange={(e) => setStageSelected(e.target.value)} id="Name" placeholder="Nombre de fase" type="text"></input>
                            <br /><br />
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Fases</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stageRows}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-auto">
                            <button type="button" onClick={() => createStageList()} className="btn btn-primary">+</button>
                        </div>
                        <div className="col-auto">
                            <label><strong>Equipos: </strong></label>
                        </div>
                        <div className="col-auto">
                            <select onChange={(e) => { setTeamSelected(e.target.value); console.log(teamSelected) }} id="Id_Team">
                                <option value=""> --Escoja un equipo--</option>
                                {teamsData.map((option, index) => (
                                    <option key={index} value={option.Id}>
                                        {option.Id + " - " + option.Name}
                                    </option>
                                ))}
                            </select>
                            <br /><br />
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Equipos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamRows}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-auto">
                            <button type="button" onClick={() => createTeamList()} className="btn btn-primary">+</button>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}
export default TourneyForm;