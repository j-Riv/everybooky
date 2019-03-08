module.exports = function(sequelize, DataTypes) {
    var Mode = sequelize.define("Mode", {
        dark_mode: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
    return Mode;
}