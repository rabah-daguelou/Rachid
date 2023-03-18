// Importer les modules
const express = require ('express');
const Router = express.Router();

const Client = require ('../models/clients')

// Routes clients
// 1- Récupérer la liste des clients
Router.get('', (req, res) => {
    Client.findAll()
        .then(clients => {
            if ( !clients.length ) {
                console.log (" Aucun client dans la BDD!");
                return res.status(200).json( { message: "Aucun client dans la BDD !"})
            }
            console.log(" Liste des clients: ", clients);
            return res.status(200).json({ message: "Liste des clients", clients: clients})
        })
        .catch( error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
        })
})
// 2- Récupérer un seul client
Router.get('/:id', (req, res)=> {
    let id = parseInt(req.params.id)

    // Vérifier l'id transmis
    if (!id) {
        console.log(" Il manque l'identifiant du client à afficher!");
        return res.status(400).json({ message: "Il manque l'identifiant du client à afficher!"})
    }

    // Récupérer le client dans la BDD
    Client.findOne({ where: { client_id: id }, row: true})
        .then (client => {

            // Le client n'existe pas dans la BDD
            if (client === null ){
                console.log(" Le client N° "+id+ " n'existe pas ! ");
                return res.status(404).json({ message: `Le client ${id} n'existe pas !`})
            }

            // Retourner le client trouvé
            return res.status(200).json({ message: "Voici le client demandé:", client})
        })
        .catch (error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
        })
})
// 3- Ajouter un client
Router.put ('', (req, res) =>{
    let client_first_name = req.body.client_first_name,
        client_last_name  = req.body.client_last_name,
        client_address    = req.body.client_address 
    
    // Vérifier les infos du client 
    if(!client_first_name || !client_last_name || !client_address) {
        console.log (" Nom, prénom et adresse obligatoires !")
        return res.status(400).json({ message: " Nom, prénom et adresse obligatoires !"})
    }

    // Ajouter le client dans la BDD
    Client.create(req.body)
        .then (client => {
            console.log (" Client créé avec succès !", client)
            res.status(201).json({ })
        })
        .catch (error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
        })
})
// 4- Modifier un client
Router.patch('/:id', (req, res) => {
    let id = parseInt (req.params.id)
    
    // Vérifier l'id du client transmis
    if (!id) {
        console.log (" Manque de l'id du client! ")
        return res.status(400).json({ message: " Manque de l'id du client! "})
    }

    // Vérifier le client 
    Client.findOne({ where: { client_id: id }})
        .then (client => {

            // Le client n'existe pas
            if(client === null ) {
                console.log (`Le client N°: ${ id } n'existe pas!`)
                return res.status(404).json({ message: `Le client N°: ${ id } n'existe pas!`})
            }
            
            // Modifier le client demandé
            Client.update(req.body, { where: {client_id: id }, row: true })
                .then (client => {
                    console.log (`Le client N° ${id} a été modifié avec succès!`)
                    return res.status(201).json({})
                })
                .catch (error => {
                    console.log (" Errur dans la BDD !")
                    return res.status(500).json({ message: "Erreur dans la BDD !", error})
                    })
         })
        .catch (error => {
        console.log (" Errur dans la BDD !")
        return res.status(500).json({ message: "Erreur dans la BDD !", error})
        })
})

// 5- Supprimer un client
    // A- Soft delete
    Router.delete ('/trash/:id', (req, res) => {
        let id = parseInt (req.params.id)
    
    // Vérifier l'id du client transmis
    if (!id) {
        console.log (" Manque de l'id du client! ")
        return res.status(400).json({ message: " Manque de l'id du client! "})
    }

    // Vérifier le client 
    Client.findOne({ where: { client_id: id }})
        .then (client => {

            // Le client n'existe pas
            if(client === null ) {
                console.log (`Le client N°: ${ id } n'existe pas!`)
                return res.status(404).json({ message: `Le client N°: ${ id } n'existe pas!`})
            }

            // Supprimer le client
            Client.destroy({ where: {client_id: id}, row: true})
                .then (()=> {
                    console.log (`Le client n° ${id} est mis dans la corbeille avec succès!`)
                    res.status(200).json({ message: `Le client n° ${id} est mis dans la corbeille avec succès!`})
                })
                .catch (error => {
                    console.log (" Errur dans la BDD !")
                    return res.status(500).json({ message: "Erreur dans la BDD !", error})
                    })
        })
        .catch (error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
            }) 
    });

    // B- Hard delete
    Router.delete ('/:id', (req, res) => {
        let id = parseInt (req.params.id)
    
    // Vérifier l'id du client transmis
    if (!id) {
        console.log (" Manque de l'id du client! ")
        return res.status(400).json({ message: " Manque de l'id du client! "})
    }

    // Vérifier le client 
    Client.findOne({ where: { client_id: id }})
        .then (client => {

            // Le client n'existe pas
            if(client === null ) {
                console.log (`Le client N°: ${ id } n'existe pas!`)
                return res.status(404).json({ message: `Le client N°: ${ id } n'existe pas!`})
            }

            // Supprimer définitivement le client
            Client.destroy({ where: {client_id: id}, row: true})
                .then (()=> {
                    console.log (`Le client n° ${id} est définitivement supprimé avec succès!`)
                    res.status(200).json({ message: `Le client n° ${id} est définitivement supprimé avec succès!`})
                })
                .catch (error => {
                    console.log (" Errur dans la BDD !")
                    return res.status(500).json({ message: "Erreur dans la BDD !", error})
                    })
        })
        .catch (error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
        }) 
    });

// 6- Restaurer un client
Router.post('/untrash/:id', (req, res) => {
    let id = parseInt (req.params.id)
    
    // Vérifier l'id du client transmis
    if (!id) {
        console.log (" Manque de l'id du client à restaurer! ")
        return res.status(400).json({ message: " Manque de l'id du client à restaurer! "})
    }
    
    // Restaurer le client
    Client.restore({ where: {client_id: id}, row: true})
        .then (()=> {
            console.log (`Le client n° ${id} est restauré avec succès!`)
            res.status(200).json({ message: `Le client n° ${id} est restauré avec succès!`})
        })
        .catch (error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
            })
        .catch (error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
        }) 
});

// 7- Afficher tous les clients supprimés
Router.get('/trashed/all', (req, res) => {

    Client.findAll({ 
        where:{
         deleteAt: null

        
    }
    })
        .then(clients => {
            if ( !clients.length ) {
                console.log (" Aucun client dans la BDD!");
                return res.status(200).json( { message: "Aucun client dans la BDD !"})
            }
            console.log(" Liste des clients: ", clients);
            return res.status(200).json({ message: "Liste des clients restaurés: ", clients: clients})
        })
        .catch( error => {
            console.log (" Errur dans la BDD !")
            return res.status(500).json({ message: "Erreur dans la BDD !", error})
        })
})

module.exports = Router