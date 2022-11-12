import React, { useState } from 'react';
import { Navigate } from 'react-router-dom/dist';
import axios from "axios";
import "./CreateUserAccount.css";
import { useNavigate } from "react-router-dom";

export const CreateUserAccount = () => {
    const navigate = useNavigate();
    const client = axios.create({
        baseURL: "http://localhost:5000/api/v1/"   
    });
    const [userData, setData] = useState({
        Name:"",
        Nickname:"",
        Email:"",
        Password:"",
        Birthdate:""
    })
    function handle(e){
        const newData = {...userData}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
        
    }
    function validateUser(){
        const newData = {...userData}
        if (userData.Name.length==0 ||
            userData.Nickname.length==0 ||
            userData.Email.length==0 ||
            userData.Password.length ==0 ||
            userData.Birthdate.length ==0)
        {
            
            return false
            
        }
        return true
    }
    function submit(e){
        e.preventDefault();
        if(validateUser()){
            client.post('user', {
                Name: userData.Name,
                Nickname: userData.Nickname,
                Nationality: userData.Nationality,
                Email: userData.Email,
                Password: userData.Password,
                Birthdate: userData.Birthdate
            })
            .then(response =>{
                console.log(response.status)
            })
            alert(`Partido creado correctamente`)
        }else{
            alert(`Por favor llene todos los espacios`)
        }
    }
  return (
   <div className='row align-items.center'>
    <div id="col1" className='col'>
        <div id='cont' className='container'>
            <label id="description">
                CREAR UNA NUEVA CUENTA <br/>
                Para crear una nueva cuenta debe llenar la siguiente información, además de ser mayor de 18 años. Al crear la cuenta usted está aceptando los términos y condiciones de uso del sitio.
            </label>
        </div>
    </div>
    <div className='col'>
        <h3>REGISTRO DE NUEVO USUARIO</h3>
        <div className='input-group mb-3'>
            <span id="span" className='input-group-text'>Nombre</span>
            <input onChange={(e)=>handle(e)} id="Name" type="text" aria-label="Color" className='form-control' value={userData.Name}></input>
        </div>
        <div className='input-group mb-3'>
            <span id="span" className='input-group-text'>Nickname</span>
            <input  onChange={(e)=>handle(e)} id="FirstSurname" type="text" aria-label="Color" className='form-control' value={userData.Nickname}></input>
        </div>
        <div className='input-group mb-3'>
            <span id="span" className='input-group-text'>Fecha de nacimiento</span>
            <input onChange={(e)=>handle(e)} id="Birthdate" type="date" aria-label="Color" className='form-control' value={userData.Birthdate}></input>
        </div>
        <div className='input-group mb-3'>
            <span id="span" className='input-group-text'>Correo</span>
            <input onChange={(e)=>handle(e)} id="Email" type="text" aria-label="Color" className='form-control' value={userData.Email}></input>
        </div>
        <div className='input-group mb-3'>
            <span id="span" className='input-group-text'>Contraseña</span>
            <input onChange={(e)=>handle(e)} id="Password" type="password" aria-label="Color" className='form-control' value={userData.Password}></input>
        </div>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
            <button id='buttons' className='btn btn-primary me-md-2' type='button' onClick={()=> navigate("/login")}> Cancelar</button>
            <button id='buttons' className='btn btn-primary me-md-2' onClick={(e)=>submit(e)}> Crear Cuenta</button>
        </div>
    </div>
   </div>
  )
}
