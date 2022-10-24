import React, {useState} from "react";
import axios from "axios";
import Select from 'react-select';

function MatchForm(){
    const url = "http://localhost:5000/api/v1/match/"
    const teams = [
        { value: '', text: 'Escoja al equipo' },
        { value: 'team1', text: 'Teaam1' },
        { value: 'team2', text: 'Team2' },
        { value: 'team3', text: 'Team3' }
      ];
      const tourneys = [
        { value: '', text: 'Escoja el torneo' },
        { value: '1', text: 'Tour1' },
        { value: 'tour2', text: 'Tour2' },
        { value: 'tour3', text: 'Tour3' }
      ];

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
        console.log(url)
        axios.post(url, {
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
            <form onSubmit={(e)=>submit(e)}>
            <input onChange = {(e)=>handle(e)} id = "StartDateTime" value = {matchData.StartDateTime} placeholder ="StartDateTime" type="datetime-local"></input>
            <input onChange = {(e)=>handle(e)} id = "Stage_ID" value = {matchData.Stage_ID} placeholder ="Stage_ID" type="text"></input>
            <input onChange = {(e)=>handle(e)} id = "Stadium" value = {matchData.Stadium} placeholder ="Stadium" type="text"></input>
            <div>
                <select onChange = {(e)=>handle(e)} id = "Team1" value = {matchData.Team1}> 
                    {teams.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <select onChange = {(e)=>handle(e)} id = "Team2" value = {matchData.Team2}> 
                    {teams.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <select onChange = {(e)=>handle(e)} id = "Tournament_ID" value = {matchData.Tournament_ID}> 
                    {tourneys.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
            </div>
            <button type = "submit"> Crear partido</button>
            </form>
        </div>
    );
}
export default MatchForm;