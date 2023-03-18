// Import de modules
const { DataTypes } = require ('sequelize')
const DB = require ('../db_config')

// Le modèle client
const Client = DB.define('Client', {
    
    client_id: { // Identifiant unique du client
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },

    client_first_name: { // Nom du client
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    
    },
    client_last_name: { // Prénom du client
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    client_email: { // Email du client
        type: DataTypes.STRING,
        validate: {
            isEmail: true, // validation
            unique: true
        }
    },
    client_phone: { // N° tél du client
        type: DataTypes.STRING(15),
        defaultValue: '',
        allowNull: false
    },
    client_address: { // Adresse du client
        type: DataTypes.TEXT,
        defaultValue:'',
        allowNull: false
    },
    client_number: { // Nombre d'achats
        type: DataTypes.INTEGER(10),
        defaultValue: 0
    }
    
    
}, { paranoid: true }) // Soft delete

// Synchroniser le modèle client
// Client.sync()
// Client.sync({ alter: true })
// Client.sync({ force: true })

module.exports = Client;
