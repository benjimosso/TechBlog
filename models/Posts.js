const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING
}, {
    sequelize
});

module.exports = Posts;