// Import de modules
const { DataTypes } = require ('sequelize')
const DB = require ('../db_config')

// Le modèle user
const User = DB.define('User', {
    user_id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    
    pseudo: {
        type: DataTypes.STRING(100),
        unique: true,
    },

    email: {
        type: DataTypes.STRING,
        unique:true,
        validate: {
            isEmail: true, // validation
        }
    },

    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f](64)$/i // contrainte
    }
}, { paranoid: true }) // Soft delete


module.exports = User;