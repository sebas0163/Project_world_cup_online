import React from "react";
import { useState, useEffect } from 'react';
import placeholderPNG from '../../assets/images/grupos.jpg';
import axios from "axios";

const JoinGroup = props =>{
    const url = "http://localhost:5000/api/v1/group/join"
    const [user, setUser] = useState(null);

    useEffect(()=>{
        setUser(props.user)
    },[props.user])

    const [joinData, setJoinData] = useState({
        Group_code: "",
        User_ID: ""
    })

    async function join(e){
        e.preventDefault()
        if (validateJoin()) {
            console.log(url)
            const post = await axios.post(url, {
                Group_code: joinData.Group_code,
                User_ID: user.Id
            })
                .then(response => {
                    console.log("Response", response.statusText)
                    return Promise.resolve(true)
                })
                .catch((error) => {
                    return Promise.resolve(false)
                })
            //console.log(post)
            if (post) {
                alert("Se ha agregado al grupo")
            }
            //console.log("usuario")
            if (!post) {
                alert("El codigo de grupo no es valido o ya es miembro del grupo")
            }
        }
        else {
            alert(`Por favor ingrese un codigo`)
        }

    }

    async function handleJoinInput(e){
        const newData = { ...joinData }
        newData[e.target.id] = e.target.value
        setJoinData(newData)
        console.log(newData)
    }

    function validateJoin() {
        if (joinData.Group_code.length == 0) {

            return false

        }
        return true
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