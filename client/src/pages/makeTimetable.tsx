import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function MakeTimeTable(){
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

export default MakeTimeTable;