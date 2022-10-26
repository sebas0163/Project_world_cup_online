import React, {useState, useEffect} from "react";
import axios from "axios";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import 'react-datepicker/dist/react-datepicker.css'

function CreateMatch(){
    const [stageData, setStageData] = useState([])
    const [date, setDate] = useState(new Date());
    // var minDate="";
    // var maxDate = "";
    const [minDate, setminDate] = useState("")
    const [maxDate, setmaxDate] = useState("")
    const [tourneysData, setTourneysData] = useState([])


    const url = "http://localhost:5000/api/v1/match/"
    const url2 = "http://localhost:5000/api/v1/stage/"
    const teams = [
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
    const [tournamentData, setTournamentData] = useState({
        Id : "",
        CodeTournament : "",
        Name : "",
        StartDate : "",
        EndDate : "",
        Rules : "",
        Type : ""
    })
    
    
    async function updateTournament(e){
        const newData = {...matchData}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
        const tournament_response = await client.get('tournament/'+newData.Tournament_ID);
        setTournamentData(tournament_response.data[0])
        console.log("tournament_response.data[0]",tournament_response.data[0])
        setminDate(tournament_response.data[0][0].StartDate.split("T")[0])
        setmaxDate(tournament_response.data[0][0].EndDate.split("T")[0])
        setDate('');
        console.log(minDate);
        const stage_response = await client.get('stage/tournament/'+newData.Tournament_ID);
        setStageData(stage_response.data[0])
        
        console.log("newData.Tournament_ID",newData.Tournament_ID);
       
    }

    function validateMatch(){
        const newData = {...matchData}
        if (matchData.Stadium.length==0 ||
            matchData.Team1.length==0 ||
            matchData.Team2.length==0 ||
            matchData.StartDateTime.length==0 ||
            matchData.Tournament_ID.length==0 ||
            matchData.Stage_ID ==0)
        {
            
            return false
            
        }
        return true
    }
    function submit(e){
        e.preventDefault();
        if(validateMatch()){
            console.log(matchData)
            console.log(tournamentData)
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
                console.log(response.status)
            })
            alert(`Partido creado correctamente`)
        }
        else{
            alert(`Por favor llene todos los espacios`)
        }
        
    }
    function handle(e){
        const newData = {...matchData}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
        
    }
    function handleDate(e){
        const newData = {...matchData}
        newData["StartDateTime"] = e.toISOString()
        setData(newData)
        console.log(newData)
        setDate(e)
        
        console.log(e.toISOString())
    }
    return(
        <div>
            <h1>Crear un partido</h1>
            <h4>Llene toda la información sobre el partido</h4>
            
            <form onSubmit={(e)=>submit(e)}>
                <label>Fecha y hora: </label>
                <DateTimePicker
                name = "StartDateTime"
                value = {date}
                onChange={(e)=>handleDate(e)}
                minDate={new Date(minDate)}
                maxDate={new Date(maxDate)}
                placeholderText="Select a date"
                />
                {/* <input onChange = {(e)=>handle(e)} id = "StartDateTime" value = {matchData.StartDateTime} placeholder ="StartDateTime" type="datetime-local"
                min = "2022-10-01" max ="2022-11-01"></input> */}
                
                <div></div>
                <label>Torneo: </label>
                <select onChange = {(e)=>updateTournament(e)} id = "Tournament_ID" value = {matchData.Tournament_ID}> 
                    <option value = ""> --Escoja un torneo--</option>
                    {tourneysData.map((option, index) => (
                    <option key={index} value={option.CodeTournament}>
                        {option.Name}
                    </option>
                    ))}
                </select>

                <div></div>
                <label>Fase: </label>
                <select onChange = {(e)=>handle(e)} id = "Stage_ID" value = {matchData.Stage_ID}> 
                    <option value = ""> --Escoja una fase--</option>
                    {stageData.map((option, index) => (
                    <option key={index} value={option.Id}>
                        {option.Name}
                    </option>
                    ))}
                </select>

                <div></div>
                <select onChange = {(e)=>handle(e)} id = "Team1" value = {matchData.Team1}> 
                <option value = ""> --Escoja el equipo 1--</option>
                    {teams.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <label> vs </label>
                <select onChange = {(e)=>handle(e)} id = "Team2" value = {matchData.Team2}> 
                <option value = ""> --Escoja el equipo 2--</option>
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
export default CreateMatch;