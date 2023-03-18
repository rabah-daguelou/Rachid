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
    
    user_pseudo: {
        type: DataTypes.STRING(100),
        unique: true,
    },

    user_email: {
        type: DataTypes.STRING,
        unique:true,
        validate: {
            isEmail: true, // validation
        }
    },

    user_password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f](64)$/i // contrainte
    }
}, { paranoid: true }) // Soft delete

// Synchronisation du modèle

 //User.sync();
 //User.sync({ force: true});
// User.sync( { alter: true});

module.exports = User;