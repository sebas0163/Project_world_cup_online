import React, { useState, useEffect } from 'react'
import axios from "axios";
import Select from 'react-select'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import plusLGIcon from '../../assets/icons/plus-lg.svg';

function ViewTourneys() {
    const navigate = useNavigate();
    const [tourneyData, setData] = useState({
        Id: "",
        CodeTournament: "",
        Name: "",
        StartDate: "",
        EndDate: "",
        Rules: "",
        Type: ""
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

   /**
    * It takes the current state of the tourneyData object, creates a new object with the same
    * properties, and then updates the property that was changed by the user.
    * @param e - the event object
    */
    function handleTourney(e) {
        const newData = { ...tourneyData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(tourneyData)

    }
    const tableRows = tourneysData.map(
        (element) => {
            return (

                <tr>
                    <td>{element.Id}</td>
                    <td>{element.CodeTournament}</td>
                    <td>{element.Name}</td>
                    <td>{element.StartDate}</td>
                    <td>{element.EndDate}</td>
                    <td>{element.Rules}</td>
                    <td>{element.Type}</td>
                </tr>
            )
        }
    )
    return (
        <div>
            <h3>Torneos</h3>
            <br /><br />
            <a href='/create-tournament' class="float" title='Create a new tournament'>
                <i class="fa fa-plus my-float">
                    <img src={plusLGIcon} alt="plus icon" id="icon" />
                </i>
            </a>
            <Table hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>CodeTournament</th>
                        <th>Name</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Rules</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
            <br /><br /><br /><br />
            <button id="goldBtn" className="btn btn-warning" onClick={() => navigate("/create-stage")}>Crear etapas</button>
            <br /><br />
            <button id="goldBtn" className="btn btn-warning" onClick={() => navigate("/assignment")}>Asignar equipos</button>
        </div>


    );
}
export default ViewTourneys;