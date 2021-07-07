const router = require("express").Router();
const { Posts } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Posts.findAll({
            where: {
                user_id: req.session.userId
            }
        })
        .then(dbPostData => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("all-posts-admin", {
                layout: "dashboard",
                posts
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("login");
        });
});