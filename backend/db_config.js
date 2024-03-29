// Importer les modules
const { Sequelize } = require ('sequelize')

// Connexion à la base de données
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host:       process.env.DB_HOST,
        port:       process.env.DB_PORT,
        dialect:    'mysql',
        logging:    false // Ne pas afficher les messages dans la console
    }
)

// Synchronisation des modèles

// sequelize.sync(err => console.log ("Erreur de synchronisation avec la BDD:", err))

module.exports= sequelize