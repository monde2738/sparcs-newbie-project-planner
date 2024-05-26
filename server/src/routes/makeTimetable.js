const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const authMiddleware = require('../middleware/auth');
const jwt = require("jsonwebtoken");
const json = require('body-parser/lib/types/json');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})

router.get('/:id/:weekday', async (req, res) => {
    const id=req.params.id;
    const weekday=req.params.weekday;

    try{
        const day = await prisma.days.findFirst({
            where:{
                id:id,
                dayOfWeek:weekday
            }
        })
        return res.status(200).json({dayId:day.dayId});
    }catch(e){

    }
})

router.post('/', async (req, res) => {
    const [beginTime,interval, name, dayId]=req.body();
    const scheduleId=toString(Date.now());
    try{
        const endTime=beginTime+interval;
        const newschedule=await prisma.schedules.create({
            data:{
                scheduleId,
                beginTime,
                endTime,
                interval,
                name,
                dayId
            }
        })
        return res.status(200).json({msg:"ok"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "데이터 전송을 실패했습니다."})
    }
})


router.post('/modify/', async (req, res) => {
    const [scheduleId,beginTime,interval,name] = req.body();
    try{
        const endTime=beginTime+interval;
        const modifiedschedule = await prisma.schedules.update({
            where:{
                scheduleId
            },
            data:{
                beginTime,
                endTime,
                name
            }
        });
        return res.status(200).json({msg:"ok"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error:"데이터 변경을 실패했습니다."})
    }
})

router.post('/delete/', async (req,res) => {
    const [scheduleId]=req.body()
    try{
        const deleteschedule= await prisma.schedules.delete({
            where:{
                scheduleId
            }
        });
        return res.status(200).json({msg:"ok"});
    }catch(e){
        console.log(e);
        return res.status(500).json({error:"데이터 삭제를 실패했습니다."})
    }
    
})

module.exports=router;