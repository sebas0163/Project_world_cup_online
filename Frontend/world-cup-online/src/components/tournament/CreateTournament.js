import React, { useState } from "react";
import axios from "axios";
import tournamentImage from "../../assets/images/tournament.jpg";
import './tournament.css';

function TourneyForm() {
    const url = "http://localhost:5000/api/v1/tournament/"
    const type = [
        { value: '', text: 'Escoja el tipo de torneo' },
        { value: 'Selecciones', text: 'Selecciones' },
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
     * Submits the tournament data to the database.
     * @param e - the event object
     */
    function submitTournament(e) {
        e.preventDefault();
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
    }

   /**
    * When the user types in the input field, the value of the input field is assigned to the key of
    * the object that matches the id of the input field.
    * @param e - the event object
    */
    function handle(e) {
        const newData = { ...tourneyData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
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
                            <div className="col-auto">
                                <input onChange={(e) => handle(e)} id="StartDate" value={tourneyData.StartDate} placeholder="StartDate" type="date"></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-auto">
                                <label><strong>Fecha final: </strong></label>
                            </div>
                            <div className="col-auto">
                                <input onChange={(e) => handle(e)} id="EndDate" value={tourneyData.EndDate} placeholder="EndDate" type="date"></input>
                            </div>
                        </div>
                        <br />

                        <div className="row">
                            <div className="col-auto">
                                <label><strong>Nombre: </strong></label>
                            </div>
                            <div className="col-auto">
                                <input onChange={(e) => handle(e)} id="Name" value={tourneyData.Name} placeholder="Name" type="text"></input>
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
                                <textarea onChange={(e) => handle(e)} id="Rules" value={tourneyData.Rules} placeholder="Rules" type="text"></textarea>
                            </div>
                        </div>
                        <br />
                        <div>
                            <div className="row">
                                <div className="col-auto">
                                    <label><strong>Tipo: </strong></label>
                                </div>
                                <div className="col-auto">
                                    <select onChange={(e) => handle(e)} id="Type" value={tourneyData.Type}>
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