const db = require('../databases/db')

class Article {
    static #table_name = 'articles';

    constructor(data) {
        this.id = data.id || null
        this.login = data.login || null
        this.password = data.password || null
        this.email = data.email || null
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
    }

    static all() {
        return new Promise((resolve, reject) => {
            const articles = []
            db.each('SELECT * FROM articles', (err, row) => {
                if (err)
                    reject(err)

                articles.push(new Article(row))
            }, (err) => {
                resolve(articles)
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM articles WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const article = (row) ? new Article(row) : null
                resolve(article)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO articles(login, password, email) \
                VALUES(?, ? ,?)", [this.login, this.password, this.email], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                resolve()
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            db.run("UPDATE articles SET login = ? WHERE id = ?", [data.login, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const article = Article.find(this.id)

                resolve(article)
            })
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM articles WHERE id = ?", [this.id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const article = Article.find(this.id)
                if (!article)
                    reject('Erreur')

                resolve()
            })
        })
    }

    toJSON() {
        return {
            id: this.id,
            login: this.login,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}

module.exports = Article