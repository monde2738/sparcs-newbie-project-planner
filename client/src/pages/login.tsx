
import React from "react";
import { useEffect,useRef,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SAPIBase, CAPIBase } from "../tools/serverapi";
import "./login.css";

function Login(){
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const navigate=useNavigate();
    const [jwttoken, setJwttoken]=useState("");
    const [key2, setKey2]= useState("");

    useEffect(() => {
        localStorage.clear();
    },[])
    useEffect(() => {
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("key2", key2);
        
        if(localStorage.getItem("token")) navigate(`/main/${id}`);
    },[jwttoken])

    const tryLogin = () => {
        const asyncFun = async () => {
            interface IAPIResponse {token:string, key2:string};
            const {data} = await axios.post<IAPIResponse>(SAPIBase+"/", {id:id,pw:pw});
            return data;
        }
        asyncFun().then((data) => {
            setKey2(() => data.key2)
            setJwttoken(() => data.token);
        }).catch((e) => window.alert(`아이디나 비밀번호가 다릅니다.(Error: ${e})`));
    }

    return (
        <div className="container">
                <h1 className="title">PLANNER</h1><br />
            <div>
                <input className="login" type="text" name="userId" id="userId" placeholder="아이디" 
                value={id} onChange={(e) => {
                    setId(() => e.target.value);
                }}/> <br />
            </div>
            <div>
                <input className="login" type="password" name="userPw" id="userPw" placeholder="비밀번호" 
                value={pw} onChange={(e) => {
                    setPw(() => e.target.value);
                }}/> <br />
                <button className="green" onClick = {(e) => tryLogin()}>로그인</button>
            </div>
            <br /><br />
            <p>아직 회원가입을 하지 않으셨나요?</p>
            <button className="blue" onClick={() => navigate(`/signup`)}>회원가입</button>
        </div>
    );
}

export default Login; 