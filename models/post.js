module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    }, {
            freezeTableName: true
        });
    Post.associate = function (models) {
        Post.belongsTo(models.Book, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Post;
}