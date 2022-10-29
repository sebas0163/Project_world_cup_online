import React, { useState, useEffect } from "react";
import axios from "axios";

function Assignment() {
    const url2 = "http://localhost:5000/api/v1/tournament/compete/"
    const [tourneysData, setTourneysData] = useState([])
    const [teamsData, setTeamsData] = useState([])

    const [teamData, setData2] = useState({

        Id: "",
        Name: "",
        Type: ""
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
    const [assignmentdata, setAssignmentdata] = useState({
        Id_Team: "",
        TournamentCode: ""
    })
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    useEffect(() => {
        client.get('tournament/').then((response) => {
            setTourneysData(response.data[0]);
        });

    }, []);

    const client2 = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    useEffect(() => {
        client2.get('team/').then((response) => {
            setTeamsData(response.data);
        });

    }, []);

    /**
     * I'm trying to submit a form that will send the data to the database.
     * This post is for the participant team
     * @param e - the event
     */
    function submitParticipantTeam(e) {
        e.preventDefault();
        console.log(url2)
        axios.post(url2, {
            Id_Team: assignmentdata.Id_Team,
            TournamentCode: assignmentdata.TournamentCode
        })
            .then(response => {
                console.log(response.tourneyData)
            })
    }

    /**
     * It takes the current state of the assignmentdata object, creates a new object with the same
     * properties, and then updates the property that was changed by the user.
     * @param e - the event object
     */
    function handleAssignment(e) {
        const newData = { ...assignmentdata }
        newData[e.target.id] = e.target.value
        setData2(newData)
        console.log(newData)
    }
    return (
        <form onSubmit={(e) => submitParticipantTeam(e)}>
            <h1 id="titleLeft">Asignacion de equipos</h1>
            <br /><br />
            <div className="row">
                <div className="col-auto">
                    <h5><strong>Torneo: </strong></h5>
                </div>
                <div className="col-auto">
                    <select onChange={(e) => handleAssignment(e)} id="Tournament_ID" value={tournamentData.Tournament_ID}>
                        <option value=""> --Escoja un torneo--</option>
                        {tourneysData.map((option, index) => (
                            <option key={index} value={option.CodeTournament}>
                                {option.CodeTournament + " - " + option.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-auto">
                    <h5><strong>Equipo: </strong></h5>
                </div>
                <div className="col-auto">
                    <select onChange={(e) => handleAssignment(e)} id="ID_Team" value={teamData.Id}>
                        <option value=""> --Escoja un equipo--</option>
                        {teamsData.map((option, index) => (
                            <option key={index} value={option.Id}>
                                {option.Id + " - " + option.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning" id="goldBtn" type="cstage"> Inscribir equipo</button>
                </div>
            </div>
        </form>
    );

}
export default Assignment;