import React, {useState, useEffect} from 'react'
import axios from "axios";
function ViewMatches(){
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
    const [tourneysData, setTourneysData] = useState([])
    const [tourneyID, setTourneIDsData] = useState()

    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"   
    });
    useEffect(() => {
        client.get('tournament/').then((response) => {
            setTourneysData(response.data[0]);
        });
    
    }, []);

    function handle(e){
        setTourneIDsData(e.target.value)
        console.log(tourneyID)
        client.get("match/"+tourneyID).then((response) => {
            setData(response.data[0]);
        });
        console.log(matchData);

    }
    return(
        <div>
            <h1>Ver partidos</h1>
            <div></div>
                <label>Torneo: </label>
                <select onChange = {(e)=>handle(e)} id = "tourneyID" value = {tourneyID}> 
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
