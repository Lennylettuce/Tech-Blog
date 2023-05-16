const express = require("express");
const router = express.Router();
const {User, Post, Comment} = require("../../models/");
const bcrypt  = require("bcrypt");

router.get("/", (req, res) => {
    User.findAll({
      include:[Post, Comment]
    })
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{include:[Post, Comment]})
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

router.post("/", (req, res) => {

    User.create(req.body, {individualHooks: true} )
      .then(newUser => {
        req.session.user = {
          id:newUser.id,
          username:newUser.username
        }
        res.json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

router.post("/login", (req, res) => {
    User.findOne({
      where:{
      username:req.body.username
    }
}).then(foundUser=>{
      if(!foundUser){
        return res.status(400).json({msg:"wrong login credentials"})
      }
      if(bcrypt.compareSync(req.body.password,foundUser.password)){
        req.session.user = {
          id:foundUser.id,
          username:foundUser.username
        }
        return res.json(foundUser)
      } else {
        return res.status(400).json({msg:"wrong login credentials"})
      }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});
  
router.put("/:id", (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    }).then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
  
router.delete("/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(delUser => {
      res.json(delUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });

module.exports = router;