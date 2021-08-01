const router = require("express").Router();
const { Posts } = require("../models/");
const withAuth = require("../utils/auth.js");

router.get("/", withAuth, (req, res) => {
    Posts.findAll({
            where: {
                userId: req.session.userId
            }
        })
        .then(dbPostData => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("all-posts-admin", {
                layout: "dashboard",
                posts
            });
            console.log("++++++++++++++++++++")
            console.log("DASHBOARD")
            console.log("++++++++++++++++++++")
        })
        .catch(err => {
            console.log(err);
            res.redirect("login");
        });
});

router.get("/new", withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard"
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
    Posts.findByPk(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("edit-post", {
                    layout: "dashboard",
                    post
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;