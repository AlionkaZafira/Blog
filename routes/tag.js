const express = require('express')
const router = express.Router()
const checkTagExist = require('../middlewares/checkTagExist')
const Rag = require('../models/Tag')

router.route('/:id(\\d+)')

    // Endpoint pour créer un tag
    .post(async (req, res) => {
        // Création d'un tag
        const new_tag = new Tag(req.body)

        try {
            // Création en base de données via le model
            await new_tag.create()

            // Réponse
            res.status(201).json(`Le tag ${new_tag.content} à été ajouté`)
        }
        catch (err) {
            console.error('Erreur dans la route', err)

            res.status(500).json('Erreur serveur, Echec de l\'ajout')
        }
    })

module.exports = router