const router = require('express').Router();
const { Posts, Users } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('./', async(req, res) => {
    try {
        const postsData = await Posts.findAll({
            include: [{ model: Users }]
        });

        const posts = postsData.map((posts) => posts.get({ plain: true }));
        console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }

})





module.exports = router;