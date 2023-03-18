// Importer les modules
const express = require ('express')
const bcrypt = require('bcrypt')

const User = require ('../models/users');
const { 
    getAllUsers, 
    getOneUser, 
    addOneUser,
    modifyOneUser,
    softDeleteOneUser,
    hardDeleteOneUser,
    restoreOneUser
} = require('../controllers/users');

// Router Express
const router = express.Router()

// Routes users

// 1- Récupérer tous les usres
router.get('', getAllUsers);

// 2- Récupérer un seul utilisateur
router.get ('/:id', getOneUser);

// 3- Ajouter un utilisateur
router.put ('', addOneUser);

// 4- Modifier un utilisateur
router.patch ('/:id', modifyOneUser);

// 5- Supprimer un utilisateur
    // A- Soft delete
    router.delete ('/trash/:id', softDeleteOneUser);

        // B- Hard delete 
    router.delete ('/:id', hardDeleteOneUser);

// 6- Restaurer un utilisateur
router.post('/untrash/:id', restoreOneUser);

module.exports = router