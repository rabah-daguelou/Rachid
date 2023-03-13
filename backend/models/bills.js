// Import de modules
const { DataTypes } = require ('sequelize')
const DB = require ('../db_config')

// Le modèle user
const Bill = DB.define('Bill', {
    
    bill_id: { // dentifiant unique de la commande
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    
    client_id: { // Client de la commande
        type: DataTypes.INTEGER(10),
    },

    bill_status: { // Statut de la commande
        type: DataTypes.STRING(100),
        allowNull: false,
    },

    bill_total_price: {
        
    }

    
    
}, { paranoid: true }) // Soft delete


module.exports = Bill;