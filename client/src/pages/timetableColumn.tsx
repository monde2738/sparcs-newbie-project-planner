
import React, { useEffect, useState } from "react";
import TimeTableCell from "./timetableCell.tsx"; // 여기에서부터 list, setlist 들어오는 게 맞을 듯. 
import axios from "axios";
import "./timetable.css";
import { SAPIBase } from "../tools/serverapi";
// weekday: 문자열 3, schedules: scheduleId, begintime, endtime, interval, name으로 들어옴. 
function TimeTableColumn({id, weekday, _schedules}){
    const [dayId, setDayId] = useState("");
    useEffect(() => {
        const asyncFun = async () => {
            interface IAPIResponse {dayId:string};
            var {data}= await axios.get<IAPIResponse>(SAPIBase+`/makeTimetable/${id}/${weekday}`)
            setDayId(() => data.dayId);
        }
        asyncFun().catch((e) => {
            console.log(e);
            window.alert(`${weekday} 시간표 받아오기 실패`);
        })
    },[])


    return (
        <div className="timetable-column">
            <div className="timetable-column-header">
                <p> {weekday}</p> 
            </div>

            <div className="todolist">
                {_schedules && _schedules.map((schedule) => (
                    <TimeTableCell key={schedule.scheduleId} id={id} scheduleId={schedule.scheduleId} beginTime={schedule.beginTime}
                    endTime={schedule.endTime} interval={schedule.interval} _name={schedule.name} dayId={dayId}/>))}
            </div>
        </div>
    )
}

export default TimeTableColumn;