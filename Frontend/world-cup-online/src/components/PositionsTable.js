import React, { useState, useEffect } from 'react'
import axios from "axios";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewPositions = props => {

    const n = 1;

    const [rankingData, setRankingData] = useState([])
    const [groupCode, setGroupCode] = useState({})
    const [tournament, setTournament] = useState({})

    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });

    const getRanking = async (tournament) => {
        client.get('result/leaderboards/tournament/' + tournament.CodeTournament).then((response) => {
            setRankingData(response.data);
        });
    }

    const getGroupCode = async (tournament, user) => {
        client.get('group/user/tournament/' + tournament.CodeTournament + '/' + user.Id).then((response) => {
            setGroupCode(response.data);
        });
    }

    useEffect(() => {
        getGroupCode(props.tournament, props.user);
        setTournament(props.tournament);
        getRanking(props.tournament);
    }, [props.tournament, props.user]);

    async function getGroups(e) {
        e.preventDefault();
        client.get('result/leaderboards/group/' + groupCode.Code).then((response) => {
            setRankingData(response.data);
        });
        console.log("getGroups");
        console.log(groupCode);
        console.log(rankingData);
    }

    async function getGlobal(e) {
        e.preventDefault();
        client.get('result/leaderboards/tournament/' + tournament.CodeTournament).then((response) => {
            setRankingData(response.data);
        });
        console.log("getGlobal");
        console.log(groupCode);
        console.log(rankingData);
    }

    const tableRows = rankingData.map(
        (element, key) => {
            return (
                <tr>
                    <td>{n + key}</td>
                    <td>{element.NickName}</td>
                    <td>{element.Point}</td>
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
                    <button onClick={(e) => { getGlobal(e) }} role="tab" aria-controls="Global" aria-selected="true" data-bs-toggle="tab" data-bs-target="#Global" id="global-tab" class="nav-link active">Global</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button onClick={(e) => { getGroups(e) }} role="tab" aria-controls="Grupos" aria-selected="false" data-bs-toggle="tab" data-bs-target="#Grupos" id="grupos-tab" class="nav-link">Grupo</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">

                <div class="tab-pane fade show active" id="Global" role="tabpanel" aria-labelledby="global-tab">
                    <Table hover borderless>
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
                    <Table hover borderless>
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