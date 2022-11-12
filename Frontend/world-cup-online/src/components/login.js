import React from "react";
import "./login.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import placeholderPNG from '../assets/images/login.webp';
import axios from "axios";

const Login = props => {
    const url = "http://localhost:5000/api/v1/user/login"

    function validateLogin() {
        if (loginData.Email.length == 0 ||
            loginData.Password.length == 0) {

            return false

        }
        return true
    }
    const [loginData, setLoginData] = useState({
        Email: "",
        Password: ""
    })

    function handleLoginInput(e) {
        const newData = { ...loginData }
        newData[e.target.id] = e.target.value
        setLoginData(newData)
        console.log(newData)
    }

    async function submitLogin(e) {
        e.preventDefault()
        if (validateLogin()) {
            console.log(url)
            const post = await axios.post(url, {
                Email: loginData.Email,
                Password: loginData.Password
            })
                .then(response => {
                    props.select(response.data)
                    return Promise.resolve(true)
                })
                .catch((error) => {
                    return Promise.resolve(false)
                })
            console.log(post)
            if (post) {
                alert("Bienvenido")
                navigate("/home")
            }
            console.log("usuario")
            if (!post) {
                alert("Usuario o contraseña incorrectos")
            }


        }
        else {
            alert(`Por favor llene todos los espacios`)
        }
    }


    const navigate = useNavigate();
    return (
        <>
            <br /><br /><br />
            <div className="row">
                <div className="col-auto">
                    <br />
                    <img id="placeholder" src={placeholderPNG} alt="placeholder"></img>
                </div>
                <div className="col-auto">
                    <br />
                    <h2>Bienvenido a World Cup Online</h2>
                    <br /><br /><br />
                    <div className="wrapperForm">
                        <div className="row mb-2" >
                            <div className="col-auto">
                                <label><strong>Email</strong></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                <input type="text" onChange={(e) => handleLoginInput(e)} value={loginData.Email} placeholder="Email" id="Email"></input>
                            </div>
                        </div>
                        <br />
                        <div className="row mb-2" >
                            <div className="col-auto">
                                <label><strong>Password</strong></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                <input type="password" onChange={(e) => handleLoginInput(e)} value={loginData.Password} placeholder="Password" id="Password"></input>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="btn btn-warning" onClick={(e) => submitLogin(e)}>Ingresar</div>
                    <br />
                    <br />
                    <p>¿No tienes cuenta? <a href="/create-user">Registrate aqui.</a></p>
                </div>
            </div>
        </>
    )
}

export default Login;