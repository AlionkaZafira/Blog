const Tag = require('../models/Tag')


app.use(bodyParser.json());

module.exports = async function (req, res, next) {
    const user = await Tag.find(req.params.id);

    if (!user)
        res.status(404).json('Ce tag n\'existe pas')
    else {
        req.session = { tag: tag }
        next()
    }
}