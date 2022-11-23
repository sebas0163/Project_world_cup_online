import React, { useState } from 'react';
import { Navigate } from 'react-router-dom/dist';
import axios from "axios";
import "./CreateUserAccount.css";
import { useNavigate } from "react-router-dom";

export const Create_group = ()=>{
    const navigate = useNavigate();
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"
    });
    const [GroupData, setData] = useState({
        User_ID: "", //agregar el id del usuario registrado
        Name: "",
        TorunamentCode: "" //agregar codigo del torneo 

    })
    function ValidateName(){
        const newData = {...GroupData}
        if(GroupData.Name.length ==0){
            return false
        }else{
            return true
        }
    }
    function handle(e){
        const newData = { ...GroupData }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    async function submit(e) {
        e.preventDefault();
        if(ValidateName){
            const post = await client.post('group', {
                User_ID:  GroupData.User_ID,
                Name: GroupData.Name,
                TorunamentCode: GroupData.TorunamentCode
            })
        }else{
            alert('Debe indicar un nombre al grupo')
        }
    }
    return(
        <div className='row align-items.center'>
            <div id="col1" className='col'>
                <div id='cont' className='container'>
                    <label id="description">
                        CREAR UN NUEVO GRUPO <br />
                        Solo puede crear y participar en un solo grupo por torneo. El código brindado es el que usted compartirá con otros usuarios para que puedan unirse a esta liga privada.
                    </label>
                </div>
            </div>
            <div className='col'>
                <h3>Registro de Grupo</h3>
                <div className='input-group mb-3'>
                    <span id="span" className='input-group-text'>Código del Grupo</span>
                    <input  id="Name" type="text" aria-label="Color" className='form-control' disabled></input>
                </div>
                <div className='input-group mb-3'>
                    <span id="span" className='input-group-text'>Nombre del grupo</span>
                    <input onChange={(e) => handle(e)} id="Name" type="text" aria-label="Color" className='form-control'></input>
                </div>
                <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                    <button id='buttons' className='btn btn-primary me-md-2' type='button' onClick={() => navigate("/")}> Cancelar</button>
                    <button id='buttons' className='btn btn-primary me-md-2' onClick={(e) => submit(e)}> Crear Grupo</button>
                </div>
            </div>
        </div>
    )
}