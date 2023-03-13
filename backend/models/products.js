// Import de modules
const { DataTypes } = require ('sequelize')
const DB = require ('../db_config')

// Le modèle product
const Product = DB.define('Product', {

    product_id: { // Identifiant unique du produit
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // L'utilisateur publicateur
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },

    product_name: { // Nom du produit
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    product_photo: { // Photo du produit
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },

    product_price: { // Prix du produit
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    
    product_description: { // Description du produit
        type: DataTypes.TEXT,
        defaultValue:'',
        allowNull: false
    },
    product_stock: { // Nombre en stock
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    product_saled: { // nombre de vendus
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    product_likes:{ // Nombre de likes
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: false
    },
    product_deslikes: { // Nombre de deslikes
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: false
    }
}, { paranoid: true }) // Soft delete


module.exports = Product;