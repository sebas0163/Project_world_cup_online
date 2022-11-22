import React, { useState, useEffect } from "react";
import axios from "axios";
import NumericInput from 'react-numeric-input';
import { useNavigate } from "react-router-dom";
import predictionImage from '../../assets/images/prediction.jpg';
import './prediction.css';
import Table from 'react-bootstrap/Table';

const CreatePrediction = props =>{
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    const navigate = useNavigate();
    /*Lists with team players from a match*/
    const [HomePlayers, setHomePlayers] = useState([])
    const [VisitPlayers, setVisitPlayers] = useState([])
    const [players, setPlayers] = useState([])

    /* Lists with goals and asistances*/
    const [goals, setGoals] = useState([])
    const [asistances, setAsistances] = useState([])

    /*Header, goal number picker and asistances number picker for each player*/
    const [homeSelect, sethomeSelect] = useState([])
    const [visitSelect, setvisitSelect] = useState([])

    const [homeOwnGoals, sethomeOwnGoal] = useState(0)
    const [visitOwnGoals, setvisitOwnGoal] = useState(0)

    /* Selected match*/
    const [currentMatch, setCurrentMatch] = useState({})

    /*Logged in user*/
    const [currentUser, setCurrentUser] = useState("admin")

    /*Prediction to post */
    const [prediction, setPrediction] = useState({
        Home_Score : 0,
        Visit_Score : 0,
        Best_player : "",
        Id_user : "",
        Id_match : "",
        GoalList : [],
        Id_Winner : ""
    })
    
    /*All goals and assists to validate counter */
    const [allGoals, setAllGoals] = useState([])
    const [allAssists, setAllAssists] = useState([])

    const [isTie, setIsTie] = useState(false)

    /* Setting the currentMatch and currentUser to the props.match and props.user. */
    useEffect(() => {
        console.log("Match", props.match)
        setCurrentMatch(props.match)
        setCurrentUser(props.user)
    }, [props.match,props.user]);

    
    /* Getting the players from the database and setting them to the state. */
    useEffect(() => {
        
        /*get de match que traiga todo lo del match, team names, */
        var temp = []
        client.get('player/team/'+props.match.HomeId).then((response) => {
            
            setHomePlayers(response.data);
            temp = temp.concat(response.data);
            
        });
        client.get('player/team/'+props.match.VisitId).then((response) => {
            
            setVisitPlayers(response.data);
            setPlayers(temp.concat(response.data))
            
        });
    }, [props.match,props.user]);

   /**
    * When the user enters a number into the Home_Score input field, the function will update the
    * Home_Score property of the prediction object with the value entered by the user, and then call
    * the setHomeGoalies function
    * @param e - the value of the input field
    */
    function handleHomeScore(e)
    {
        const newData = { ...prediction }
        newData["Home_Score"] = e
        setPrediction(newData)
        console.log(newData)
        setHomeGoalies()
        setWinner(newData)
    }
    /**
      * When the user enters a number into the VisitHome_Score input field, the function will update the
    * Home_Score property of the prediction object with the value entered by the user, and then call
    * the setVisitGoalies function
     * @param e - the value of the input field
     */
    function handleVisitScore(e)
    {
        const newData = { ...prediction }
        newData["Visit_Score"] = e
        setPrediction(newData)
        console.log(newData)
        setVisitGoalies()
        setWinner(newData)
        

    }

    function setWinner(newData){
        console.log("Marcador", newData.Visit_Score, newData.Home_Score)
        if (newData.Visit_Score == newData.Home_Score){
            setIsTie(false)
        }
        else{
            setIsTie(true)
            if (newData.Visit_Score > newData.Home_Score){
                newData["Id_Winner"] = currentMatch.VisitId
                
            }
            if (newData.Visit_Score < newData.Home_Score){
                newData["Id_Winner"] = currentMatch.HomeId
            }
        }
        setPrediction(newData)
    }
    function handleHomeOwnGoals(e){
        sethomeOwnGoal(e)
    }
    function handleVisitOwnGoals(e){
        setvisitOwnGoal(e)
    }
    
    /**
     * It takes creates the list of home players, each with a header, a goal counter 
     * and an asistances counter.
     */
    function setHomeGoalies(){
        
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
    /**
     * It takes creates the list of visit players, each with a header, a goal counter 
     * and an asistances counter.
     */
    function setVisitGoalies(){
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

    /**
     * When the user inputs a number of asistances or goals it saves the number on a list with the player id and the amount .
     * @param e - the event object
     */
    function handlePlayer(e){
        var selectTeam = e.target.name.split("-")[0]+"-"
        var selectTag = e.target.name.split("-")[1]
        var playerId = e.target.name.split("-")[2]
        
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
            setAllGoals(current =>
                current.filter(object =>{
                    return object.Player_Id != selectTeam+playerId
                }))
            if (e.target.value !='0' && e.target.value != ''){
                setAllGoals( goals => [...goals, {
                
                    Player_Id : selectTeam+playerId,
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

            setAllAssists(current =>
                current.filter(object =>{
                    return object.Player_Id != selectTeam+playerId
                }))
            if (e.target.value !='0' && e.target.value != ''){
                setAllAssists( goals => [...goals, {
                
                    Player_Id : selectTeam+playerId,
                    Assists: e.target.value
                }])
            }
        }
        console.log("numPickId",e.target.name)
        console.log("selectTag",selectTag)
        console.log(e.target.name)
        console.log(e.target.value)
    }

    /**
     * Sets the best player value to the selected player in dropdown menu
     * @param e - the event object
     */
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
    /**
     * It checks if the number of goals and assists entered by the user match the number of goals and
     * assists by player. It alerts the user when it doesnt
     * @return true if it matches, false otherwise
     */
    function validateScore(){
        console.log("v allgoals", allGoals)
        console.log("v allassists", allAssists)
        console.log("v home score", prediction.Home_Score)
        console.log("v visit score", prediction.Visit_Score)
        var homeGoals = 0
        var homeAssists = 0
        var visitGoals = 0
        var visitAssists = 0
        allGoals.forEach(goal =>{
            if(goal.Player_Id.split('-')[0]=="Home"){
                homeGoals = homeGoals+ parseInt(goal.Goals)
            }
            
            if(goal.Player_Id.split('-')[0]=="Visit"){
                visitGoals = visitGoals+ parseInt(goal.Goals)
            }
            
        })
        allAssists.forEach(goal =>{
            if(goal.Player_Id.split('-')[0]=="Home"){
                homeAssists = homeAssists+ parseInt(goal.Assists)
            }
            if(goal.Player_Id.split('-')[0]=="Visit"){
                visitAssists = visitAssists+ parseInt(goal.Assists)
            }
        })
        if ((prediction.Home_Score - homeOwnGoals + visitOwnGoals) != homeGoals){//los goleadores de home no coinciden con el marcador
            alert(`La cantidad de goleadores no coincide con el marcador de `+currentMatch.HomeName)
            return false
        }
        if (prediction.Home_Score < homeAssists){
            alert(`La cantidad de asistencias debe ser menor que el marcador de `+currentMatch.HomeName)
            return false
        }
        if ((prediction.Visit_Score - visitOwnGoals + homeOwnGoals) != visitGoals){
            alert(`La cantidad de goleadores no coincide con el marcador de `+currentMatch.VisitName)
            return false
        }
        if (prediction.Visit_Score < visitAssists){
            alert(`La cantidad de asistencias debe ser menor que el marcador de `+currentMatch.VisitName)
            return false
        }
        else{return true}
        

    }
    /**
     * If the length of the string in the Best_player field is 0, or the length of the string in the
     * Home_Score field is 0, or the length of the string in the Visit_Score field is 0, then display
     * an alert and return false. Otherwise, return true.
     * @returns true if the best player was chosen, false otherwise
     */
    function validateBestPlayer(){
        if (prediction.Best_player.length == 0 ||
            prediction.Home_Score.length == 0 ||
            prediction.Visit_Score.length == 0 ) {
            alert(`Llene quien va a ser el mejor jugador]`)
            return false

        }
        return true
    }

    
    /**
     * It takes the goals and assistances arrays, merges them into one array, and then creates a new
     * array with the merged data to assign to prediction GoalList. Then it validates best player and
     * validate score, if its correct the posts a prediction to the API
     * @param e - the event object
     */
    function submit(e){
        e.preventDefault();
        console.log("goals",goals)
        console.log("assistances",asistances)
        if (validateBestPlayer() && validateScore()){
            
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
            newData["Id_user"] = currentUser.Id

            
            setPrediction(newData)

            client.post('prediction', {
                Home_Score : newData.Home_Score,
                Visit_Score : newData.Visit_Score,
                Best_player: newData.Best_player,
                Id_user : currentUser.Id,
                Id_match : newData.Id_match,
                GoalList: newData.GoalList
            }).then(response => {
                console.log(response)
            })
            console.log("submit", newData)
            alert(`Se ha realizado la prediccion`)
            navigate("/view-prediction");
            
        }else{
            alert(`Error al hacer la prediccion, intente de nuevo`)
        }
        
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
                                <h4> {currentMatch.HomeName}</h4>
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
                                <h6>Auto goles a favor</h6>
                                <NumericInput 
                                className="form-control"
                                name = "HomeOwnGoals"
                                value={homeOwnGoals}
                                min ={0}  
                                max ={prediction.Home_Score}
                                strict
                                onChange={(e) => handleHomeOwnGoals(e)}
                                />
                            </div>
                            <div className="col-auto">
                                <h4>vs</h4>
                            </div>
                            <div className="col">
                                <h4> {currentMatch.VisitName}</h4>
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
                                <h6>Auto goles a favor</h6>
                                <NumericInput 
                                className="form-control"
                                name = "VisitOwnGoals"
                                value={visitOwnGoals}
                                min ={0}  
                                max ={prediction.Visit_Score}
                                strict
                                onChange={(e) => handleVisitOwnGoals(e)}
                                />
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
                            <div className="col">
                                <h3>Ganador del partido: </h3>
                            </div>
                            <div className="col=2">
                                <select disabled = {isTie} onChange={(e) => handleBestPlayer(e)} id="Id_Winner" value={prediction.Id_Winner }>
                                
                                    <option value= {currentMatch.HomeId}>{currentMatch.HomeName}</option>
                                    <option value= {currentMatch.VisitId}>{currentMatch.VisitName}</option>
                                
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