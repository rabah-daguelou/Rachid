// Importer les modules
const jsonwebtoken = require ('jsonwebtoken')

// Vérifier le token

const verifyToken = (req, res, next ) => {

    // Pas de clé authorization
    let authorization = req.headers.authorization
    if (!req.headers.authorization || typeof (authorization)!== 'string') {
        res.status(401).json({ message: " Vous n'avez pas d'authorisation pour cette ressource!" })
    }

    // Vérifier la présence d'un token
    let token = req.headers.authorization.split(' ')
    
    // Format du token invalide
    if (token[0]!== 'bearer' || !token[1]) {
        return res.status(401).json({ message: 'Votre token est invalide !'})
    }

    // Isoler le token
    token = token[1]

    // Vérifier la validité du token
    jsonwebtoken.verify(token, process.env.SECRET_TOKEN, (err, decodedToken)=> {
        if (err) {
            console.log ( " Pas de token !")
            return res.status(401).json ({ message: " Pas de token !"})
        }
        next()
    })
}

module.exports = verifyToken