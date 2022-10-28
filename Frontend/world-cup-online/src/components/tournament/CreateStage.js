import React, { useState, useEffect } from "react";
import axios from "axios";

function StageForm() {
    const url2 = "http://localhost:5000/api/v1/stage/"

    const [stageData, setData2] = useState({

        Id: "",
        Name: "",
        StartDate: "",
        EndDate: "",
        Tournament_ID: ""
    })
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
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    useEffect(() => {
        client.get('tournament/').then((response) => {
            setTourneysData(response.data[0]);
        });

    }, []);

    /**
     * I'm trying to send a post request to the server with the data from the stageData object. 
     * The post request is for the Stage creation
     * </code>
     * @param e - the event that is being triggered
     */
    function submitStage(e) {
        e.preventDefault();
        console.log(url2)
        axios.post(url2, {
            Id: stageData.Id,
            Name: stageData.Name,
            StartDate: stageData.StartDate,
            EndDate: stageData.EndDate,
            Tournament_ID: stageData.Tournament_ID
        })
            .then(response => {
                console.log(response.tourneyData)
            })
        alert("Fase creada con éxito")
    }

    /**
     * It takes the current state of the stageData object, creates a new object with the same
     * properties, and then updates the property that was changed by the user.
     * @param e - the event object
     */
    function handleStageInput(e) {
        const newData = { ...stageData }
        newData[e.target.id] = e.target.value
        setData2(newData)
        console.log(newData)
    }
    return (
        <form onSubmit={(e) => submitStage(e)}>
            <h1 id="titleLeft">Creacion de fases</h1>
            <br /><br />
            <div className="row">
                <div className="col-auto">
                    <h5><strong>Torneo: </strong></h5>
                </div>
                <div className="col-auto">
                    <select onChange={(e) => handleStageInput(e)} id="Tournament_ID" value={tournamentData.Tournament_ID}>
                        <option value=""> --Escoja un torneo--</option>
                        {tourneysData.map((option, index) => (
                            <option key={index} value={option.CodeTournament}>
                                {option.CodeTournament + " - " + option.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-auto">
                    <input onChange={(e) => handleStageInput(e)} id="Name" value={stageData.Name} placeholder="Nombre de la fase" type="text"></input>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning" id="goldBtn" type="cstage"> Crear fase</button>
                </div>
            </div>
        </form>
    );

}
export default StageForm;