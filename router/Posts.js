const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//update post

router.put("/:id",async (req,res)=>{

    try{
    const post = await Post.findById(req.params.id);
    if(post.userid === req.body.userid){
        await post.updateOne({$set:req.body});
        res.json("your post updated");
        
    }else{
        res.json("You can update your post only");
    }
}catch(e){
    res.json(e);
}
})

//delete post

router.delete("/:id",async (req,res)=>{

    try{
    const post = await Post.findById(req.params.id);
    if(post.userid === req.body.userid){
        await post.deleteOne();
        res.json("your post deleted");
        
    }else{
        res.json("You can delete your post only");
    }
}catch(e){
    res.json(e);
}
})


//like/dislike
router.put("/:id/like",async (req,res)=>{

    try{
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userid)){
        await post.updateOne({$push: {likes:req.body.userid}});
        res.json("your post liked");
        
    }else{
        await post.deleteOne({$pull: {likes:req.body.userid}});
        res.json("your post un liked");
    }
}catch(e){
    res.json(e);
}
})

//get a post

router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.json(post);
    }catch(e){
        res.send(e);
    }
})

//get all timeline posts

router.get("/timeline/all",async (req,res)=>{
    try{

        const currentuser = await User.findById(req.body.userid);
        const userpost = await Post.find({userid:currentuser._id}); 
        const friendposts = await Promise.all(
            currentuser.followings.map((friendid)=>{
                return Post.find({userid:friendid});
            })
        );
        res.json(userpost.concat(...friendposts));
    }catch(e){
        res.send(e);
    }
})

module.exports = router;