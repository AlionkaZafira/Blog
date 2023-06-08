const express = require('express')
const router = express.Router()
const checkArticleExist = require('../middlewares/checkArticleExist')
const Article = require('../models/Article')

router.route('/:id(\\d+)')
    // Récupération d'un utilisateur
    .get(checkArticleExist, async (req, res) => {
        res.json(req.session.article);
    })
    // Modifier un utilisateur
    .put(checkArticleExist, async (req, res) => {
        req.session.article = await req.session.article.update(req.body)

        res.json(`L'utilisateur ${req.session.article.content} à été modifié`)
    })
    // Supprimer un utilisateur
    .delete(checkArticleExist, (req, res) => {
        const article = req.session.article

        article.delete()
            .then(() => {
                res.json(`L'utilisateur ${article.content} à été supprimé`)
            })
            .catch(err => {
                res.status(500).json(`Erreur`)
            })
    })

router.route('/')
    // Récupération de la liste des utilisateurs
    .get(async (req, res) => {
        const result = await Article.all()

        res.send(result)
    })

    // Endpoint pour créer un utilisateur
    .post(async (req, res) => {
        // Création d'une instance de article
        const new_article = new Article(req.body)

        try {
            // Création en base de données via le model
            await new_article.create()

            // Réponse
            res.status(201).json(`L'utilisateur ${new_article.content} à été ajouté`)
        }
        catch (err) {
            console.error('Erreur dans la route', err)

            res.status(500).json('Erreur serveur, Echec de l\'ajout')
        }
    })

module.exports = router