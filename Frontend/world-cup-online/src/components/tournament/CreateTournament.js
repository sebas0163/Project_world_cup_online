import React, { useState } from "react";
import axios from "axios";


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

    function submit(e) {
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

    function handle(e) {
        const newData = { ...tourneyData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    return(
        <div>
            <form onSubmit={(e)=>submit(e)}>
            <h1>Creacion de torneos</h1>
            <input onChange = {(e)=>handle(e)} id = "StartDate" value = {tourneyData.StartDate} placeholder ="StartDate" type="date"></input>
            <input onChange = {(e)=>handle(e)} id = "EndDate" value = {tourneyData.EndDate} placeholder ="EndDate" type="date"></input>
            <input onChange = {(e)=>handle(e)} id = "Name" value = {tourneyData.Name} placeholder ="Name" type="text"></input>
            <h6>Describa las reglas del torneo</h6>
            <textarea onChange = {(e)=>handle(e)} id = "Rules" value = {tourneyData.Rules} placeholder ="Rules" type="text"></textarea>
            <div>
                <select onChange = {(e)=>handle(e)} id = "Type" value = {tourneyData.Type}> 
                    {type.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
            </div>
            <br></br>
            <button type = "submit"> Crear torneo</button>
            </form>
        </div>
    );
}
export default TourneyForm;