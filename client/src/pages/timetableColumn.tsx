import React, { useState } from "react";
import TimeTableCell from "./timetableCell.tsx"; // 여기에서부터 list, setlist 들어오는 게 맞을 듯. 
import "./timetable.css";
// weekday: 문자열 3, schedules: scheduleId, begintime, endtime, interval, name으로 들어옴. 
function TimeTableColumn({weekday, _schedules}){
    const [schedules, setSchedules] = useState(_schedules);

    return (
        <div className="timetable-column">
            <div className="timetable-column-header">
                <p> {weekday}</p> 
            </div>

            <div className="todolist">
                {schedules && schedules.map((schedule) => (
                    <TimeTableCell key={schedule.scheduleId} scheduleId={schedule.scheduleId} beginTime={schedule.beginTime}
                    endTime={schedule.endTime} interval={schedule.interval} _name={schedule.name}
                    schedules={schedules} setSchedules={setSchedules}/>))}
            </div>
        </div>
    )
}

export default TimeTableColumn;