const Tag = require('../models/Commentaire')


app.use(bodyParser.json());

module.exports = async function (req, res, next) {
    const user = await Commentaire.find(req.params.id);

    if (!user)
        res.status(404).json('Ce commentaire n\'existe pas')
    else {
        req.session = { commentaire: commentaire }
        next()
    }
}