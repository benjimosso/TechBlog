const Users = require('./Users');
const Posts = require('./Posts');
const Comment = require('./Comment');

Posts.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Posts.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

module.exports = {
    Users,
    Comment,
    Posts
};