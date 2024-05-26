import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeTableColumn from "./timetableColumn.tsx";
import "./timetable.css";

const Horizontal = ({children}) => (
    <div style={{display:"flex"}}>{children}</div>
  );

function TimeTable({id}){
    // weekschedules 얻어오기
    const [weekschedules,setWeekschedules]=useState({});
    useEffect(() => {
        const asyncFun = async () => {
            interface IAPIResponse {result:object};
            const {data} = await axios.get<IAPIResponse>(`/main/${id}/`);
            console.log(data);
            return data;
        }
        asyncFun().then((data) => {
            setWeekschedules(data.result);
        }).catch((e) => {
            console.log(e);
            window.alert("데이터를 불러오는 데 실패했습니다.")
        })
    },[])


    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
        <div className="timetable">
            <div>
                <Horizontal>
                    {days.map((value) => (
                        <TimeTableColumn id={id} weekday={value} _schedules={weekschedules[value]} />
                    ))}
                </Horizontal>
            </div>
        </div>
    );

}

export default TimeTable;