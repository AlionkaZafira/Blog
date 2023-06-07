const Article = require('../models/Article')

module.exports = async function (req, res, next) {
    const article = await Article.find(req.params.id);

    if (!article)
        res.status(404).json('Cet utilisateur n\'existe pas')
    else {
        req.session = { article: article }
        next()
    }
}