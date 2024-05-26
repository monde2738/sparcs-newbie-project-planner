const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router=express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})

router.post('/', async (req, res) => {
    try {
        req.decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);

        const u=await prisma.users.findFirst({
            where:{
                connectedIp:req.body.token
            }
        });
        console.log(u);
        console.log(req.body.id);
        if(u.id != req.body.id){
            
            return res.status(401).json({msg:"not ok"});
        }
        return res.status(200).json({msg:"ok"});
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(419).json({error: "토큰이 만료되었습니다."})
        }

        if(error.name === 'JsonWebTokenError'){
            return res.status(401).json({error: "올바르지 않은 토큰입니다."})
        }
    }
})

module.exports = router;

