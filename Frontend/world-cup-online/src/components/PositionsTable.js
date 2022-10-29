import React, { useState, useEffect } from 'react'
import axios from "axios";
import Select from 'react-select'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function ViewPositions() {
    return (
        <div>
            <h3>Tabla de posiciones</h3>
            <br /><br />
            <Table hover>
                <thead>
                    <tr>
                        <th>Posicion</th>
                        <th>Usuario</th>
                        <th>Puntos acumulados</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
            <br /><br /><br /><br />
        </div>


    );
}
export default ViewPositions;