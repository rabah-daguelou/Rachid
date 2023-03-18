// Importer les modules
const express = require ('express')

const Product = require ('../models/products')

// Router Express
const router = express.Router()

// Routes products

// 1- Récupérer tous les produits
router.get('', (req, res) => {
    Product.findAll()
        .then( products => {
            // Pas d'produits dans la BDD
            if (products.length == 0) {
                console.log( " Aucun produit dans la BDD!");
                return res.status(200).json({ message: "Aucun produit dans la BDD!"})
            }
            console.log( " Voici la liste des produits:", products);
            return res.status(200).json({message: "Voici la liste des produits:", products: products})   
        }) 
        .catch( error => {
            console.log('Erreur dans la BDD !');
            return res.status(500).json({ message: 'Database error!', error: error})
        })  
});

// 2- Récupérer un seul produit
router.get ('/:id', (req, res) => {

    // Vérifier l'id du produit transmis
    let product_id= parseInt(req.params.id)
    
    // Si pas d'id    
    if (!product_id) {
        console.log (' Il manque un paramètre à votre requête !')
        res.status(400).json({ message: "Il manque un paramètre (l'id produit) à votre requête !"})
    }
    // Récupérer le produit demandé dans la BDD
    Product.findOne({ where: {product_id : product_id}, row: true})
        .then ( product => {
            
            // Utilistateur introuvable
            if (!product) {
                console.log( ` Le produit ${ product_id } n'existe pas!`);
                return res.status(404).json({ message: ` Le produit ${ product_id } n'existe pas!` })
            } 
                // produit trouvé
            console.log("Voici le produit demandé:", product.dataValues);
            return res.status(200).json({ message: " Voici le produit demandé ", product: product})
        })
        .catch (err => {
            console.log('Erreur dans la BDD !');
            return res.status(500).json({ message: "Erreur de BDD!", error: err})
        })
});

// 3- Ajouter un produit
router.put ('', (req, res) => {
    let product = req.body
    console.log(" produit à ajouter:", product);
    
    // Manque de user_id ou de nom produit
    if (!product.product_name) {
        console.log(" Le produit doit au moins avoir un nom !");
        return res.status(400).json({ message: " Manque d'information: Le produit doit au moins avoir un nom!"})
    }
 
    // Vérifier l'existance du produit dans la BDD
    Product.findOne({where: { product_name: product.product_name}, row: true})
        .then (product => {
            // Le produit existe déjà
            if (product!=null) {
                console.log(`Un produit porte déjà le nom ${req.body.product_name} dans la BDD!`);
                return res.status(409).json({ message: `Un produit porte déjà le nom ${req.body.product_name} dans la BDD!`})
            }
            // Enregistrer l'produit dans la BDD            
            Product.create(req.body)
                .then(product => {
                    console.log(" Le produit a été ajouté avec succès !");
                    return res.status(201).json({ message: " Le produit a été ajouté avec succès !", product: product})
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
    let product_id= parseInt(req.params.id)
    
    // Si pas d'id    
    if (!product_id) {
        console.log ('Il manque un paramètre à votre requête !')
        return res.status(400).json({ message: "Il manque un paramètre (l'id produit) à votre requête !"})
    }
        
    // Vérifier l'existance de l'produit dans la BDD
    Product.findOne({where: { product_id: product_id}, row: true})
        .then (product=> {

            // L'produit n'existe pas
            if (product === null) {
                console.log(` Le produit avec l'identifiant ${ product_id } n'existe pas!`);
                return res.status(409).json({ message: ` Le produit avec l'identifiant ${ product_id } n'existe pas!`})
            }

            // Mofifier l'produit
            console.log(`Le produit N°: ${ product_id} sera modifié dans la BDD!`);
            Product.update(req.body, { where: {product_id: product_id}})
                .then (product => {
                    console.log( `Le produit N°: ${product_id} a été modifié avec succès!`);
                    return res.status(201).json({ message: `Le produit N°: ${product_id} a été modifié avec succès!`, product: product})
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

// 5- Supprimer un produit
    // A- Soft delete
    router.delete ('/trash/:id', (req, res) => {

            // Vérifier l'id produit 
            let product_id = parseInt(req.params.id)
            if (!product_id) {
                console.log(" Manque de paramètre (id du produit à supprimer) !");
                return res.status(400).json({ message: "Manque de l'identifiant du produit à supprimer !"})
            }
        
            // Vérifier l'existance de l'produit dans la BDD
            Product.findOne({where: { product_id: product_id}})
                .then (product => {
                    if (!product) {
                        console.log ( `Le produit N°: ${product_id} n'existe pas !`)
                        return res.status(404).json({ message: `Le produit N°: ${product_id} n'existe pas !` });
                    }
                    
                    // Supprimer le produit (envoyer dans la corbeille)
                    Product.destroy ({ where: { product_id: product_id}})
                        .then ( ()=> {
                            console.log( `Le produit N° ${product_id} est mis dans la corbeille avec succès !`);
                            return res.status(204).json({ message: `Le produit N°: ${product_id} est mis dans la corbeille avec succès !`})
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

        // Vérifier l'id produit 
        let product_id = parseInt(req.params.id)
        if (!product_id) {
            console.log(" Manque de paramètre (id du produit à supprimer)");
            return res.status(400).json({ message: "Manque de l'identifiant produit à supprimer !"})
        }

        // Vérifier l'existance de l'produit dans la BDD
        Product.findOne({where: { product_id: product_id}})
            .then (product => {
                if (!product) {
                    console.log ( `Le produit N°: ${product_id} n'existe pas !`)
                    return res.status(404).json({ message: `Le produit N°: ${product_id} n'existe pas !` });
                }

                Product.destroy ({ where: { product_id: product_id}, force: true})
                    .then ( ()=> {
                        console.log( `Le produit N°: ${product_id} a été supprimé avec succès !`);
                        return res.status(204).json({ message: `Le produit N°: ${product_id} a été supprimé avec succès !`})
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

// 6- Restaurer un produit
router.post('/untrash/:id', (req, res) => {
    
    // Vérifier l'id produit 
    let product_id = parseInt(req.params.id)
    if (!product_id) {
        console.log(" Manque de paramètre (id de l'produit à supprimer)");
        return res.status(400).json({ message: "Manque de l'identifiant produit à supprimer !"})
    }
    
    // Restaurer l'produit
    Product.restore ({ where: { product_id: product_id}, force: true})
        .then ( ()=> {
            console.log( `Le produit N°: ${product_id} a été restauré avec succès !`);
            return res.status(204).json({ message: `Le produit N°: ${product_id} a été restauré avec succès !`})
        })
        .catch (err => {
            console.log ( "Erreur de BDD!", err)
            return res.status(500).json({ message: " Erreur de base de donnée!", err})
        })
});

module.exports = router