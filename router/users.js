const router = require('express').Router();
const User = require('../models/User');

router.put('/:id',async (req,res)=>{
    if(req.body.userid === req.params.id  || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.gensalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json('Account has been updated!');
        }
        catch(e){
            return res.status(500).json(e);
        }
    }else{
        res.status(404).json("You can only update your account!")
    }
})

router.delete('/:id',async (req,res)=>{
    if(req.body.userid === req.params.id  || req.body.isAdmin){
        
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted!');
        }
        catch(e){
            return res.status(500).json(e);
        }
    }else{
        res.status(404).json("You can only delete your account!")
    }
})

router.get('/:id',async (req,res)=>{
    try{
    const user = await User.findById(req.params.id);
    const {password,updatedAt,...other} = user._doc;
    res.status(500).json(other);
    }
    catch(e){
    res.status(400).json(e);
    }
})

//follow

router.put('/:id/follow',async (req,res)=>{
    if(req.body.userid !== req.params.id){
        
        try{
        const user = await User.findById(req.params.id);
        console.log(User.findById(req.params.id));
        const currentuser = await User.findById(req.body.userid);
       
        if(!user.followers.includes(req.body.userid)){
            console.log(user);
            await user.updateOne({$push:{followers:req.body.userid}});
            await currentuser.updateOne({$push:{followings:req.params.id}});
            res.status(200).json("You started following the user");
        }else{
            res.send("you already follow this user");
        }
        }catch(e){
            res.status(500).json(e);
        }
    }else{
        res.status(403).json("You can't follow yourself");
    }
})

//unfollow

router.put('/:id/unfollow',async (req,res)=>{
    if(req.body.userid !== req.params.id){
        
        try{
        const user = await User.findById(req.params.id);
        console.log(User.findById(req.params.id));
        const currentuser = await User.findById(req.body.userid);
       
        if(user.followers.includes(req.body.userid)){
            
            await user.updateOne({$pull:{followers:req.body.userid}});
            await currentuser.updateOne({$pull:{followings:req.params.id}});
            res.status(200).json("You have unfollowed the user");
        }else{
            res.send("you are not following this user");
        }
        }catch(e){
            res.status(500).json(e);
        }
    }else{
        res.status(403).json("You can't unfollow yourself");
    }
})




module.exports = router;