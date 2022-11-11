import React, { useState, useEffect } from "react";
import axios from "axios";
import NumericInput from 'react-numeric-input';
import predictionImage from '../../assets/images/prediction.jpg';
import './prediction.css';
import Table from 'react-bootstrap/Table';

const CreatePrediction = props =>{
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    const [HomePlayers, setHomePlayers] = useState([])
    const [VisitPlayers, setVisitPlayers] = useState([])
    const [players, setPlayers] = useState([])

    const [goals, setGoals] = useState([])
    const [asistances, setAsistances] = useState([])

    /*Selects de react*/
    const [homeSelect, sethomeSelect] = useState([])
    const [visitSelect, setvisitSelect] = useState([])

    const [currentMatch, setCurrentMatch] = useState({
        
    })
    const [currentUser, setCurrentUser] = useState(1)

    const [prediction, setPrediction] = useState({
        Home_Score : 0,
        Visit_Score : 0,
        Best_player : "",
        Id_user : "",
        Id_match : "",
        GoalList : []
    })
    
    useEffect(()=>{
        console.log("Match", props.match)
        setCurrentMatch(props.match)
        setCurrentUser(props.user)
    }, [props.match,props.user])
/* Getting the tournament data from the API */
    useEffect(() => {
        
        /*get de match que traiga todo lo del match, team names, */
        var temp = []
        client.get('player/team/'+currentMatch.HomeId).then((response) => {
            
            setHomePlayers(response.data);
            temp = temp.concat(response.data);
            
        });
        client.get('player/team/'+currentMatch.VisitId).then((response) => {
            
            setVisitPlayers(response.data);
            setPlayers(temp.concat(response.data))
            
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
    function setHomeGoalies(num, tag){
        
       
        sethomeSelect(
            HomePlayers.map(player => {
                return(
                    <tr>
                        <td>
                        <h7>{player.Id +"-"+ player.Name}</h7>
                        </td>
                        <td>
                        <input 
                            className="form-control"
                            name = {"Home-Goal-"+player.Id}
                            type = "number"
                            onChange={(e) => handlePlayer(e)}
                            
                        />
                        </td>
                        <td>
                        <input 
                            className="form-control"
                            name = {"Home-Asist-"+player.Id}
                            type = "number"
                            onChange={(e) => handlePlayer(e)}
                            
                        />
                        </td>
                    </tr>
                )
            })
        )
        
        
    }
    function handlePlayer(e){
        
        var selectTag = e.target.name.split("-")[1]
        var playerId = e.target.name.split("-")[2]
        var Id = playerId
        if(selectTag =="Goal")
        {
            
            setGoals(current =>
                current.filter(object =>{
                    return object.Player_Id != playerId
                }))
            if (e.target.value !='0' && e.target.value != ''){
                setGoals( goals => [...goals, {
                
                    Player_Id : playerId,
                    Goals: e.target.value
                }])
            }
        }
        if(selectTag =="Asist")
        {
            setAsistances(current =>
                current.filter(object =>{
                    return object.Player_Id != playerId
                }))
            if (e.target.value !='0' && e.target.value != ''){
                setAsistances( asistances => [...asistances, {
                    
                    Player_Id : playerId,
                    Assists : e.target.value
                }])
            }
        }
        console.log("numPickId",e.target.name)
        console.log("selectTag",selectTag)
        console.log(e.target.name)
        console.log(e.target.value)
    }
    function setVisitGoalies(num, tag){
        setvisitSelect(
            VisitPlayers.map(player => {
                return(
                    <tr>
                        <td>
                        <h7>{player.Id +"-"+ player.Name}</h7>
                        </td>
                        <td>
                        <input 
                            className="form-control"
                            name = {"Visit-Goal-"+player.Id}
                            type = "number"
                            onChange={(e) => handlePlayer(e)}
                            
                        />
                        </td>
                        <td>
                        <input 
                            className="form-control"
                            name = {"Visit-Asist-"+player.Id}
                            type = "number"
                            onChange={(e) => handlePlayer(e)}
                            
                        />
                        </td>
                    </tr>
                    
                )
            })
        )
        
        
    }
    function handleBestPlayer(e) {
        const newData = { ...prediction }
        newData[e.target.id] = e.target.value
        setPrediction(newData)
        console.log(newData)
        console.log("vivsit",visitSelect)
        console.log("homme", homeSelect)
        console.log("goals",goals)
        console.log("assistances",asistances)


    }
    function submit(e){
        e.preventDefault();
        console.log("goals",goals)
        console.log("assistances",asistances)

        const result = [
            ...[...goals, ...asistances]
              .reduce(
                (acc, curr) => acc.set(curr.Player_Id, { ...acc.get(curr.Player_Id), ...curr }),
                new Map()
              )
              .values(),
          ];
        const newData = { ...prediction }
        newData["GoalList"] = result
        newData["Id_match"] = currentMatch.Id
        newData["Id_user"] = currentUser

        
        setPrediction(newData)

        client.post('prediction', {
            Home_Score : newData.Home_Score,
            Visit_Score : newData.Visit_Score,
            Best_player: newData.Best_player,
            Id_user : newData.Id_user,
            Id_match : newData.Id_match,
            GoalList: newData.GoalList
        })
        

        console.log("submit", newData)
    }
    
    return(
        <div>
            <div className="row">
                {/* <div className="col-auto">
                    <img id="predictionImage" src={predictionImage} alt="prediction" />
                </div> */}
                <div className="col">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="row">
                            <h1>Hacer una prediccion</h1>
                            <br />                            
                            <h3>¿Cual va a ser el marcador del partido?</h3>
                            <br />
                            <div className="col">
                                <h4> {currentMatch.HomeId}</h4>
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
                                <Table hover id='gamesTable'>
                                    <thead>
                                        <tr>
                                            <th>Jugador</th>
                                            <th>Goles</th>
                                            <th>Asistencias</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {homeSelect}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-auto">
                                <h4>vs</h4>
                            </div>
                            <div className="col">
                                <h4> {currentMatch.VisitId}</h4>
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
                                <Table hover id='gamesTable'>
                                    <thead>
                                        <tr>
                                            <th>Jugador</th>
                                            <th>Goles</th>
                                            <th>Asistencias</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visitSelect}
                                    </tbody>
                                </Table>
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
                                <select onChange={(e) => handleBestPlayer(e)} id="Best_player" value={prediction.Best_player }>
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