// Importer les modules
const express = require ('express')
const cors = require ('cors')



// Importer la connexion à la BDD
const DB = require ('./db_config.js')
// Initialiser l'Api
const app = express ();

app.use (cors())
app.use (express.json())
app.use (express.urlencoded({extended:true}))

// Importer les routes
const user_router= require('./routes/users')
const product_router = require ('./routes/products')
const realization_router= require('./routes/realizations')
const client_router = require ('./routes/clients')
const auth_router = require ('./routes/auth/login')

/*const bill_router = require ('./router/bills')
const order_router= require('./routes/orders')
const stock_router = require ('./router/stocks')
*/

// Importer les middlewares
const verifyToken = require ('./middlewares/check_token')
// Importer les controllers
/*
const user_ctrl= require('./controllers/users')
const product_ctrl = require ('./controllers/products')
const realization_ctrl= require('./controllers/realizations')
const bill_ctrl = require ('./controllers/bills')
const order_ctrl= require('./controllers/orders')
const stock_ctrl = require ('./controllers/stocks')
*/

// Branchage des routes

app.get('/', (req, res) => res.send ('Hello Api!'))

app.use ('/users', verifyToken, user_router)

app.use ('/products', product_router)

app.use ('/realizations', realization_router)

app.use ('/clients', client_router)

app.use ('/auth', auth_router)

/*app.use ('/bills', bill_router)
app.use ('/orders', order_router)
app.use ('/stocks', stock_router)
*/

// Not found
app.use ('*', (req, res) => {
    console.log("Cette ressource n'existe pas ! ")
    res.status(404)
    .json({ message: "Cette ressource n'existe pas !" })
})
   


// Démarrer le srveur avec connexion à la BDD
DB.authenticate ()
    .then (() => console.log(' Je suis connecté à la BDD rachid !'))
    .then (()=> {
        app.listen (process.env.PORT, ()=> {
            console.log (`Le serveur écoute sur le port: ${process.env.PORT} !`)
            

        })
    })
    .catch(error => console.log(' Connexion à la BDD échouée !', error))