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
    try{
        const user = await prisma.users.findFirst({
            where:{
                id
            }
        })
        console.log(req.params.id);
        console.log(user.connectedIp);
        return res.status(200).json({weight:user.weight});
    }catch(e) {
        console.log(e);
        return res.status(500).json({error:"조회 실패"});
    }
})

router.post('/update/', async(req,res) => {
    const {id,m}=req.body;
    try{
        const user=await prisma.users.findFirst({
            where:{
                id
            }
        })
        let w=user.weight, t=user.size;
        w*=t;w+=m;t++;w/=t;
        const result = await prisma.users.update({
            where:{
                id
            },
            data:{
                weight:w,
                size:t
            }
        });
        return res.status(200).json({msg:"ok"});
    }catch(e) {
        console.log(e);
        console.log("가중치 업뎃 실패")
        return res.status(500).json({error:"업데이트 실패"});
    }
})

module.exports=router;