
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
    const now = new Date();
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const key1=array[0].toString(16);

    const key2 = now.getTime().toString(16)+key1;
    try{
        req.decoded = jwt.sign({
            id:id}
            ,process.env.SECRET_KEY+key2,
            {expiresIn: '1h'});
        await prisma.users.update({
            where:{
                id:id
            },
            data:{
                connectedIp:req.decoded
            }
        })
        return res.status(200).json({token:req.decoded, key2:key2});
    } catch(e) {
        return res.status(401).json({error:e});
    }
})

module.exports = router;