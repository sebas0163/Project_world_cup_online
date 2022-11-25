import React, { useState, useEffect } from 'react'
import axios from "axios";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewPositions = props => {

    const [rankingData, setRankingData] = useState([])

    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });

    useEffect(() => {
        client.get('result/leaderboards/tournament/' + props.tournament.CodeTournament).then((response) => {
            setRankingData(response.data);
        });

    }, [props.tournament]);

    function getGroups(e){
        e.preventDefault();
        client.get('result/leaderboards/group/' + props.tournament.CodeTournament)
    }

    const tableRows = rankingData.map(
        (element, key) => {
            return (
                <tr>
                    <td style={{ color: "black", backgroundColor: "white" }}>1</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.NickName}</td>
                    <td style={{ color: "black", backgroundColor: "white" }}>{element.Point}</td>
                </tr>
            )
        }
    )

    return (
        <div>
            <h3>Tabla de posiciones</h3>
            <br /><br />
            <ul class="nav nav-tabs">
            <li class="nav-item" role="presentation">
                <button role="tab" aria-controls="Global" aria-selected="true" data-bs-toggle="tab" data-bs-target="#Global" id= "global-tab" class="nav-link active">Global</button>
            </li>
            <li class="nav-item" role="presentation">
                <button onClick={} role="tab" aria-controls="Grupos" aria-selected="false" data-bs-toggle="tab" data-bs-target="#Grupos" id="grupos-tab" class="nav-link">Grupo</button>
            </li>
            </ul>
            <div class="tab-content" id="myTabContent">

            <div class="tab-pane fade show active" id="Global" role="tabpanel" aria-labelledby="global-tab">
            <Table hover>
                <thead>
                    <tr>
                        <th>Posicion</th>
                        <th>Usuario</th>
                        <th>Puntos acumulados</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
            </div>
            <div class="tab-pane fade" id="Grupos" role="tabpanel" aria-labelledby="grupos-tab">
            <Table hover>
                <thead>
                    <tr>
                        <th>Posicion</th>
                        <th>Usuario</th>
                        <th>Puntos acumulados</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </Table>
            </div>
            <br /><br /><br /><br />
            </div>
        </div>


    );
}
export default ViewPositions;