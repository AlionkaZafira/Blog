const db = require('./db');

db.serialize(() => {
    //db.run('DROP TABLE articles');
    db.run("CREATE TABLE IF NOT EXISTS articles(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        content VARCAHR(50) NOT NULL,             \
        title VARCHAR(100) NOT NULL,              \
        visible BOOLEAN,   \
        created_at DATETIME,                    \
        update_at DATETIME                      \
    )")
    db.run("CREATE TABLE IF NOT EXISTS tags(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        name VARCHAR(100) NOT NULL              \
    )")

    db.run("CREATE TABLE IF NOT EXISTS commentaires(   \
    id INTEGER PRIMARY KEY AUTOINCREMENT,   \
    post_id INTEGER ,   \
    content VARCAHR(50) NOT NULL,             \
    author VARCHAR(100) NOT NULL,              \
    created_at DATETIME,                    \
    last_edit DATETIME                      \
)")
    console.log('Table articles créée')
    console.log('Table tag créée')
    console.log('Table commentaire créée')
})
db.close()