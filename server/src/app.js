const express = require('express')
const app= express();
const port=8000;
const cors=require('cors');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bodyParser=require('body-parser'); // body를 send하기 위함
const { createProxyMiddleware } = require('http-proxy-middleware');
// 추가 REQUIRE

// 추가 라우터
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const verifyRouter = require('./routes/verify');
const mainRouter = require('./routes/main');
const makeRouter = require('./routes/makeTimetable');
const weightRouter = require('./routes/weight');

var allowedOrigins = ['https://api.messi.newbie.sparcsandbox.com',
                      'https://messi.newbie.sparcsandbox.com'];
                      app.use(cors({
                        origin: function(origin, callback){
                          // allow requests with no origin 
                          // (like mobile apps or curl requests)
                          if(!origin) return callback(null, true);
                          if(allowedOrigins.indexOf(origin) === -1){
                            var msg = 'The CORS policy for this site does not ' +
                                      'allow access from the specified Origin.';
                            return callback(new Error(msg), false);
                          }
                          return callback(null, true);
                        }
                      }));
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});
app.use(bodyParser.json());
app.use('/', loginRouter);
app.use('/signup/', signupRouter);
app.use('/verify/',verifyRouter);
app.use('/main/', mainRouter);
app.use('/makeTimetable/', makeRouter);
app.use('/weight/',weightRouter);




app.get('/status', async (req, res) => {
    res.status(200).json({status:"currently running"})
})

app.listen(port, () => {
    console.log("waiting for client....")
})