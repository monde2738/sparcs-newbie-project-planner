const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})

router.get('/:id/', async (req, res) => {
    const id=req.params.id;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    try{
        const ret={"SUN":[],"MON":[],"TUE":[],"WED":[],"THU":[],"FRI":[],"SAT":[]};
        // console.log(124);
        const _schedules = await prisma.users.findFirst({
            where:{
                id
            },
            include:{
                Days:{
                    include:{
                        Schedules:{
                            orderBy:{
                                beginTime:'asc'
                            }
                        }
                        
                    }
                }
            }
        });
        // console.log(3);
        let today = new Date();
        let curday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()-today.getDay()
        );
        for(let i=0;i<7;i++){
            // 서치, 각 날에 정보 삽입
            for(const day of _schedules.Days){
                if(day.dayOfWeek===days[i]){
                    for(const schedule of day.Schedules){
                        ret[days[i]].push({
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

        return res.status(200).json({result: ret});

    }catch(e) {
        console.log(e);
        return res.status(500).json({error:e});
    }
})

module.exports = router;