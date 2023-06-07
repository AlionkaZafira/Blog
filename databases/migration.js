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
    console.log('Table articles créée')
})

db.close()