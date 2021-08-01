const router = require("express").Router();
const { Posts, Comment, Users } = require("../models/");

// get all posts for homepage
router.get("/", (req, res) => {
    Posts.findAll({
            include: [Users],
        })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("all-posts", { posts });
            console.log("++++++++++++++++++++")
            console.log("HOMEROUTE")
            console.log("++++++++++++++++++++")
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// get single post
router.get("/post/:id", (req, res) => {
    Posts.findByPk(req.params.id, {
            include: [
                Users,
                {
                    model: Comment,
                    include: [Users],
                },
            ],
        })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("singlepost", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        console.log("++++++++++++++++++++++++")
        console.log("estas aca")
        console.log("++++++++++++++++++++++++")
        res.redirect("/");
        return;
    }

    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }

    res.render("signup");
});

module.exports = router;