const express = require('express');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})

router.get('/login/:id/:pw',async (req,res) => {
    // console.log(req.query.q)

    const user=await prisma.users.findFirst({
        where:{
            id:req.params.id,
            pw:req.params.pw
        }
    });
    console.log(user);
    if(user) return res.status(200).json({id:`${req.params.id}`, pw:`${req.params.pw}`})
    else return res.status(200).json({id:"login failed"});
})

console.log(authMiddleware)

router.post('/', authMiddleware, (req, res) => {
    console.log(req.body)
    try{
        return res.status(200).json({success:true});
    } catch(e) {
        return res.status(500).json({error:e});
    }
})

module.exports = router;