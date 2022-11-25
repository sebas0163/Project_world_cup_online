import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import placeholderPNG from '../../assets/images/grupos.jpg';
import axios from "axios";

const JoinGroup = props =>{

    const [joinData, setLoginData] = useState({
        Group_code: "",
        User_ID: ""
    })

    async function join(e){

    }

    async function handleJoinInput(e){

    }

return(
    <>
            <br /><br /><br />
            <div className="row">
                <div className="col-auto">
                    <br />
                    <img id="placeholder" src={placeholderPNG} alt="placeholder"></img>
                </div>
                <div className="col-auto">
                    <br />
                    <h2>Compita contra sus amigos</h2>
                    <br /><br /><br />
                    <div className="wrapperForm">
                        <div className="row mb-2" >
                            <div className="col-auto">
                                <label><strong>Ingrese un codigo de invitacion valido </strong></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                <input type="text" onChange={(e) => handleJoinInput(e)} value={joinData.Group_code} placeholder="Codigo del grupo" id="Group_code"></input>
                            </div>
                        </div>
                        <br />
                    </div>
                    <br /><br />
                    <div className="btn btn-warning" onClick={(e) => join(e)}>Unirse al grupo</div>
                </div>
            </div>
        </>

)


}

export default JoinGroup