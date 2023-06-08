const db = require('../databases/db')

class Article {
    static #table_name = 'articles';

    constructor(data) {
        this.id = data.id || null
        this.post_id = data.post_id || null
        this.author = data.author || null
        this.content = data.content || null
        this.created_at = data.created_at || null
        this.last_edit = data.last_edit || null
    }

    static all() {
        return new Promise((resolve, reject) => {
            const commentaires = []
            db.each('SELECT * FROM commentaires', (err, row) => {
                if (err)
                    reject(err)

                commentaires.push(new Commentaire(row))
            }, (err) => {
                resolve(commentaires)
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM commentaires WHERE id = ?', id, (err, row) => {
                if (err)
                    reject(err)

                const commentaire = (row) ? new Commentaire(row) : null
                resolve(commentaire)
            })
        })
    }

    create() {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO commentaires(content, author, created_at, last_edit) \
                VALUES(?, ? ,?)", [this.content, this.author, this.created_at, this.last_edit], (err) => {
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
            db.run("UPDATE commentaires SET content = ? WHERE id = ?", [data.content, this.id], async (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const article = Commentaire.find(this.id)

                resolve(commentaire)
            })
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM commentaires WHERE id = ?", [this.id], (err) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }

                const commentaire = Commentaire.find(this.id)
                if (!commentaire)
                    reject('Erreur')

                resolve()
            })
        })
    }

    toJSON() {
        return {
            id: this.id,
            post_id: this.post_id,
            content: this.content,
            author: this.author,
            created_at: this.created_at,
            last_edit: this.last_edit
        }
    }
}

module.exports = Commentaire