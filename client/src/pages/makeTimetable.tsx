import axios from "axios";
import React from "react";
import { useEffect,useRef,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./timetable.css";


const Horizontal = ({children}) => (
    <div style={{display:"flex", border:"none"}}>{children}</div>
  );

function MakeTimeTable({id}){
    // need: 과제명, 과제의 아이디-> 자동 생성 메타, 걸릴 시간 -> 이후 시작 시간(일, 시간) 결정. -> 한꺼번에 하면 안됨. 
    const [name,setName]=useState("");
    const [startHour, setStartHour] = useState<number | "">("");
    const [startMinute, setStartMinute] = useState<number | "">("");
    const [intHour, setIntHour] = useState<number | "">("");
    const [intMinute, setIntMinute] = useState<number | "">("");
    const [weekday, setWeekday] = useState("SUN");
    const [flg, setFlg] = useState(false);
    const navigate=useNavigate();
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const handleInputChange = (setter, min, max) =>
     (event) => {
        const value = event.target.value === "" ? "" : parseInt(event.target.value);
        if (value === "" || (value >= min && value <= max)) {
            setter(value);
        }
    };

    const tryCreate=() => {
        if(!flg) return;
        if(intHour==="" || intMinute==="" || startHour==="" || startMinute==="") return;
        const asyncFun = async () => {
            // 사용자의 id에서 dayid 뜯어오기. 
            interface IAPIResponse {dayId:string};
            var {data}= await axios.get<IAPIResponse>(`/makeTimetable/${id}/${weekday}`)
            const dayId=data.dayId;
            // dayId로 post 메서드 박기
            interface IAPIResponse {msg:string};
            const beginTime=startHour*60+startMinute;
            const interval = intHour*60+intMinute;
            var {data}= await axios.post<IAPIResponse>(`/makeTimetable`,{
                beginTime,
                interval,
                name,
                dayId
            })
            setIntHour("");setIntMinute("");setStartHour("");setStartMinute("");setName("");
            window.location.reload();
        }
        asyncFun().catch(e => {
            console.log(e);
            window.alert("데이터 추가에 실패했습니다.")
        })
    }
    

    const tryGet=() => {
        if(flg){
            setFlg(() => false);
            return;
        }
        if(intHour==="" || intMinute==="" || !name) return;

        const asyncFun = async () => {
            interface IAPIResponse {weight:number};
            console.log(id); // deb
            const {data}= await axios.get<IAPIResponse>(`/weight/${id}`)
            const interval = intHour*60+intMinute;
            const int2=Math.floor(interval*data.weight)
            setIntHour(() => Math.floor(int2/60));
            setIntMinute(() => int2%60);
            setFlg(() => true);
        }
        asyncFun().catch(e => {
            console.log(e);
            window.alert("데이터 얻기에 실패했습니다.")
        })
    }

    return (
        <div className="make-todo">
            <div>
                {!flg?<p> 시작 날짜/시간을 제외한 나머지 값들을 입력한 후 일정 만들기 버튼을 눌러주세요.</p>:
                <p> 시작 날짜/시간을 입력한 후 일정 넣기 버튼을 눌러주세요.</p>}
                {!flg?<input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                placeholder="할 일"/>:
                    <p className="todo-item">{name}</p>}
                
                <Horizontal>
                    <p>소요 시간 </p>
                    {flg?<p>{intHour}</p>:
                    <input
                        type="number"
                        value={intHour}
                        onChange={handleInputChange(setIntHour, 0, 23)}
                        min="0"
                        max="23"
                    />}
                    <p>:</p>
                    {flg?<p>{intMinute}</p>:
                    <input
                        type="number"
                        value={intMinute}
                        onChange={handleInputChange(setIntMinute, 0, 59)}
                        min="0"
                        max="59"
                    />}
                </Horizontal>

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
                    {!flg?<p>{startHour}</p>:
                    <input
                        type="number"
                        value={startHour}
                        onChange={handleInputChange(setStartHour, 0, 23)}
                        min="0"
                        max="23"
                    />}  
                    <p className="todo-item">:</p>
                    {!flg?<p>{startMinute}</p>: 
                    <input
                        type="number"
                        value={startMinute}
                        onChange={handleInputChange(setStartMinute, 0, 59)}
                        min="0"
                        max="59"
                    />}
                </Horizontal>
                    

                <Horizontal>
                    <button key="modify" onClick={tryGet}>{flg?"취소":"일정 만들기"}</button>
                    <button key="complete" onClick={tryCreate}>일정 넣기</button>
                </Horizontal>
            </div>
        </div>
    )

}

export default MakeTimeTable;