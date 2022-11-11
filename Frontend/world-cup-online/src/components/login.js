import React from "react";
import "./login.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import placeholderPNG from '../assets/images/login.webp';

const Login = props => {
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
                                <input type="text" placeholder="Email"></input>
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
                                <input type="text" placeholder="Password"></input>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="btn btn-warning" onClick={() => navigate("/home")}>Ingresar</div>
                    <br />
                    <br />
                    <p>¿No tienes cuenta? <a href="/create-user">Resgistrate aqui.</a></p>
                </div>
            </div>
        </>
    )
}

export default Login;