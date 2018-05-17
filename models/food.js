module.exports = function(sequelize, DataType) {
    const Food = sequelize.define("Food", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        frozen: {
            type: DataType.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        fresh: {
            type: DataType.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        canned: {
            type: DataType.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        packaged: {
            type: DataType.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        description: {
            type: DataType.TEXT,
            allowNull: true
        },
        status: {
            type: DataType.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        remaining: {
            type: DataType.INTEGER,
            allowNull: true
        },
        takenBy: {
            type: DataType.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        state: {
            type: DataType.STRING,
            allowNull: false
        },
        city: {
            type: DataType.STRING,
            allowNull: false
        }
    })

    
    Food.associate = function(models){
        Food.belongsTo(models.Organization, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    

    return Food
}