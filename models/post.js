module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1, 160]
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
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