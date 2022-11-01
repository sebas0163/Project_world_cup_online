import React, { useState } from "react";
import axios from "axios";
import tournamentImage from "../../assets/images/tournament.jpg";
import './tournament.css';
import DateTime from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function TourneyForm() {

    const [minEndDate, setMinEndDate] = useState("");
    const url = "http://localhost:5000/api/v1/tournament/"
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
        Type: ""
    })

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
        if(validateTournament()){
            console.log(url)
            axios.post(url, {
                Id: tourneyData.Id,
                Name: tourneyData.Name,
                StartDate: tourneyData.StartDate,
                EndDate: tourneyData.EndDate,
                Rules: tourneyData.Rules,
                Type: tourneyData.Type
            })
            .then(response => {
                console.log(response.tourneyData)
            })
            alert(`Torneo creado correctamente`)
        }else{
            alert(`Por favor llene todos los espacios`)
        }
    }

    /**
     * When the user types in the input field, the value of the input field is assigned to the key of
     * the object that matches the id of the input field.
     * @param e - the event object
     */
    function handleTourneyData(e) {
        const newData = { ...tourneyData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

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
    function handleEndDate(e) {
        setMinEndDate("")
        const newData = { ...tourneyData }
        newData["EndDate"] = e.toISOString()
        setData(newData)
        console.log(newData)
        console.log(e.toISOString())
    }
    return (
        <div>
            <div className="row">
                <div className="col-auto">
                    <form onSubmit={(e) => submitTournament(e)}>
                        <h1>Creacion de torneos</h1>
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
                        <br />
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
                <div className="col">
                    <img src={tournamentImage} alt="tournament" id="tournamentImage" />
                </div>
            </div>
        </div>
    );
}
export default TourneyForm;