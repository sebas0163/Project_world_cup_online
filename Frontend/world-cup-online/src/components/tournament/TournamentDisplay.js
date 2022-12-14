import React, { useState, useEffect } from 'react'
import axios from "axios";
import Select from 'react-select'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import plusLGIcon from '../../assets/icons/plus-lg.svg';

const ViewTourneys = props => {

    let navigate = useNavigate();
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
            setTourneysData(response.data);
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

    const hoverStyle = {
        cursor: "pointer"
    }

    const selectTournament = async (e, tournament) => {
        e.preventDefault();
        props.select(tournament);
        navigate("/scoreboard");
    }

    const tableRows = tourneysData.map(
        (element, key) => {
            return (

                <tr style={hoverStyle} onClick={(e) => selectTournament(e, element)}>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Id}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.CodeTournament}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Name}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.StartDate}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.EndDate}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Rules}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Type}</td>
                </tr>
            )
        }
    )
    return (
        <div>
            <h3 id='leftTitle'>Torneos</h3>
            <br /><br />
            <a href='/create-tournament' class="float" title='Create a new tournament'>
                <i class="fa fa-plus my-float">
                    <img src={plusLGIcon} alt="plus icon" id="icon" />
                </i>
            </a>
            <Table hover borderless>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Codigo de torneo</th>
                        <th>Nombre</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de cierre</th>
                        <th>Reglas</th>
                        <th>Tipo de torneo</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
            <br /><br /><br /><br />

        </div>


    );
}
export default ViewTourneys;