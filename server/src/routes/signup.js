
const express = require('express');
const {v4} = require('uuid');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router();

const uuid = () => {
    const tokens = v4().split('-');
    return tokens[2]+tokens[1]+tokens[0]+tokens[3]+tokens[4];
}

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})


router.post('/', async (req, res) => {
    console.log(req.body)
    const {id, pw, pw2} = req.body;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    try{
        if(id.length<3 || id.length>20){
            return res.status(200).json({success:false, code:1});
        }
        if(pw.length<8 || pw.length>30){
            return res.status(200).json({success:false, code:2});
        }
        if(pw !== pw2){
            return res.status(200).json({success:false, code:3});
        }
        const user = await prisma.users.findFirst({
            where:{
                id:id
            }
        })
        if(user){
            return res.status(200).json({success:false, code:4});
        }
        await prisma.users.create({
            data:{
                id:id,
                pw:pw,
                size:0,
                weight:1.0,
                connectedIp:null
            }
        });
        let today=new Date()
        let curday=new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()-today.getDay()
        )
        for(let i=0;i<days.length;i++){
            await prisma.days.create({
                data:{
                    dayId:uuid(),
                    year:curday.getFullYear(),
                    month:curday.getMonth(),
                    day:curday.getDate(),
                    id,
                    dayOfWeek:days[i]
                }
            });
            curday=new Date(
                today.getFullYear(),
                curday.getMonth(),
                curday.getDate()+1
            )
        }
        return res.status(200).json({success:true, code:0});
    } catch(e) {
        console.log(e);
        return res.status(500).json({error:e});
    }
})

module.exports = router;