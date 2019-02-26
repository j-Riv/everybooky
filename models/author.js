module.exports = function (sequelize, DataTypes) {
    var Author = sequelize.define("Author", {
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
    Author.associate = function (models) {
        models.Author.hasMany(models.Book);
    };
    Author.associate = function (models) {
        models.Author.hasMany(models.Post);
    };
    Author.associate = function (models) {
        Author.belongsTo(models.Book, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Author;
};