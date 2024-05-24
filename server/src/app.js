const express = require('express')
const app= express();
const port=8000;
// 추가 REQUIRE

// 추가 라우터
const loginRouter = require('./routes/login');

app.use('/', loginRouter);

app.get('/status', (req, res) => {
    res.status(200).json({status:"currently running"})
})

app.listen(port, () => {
    console.log("waiting for client....")
})