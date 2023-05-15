const sequelize = require("../config/connection")
const {User,Post,Comment} = require("../models")

const users = [
    {
        username: "aubrey",
        password: "password123"
    },
    {
        username: "moose",
        password: "password456"
    },
    {
        username: "theo",
        password: "password789"
    },

]

const posts = [
    {
        id: 1,
        title: "Inital post",
        content: "This is my first blog post!",
        userId: 1
    },
    {
        id: 2,
        title: "title",
        content: "blah blah blah",
        userId: 2
    },
    {
        id: 3,
        title: "title2",
        content: "blah blaj blah bah",
        userId: 2
    },
    {
        id: 4,
        title: "title3",
        content: "blah balj post blah blah",
        userId: 3
    },
]

const comments = [
    {
        
        id: 1,
        comment_text: "blah balhbaljf",
        user_id: 1,
        post_id: 1
    },
    {
        
        id: 1,
        comment_text: "blah balhbaljf",
        user_id: 2,
        post_id: 2
    },
    {
        
        id: 1,
        comment_text: "blah balhbaljf",
        user_id: 1,
        post_id: 3
    },
    {
        
        id: 1,
        comment_text: "blah balhbaljf",
        user_id: 1,
        post_id: 4
    },
]

const seedDatabase = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Post.bulkCreate(posts);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

seedDatabase()