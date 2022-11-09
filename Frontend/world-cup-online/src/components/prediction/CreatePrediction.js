import React, { useState, useEffect } from "react";
import axios from "axios";
import NumericInput from 'react-numeric-input';
import predictionImage from '../../assets/images/prediction.jpg';
import './prediction.css';

function CreatePrediction(){
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    const [HomePlayers, setHomePlayers] = useState([])
    const [VisitPlayers, setVisitPlayers] = useState([])
    const [players, setPlayers] = useState([])

    const [playerselect, setplayerselect] = useState([])
    const [homeGoaliesSelect, sethomeGoaliesSelect] = useState([])
    const [visitGoaliesSelect, setvisitGoaliesSelect] = useState([])

    const [currentMatch, setCurrentMatch] = useState({
        Id: "1",
        Stadium: "Test Stadium",
        HomeId: "1",
        VisitId: "2",
        StartDateTime: "",
        State: "Pendiente",
        Score: "0-0",
        Tournament_ID: "",
        Stage_ID: "",
        Home_Name: "Costa Rica",
        Visit_Name: "Alemania"
    })
    const [prediction, setPrediction] = useState({
        Home_Score : 0,
        Visit_Score : 0,
        Best_player : "",
        Id_user : "",
        Id_match : "",
        GoalList : []
    })
    
/* Getting the tournament data from the API */
    useEffect(() => {
        /*get de match que traiga todo lo del match, team names, */
        var temp = []
        client.get('player/team/'+currentMatch.HomeId).then((response) => {
            
            setHomePlayers(response.data);
            temp = temp.concat(response.data);
            console.log("playes", temp)
        });
        client.get('player/team/'+currentMatch.VisitId).then((response) => {
            
            setVisitPlayers(response.data);
            setPlayers(temp.concat(response.data))
            console.log("playes", temp)
        });
    }, []);
    function handleHomeScore(e)
    {
        const newData = { ...prediction }
        newData["Home_Score"] = e
        setPrediction(newData)
        console.log(newData)
        setHomeGoalies(e, "Home")


    }
    function handleVisitScore(e)
    {
        const newData = { ...prediction }
        newData["Visit_Score"] = e
        setPrediction(newData)
        console.log(newData)
        setVisitGoalies(e, "Visit")

    }
    function handlePlayerSelects(e){
        var selectId=e.target.id
        setplayerselect(e.target.value) 
        console.log("handlegoalie id",e.target.id)
        console.log("handlegoalie2 value",e.target.value)
    }

    function setHomeGoalies(num, tag){
        
        const numbers = Array. from({length: num}, (_, index) => index + 1);
        sethomeGoaliesSelect(
            numbers.map(number => {
                return(
                    <div>
                       <h5>Gol #{number}</h5>
                        <select onChange={(e) => handlePlayerSelects(e)} id={tag +"-Gol-"+number}>
                            <option value=""> --Escoja al goleador--</option>
                            {HomePlayers.map((option, index) => (
                                <option key={index} value={option.Id}>
                                    {option.Name}
                                </option>
                            ))}
                        </select>
                        <h6>asistido por: </h6>
                        <select onChange={(e) => handlePlayerSelects(e)} id={tag + "-Asisted-"+number} >
                            <option value=""> --Escoja al que asistio el gol--</option>
                            {HomePlayers.map((option, index) => (
                                <option key={index} value={option.Id}>
                                    {option.Name}
                                </option>
                            ))}
                        </select>
                        <br />
                    </div>
                )
            })
        )
        
        
    }
    function setVisitGoalies(num, tag){
        
        const numbers = Array. from({length: num}, (_, index) => index + 1);
        setvisitGoaliesSelect(
            numbers.map(number => {
                return(
                    <div>
                       <h5>Gol #{number}</h5>
                        <select onChange={(e) => handlePlayerSelects(e)} id={tag +"-Gol-"+number} >
                            <option value=""> --Escoja al goleador--</option>
                            {VisitPlayers.map((option, index) => (
                                <option key={index} value={option.Id}>
                                    {option.Name}
                                </option>
                            ))}
                        </select>
                        <h6>asistido por: </h6>
                        <select onChange={(e) => handlePlayerSelects(e)} id={tag + "-Asisted-"+number} >
                            <option value=""> --Escoja al que asistio el gol--</option>
                            {VisitPlayers.map((option, index) => (
                                <option key={index} value={option.Id}>
                                    {option.Name}
                                </option>
                            ))}
                        </select>
                        <br />
                    </div>
                )
            })
        )
        
        
    }
    function handleBestPlayer(e) {
        const newData = { ...prediction }
        newData[e.target.id] = e.target.value
        setPrediction(newData)
        console.log(newData)
        console.log("vivsit",visitGoaliesSelect)
        console.log("homme", homeGoaliesSelect)


    }
    function submit(e){
        e.preventDefault();
        console.log("submit", prediction)
    }
    
    return(
        <div>
            <div className="row">
                <div className="col-auto">
                    <img id="predictionImage" src={predictionImage} alt="prediction" />
                </div>
                <div className="col">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="row">
                            <h1>Hacer una prediccion</h1>
                            <br />                            
                            <h3>¿Cual va a ser el marcador del partido?</h3>
                            <br />
                            <div className="col">
                                <h4> {currentMatch.Home_Name}</h4>
                                <NumericInput 
                                className="form-control"
                                name = "ScoreHome"
                                value={prediction.Home_Score}
                                min ={0}  
                                max ={99}
                                strict
                                onChange={(e) => handleHomeScore(e)}
                                />
                                <br />
                                <tbody>
                                    {homeGoaliesSelect}
                                </tbody>
                            </div>
                            <div className="col">
                                <h4>vs</h4>
                            </div>
                            <div className="col">
                                <h4> {currentMatch.Visit_Name}</h4>
                                <NumericInput 
                                className="form-control"
                                name = "ScoreVisit"
                                value={prediction.Visit_Score}  
                                min ={0}  
                                max ={99}
                                strict
                                onChange={(e) => handleVisitScore(e)}
                                />
                                <br />
                                <tbody>
                                    {visitGoaliesSelect}
                                </tbody>
                            </div>
                        </div>
                        <div className="row">
                            
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <h3>Mejor jugador del partido: </h3>
                            </div>
                            <div className="col=2">
                                <select onChange={(e) => handleBestPlayer(e)} id="Best_Player" value={prediction.Best_player}>
                                <option value=""> --Escoja al mejor jugador--</option>
                                {players.map((option, index) => (
                                    <option key={index} value={option.Id}>
                                        {option.Name}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <br />
                        <div className="col-auto">
                            <button id="goldBtn" className="btn btn-warning" type="submit"> Hacer prediccion</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>

    );

}
export default CreatePrediction