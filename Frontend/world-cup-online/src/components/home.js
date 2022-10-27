import React from "react";
import "./home.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = props => {
    const navigate = useNavigate();

    return (
        <>
            <div className="Home">
                <br></br>
                <div className="row">
                    <div className="col-12">
                        <h1 id="titleHome">Esta es la homepage. Un titulo
                            creativo va aqui, por favor modicar en el futuro</h1>
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
        </>
    )
}

export default Home;
