const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const authMiddleware = require('../middleware/auth');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})

router.get('/:id/', async (req, res) => {
    const id=req.params.id;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    try{
        const ret={"SUN":[],"MON":[],"TUE":[],"WED":[],"THU":[],"FRI":[],"SAT":[]};
        const schedules = await prisma.users.findMany({
            where:{
                id:id
            },
            include:{
                Days:{
                    include:{
                        Schedules:{
                            orderBy:beginTime
                        }
                    }
                }
            }
        });
        let today = new Date();
        let curday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()-today.getDay()
        );
        for(let i=0;i<7;i++){
            // 서치, 각 날에 정보 삽입
            for(const day of schedules.Days){
                if(curday.getFullYear() == day.year &&
                curday.getMonth() == day.month && 
                curday.getDate() == day.day){
                    for(const schedule of schedules){
                        ret[days[i]].append({
                            scheduleId:schedule.scheduleId,
                            beginTime:schedule.beginTime,
                            endTime:schedule.endTime,
                            interval:schedule.interval,
                            name:schedule.name
                        });
                    }
                }
            }
            curday = new Date(
                curday.getFullYear(),
                curday.getMonth(),
                curday.getDate()+1
            )
        }

        return res.status(200).json({result: res});

    }catch(e) {
        return res.status(500).json({error:e});
    }
})

module.exports = router;