const Users = require('./Users');
const Posts = require('./Posts');

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(Users, {
    foreignKey: 'user_id'
});

module.exports = { Users, Posts };