// Importer les modules
const express = require ('express')
const bcrypt = require('bcrypt')

const User = require ('../models/users')

// 1- Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then( users => {
            // Pas d'utilisateurs dans la BDD
            if (users.length == 0) {
                console.log( " Aucun utilisateur dans la BDD!");
                return res.status(200).json({ message: "Aucun utilisateur dans la BDD!"})
            }
            console.log( " Il y a des utilisateurs");
            return res.status(200).json({message: "Voici la liste des utilisateurs:", users: users})   
        }) 
        .catch( error => {
            console.log('Erreur dans la BDD !');
            return res.status(500).json({ message: 'Database error!', error: error})
        })  
}

// 2- Récupérer un seul utilisateur
exports.getOneUser = (req, res) => {

    // Vérifier l'id de l'utisateur transmis
    let user_id= parseInt(req.params.id)
    
    // Si pas d'id    
    if (!user_id) {
        console.log (' Il manque un paramètre à votre requête !')
        res.status(400).json({ message: "Il manque un paramètre (l'id utilisateur) à votre requête !"})
    }
    // Récupérer l'utilisateur demandé dans la BDD
    User.findOne({ where: {user_id : user_id}, row: true})
        .then ( user => {
            
            // Utilistateur introuvable
            if (!user) {
                console.log( ` L'utilisateur ${ user_id } n'existe pas!`);
                return res.status(404).json({ message: ` L'utilisateur ${ user_id } n'existe pas!` })
            } 
                // Utilisateur trouvé
            console.log("Voici l'utilisateur demandé:", user.dataValues);
            return res.status(200).json({ message: " Voici l'utilisateur demandé ", user: user})
        })
        .catch (err => {
            console.log('Erreur dans la BDD !');
            return res.status(500).json({ message: "Erreur de BDD!", error: err})
        })
};

// 3- Ajouter un utilisateur
exports.addOneUser = (req, res) => {
    let user = req.body
    console.log(" Utilisateur à inscrire:", user);
    
    // Manque d'email ou password
    if (!user.user_email) {
        console.log(" Manque d'information: email !");
        return res.status(400).json({ message: " Manque d'information: email!"})
    }
    if (!user.user_password) {
        console.log(" Manque d'information: paswword !");
        return res.status(400).json({ message: " Manque d'information: password!"})
    }
 
    // Vérifier l'existance du mail dans la BDD
    User.findOne({where: { user_email: user.user_email}, row: true})
        .then (user => {
            // L'utilisateur existe déjà
            if (user!=null) {
                console.log(" Cet email est déjà utilisé !");
                return res.status(409).json({ message: "Cet email est déjà utilisé!"})
            }

           // Cryptage du mot de passe
           bcrypt.hash(req.body.user_password, parseInt(process.env.BCRYPT_SALE_ROUND))
            .then( hash => {
                console.log ("Le cryptage s'est bien déroulé!");
                req.body.user_password = hash
                
            // Enregistrer l'utilisateur dans la BDD            
            User.create(req.body)
                .then(user => {
                    console.log(" Utilisateur enregistré avec succès !");
                    return res.status(201).json({ message: " Utilisateur enregistré avec succès !", user: user})
                })
                .catch( err => {
                console.log(" Erreur dans la BDD !", err);
                return res.status(500).json({ message: "Erreur dans la BDD !", error: err})
                })
        })
        
            })
            .catch(err => {
                console.log("Erreur de cryptage de mot de passe!", err);
                res.status(500).json( { message: "Erreur de cryptage de mot de passe!", error: err})
            })
        
        .catch ( err => {
            console.log( ' Erreur dans la BDD!');
            return res.status(500).json({ message: 'Erreur dans la BDD!', error: err})
        })/* */
}

