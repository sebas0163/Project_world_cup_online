import React, { useState } from "react";
import axios from "axios";


function TourneyForm() {
    const url = "http://localhost:5000/api/v1/tournament/"
    const url2 = "http://localhost:5000/api/v1/stage/"
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

    const [stageData, setData2] = useState({

        Id: "",
        Name: "",
        StartDate: "",
        EndDate: "",
        Tournament_ID: ""
    })

    function submit2(e) {
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
    }

    function handle2(e) {
        const newData = { ...stageData }
        newData[e.target.id] = e.target.value
        setData2(newData)
        console.log(newData)
    }
    return (
        <div>
            <h1>Crear Torneo</h1>
            <br></br><br></br>
            <form onSubmit={(e) => submit2(e)}>
                <input onChange={(e) => handle2(e)} id="StartDate" value={stageData.StartDate} placeholder="StartDate" type="datetime-local"></input>
                <input onChange={(e) => handle2(e)} id="EndDate" value={stageData.EndDate} placeholder="EndDate" type="datetime-local"></input>
                <input onChange={(e) => handle2(e)} id="Name" value={stageData.Name} placeholder="Stage_name" type="text"></input>
                <button type="cstage"> Crear fase</button>
            </form>

            <form onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handle(e)} id="StartDate" value={tourneyData.StartDate} placeholder="StartDate" type="datetime-local"></input>
                <input onChange={(e) => handle(e)} id="EndDate" value={tourneyData.EndDate} placeholder="EndDate" type="datetime-local"></input>
                <input onChange={(e) => handle(e)} id="Name" value={tourneyData.Name} placeholder="Name" type="text"></input>
                <textarea onChange={(e) => handle(e)} id="Rules" value={tourneyData.Rules} placeholder="Rules" type="text"></textarea>
                <div>
                    <select onChange={(e) => handle(e)} id="Type" value={tourneyData.Type}>
                        {type.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"> Crear torneo</button>
            </form>
        </div>
    );
}
export default TourneyForm;