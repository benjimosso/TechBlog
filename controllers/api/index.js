const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postsRoutes = require('./postsRoutes');
console.log(postsRoutes)
router.use('/users', userRoutes);
router.use('/posts', postsRoutes);

module.exports = router;