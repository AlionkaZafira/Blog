const db = require('./db')

db.serialize(() => {
    db.run('DROP TABLE articles');
    db.run("CREATE TABLE IF NOT EXISTS articles(   \
        id INTEGER PRIMARY KEY AUTOINCREMENT,   \
        login VARCAHR(50) NOT NULL,             \
        password VARCHAR(100) NOT NULL,         \
        email VARCHAR(100) NOT NULL UNIQUE,     \
        created_at DATETIME,                    \
        update_at DATETIME                      \
    )")
    console.log('Table articles créée')
})

db.close()