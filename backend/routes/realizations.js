// Importer les modules
const express = require ('express')

const Realization = require ('../models/realizations')

// Router Express
const router = express.Router()

// Routes realizations

// 1- Récupérer toutes les realizations
router.get('', (req, res) => {
    Realization.findAll()
        .then( realizations => {
            // Pas d'realizations dans la BDD
            if (realizations.length == 0) {
                console.log( " Aucune réalisation dans la BDD!");
                return res.status(200).json({ message: "Aucune réalisation dans la BDD!"})
            }
            console.log( " Voici la liste des realizations:", realizations);
            return res.status(200).json({message: "Voici la liste des realizations:", realizations: realizations})   
        }) 
        .catch( error => {
            console.log('Erreur dans la BDD !');
            return res.status(500).json({ message: 'Database error!', error: error})
        })  
});

// 2- Récupérer une seule réalisation
router.get ('/:id', (req, res) => {

    // Vérifier l'id du produit transmis
    let realization_id= parseInt(req.params.id)
    
    // Si pas d'id    
    if (!realization_id) {
        console.log (' Il manque un paramètre à votre requête !')
        res.status(400).json({ message: "Il manque un paramètre (l'id réalisation) à votre requête !"})
    }
    // Récupérer la réalisation demandée dans la BDD
    Realization.findOne({ where: {realization_id : realization_id}, row: true})
        .then ( realization => {
            
            // Réalisation introuvable
            if (!realization) {
                console.log( ` La réalisation N°: ${ realization_id } n'existe pas!`);
                return res.status(404).json({ message: ` La réalisation N°: ${ realization_id } n'existe pas!` })
            } 
                // produit trouvé
            console.log("Voici la réalisation demandée:", realization.dataValues);
            return res.status(200).json({ message: " Voici la réalisation demandée ", realization: realization})
        })
        .catch (err => {
            console.log('Erreur dans la BDD !');
            return res.status(500).json({ message: "Erreur de BDD!", error: err})
        })
});

// 3- Ajouter une réalisation
router.put ('', (req, res) => {
    let realization = req.body
    console.log(" réalisation à ajouter:", realization);
    
    // Manque de user_id ou de nom produit
    if (!realization.realization_name) {
        console.log(" La réalisation doit au moins avoir un nom !");
        return res.status(400).json({ message: " Manque d'information: La réalisation doit au moins avoir un nom!"})
    }
 
    // Vérifier l'existance de la réalisation dans la BDD
    Realization.findOne({where: { realization_name: realization.realization_name}, row: true})
        .then (realization => {
            // La réalisation existe déjà
            if (realization!=null) {
                console.log(`Une réalisation porte déjà le nom ${req.body.realization_name} dans la BDD!`);
                return res.status(409).json({ message: `Une réalisation porte déjà le nom ${req.body.realization_name} dans la BDD!`})
            }
            // Enregistrer l'produit dans la BDD            
            Realization.create(req.body)
                .then(realization => {
                    console.log(" La réalisation a été ajoutée avec succès !");
                    return res.status(201).json({ message: " La réalisation a été ajoutée avec succès !", realization: realization})
                })
                .catch( err => {
                console.log(" Erreur dans la BDD !", err);
                return res.status(500).json({ message: "Erreur dans la BDD !", error: err})
                })
            })
        .catch ( err => {
            console.log( ' Erreur dans la BDD!');
            return res.status(500).json({ message: 'Erreur dans la BDD!', error: err})
        })
});

