const express = require("express");
const router = express.Router();
const {User, Post, Comment} = require("../../models");
const withAuth = require('../../utils/auth');


router.get("/", withAuth, async (req, res) => {
    Post.findAll({include:[User, Comment]})
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

router.get("/:id", (req, res) => {
    Post.findByPk(req.params.id,{include:[User, Comment]})
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"Please login!"})
    }
    Post.create({
      title:req.body.title,
      content:req.body.content,
      userId:req.session.user.id
    })
      .then(newPost => {
        res.json(newPost);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
  Post.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatePost => {
      res.json(updatePost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.delete("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(delPost => {
      res.json(delPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
  
module.exports = router;