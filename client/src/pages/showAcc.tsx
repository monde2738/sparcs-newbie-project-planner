
import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CAPIBase } from "../tools/serverapi";
import "./showAcc.css";

function ShowAcc({_id}){
    const [id,setId] = useState(_id);
    const navigate=useNavigate();
    return (
        <div className="header-container">
            <div className="account-info">
                <p className="username">{id}</p>
                <button className="logout-button" onClick={() => {setId(""); navigate("/");}}>로그아웃</button>
            </div>
        </div>
    );
}

export default ShowAcc;