// 우측 상단에 자기 계정+로그아웃 버튼 띄우기
import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CAPIBase } from "../tools/serverapi";

function ShowAcc({_id}){
    const [id,setId] = useState(_id);
    return (
        <div className="show-acc">
            <p>{id}</p>
            <a href={CAPIBase} onClick={() => setId("")}>로그아웃</a>
        </div>
    )
}

export default ShowAcc;