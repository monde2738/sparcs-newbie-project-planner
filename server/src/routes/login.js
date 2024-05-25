const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const authMiddleware = require('../middleware/auth');
const jwt = require("jsonwebtoken");

require('dotenv').config();

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})


router.post('/', authMiddleware, async(req, res) => {
    const {id,pw}=req.body;
    try{
        req.decoded = jwt.sign({
            id:id}
            ,process.env.SECRET_KEY,
            {expiresIn: '1h'});
        await prisma.users.update({
            where:{
                id:id
            },
            data:{
                connectedIp:req.decoded
            }
        })
        return res.status(200).json({token:req.decoded});
    } catch(e) {
        return res.status(500).json({error:e});
    }
})

module.exports = router;