import React, {useState} from "react";
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
            <input onChange = {(e)=>handle2(e)} id = "StartDate" value = {stageData.StartDate} placeholder ="StartDate" type="date"></input>
            <input onChange = {(e)=>handle2(e)} id = "EndDate" value = {stageData.EndDate} placeholder ="EndDate" type="date"></input>
            <input onChange = {(e)=>handle2(e)} id = "Name" value = {stageData.Name} placeholder ="Stage_name" type="text"></input>
            <button type = "cstage"> Crear fase</button>
            </form>
    );

}