// Importer les modules
const express = require ('express')
const cors = require ('cors')

const user_router= require('./routes/users')
// Importer la connexion à la BDD
const DB = require ('./db_config.js')
// Initialiser l'Api
const app = express ();

app.use (cors())
app.use (express.json())
app.use (express.urlencoded({extended:true}))

// Le router

app.get('/', (req, res) => res.send ('Hello Api!'))

app.use ('/users', user_router)


app.get ('*', (req, res) => res.status(500).send("Cette ressource n'existe pas !"))


// Démarrer le srveur avec connexion à la BDD
DB.authenticate ()
    .then (() => console.log(' Je suis connecté à la BDD rachid !'))
    .then (()=> {
        app.listen (process.env.PORT, ()=> {
            console.log (`Le serveur écoute sur le port: ${process.env.PORT} !`)
            

        })
    })
    .catch(error => console.log(' Connexion à la BDD échouée !', error))