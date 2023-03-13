// Import de modules
const { DataTypes } = require ('sequelize')
const DB = require ('../db_config')

// Le modèle product
const Order = DB.define('Order', {

    order_id: { // Identifiant unique de la facture
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    client_id: { // Publicateur de la réalisation
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },

    
}, { paranoid: true }) // Soft delete


module.exports = Realization;