// 4- Modifier un utilisateur
exports.modifyOneUser = (req, res) => {

    // Vérifier l'id de l'utisateur transmis
    let user_id= parseInt(req.params.id)
    
    // Si pas d'id    
    if (!user_id) {
        console.log ('Il manque un paramètre à votre requête !')
        return res.status(400).json({ message: "Il manque un paramètre (l'id utilisateur) à votre requête !"})
    }
        
    // Vérifier l'existance de l'utilisateur dans la BDD
    User.findOne({where: { user_id: user_id}, row: true})
        .then (user=> {

            // L'utilisateur n'existe pas
            if (user === null) {
                console.log(` L'utilisateur avec l'identifiant ${ user_id } n'existe pas!`);
                return res.status(409).json({ message: ` L'utilisateur avec l'identifiant ${ user_id } n'existe pas!`})
            }

            // Mofifier l'utilisateur
            console.log(`L'utilisateur à l'identifiant ${ user_id} sera modifié dans la BDD!`);
            User.update(req.body, { where: {user_id: user_id}})
                .then (user => {
                    console.log( `L'utilisateur à l'identifiant ${user_id} a été modifié avec succès!`);
                    return res.status(201).json({ message: `L'utilisateur à l'identifiant ${user_id} a été modifié avec succès!`})
                })
                .catch (err => {
                    console.log( ' Erreur dans la BDD!');
                    return res.status(500).json({ message: 'Erreur dans la BDD!', error: err})
                })
        })
        .catch ( err => {
            console.log (' Erreur dans la BDD !')
            return res.status(500).json({ message: 'Erreur dans la BDD!', error: err})
        })
}

// 5- Supprimer un utilisateur
    // A- Soft delete
   exports.softDeleteOneUser = (req, res) => {

    // Vérifier l'id utilisateur 
    let user_id = parseInt(req.params.id)
    if (!user_id) {
        console.log(" Manque de paramètre (id de l'utilisateur à supprimer)");
        return res.status(400).json({ message: "Manque de l'identifiant utilisateur à supprimer !"})
    }

    // Vérifier l'existance de l'utilisateur dans la BDD
    User.findOne({where: { user_id: user_id}})
        .then (user => {
            if (!user) {
                console.log ( `L'utilisateur à l'identifiant ${user_id} n'existe pas !`)
                return res.status(404).json({ message: `L'utilisateur à l'identifiant ${user_id} n'existe pas !` });
            }

            User.destroy ({ where: { user_id: user_id}})
                .then ( ()=> {
                    console.log( `L'utilisateur N° ${user_id} a été supprimé avec succès !`);
                    return res.status(204).json({ message: `L'utilisateur N° ${user_id} a été supprimé avec succès !`})
                })
                .catch (err => {
                    console.log ( "Erreur de BDD!", err)
                    return res.status(500).json({ message: " Erreur de base de donnée!", err})
                })
        })
        .catch (err => {
            console.log ( "Erreur de BDD!", err)
            return res.status(500).json({ message: " Erreur de base de donnée!", err})
        })
}
   
   // B- Hard delete
   exports.hardDeleteOneUser = (req, res) => {

    // Vérifier l'id utilisateur 
    let user_id = parseInt(req.params.id)
    if (!user_id) {
        console.log(" Manque de paramètre (id de l'utilisateur à supprimer)");
        return res.status(400).json({ message: "Manque de l'identifiant utilisateur à supprimer !"})
    }

    // Vérifier l'existance de l'utilisateur dans la BDD
    User.findOne({where: { user_id: user_id}})
        .then (user => {
            if (!user) {
                console.log ( `L'utilisateur à l'identifiant ${user_id} n'existe pas !`)
                return res.status(404).json({ message: `L'utilisateur à l'identifiant ${user_id} n'existe pas !` });
            }

            User.destroy ({ where: { user_id: user_id}, force: true})
                .then ( ()=> {
                    console.log( `L'utilisateur N° ${user_id} a été supprimé avec succès !`);
                    return res.status(204).json({ message: `L'utilisateur N° ${user_id} a été supprimé avec succès !`})
                })
                .catch (err => {
                    console.log ( "Erreur de BDD!", err)
                    return res.status(500).json({ message: " Erreur de base de donnée!", err})
                })
        })
        .catch (err => {
            console.log ( "Erreur de BDD!", err)
            return res.status(500).json({ message: " Erreur de base de donnée!", err})
        })
}

// 6- Restaurer un utilisateur
exports.restoreOneUser = (req, res) => {
    
    // Vérifier l'id utilisateur 
    let user_id = parseInt(req.params.id)
    if (!user_id) {
        console.log(" Manque de paramètre (id de l'utilisateur à supprimer)");
        return res.status(400).json({ message: "Manque de l'identifiant utilisateur à supprimer !"})
    }
    
    // Restaurer l'utilisateur
    User.restore ({ where: { user_id: user_id}, force: true})
        .then ( ()=> {
            console.log( `L'utilisateur N° ${user_id} a été restauré avec succès !`);
            return res.status(204).json({ message: `L'utilisateur N° ${user_id} a été restauré avec succès !`})
        })
        .catch (err => {
            console.log ( "Erreur de BDD!", err)
            return res.status(500).json({ message: " Erreur de base de donnée!", err})
        })
}
