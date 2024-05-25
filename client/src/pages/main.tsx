import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// 왼쪽 열: 몇시인지 차근차근 쓰기
// 위쪽 행: 몇요일인지 표기
// 나머지 부분: 각각의 subcell, line 집어넣어서 구현하기. 

function Main(){
    const navigate=useNavigate();
    const params=useParams();
    useEffect(() => {
        const token=localStorage.getItem('token');
        const id=params.id;
        console.log(id);
        if(!token){
            window.alert("다시 로그인해 주세요");
            navigate("/");
        }
        else{
            // const asyncFun = async () => {
            //     interface IAPIResponse {token:string};
            //     const {data} = await axios.post<IAPIResponse>("/", {id:id,pw:pw});
            //     console.log(data);
            //     return data.token;
            // }
            // asyncFun().then((data) => {
            //     console.log(data);
            //     setJwttoken(() => data);
            //     console.log(jwttoken);
            // }).catch((e) => window.alert(`아이디나 비밀번호가 다릅니다.(Error: ${e})`));
            const asyncFun = async () => {
                interface IAPIResponse {msg:string};
                const {data} = await axios.post<IAPIResponse>("/verify/", {id,token});
                console.log(data);
                return data;
            }
            asyncFun().then(resp => {
                if(resp.msg !== "ok"){
                    window.alert("다시 로그인해 주세요!");
                    localStorage.removeItem("token");
                    navigate("/");
                }
            })
            .catch((e) => {
                window.alert("다시 로그인해 주세요");
                localStorage.removeItem("token");
                navigate("/");
            })
        }
    },[])

    return (
        <div>
            <p>not implemented</p>
        </div>
    );

}

export {Main};