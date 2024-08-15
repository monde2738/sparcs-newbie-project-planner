
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./timetable.css";
import { SAPIBase } from "../tools/serverapi";
// weekday: 문자열 3, schedules: scheduleId, begintime, endtime, interval, name으로 들어옴. 

const Horizontal = ({children}) => (
    <div style={{display:"flex", border:"none" ,flexDirection:"row"}}>{children}</div>
  );

function TimeTableCell({scheduleId, id, beginTime, endTime, interval, _name}){
    const [mBtnMsg, setMBtnMsg] = useState("수정");
    const [cBtnMsg, setCBtnMsg] = useState("완료");
    const [startHour, setStartHour] = useState<number | "">(Math.floor(beginTime/60));
    const [startMinute, setStartMinute] = useState<number | "">(beginTime%60);
    const [endHour, setEndHour] = useState<number | "">(Math.floor(beginTime/60));
    const [endMinute, setEndMinute] = useState<number | "">(endTime%60);
    const [name, setName] = useState(_name);
    const navigate=useNavigate();

    useEffect(() => {
        if (cBtnMsg === "완료" && startHour !== "" && startMinute !== "") {
          const newEndTime = startHour * 60 + startMinute + interval;
          setEndHour(Math.floor(newEndTime / 60));
          setEndMinute(newEndTime % 60);
        }
      }, [startHour, startMinute, interval, cBtnMsg]);
    
      const handleInputChange = (setter, min, max) => (event) => {
        const value = event.target.value === "" ? "" : parseInt(event.target.value);
        if (value === "" || (value >= min && value <= max)) {
          setter(value);
        }
      };
    const tryModify=(e) => {
        if(cBtnMsg!=="완료") return;
        if(mBtnMsg==="수정") setMBtnMsg("ok");
        else {
            if(startHour==="" || startMinute==="" || name==="") return;
            const asyncFun=async () => {
                interface IAPIResponse {msg:string};
                const {data}= await axios.post<IAPIResponse>(SAPIBase+`/makeTimetable/modify`,{
                    scheduleId,
                    interval,
                    nBeginTime:60*startHour+startMinute,
                    nName:name
                })
                window.location.reload();
            }
            asyncFun().catch((e) => {
                console.log(e);
                window.alert("데이터 수정에 실패했습니다.")
            })
        }
    }
    const tryDelete=(e)=>{
        const asyncFun = async () => {
            interface IAPIResponse {msg:string};
                const {data}= await axios.post<IAPIResponse>(SAPIBase+`/makeTimetable/delete`,{
                    scheduleId
                })
                window.location.reload();
        }
        asyncFun().catch((e) => {
            console.log(e);
            window.alert("데이터 삭제에 실패했습니다.")
        })
    }
    const tryComplete=(e) => {
        if(mBtnMsg!=="수정") return;
        if(cBtnMsg==="완료") setCBtnMsg("ok");
        else {
            if( startHour==="" || startMinute==="" || endHour==="" || endMinute==="") return;
            const asyncFun=async () => {
                interface IAPIResponse {msg:string};
                let rInterval = (endHour*60+endMinute)-(startHour*60+startMinute);
                if(rInterval<0) rInterval+=1440;
                const m=rInterval/interval;
                const {data}= await axios.post<IAPIResponse>(SAPIBase+`/weight/update`,{
                    id,
                    m
                })
            }
            asyncFun().then(() => tryDelete(e)).catch((e) => {
                console.log(e);
                window.alert("데이터 전송에 실패했습니다.")
            })
        }
    }

    return (
        <div className="todo-item">
            <div>
                {mBtnMsg==="ok"?<input type="text" value={name} onChange={(e) => setName(e.target.value)} />:
                cBtnMsg==="완료"?<p>{_name}</p>:<p>실제 일정 시각 시간과 끝 시간을 적어주세요</p>}
                
                <Horizontal>
                    <p>시작 시각 </p>
                    {mBtnMsg==="수정"&&cBtnMsg==="완료"?<p>{Math.floor(beginTime/60)}</p>:
                    <input
                        type="number"
                        value={startHour}
                        onChange={handleInputChange(setStartHour, 0, 23)}
                        min="0"
                        max="23"
                    />}  
                    <p>:</p>
                    {mBtnMsg==="수정"&&cBtnMsg==="완료"?<p>{beginTime%60}</p>: 
                    <input
                        type="number"
                        value={startMinute}
                        onChange={handleInputChange(setStartMinute, 0, 59)}
                        min="0"
                        max="59"
                    />}
                </Horizontal>
                    
                <Horizontal>
                    <p>끝 시각 </p>
                    {mBtnMsg!=="수정"?<p>{endHour}</p>:
                    cBtnMsg==="완료"?<p>{Math.floor(endTime/60)}</p>:
                    <input
                        type="number"
                        value={endHour}
                        onChange={handleInputChange(setEndHour, 0, 23)}
                        min="0"
                        max="23"
                    />}
                    <p>:</p>
                    {mBtnMsg!=="수정"?<p>{endMinute}</p>:
                    cBtnMsg==="완료"?<p>{endTime%60}</p>:
                    <input
                        type="number"
                        value={endMinute}
                        onChange={handleInputChange(setEndMinute, 0, 59)}
                        min="0"
                        max="59"
                    />}
                </Horizontal>

                <Horizontal>
                    <button key="modify" onClick={tryModify}>{mBtnMsg}</button>
                    <button key="complete" onClick={tryComplete}>{cBtnMsg}</button>
                    <button key="delete" onClick={tryDelete}>삭제</button>
                </Horizontal>
            </div>
        </div>
    )
}

export default TimeTableCell;