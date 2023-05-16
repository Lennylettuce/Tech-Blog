const express = require('express');
const router = express.Router();
const {User, Post, Comment} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({include: [User]}).then(posts => {
        const hbsPosts = posts.map(post=>post.get({plain:true}))
        const loggedIn = req.session.user?true:false;
        res.render('home', {posts:hbsPosts, loggedIn, username:req.session.user?.username})
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    res.render("login")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/dashboard",(req,res)=>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    User.findByPk(req.session.user.id, {
        include: [Post, Comment]
    }).then(userData => {
        const hbsData = userData.get({plain:true})
        hbsData.loggedIn = req.session.user?true:false
        res.render("dashboard", hbsData)
    })
})

router.get("/posts/:id", (req, res) =>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    Post.findByPk(req.params.id,{include:[User, {model: Comment, include: [User]}]})
    .then(dbPost => {
        const hbsPost = dbPost.get({plain:true})
        const loggedIn = req.session.user?true:false;
        if (dbPost.userId != req.session.user.id) {
            return res.render('comment', {hbsPost: hbsPost, loggedIn, username:req.session.user?.username})
        }
        res.render("updateDelete", {hbsPost: hbsPost, loggedIn, username:req.session.user?.username})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
})

router.get("*",(req,res)=>{
    res.redirect("/")
})

module.exports = router;