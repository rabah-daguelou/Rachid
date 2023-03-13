// Import de modules
const { DataTypes } = require ('sequelize')
const DB = require ('../db_config')

// Le modèle product
const Realization = DB.define('Realization', {
    realization_id: { // Identifiant unique de la réalisation
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // Publicateur de la réalisation
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },

    realization_name: { // Nom de la réalisation
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    realization_photo: { // Photo de la réalisation
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },

    realization_price: { // Prix de la réalisation
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    
    realization_description: { // Description de la réalisation
        type: DataTypes.TEXT,
        defaultValue:'',
        allowNull: false
    },
    realization_client: { // Client de la réalisation
        type: DataTypes.TEXT,
        defaultValue:'',
        allowNull: false
    },
    client_opinion: { // Impression du client
        type: DataTypes.TEXT,
        defaultValue:'',
        allowNull: false
    },
    realization_likes:{ // Nombre de likes
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: false
    },
    realization_deslikes: { // Nombre de deslikes
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: false
    }
}, { paranoid: true }) // Soft delete


module.exports = Realization;