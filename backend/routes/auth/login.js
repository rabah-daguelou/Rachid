// Imporeter les modules
const express = require ('express')
const bcrypt = require ('bcrypt')
const jsonwebtoken = require ('jsonwebtoken')
const Router = express.Router()

const User = require ('../../models/users');

// Route authentification 

Router.post('/login', (req, res)=> {
    
    // Vérifier l'envoi des informations
    if(!req.body.user_email) {
        console.log (' Merci de renseigner le champs email !')
        return res.status(400).json({ message: 'Merci de renseigner le champs email!'})
    }
    if(!req.body.user_password) {
        console.log (' Merci de renseigner le champs password !')
        return res.status(400).json({ message: 'Merci de renseigner le champs password !'})
    }
    
    // Vérifier l'exisrance du user dans la BDD
    User.findOne({ where: { user_email: req.body.user_email}, row: true })
        .then ( user => {

            // Le user n'existe pas
            if( user === null ) {
                console.log (" Ce compte n'existe pas !")
                return res.status(404).json ({ message: " Cet utilisateur n'existe pas! "})
            }

            // Utilisateur trouvé
            console.log("User trouvé !", user.dataValues);

            // Comparer le mot de passe
            bcrypt.compare(req.body.user_password, user.user_password)
                .then (test => {

                    // Mot de passe incorrect
                    if(!test ){
                        console.log (' Mot de passe incorrect !')
                        return res.status(401).json({ message: " Mot de passe incorrect !"})
                    }

                    // Générer un token (jwt.signe({payload}, secret, {duration}))
                    const token = jsonwebtoken.sign(
                        {
                        user_id: user.user_id,
                        user_email: user.user_email,
                        },
                        process.env.SECRET_TOKEN,
                        { expiresIn: process.env.TOKEN_DURATION}
                    )
                    console.log (" Utilisateur connecté !")
                    console.log(" Token:", token);
                    return res.status(200).json( { message: 'Utilisateur connecté !', token: token})
                })
                .catch( err => {
                    console.log ('Erreur de décryptage !', err)
                    return res.status(500).json({ message: ' Erreur de decryptage !'})
                })
        })
        .catch (error => {
            console.log(' Erreur dans la BDD !')
            return res.status(500).json({ message: 'Erreur dans la BDD !'})
        })
})

module.exports = Router