import React from "react";
import { useEffect,useRef,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SAPIBase, CAPIBase } from "../tools/serverapi";
// css 

function Login(){
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const navigate=useNavigate();
    const [jwttoken, setJwttoken]=useState("");

    useEffect(() => {
        localStorage.clear();
    },[])
    useEffect(() => {
        localStorage.setItem("token", jwttoken);
        console.log("login.tsx", jwttoken, localStorage);
        
        if(localStorage.getItem("token")) navigate(`/main/${id}`);
    },[jwttoken])

    const tryLogin = () => {
        const asyncFun = async () => {
            interface IAPIResponse {token:string};
            const {data} = await axios.post<IAPIResponse>(SAPIBase+"/", {id:id,pw:pw});
            console.log(data);
            return data.token;
        }
        asyncFun().then((data) => {
            setJwttoken(() => data);
        }).catch((e) => window.alert(`아이디나 비밀번호가 다릅니다.(Error: ${e})`));
    }

    return (
        <div>
                <h1 className="login">PLANNER</h1><br />
            <div>
                <label htmlFor="userId">아이디:</label>
                <input className="login" type="text" name="userId" id="userId" placeholder="id(학번)" 
                value={id} onChange={(e) => {
                    setId(() => e.target.value);
                }}/> <br />
            </div>
            <div>
                <label htmlFor="userPw">비밀번호:</label>
                <input className="login" type="password" name="userPw" id="userPw" placeholder="비밀번호" 
                value={pw} onChange={(e) => {
                    setPw(() => e.target.value);
                }}/> <br />
                <button onClick = {(e) => tryLogin()}>로그인</button>
            </div>
            <br /><br />
            <p>아직 회원가입을 하지 않으셨나요?</p>
            <a href={CAPIBase+"/signup"}>회원가입</a>
        </div>
    );
}

export default Login; 