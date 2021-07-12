const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postsRoutes = require('./postsRoutes');
const commentRoutes = require('./comment-routes');


router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/comment', commentRoutes);


module.exports = router;