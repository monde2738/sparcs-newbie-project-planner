import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeTable from "./timetable.tsx";
import ShowAcc from "./showAcc.tsx";
import MakeTimeTable from "./makeTimetable.tsx";
import "./main.css";
import { SAPIBase } from "../tools/serverapi";

const Horizontal = ({children}) => (
    <div style={{display:"flex"}}>{children}</div>
  );

function Main(){
    const navigate=useNavigate();
    const params=useParams();


    useEffect(() => {
        const asyncFun = async () => {
            const id=params.id;
            interface IAPIResponse {msg:string};
            const {data} = await axios.post<IAPIResponse>(SAPIBase+"/verify/", {id,token:localStorage.getItem("token")});
            return data;
        }
        asyncFun().then(resp => {
            if(resp.msg !== "ok"){
                window.alert("다시 로그인해 주세요");
                localStorage.clear();
                navigate("/");
            }
        })
        .catch((e) => {
            window.alert("다시 로그인해 주세요");
            localStorage.clear();
            navigate("/");
        })
    },[])

    return (
        <div className="main">
                <h1>PLANNER</h1><br />
                <div className="acc">
                    <ShowAcc _id={params.id} />
                </div>
            <TimeTable id={params.id} />
            <MakeTimeTable id={params.id} />

        </div>
    );

}

export default Main;