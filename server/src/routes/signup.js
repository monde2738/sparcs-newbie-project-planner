const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})


router.post('/', async (req, res) => {
    console.log(req.body)
    const {id, pw, pw2} = req.body;
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
        const newUser=prisma.users.create({
            data:{
                id:id,
                pw:pw,
                size:1,
                weight:1.0,
                connectedIp:null
            }
        });
        return res.status(200).json({success:true, code:0});
    } catch(e) {
        console.log("e!");
        return res.status(500).json({error:e});
    }
})

module.exports = router;