import React, {useState, useEffect} from 'react'
import axios from "axios";
import Select from 'react-select'
function ViewMatches(){
    const [tourneyData, setData] = useState({
        Stadium: "",
        Team1: "",
        Team2: "",
        StartDateTime: "",
        State: "Pendiente",
        Score: "0-0",
        Tournament_ID: "",
        Stage_ID: ""
    })
    const [tourneysData, setTourneysData] = useState([])

    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"   
    });
    useEffect(() => {
        client.get('tournament/').then((response) => {
            setTourneysData(response.data[0]);
        });
    
    }, []);

    function handle(e){
        
        
        // client.get("match/"+tourneyID).then((response) => {
        //     setData(response.data[0]);
        // });
        const newData = {...tourneyData}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(tourneyData)

    }
    return(
        <div>
            <h1>Ver partidos</h1>
            <div></div>
                <label>Torneo: </label>
                <select onChange = {(e)=>handle(e)} id = "Tournament_ID" value = {tourneyData.Tournament_ID}>
                    <option value = ""> --Escoja un torneo--</option> 
                    {tourneysData.map((option, index) => (
                    <option key={index} value={option.Id}>
                        {option.Name}
                    </option>
                    ))}
                </select>
        </div>
    );
}
export default ViewMatches;
