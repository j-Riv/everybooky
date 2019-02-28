module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        text_limit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        views: {
            type: DataTypes.INTEGER,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
    Book.associate = function(models) {
        models.Book.hasMany(models.User);
    };
    Book.associate = function(models) {
        models.Book.hasMany(models.User)
    };
    return Book;
};