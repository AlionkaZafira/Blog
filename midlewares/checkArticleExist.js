const Article = require('../models/Article')


app.use(bodyParser.json());

module.exports = async function (req, res, next) {
    const user = await Article.find(req.params.id);

    if (!user)
        res.status(404).json('Cet utilisateur n\'existe pas')
    else {
        req.session = { article: article }
        next()
    }
}