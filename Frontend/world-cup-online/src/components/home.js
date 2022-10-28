import React from "react";
import "./home.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = props => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Home">
                <div className="wrapperHome" >
                    <br></br>
                    <div className="row">
                        <div className="col-12">

                            <h1 id="titleHome">Bienvenido a World Cup Online.
                                Ahora el fútbol está más cerca que nunca.</h1>

                        </div>
                    </div>
                    <br></br><br></br>
                    <div className="row">
                        <div className="col-6">
                            <button id="goldBtn" className="btn btn-warning" onClick={() => navigate("/view-match")}>Dasboard de partidos</button>
                        </div>
                    </div>
                    <br></br><br></br>
                    <div className="row">
                        <div className="col-6">
                            <button id="goldBtn" className="btn btn-warning" onClick={() => navigate("/tournament-display")}>Dashboard de torneos</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
