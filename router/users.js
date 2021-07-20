const router = require('express').Router();

router.get('/',(req,res)=>{
    res.send('welcome users router');
})

module.exports = router;