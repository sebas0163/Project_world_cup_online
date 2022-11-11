import React, { useState, useEffect } from 'react'
import axios from "axios";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import plusLGIcon from '../../assets/icons/plus-lg.svg';
import { Link } from 'react-router-dom';

const ViewPredictions= props =>{
    const navigate = useNavigate();
    /* All tournaments */
    
    const [currentUser, setCurrentUser] = useState(1)
    const [userPredictions, setUserPredictions] = useState([])

    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    /* Getting the prediction data from the API */
    useEffect(() => {
        setCurrentUser(props.user)
        client.get('prediction/user/'+props.user.Id).then((response) => {
            console.log("resp>",response.data)
            setUserPredictions(response.data);

        });

    }, [props.user]);

    /* Creating a table row for each element in the array. */
    const tableRows = userPredictions.map(
        (element) => {
            return (

                <tr>
                    <td>{element.Id}</td>
                    <td>{element.Home_Score}</td>
                    <td>{element.Visit_Score}</td>
                    <td>{element.Best_player}</td>
                    <td>{element.Id_user}</td>
                    <td>{element.Id_match}</td>
                </tr>

            )
        }
    )
    return (
        <div>
            <h1>Ver todas mis predicciones</h1>
            <br />
            <div>
                <div className='row'>
                    <div className='col-auto'>
                        <h3>Predicciones</h3>
                    </div>
                    <div className='col-auto'>
                    </div>
                </div>
                <br />
                <Table hover id='gamesTable'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Home_Score</th>
                            <th>Visit_Score</th>
                            <th>Best_player</th>
                            <th>Id_user</th>
                            <th>Id_match</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
                <br /><br /><br /><br />
            </div>
        </div>
    );
}
export default ViewPredictions;
