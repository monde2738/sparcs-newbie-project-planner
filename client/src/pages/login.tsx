import React from "react";

function Login(){
    return (
        <div>
                <h1 className="login">PLANNER</h1><br />
            <div>
                <label htmlFor="userId">아이디:</label>
                <input className="login" type="text" name="userId" id="userId" placeholder="id(학번)" /> <br />
            </div>
            <div>
                <label htmlFor="userPw">비밀번호:</label>
                <input className="login" type="password" name="userPw" id="userPw" placeholder="비밀번호" /> <br />
                <button>로그인</button>
            </div>
            <br /><br />
            <p>아직 회원가입을 하지 않으셨나요?</p>
            <a href="https://www.naver.com">회원가입</a>
        </div>
    );
}

export default Login; 