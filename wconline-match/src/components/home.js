import React from "react";
import "./home.css";
import "./match.css";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import plusLGIcon from '../../src/assets/icons/plus-lg.svg';


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
                        <button className="btn btn-primary" onClick={() => navigate("/view-match")}>Dasboard de partidos</button>
                    </div>
                </div>
                <br></br><br></br>
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={() => navigate("/tournament-display")}>Dashboard de torneos</button>
                    </div>
                    <div className="col-6">
                        <image src={require('../assets/icons/plus-lg.svg').default} id="icon" alt="plus" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
