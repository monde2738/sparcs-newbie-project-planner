import React, { useRef, useState } from "react";
import "./timetable.css";
// weekday: 문자열 3, schedules: scheduleId, begintime, endtime, interval, name으로 들어옴. 

const Horizontal = ({children}) => (
    <div style={{display:"flex", border:"none"}}>{children}</div>
  );

function TimeTableCell({scheduleId, beginTime, endTime, interval, _name, schedules, setSchedules}){
    const [mBtnMsg, setMBtnMsg] = useState("수정");
    const [cBtnMsg, setCBtnMsg] = useState("완료");
    const [startHour, setStartHour] = useState<number | "">("");
    const [startMinute, setStartMinute] = useState<number | "">("");
    const [endHour, setEndHour] = useState<number | "">("");
    const [endMinute, setEndMinute] = useState<number | "">("");
    const [name, setName] = useState(_name);

    // 2개 msg 바꾸는거, 삭제하는거 함수 구현
    const handleInputChange = (setter, min, max) =>
     (event) => {
        const value = event.target.value === "" ? "" : parseInt(event.target.value);
        if (value === "" || (value >= min && value <= max)) {
            setter(value);
        }
    };

    const tryModify=(e) => {
        if(cBtnMsg!=="완료") return;
        if(mBtnMsg==="수정") setMBtnMsg("ok");
        else setMBtnMsg("수정");
    }
    const tryComplete=(e) => {
        if(mBtnMsg!=="수정") return;
        if(cBtnMsg==="완료") setCBtnMsg("ok");
        else setCBtnMsg("완료");
    }

    return (
        <div className="todo-item">
            <div>
                {mBtnMsg==="ok"?<input type="text" value={name} onChange={(e) => setName(e.target.value)} />:
                cBtnMsg==="완료"?<p className="todo-item">{_name}</p>:<p>실제 일정 시각 시간과 끝 시간을 적어주세요</p>}
                
                <Horizontal>
                    <p className="todo-item">시작 시각 </p>
                    {mBtnMsg==="수정"&&cBtnMsg==="완료"?<p>{Math.floor(beginTime/60)}</p>:
                    <input
                        type="number"
                        value={startHour}
                        onChange={handleInputChange(setStartHour, 0, 23)}
                        min="0"
                        max="23"
                    />}  
                    <p className="todo-item">:</p>
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
                    {cBtnMsg==="완료"?<p>{Math.floor(endTime/60)}</p>:
                    <input
                        type="number"
                        value={endHour}
                        onChange={handleInputChange(setEndHour, 0, 23)}
                        min="0"
                        max="23"
                    />}
                    <p>:</p>
                    {cBtnMsg==="완료"?<p>{endTime%60}</p>:
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
                    <button key="delete">삭제</button>
                </Horizontal>
            </div>
        </div>
    )
}

export default TimeTableCell;