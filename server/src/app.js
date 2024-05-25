const express = require('express')
const app= express();
const port=8000;
// const cors=require('cors');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bodyParser=require('body-parser'); // body를 send하기 위함
// 추가 REQUIRE

// 추가 라우터
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

app.use(bodyParser.json());
app.use('/', loginRouter);
app.use('/signup/', signupRouter);


app.get('/status', async (req, res) => {
    res.status(200).json({status:"currently running"})
})

app.listen(port, () => {
    console.log("waiting for client....")
})