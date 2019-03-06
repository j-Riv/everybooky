module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1, 160]
        }
    }, {
        freezeTableName: true
    });
    Post.associate = function(models) {
        Post.belongsTo(models.Book, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Post;
}