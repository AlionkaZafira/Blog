// Librairie
const express = require('express')
const logger = require('morgan')

// Création de l'app
const app = express()
const port = 3000

// Plugins
app.use(logger('dev'))
// Body Parsers
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Route racine
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routers
const articleRouter = require('./routes/article');
app.use('/articles', articleRouter)
const tagRouter = require('./routes/tag');
app.use('/tag', tagRouter)


// Démarrage du serveur
app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
//const express = require('express');
//const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
//const app = express();
//const port = 3000;