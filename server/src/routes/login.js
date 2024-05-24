const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({status:"currently running"})
})

router.get('/login/:id/:pw',(req,res) => {
    // console.log(req.query.q)
    return res.status(200).json({id:`${req.params.id}`, pw:`${req.params.pw}`})
})

module.exports = router;