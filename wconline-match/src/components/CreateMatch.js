import React, {useState, useEffect} from "react";
import axios from "axios";
import Select from 'react-select';

function MatchForm(){
    const [stageData, setStageData] = useState([])
    const [teamsData, setTeamsData] = useState([])
    const [tourneysData, setTourneysData] = useState([])

    const url = "http://localhost:5000/api/v1/match/"
    const url2 = "http://localhost:5000/api/v1/stage/"
    const teams = [
        { value: '', text: 'Escoja al equipo' },
        { value: 'team1', text: 'Teaam1' },
        { value: 'team2', text: 'Team2' },
        { value: 'team3', text: 'Team3' }
      ];
      
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"   
    });
    useEffect(() => {
    client.get('stage/').then((response) => {
        setStageData(response.data[0]);
    });

    client.get('tournament/').then((response) => {
        setTourneysData(response.data[0]);
    });

    }, []);      
    const [matchData, setData] = useState({
        Stadium: "",
        Team1: "",
        Team2: "",
        StartDateTime: "",
        State: "Pendiente",
        Score: "0-0",
        Tournament_ID: "",
        Stage_ID: ""
    })
    

    function submit(e){
        e.preventDefault();
        
        console.log(matchData)
        client.post('match', {
            Stadium: matchData.Stadium,
            Team1: matchData.Team1,
            Team2: matchData.Team2,
            StartDateTime: matchData.StartDateTime,
            State: matchData.State,
            Score: matchData.Score,
            Tournament_ID: matchData.Tournament_ID,
            Stage_ID: matchData.Stage_ID
        })
        .then(response =>{
            console.log(response.matchData)
        })
    }
    function handle(e){
        const newData = {...matchData}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    return(
        <div>
            <h1>Crear un partido</h1>
            <h4>Llene toda la información sobre el partido</h4>
            
            <form onSubmit={(e)=>submit(e)}>
                <label>Fecha y hora: </label>
                <input onChange = {(e)=>handle(e)} id = "StartDateTime" value = {matchData.StartDateTime} placeholder ="StartDateTime" type="datetime-local"></input>
                
                <div></div>
                <label>Torneo: </label>
                <select onChange = {(e)=>handle(e)} id = "Tournament_ID" value = {matchData.Tournament_ID}> 
                    {tourneysData.map((option, index) => (
                    <option key={index} value={option.Id}>
                        {option.Name}
                    </option>
                    ))}
                </select>

                <div></div>
                <label>Fase: </label>
                <select onChange = {(e)=>handle(e)} id = "Stage_ID" value = {matchData.Stage_ID}> 
                    {stageData.map((option, index) => (
                    <option key={index} value={option.Id}>
                        {option.Name}
                    </option>
                    ))}
                </select>

                <div></div>
                <select onChange = {(e)=>handle(e)} id = "Team1" value = {matchData.Team1}> 
                    {teams.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <label> vs </label>
                <select onChange = {(e)=>handle(e)} id = "Team2" value = {matchData.Team2}> 
                    {teams.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                
                <div></div>
                <label>Sede: </label>
                <input onChange = {(e)=>handle(e)} id = "Stadium" value = {matchData.Stadium} placeholder ="Stadium" type="text"></input>
                
                <div></div>
                <button type = "submit"> Crear partido</button>
            </form>
        </div>
    );
}
export default MatchForm;