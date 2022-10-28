import React, {useState, useEffect} from "react";
import axios from "axios";

function Assignment(){
    const url2 = "http://localhost:5000/api/v1/tournament/compete/"
    const [tourneysData, setTourneysData] = useState([])
    const [teamsData, setTeamsData] = useState([])

    const [teamData, setData2] = useState({
        
        Id: "",
        Name: "",
        Type: ""
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
    const [assignmentdata, setAssignmentdata] = useState({
        Id_Team : "",
        TournamentCode : ""
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
        client.get('team/').then((response) => {
            setTeamsData(response.data[0]);
        });
    
    }, []);

    function submit2(e){
        e.preventDefault();
        console.log(url2)
        axios.post(url2, {
            Id_Team: assignmentdata.Id_Team,
            TournamentCode: assignmentdata.TournamentCode
        })
        .then(response =>{
            console.log(response.tourneyData)
        })
    }

    function handle2(e){
        const newData = {...assignmentdata}
        newData[e.target.id] = e.target.value
        setData2(newData)
        console.log(newData)
    }
    return(
        <form onSubmit={(e)=>submit2(e)}>
            <h1>Asignacion de equipos</h1>
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
            <br /><br />
            <div></div>
                <h6>Equipo: </h6>
                <select onChange = {(e)=>handle2(e)} id = "ID_Team" value = {teamData.Id}> 
                    <option value = ""> --Escoja un equipo--</option>
                    {teamsData.map((option, index) => (
                    <option key={index} value={option.Id}>
                        {option.Id + " - " + option.Name}
                    </option>
                    ))}
                </select>
            <div></div>
            <br /><br />
            <button type = "cstage"> Inscribir equipo</button>
            </form>
    );

}
export default Assignment;