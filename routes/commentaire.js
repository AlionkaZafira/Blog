const express = require('express')
const router = express.Router()
const checkCommentaireExist = require('../middlewares/checkCommentaireExist')
const Commentaire = require('../models/Commentaire')

router.route('/:id(\\d+)')
    // Récupération d'un commentaire
    .get(checkCommentaireExist, async (req, res) => {
        res.json(req.session.Commentaire);
    })
    // Modifier un commentaire
    .put(checkCommentaireExist, async (req, res) => {
        req.session.commentaire = await req.session.commentaire.update(req.body)

        res.json(`Le commentaire ${req.session.commentaire.content} à été modifié`)
    })
    // Supprimer un commentaire
    .delete(checkCommentaireExist, (req, res) => {
        const commentaire = req.session.commentaire

        commentaire.delete()
            .then(() => {
                res.json(`Le commentaire ${commentaire.content} à été supprimé`)
            })
            .catch(err => {
                res.status(500).json(`Erreur`)
            })
    })

router.route('/')
    // Récupération de la liste des commentaires
    .get(async (req, res) => {
        const result = await Commentaire.all()

        res.send(result)
    })

    // Endpoint pour créer un commentaire
    .post(async (req, res) => {
        // Création d'un commentaire
        const new_commentaire = new Commentaire(req.body)

        try {
            // Création en base de données via le model
            await new_commentaire.create()

            // Réponse
            res.status(201).json(`Le commentaire ${new_commentaire.content} à été ajouté`)
        }
        catch (err) {
            console.error('Erreur dans la route', err)

            res.status(500).json('Erreur serveur, Echec de l\'ajout')
        }
    })

module.exports = router