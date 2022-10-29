import React, {useState, useEffect} from "react";
import axios from "axios";

function StageForm(){
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
        Id : "",
        CodeTournament : "",
        Name : "",
        StartDate : "",
        EndDate : "",
        Rules : "",
        Type : ""
    })
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"   
    });
    useEffect(() => {
        client.get('tournament/').then((response) => {
            setTourneysData(response.data[0]);
        });
    
    }, []);

    function submit2(e){
        e.preventDefault();
        console.log(url2)
        axios.post(url2, {
            Id: stageData.Id,
            Name: stageData.Name,
            StartDate: stageData.StartDate,
            EndDate: stageData.EndDate,
            Tournament_ID: stageData.Tournament_ID
        })
        .then(response =>{
            console.log(response.tourneyData)
        })
    }

    function handle2(e){
        const newData = {...stageData}
        newData[e.target.id] = e.target.value
        setData2(newData)
        console.log(newData)
    }
    return(
        <form onSubmit={(e)=>submit2(e)}>
            <h1>Creacion de fases</h1>
            <div></div>
                <h6>Torneo: </h6>
                <select onChange = {(e)=>handle2(e)} id = "Tournament_ID" value = {tournamentData.Tournament_ID}> 
                    <option value = ""> --Escoja un torneo--</option>
                    {tourneysData.map((option, index) => (
                    <option key={index} value={option.CodeTournament}>
                        {option.CodeTournament + " - " + option.Name}
                    </option>
                    ))}
                </select>
            <div></div>
            <input onChange = {(e)=>handle2(e)} id = "Name" value = {stageData.Name} placeholder ="Nombre de la fase" type="text"></input>
            <button type = "cstage"> Crear fase</button>
            </form>
    );

}
export default StageForm;