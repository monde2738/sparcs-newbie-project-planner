import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SAPIBase} from "../tools/serverapi";
import "./timetable.css";


const Horizontal = ({children}) => (
    <div style={{display:"flex", border:"none", padding:"0px", boxShadow:"none"}}>{children}</div>
  );

function MakeTimeTable({id}){

    const [name,setName]=useState("");
    const [startHour, setStartHour] = useState<number | "">("");
    const [startMinute, setStartMinute] = useState<number | "">("");
    const [intHour, setIntHour] = useState<number | "">("");
    const [intMinute, setIntMinute] = useState<number | "">("");
    const [weekday, setWeekday] = useState("SUN");
    const [intHour2, setIntHour2] = useState(0);
    const [intMinute2, setIntMinute2] = useState(0);
    const [weight, setWeight] = useState(0.0)
    const navigate=useNavigate();
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const handleInputChange = (setter, min, max) =>
     (event) => {
        const value = event.target.value === "" ? "" : parseInt(event.target.value);
        if (value === "" || (value >= min && value <= max)) {
            setter(value);
        }
    };

    const handleInputChange2 = (setter, min, max) =>
        (event) => {
           const value = event.target.value === "" ? "" : parseInt(event.target.value);
           if (value === "" || (value >= min && value <= max)) {
               setter(value);
               tryChange();
           }
       };

    const tryCreate=() => {
        if(intHour==="" || intMinute==="" || startHour==="" || startMinute==="" || name==="") return;
        setIntHour(() => intHour2);
        setIntMinute(() => intMinute2);
        const asyncFun = async () => {
            // 사용자의 id에서 dayid 뜯어오기. 
            interface IAPIResponse {dayId:string};
            var {data}= await axios.get<IAPIResponse>(SAPIBase+`/makeTimetable/${id}/${weekday}`)
            const dayId=data.dayId;
            console.log(dayId);
            // dayId로 post 메서드 박기
            interface IAPIResponse {msg:string};
            const beginTime=startHour*60+startMinute;
            const interval = intHour*60+intMinute;
            var {data}= await axios.post<IAPIResponse>(SAPIBase+`/makeTimetable`,{
                beginTime,
                interval,
                name,
                dayId
            })
            setIntHour("");setIntMinute("");setStartHour("");setStartMinute("");setName("");
            setWeight(0);
            window.location.reload();
        }
        asyncFun().catch(e => {
            console.log(e);
            window.alert("데이터 추가에 실패했습니다.")
        })
    }


    const tryChange= () => {
        if(intHour==="" || intMinute==="") return;

        const asyncFun = async () => {
            interface IAPIResponse {weight:number};
            console.log(id); // deb
            if(weight === 0.0) {
                const {data}= await axios.get<IAPIResponse>(SAPIBase+`/weight/${id}`)
                console.log(data);
                setWeight(() => data.weight);
            }
            const interval = intHour*60+intMinute;
            const int2=Math.floor(interval*weight)
            setIntHour2(() => Math.floor(int2/60));
            setIntMinute2(() => int2%60);
        }
        asyncFun().catch(e => {
            console.log(e);
            window.alert("데이터 얻기에 실패했습니다.")
        })

    }

    return (
        <div className="make-todo">
            <div>
                <p> 새로운 일정 추가 </p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                placeholder="할 일"/>

                <Horizontal>
                    <p>시작할 요일 </p>
                    <select id="daySelector" value={weekday} onChange={(e) => setWeekday(e.target.value)}>
                        {days.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                        ))}
                    </select>
                </Horizontal>

                <Horizontal>
                    <p className="todo-item">시작 시각 </p>
                    <input
                        type="number"
                        value={startHour}
                        onChange={handleInputChange(setStartHour, 0, 23)}
                        min="0"
                        max="23"
                    />
                    <p className="todo-item">:</p>
                    <input
                        type="number"
                        value={startMinute}
                        onChange={handleInputChange(setStartMinute, 0, 59)}
                        min="0"
                        max="59"
                    />
                </Horizontal>

                <Horizontal>
                    <p>예상 소요 시간 </p>
            
                    <input
                        type="number"
                        value={intHour}
                        onChange={handleInputChange2(setIntHour, 0, 23)}
                        min="0"
                        max="23"
                    />
                    <p>:</p>
                    <input
                        type="number"
                        value={intMinute}
                        onChange={handleInputChange2(setIntMinute, 0, 59)}
                        min="0"
                        max="59"
                    />
                </Horizontal>

                <p> AI가 예상하는 소요 시간: {intHour2}시간 {intMinute2}분</p>


                <Horizontal>
                    <button key="complete" onClick={() => tryCreate()}>일정 넣기</button>
                </Horizontal>
            </div>
        </div>
    )

}

export default MakeTimeTable;