// 4- Modifier un produit
router.patch ('/:id', (req, res) => {

    // Vérifier l'id de l'utisateur transmis
    let realization_id= parseInt(req.params.id)
    
    // Si pas d'id    
    if (!realization_id) {
        console.log ('Il manque un paramètre à votre requête !')
        return res.status(400).json({ message: "Il manque un paramètre (l'id réalisation) à votre requête !"})
    }
        
    // Vérifier l'existance de la réalisation dans la BDD
    Realization.findOne({where: { realization_id: realization_id}, row: true})
        .then (realization=> {

            // L'produit n'existe pas
            if (realization === null) {
                console.log(` La réalisation avec l'identifiant ${ realization_id } n'existe pas!`);
                return res.status(409).json({ message: ` La réalisation avec l'identifiant ${ realization_id } n'existe pas!`})
            }

            // Mofifier l'produit
            console.log(`La réalisation N°: ${ realization_id} sera modifiée dans la BDD!`);
            Realization.update(req.body, { where: {realization_id: realization_id}})
                .then (realization => {
                    console.log( `La réalisation N°: ${realization_id} a été modifiée avec succès!`);
                    return res.status(201).json({ message: `La réalisation N°: ${realization_id} a été modifiée avec succès!`, realization: realization})
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
});

// 5- Supprimer une réalisation
    // A- Soft delete
    router.delete ('/trash/:id', (req, res) => {

            // Vérifier l'id réalization 
            let realization_id = parseInt(req.params.id)
            if (!realization_id) {
                console.log(" Manque de paramètre (id de la réalisation à supprimer) !");
                return res.status(400).json({ message: "Manque de l'identifiant de la réalisation à supprimer !"})
            }
        
            // Vérifier l'existance de la réalisation dans la BDD
            Realization.findOne({where: { realization_id: realization_id}})
                .then (realization => {
                    if (!realization) {
                        console.log ( `La réalisation N°: ${realization_id} n'existe pas !`)
                        return res.status(404).json({ message: `La réalisation N°: ${realization_id} n'existe pas !` });
                    }
                    
                    // Supprimer la réalisation (envoyer dans la corbeille)
                    Realization.destroy ({ where: { realization_id: realization_id}})
                        .then ( ()=> {
                            console.log( `La réalisation N° ${realization_id} est mise dans la corbeille avec succès !`);
                            return res.status(204).json({ message: `La réalisation N°: ${realization_id} est mise dans la corbeille avec succès !`})
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
    });

        // B- Hard delete 
    router.delete ('/:id', (req, res) => {

        // Vérifier l'id réalisation
        let realization_id = parseInt(req.params.id)
        if (!realization_id) {
            console.log(" Manque de paramètre (id de la réalisation à supprimer)");
            return res.status(400).json({ message: "Manque de l'identifiant de la réalisation à supprimer !"})
        }

        // Vérifier l'existance de la réalisation dans la BDD
        Realization.findOne({where: { realization_id: realization_id}})
            .then (realization => {
                if (!realization) {
                    console.log ( `La réalisation N°: ${realization_id} n'existe pas !`)
                    return res.status(404).json({ message: `La réalisation N°: ${realization_id} n'existe pas !` });
                }

                Realization.destroy ({ where: { realization_id: realization_id}, force: true})
                    .then ( ()=> {
                        console.log( `La réalisation N°: ${realization_id} a été supprimé avec succès !`);
                        return res.status(204).json({ message: `La réalisation N°: ${realization_id} a été supprimée avec succès !`})
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
    });

// 6- Restaurer une réalisation
router.post('/untrash/:id', (req, res) => {
    
    // Vérifier l'id réalisation 
    let realization_id = parseInt(req.params.id)
    if (!realization_id) {
        console.log(" Manque de paramètre (id de la réalisation à supprimer)");
        return res.status(400).json({ message: "Manque de l'identifiant de la réalisation à supprimer !"})
    }
    
    // Restaurer une réalisation
    Realization.restore ({ where: { realization_id: realization_id}, force: true})
        .then ( ()=> {
            console.log( `La réalisation N°: ${realization_id} a été restaurée avec succès !`);
            return res.status(204).json({ message: `La réalisation N°: ${realization_id} a été restaurée avec succès !`})
        })
        .catch (err => {
            console.log ( "Erreur de BDD!", err)
            return res.status(500).json({ message: " Erreur de base de donnée!", err})
        })
});

module.exports = router