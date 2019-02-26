module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                len: [3, 20]
            }
        },
    }, {
            freezeTableName: true
        });
    User.associate = function (models) {
        models.User.hasMany(models.Book);
    };
    User.associate = function (models) {
        models.User.hasMany(models.Post);
    };
    User.associate = function (models) {
        User.belongsTo(models.Book, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return User;
};