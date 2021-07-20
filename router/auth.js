const router = require('express').Router();
const User = require('../models/User.js');

router.get('/register',async (req,res)=>{
    const user = await new User({
        username:"john",
        email:"john@gmail.com",
        password:"12345"
    })
    await user.save();
    res.send(user);
})

module.exports = router;