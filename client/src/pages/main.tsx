import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeTable from "./timetable.tsx";
import ShowAcc from "./showAcc.tsx";
import "./main.css";

// 왼쪽 열: 몇시인지 차근차근 쓰기
// 위쪽 행: 몇요일인지 표기
// 나머지 부분: 각각의 subcell, line 집어넣어서 구현하기. 

function Main(){
    const navigate=useNavigate();
    const params=useParams();
    useEffect(() => {
        const asyncFun = async () => {
            const token=localStorage.getItem("token");
            const id=params.id;
            console.log("!",localStorage);
            console.log("!!"+token);
            interface IAPIResponse {msg:string};
            const {data} = await axios.post<IAPIResponse>("/verify/", {id,token});
            console.log(data);
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
        <div>
            <h1>PLANNER</h1><br />
            <ShowAcc _id={params.id} />
            <TimeTable id={params.id} />

        </div>
    );

}

export default Main;