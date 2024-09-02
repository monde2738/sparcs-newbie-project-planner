
import React from "react";
import { useEffect,useRef,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SAPIBase, CAPIBase } from "../tools/serverapi";
import "./login.css";

function Signup(){
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const [pw2,setPw2]=useState("");

    const navigate=useNavigate();

    const trySignup = () => {
        const asyncFun = async () => {
            interface IAPIResponse {success:boolean, code:number};
            const {data} = await axios.post<IAPIResponse>(SAPIBase+"/signup", {id:id,pw:pw,pw2:pw2});
            const {success, code}=data;
            if(success){
                window.alert("성공적으로 생성되었습니다.")
                navigate("/"); 
            }
            else{
                if(code==1){
                    window.alert("id는 3글자 이상 20글자 이하여야 합니다.")
                }else if(code==2){
                    window.alert("비밀번호는 8자리 이상 30자리 이하여야 합니다.")
                }else if(code==3){
                    window.alert("비밀번호가 일치하지 않습니다.")
                }else {
                    window.alert("이미 존재하는 아이디입니다.")
                }
            }
        }
        asyncFun().catch((e) => window.alert(`오류가 발생했습니다.(Error: ${e})`));
    }

    return (
        <div className="container">
                <h1 className="title">PLANNER</h1><br />
            <div>
                <input className="signup" type="text" name="userId" id="userId" placeholder="아이디" 
                value={id} onChange={(e) => {
                    setId(() => e.target.value);
                }}/> <br />
            </div>
            <div>
                <input className="signup" type="password" name="userPw" id="userPw" placeholder="비밀번호" 
                value={pw} onChange={(e) => {
                    setPw(() => e.target.value);
                }}/> <br />
            </div>
            <div>
                <input className="signup" type="password" name="userPw2" id="userPw2" placeholder="비밀번호 재입력" 
                value={pw2} onChange={(e) => {
                    setPw2(() => e.target.value);
                }}/> <br />
                <button className="blue" onClick={trySignup}>회원가입</button>
            </div>
            <br /><br />
            <p>이미 계정이 있으신가요?</p>
            <button className="green" onClick={() => navigate(`/`)}>로그인</button>
        </div>
    );
}

export default Signup; 

